/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://blockly.googlecode.com/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating ByteCode for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.ByteCode');

goog.require('Blockly.Generator');


Blockly.ByteCode = new Blockly.Generator('ByteCode');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.ByteCode.addReservedWords(
    'Blockly,' +  // In case JS is evaled in the current window.
    // https://developer.mozilla.org/en/ByteCode/Reference/Reserved_Words
    'break,case,catch,continue,debugger,default,delete,do,else,finally,for,function,if,in,instanceof,new,return,switch,this,throw,try,typeof,var,void,while,with,' +
    'class,enum,export,extends,import,super,implements,interface,let,package,private,protected,public,static,yield,' +
    'const,null,true,false,' +
    // https://developer.mozilla.org/en/ByteCode/Reference/Global_Objects
    'Array,ArrayBuffer,Boolean,Date,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Error,eval,EvalError,Float32Array,Float64Array,Function,Infinity,Int16Array,Int32Array,Int8Array,isFinite,isNaN,Iterator,JSON,Math,NaN,Number,Object,parseFloat,parseInt,RangeError,ReferenceError,RegExp,StopIteration,String,SyntaxError,TypeError,Uint16Array,Uint32Array,Uint8Array,Uint8ClampedArray,undefined,uneval,URIError,' +
    // https://developer.mozilla.org/en/DOM/window
    'applicationCache,closed,Components,content,_content,controllers,crypto,defaultStatus,dialogArguments,directories,document,frameElement,frames,fullScreen,globalStorage,history,innerHeight,innerWidth,length,location,locationbar,localStorage,menubar,messageManager,mozAnimationStartTime,mozInnerScreenX,mozInnerScreenY,mozPaintCount,name,navigator,opener,outerHeight,outerWidth,pageXOffset,pageYOffset,parent,performance,personalbar,pkcs11,returnValue,screen,screenX,screenY,scrollbars,scrollMaxX,scrollMaxY,scrollX,scrollY,self,sessionStorage,sidebar,status,statusbar,toolbar,top,URL,window,' +
    'addEventListener,alert,atob,back,blur,btoa,captureEvents,clearImmediate,clearInterval,clearTimeout,close,confirm,disableExternalCapture,dispatchEvent,dump,enableExternalCapture,escape,find,focus,forward,GeckoActiveXObject,getAttention,getAttentionWithCycleCount,getComputedStyle,getSelection,home,matchMedia,maximize,minimize,moveBy,moveTo,mozRequestAnimationFrame,open,openDialog,postMessage,print,prompt,QueryInterface,releaseEvents,removeEventListener,resizeBy,resizeTo,restore,routeEvent,scroll,scrollBy,scrollByLines,scrollByPages,scrollTo,setCursor,setImmediate,setInterval,setResizable,setTimeout,showModalDialog,sizeToContent,stop,unescape,updateCommands,XPCNativeWrapper,XPCSafeJSObjectWrapper,' +
    'onabort,onbeforeunload,onblur,onchange,onclick,onclose,oncontextmenu,ondevicemotion,ondeviceorientation,ondragdrop,onerror,onfocus,onhashchange,onkeydown,onkeypress,onkeyup,onload,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,onmozbeforepaint,onpaint,onpopstate,onreset,onresize,onscroll,onselect,onsubmit,onunload,onpageshow,onpagehide,' +
    'Image,Option,Worker,' +
    // https://developer.mozilla.org/en/Gecko_DOM_Reference
    'Event,Range,File,FileReader,Blob,BlobBuilder,' +
    'Attr,CDATASection,CharacterData,Comment,console,DocumentFragment,DocumentType,DomConfiguration,DOMError,DOMErrorHandler,DOMException,DOMImplementation,DOMImplementationList,DOMImplementationRegistry,DOMImplementationSource,DOMLocator,DOMObject,DOMString,DOMStringList,DOMTimeStamp,DOMUserData,Entity,EntityReference,MediaQueryList,MediaQueryListListener,NameList,NamedNodeMap,Node,NodeFilter,NodeIterator,NodeList,Notation,Plugin,PluginArray,ProcessingInstruction,SharedWorker,Text,TimeRanges,Treewalker,TypeInfo,UserDataHandler,Worker,WorkerGlobalScope,' +
    'HTMLDocument,HTMLElement,HTMLAnchorElement,HTMLAppletElement,HTMLAudioElement,HTMLAreaElement,HTMLBaseElement,HTMLBaseFontElement,HTMLBodyElement,HTMLBRElement,HTMLButtonElement,HTMLCanvasElement,HTMLDirectoryElement,HTMLDivElement,HTMLDListElement,HTMLEmbedElement,HTMLFieldSetElement,HTMLFontElement,HTMLFormElement,HTMLFrameElement,HTMLFrameSetElement,HTMLHeadElement,HTMLHeadingElement,HTMLHtmlElement,HTMLHRElement,HTMLIFrameElement,HTMLImageElement,HTMLInputElement,HTMLKeygenElement,HTMLLabelElement,HTMLLIElement,HTMLLinkElement,HTMLMapElement,HTMLMenuElement,HTMLMetaElement,HTMLModElement,HTMLObjectElement,HTMLOListElement,HTMLOptGroupElement,HTMLOptionElement,HTMLOutputElement,HTMLParagraphElement,HTMLParamElement,HTMLPreElement,HTMLQuoteElement,HTMLScriptElement,HTMLSelectElement,HTMLSourceElement,HTMLSpanElement,HTMLStyleElement,HTMLTableElement,HTMLTableCaptionElement,HTMLTableCellElement,HTMLTableDataCellElement,HTMLTableHeaderCellElement,HTMLTableColElement,HTMLTableRowElement,HTMLTableSectionElement,HTMLTextAreaElement,HTMLTimeElement,HTMLTitleElement,HTMLTrackElement,HTMLUListElement,HTMLUnknownElement,HTMLVideoElement,' +
    'HTMLCanvasElement,CanvasRenderingContext2D,CanvasGradient,CanvasPattern,TextMetrics,ImageData,CanvasPixelArray,HTMLAudioElement,HTMLVideoElement,NotifyAudioAvailableEvent,HTMLCollection,HTMLAllCollection,HTMLFormControlsCollection,HTMLOptionsCollection,HTMLPropertiesCollection,DOMTokenList,DOMSettableTokenList,DOMStringMap,RadioNodeList,' +
    'SVGDocument,SVGElement,SVGAElement,SVGAltGlyphElement,SVGAltGlyphDefElement,SVGAltGlyphItemElement,SVGAnimationElement,SVGAnimateElement,SVGAnimateColorElement,SVGAnimateMotionElement,SVGAnimateTransformElement,SVGSetElement,SVGCircleElement,SVGClipPathElement,SVGColorProfileElement,SVGCursorElement,SVGDefsElement,SVGDescElement,SVGEllipseElement,SVGFilterElement,SVGFilterPrimitiveStandardAttributes,SVGFEBlendElement,SVGFEColorMatrixElement,SVGFEComponentTransferElement,SVGFECompositeElement,SVGFEConvolveMatrixElement,SVGFEDiffuseLightingElement,SVGFEDisplacementMapElement,SVGFEDistantLightElement,SVGFEFloodElement,SVGFEGaussianBlurElement,SVGFEImageElement,SVGFEMergeElement,SVGFEMergeNodeElement,SVGFEMorphologyElement,SVGFEOffsetElement,SVGFEPointLightElement,SVGFESpecularLightingElement,SVGFESpotLightElement,SVGFETileElement,SVGFETurbulenceElement,SVGComponentTransferFunctionElement,SVGFEFuncRElement,SVGFEFuncGElement,SVGFEFuncBElement,SVGFEFuncAElement,SVGFontElement,SVGFontFaceElement,SVGFontFaceFormatElement,SVGFontFaceNameElement,SVGFontFaceSrcElement,SVGFontFaceUriElement,SVGForeignObjectElement,SVGGElement,SVGGlyphElement,SVGGlyphRefElement,SVGGradientElement,SVGLinearGradientElement,SVGRadialGradientElement,SVGHKernElement,SVGImageElement,SVGLineElement,SVGMarkerElement,SVGMaskElement,SVGMetadataElement,SVGMissingGlyphElement,SVGMPathElement,SVGPathElement,SVGPatternElement,SVGPolylineElement,SVGPolygonElement,SVGRectElement,SVGScriptElement,SVGStopElement,SVGStyleElement,SVGSVGElement,SVGSwitchElement,SVGSymbolElement,SVGTextElement,SVGTextPathElement,SVGTitleElement,SVGTRefElement,SVGTSpanElement,SVGUseElement,SVGViewElement,SVGVKernElement,' +
    'SVGAngle,SVGColor,SVGICCColor,SVGElementInstance,SVGElementInstanceList,SVGLength,SVGLengthList,SVGMatrix,SVGNumber,SVGNumberList,SVGPaint,SVGPoint,SVGPointList,SVGPreserveAspectRatio,SVGRect,SVGStringList,SVGTransform,SVGTransformList,' +
    'SVGAnimatedAngle,SVGAnimatedBoolean,SVGAnimatedEnumeration,SVGAnimatedInteger,SVGAnimatedLength,SVGAnimatedLengthList,SVGAnimatedNumber,SVGAnimatedNumberList,SVGAnimatedPreserveAspectRatio,SVGAnimatedRect,SVGAnimatedString,SVGAnimatedTransformList,' +
    'SVGPathSegList,SVGPathSeg,SVGPathSegArcAbs,SVGPathSegArcRel,SVGPathSegClosePath,SVGPathSegCurvetoCubicAbs,SVGPathSegCurvetoCubicRel,SVGPathSegCurvetoCubicSmoothAbs,SVGPathSegCurvetoCubicSmoothRel,SVGPathSegCurvetoQuadraticAbs,SVGPathSegCurvetoQuadraticRel,SVGPathSegCurvetoQuadraticSmoothAbs,SVGPathSegCurvetoQuadraticSmoothRel,SVGPathSegLinetoAbs,SVGPathSegLinetoHorizontalAbs,SVGPathSegLinetoHorizontalRel,SVGPathSegLinetoRel,SVGPathSegLinetoVerticalAbs,SVGPathSegLinetoVerticalRel,SVGPathSegMovetoAbs,SVGPathSegMovetoRel,ElementTimeControl,TimeEvent,SVGAnimatedPathData,' +
    'SVGAnimatedPoints,SVGColorProfileRule,SVGCSSRule,SVGExternalResourcesRequired,SVGFitToViewBox,SVGLangSpace,SVGLocatable,SVGRenderingIntent,SVGStylable,SVGTests,SVGTextContentElement,SVGTextPositioningElement,SVGTransformable,SVGUnitTypes,SVGURIReference,SVGViewSpec,SVGZoomAndPan');

/**
 * Order of operation ENUMs.
 * https://developer.mozilla.org/en/ByteCode/Reference/Operators/Operator_Precedence
 */
Blockly.ByteCode.ORDER_ATOMIC = 0;         // 0 "" ...
Blockly.ByteCode.ORDER_MEMBER = 1;         // . []
Blockly.ByteCode.ORDER_NEW = 1;            // new
Blockly.ByteCode.ORDER_FUNCTION_CALL = 2;  // ()
Blockly.ByteCode.ORDER_INCREMENT = 3;      // ++
Blockly.ByteCode.ORDER_DECREMENT = 3;      // --
Blockly.ByteCode.ORDER_LOGICAL_NOT = 4;    // !
Blockly.ByteCode.ORDER_BITWISE_NOT = 4;    // ~
Blockly.ByteCode.ORDER_UNARY_PLUS = 4;     // +
Blockly.ByteCode.ORDER_UNARY_NEGATION = 4; // -
Blockly.ByteCode.ORDER_TYPEOF = 4;         // typeof
Blockly.ByteCode.ORDER_VOID = 4;           // void
Blockly.ByteCode.ORDER_DELETE = 4;         // delete
Blockly.ByteCode.ORDER_MULTIPLICATION = 5; // *
Blockly.ByteCode.ORDER_DIVISION = 5;       // /
Blockly.ByteCode.ORDER_MODULUS = 5;        // %
Blockly.ByteCode.ORDER_ADDITION = 6;       // +
Blockly.ByteCode.ORDER_SUBTRACTION = 6;    // -
Blockly.ByteCode.ORDER_BITWISE_SHIFT = 7;  // << >> >>>
Blockly.ByteCode.ORDER_RELATIONAL = 8;     // < <= > >=
Blockly.ByteCode.ORDER_IN = 8;             // in
Blockly.ByteCode.ORDER_INSTANCEOF = 8;     // instanceof
Blockly.ByteCode.ORDER_EQUALITY = 9;       // == != === !==
Blockly.ByteCode.ORDER_BITWISE_AND = 10;   // &
Blockly.ByteCode.ORDER_BITWISE_XOR = 11;   // ^
Blockly.ByteCode.ORDER_BITWISE_OR = 12;    // |
Blockly.ByteCode.ORDER_LOGICAL_AND = 13;   // &&
Blockly.ByteCode.ORDER_LOGICAL_OR = 14;    // ||
Blockly.ByteCode.ORDER_CONDITIONAL = 15;   // ?:
Blockly.ByteCode.ORDER_ASSIGNMENT = 16;    // = += -= *= /= %= <<= >>= ...
Blockly.ByteCode.ORDER_COMMA = 17;         // ,
Blockly.ByteCode.ORDER_NONE = 99;          // (...)

/**
 * Arbitrary code to inject into locations that risk causing infinite loops.
 * Any instances of '%1' will be replaced by the block ID that failed.
 * E.g. '  checkTimeout(%1);\n'
 * @type ?string
 */
Blockly.ByteCode.INFINITE_LOOP_TRAP = null;

/**
 * Initialise the database of variable names.
 */
Blockly.ByteCode.init = function() {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.ByteCode.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.ByteCode.functionNames_ = Object.create(null);

  if (Blockly.Variables) {
    if (!Blockly.ByteCode.variableDB_) {
      Blockly.ByteCode.variableDB_ =
          new Blockly.Names(Blockly.ByteCode.RESERVED_WORDS_);
    } else {
      Blockly.ByteCode.variableDB_.reset();
    }

    var defvars = [];
    var variables = Blockly.Variables.allVariables();
    for (var x = 0; x < variables.length; x++) {
      defvars[x] = '[vo]' +
          Blockly.ByteCode.variableDB_.getName(variables[x],
          Blockly.Variables.NAME_TYPE) + '[vc]';
    }
    //defvars = [];
    Blockly.ByteCode.definitions_['variables'] = defvars.join('\n');
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.ByteCode.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.ByteCode.definitions_) {
    definitions.push(Blockly.ByteCode.definitions_[name]);
  }
  return definitions.join('\n\n') + '\n\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.ByteCode.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped ByteCode string, complete with
 * quotes.
 * @param {string} string Text to encode.
 * @return {string} ByteCode string.
 * @private
 */
Blockly.ByteCode.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating ByteCode from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The ByteCode code created for this block.
 * @return {string} ByteCode code with comments and subsequent blocks added.
 * @private
 */
Blockly.ByteCode.scrub_ = function(block, code) {
  if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += this.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = this.allNestedComments(childBlock);
          if (comment) {
            commentCode += this.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

//Blockly.ByteCode['date'] = function(block) {
//  // TODO: Assemble JavaScript into code variable.
//  var code = '...';
//  // TODO: Change ORDER_NONE to the correct strength.
//  return [code, Blockly.ByteCode.ORDER_NONE];
//};


Blockly.ByteCode['clock_date'] = function(block) {
  var dropdown_date = block.getFieldValue('date');
  var code = '1 '+dropdown_date+' 98 ';
  return [code, Blockly.ByteCode.ORDER_NONE];
};

Blockly.ByteCode['display_text'] = function(block) {
  var text_input = block.getFieldValue('text');
  var code = '';
  //if (isNaN(text_input.toInt())) {
  	
  	if (text_input.length > 4) {
  		for (var i = 0; i < text_input.length; i++) {
  			code += '1 '+text_input.charCodeAt(text_input.length - i - 1)+' ';
  		}
  		code += '1 '+text_input.length+' 1 5 99 ';
  	} else {
  		for (var i = 0; i < text_input.length; i++) {
  			code += '1 '+text_input.charCodeAt(i)+' ';
  		}
  		code += '1 3 99 ';
  	}
//  } else {
//  	var num = text_input.toInt();
//  	code = '2 '+Math.floor(num / 256)+' '+(num % 256)+' 1 2 99 ';
//  }
  return code;
};

Blockly.ByteCode['display_number'] = function(block) {
  //var text_input = block.getFieldValue('text');
  var value_value = Blockly.ByteCode.valueToCode(block, 'value', Blockly.ByteCode.ORDER_ATOMIC);
  var code = '';
  //var num = text_input.toInt();
  //code = '2 '+Math.floor(num / 256)+' '+(num % 256)+' 1 2 99 ';
  code = value_value + ' 1 2 99 ';
  return code;
};

Blockly.ByteCode['display_movecursor'] = function(block) {
  var text_num = block.getFieldValue('num');
  text_num = isNaN(text_num) ? 0 : text_num % 32 ;
  var code = '1 '+text_num+' 102 ';
  return code;
};

Blockly.ByteCode['display_clearscreen'] = function(block) {
  var code = '100 ';
  return code;
};

Blockly.ByteCode['recorder_play'] = function(block) {
  var code = '1 6 1 1 1 184 107 ';
  return code;
};

Blockly.ByteCode['recorder_next'] = function(block) {
  var code = '1 9 1 1 1 184 107 ';
  return code;
};

Blockly.ByteCode['recorder_prev'] = function(block) {
  var code = '1 18 1 1 1 184 107 ';
  return code;
};

Blockly.ByteCode['recorder_select'] = function(block) {
  var num_track = block.getFieldValue('track');
  var code = '1 '+((isNaN(num_track) ? 0 : num_track % 32) + 48)+' 1 1 1 184 107 ';
  return code;
};

Blockly.ByteCode['recorder_eraseall'] = function(block) {
  var code = '1 12 1 1 1 184 107 ';
  return code;
};

Blockly.ByteCode['i2c_write'] = function(block) {
  var value_value = Blockly.ByteCode.valueToCode(block, 'TEXT', Blockly.ByteCode.ORDER_ATOMIC);
  var text_reg_addr = block.getFieldValue('reg_addr');
  var text_i2c_addr = block.getFieldValue('i2c_addr');
  var num = isNaN(text_reg_addr) ? text_reg_addr.charCodeAt(0) : text_reg_addr;
  var code = '1 '+value_value+' 2 '+Math.floor(num / 256)+' '+(num % 256)+' 1 '+text_i2c_addr+' 107 ';
  return code;
};

Blockly.ByteCode['i2c_read'] = function(block) {
  var text_reg_addr = block.getFieldValue('reg_addr');
  var text_i2c_addr = block.getFieldValue('i2c_addr');
  var num = isNaN(text_reg_addr) ? text_reg_addr.charCodeAt(0) : text_reg_addr;
  var code = ' 2 '+Math.floor(num / 256)+' '+(num % 256)+' 1 '+text_i2c_addr+' 108 ';
  return [code, Blockly.ByteCode.ORDER_NONE];
};

Blockly.ByteCode['text'] = function(block) {
  var text_text = block.getFieldValue('TEXT');
  // TODO: Assemble JavaScript into code variable.
  var code = text_text;
  return code;
};


Blockly.ByteCode.action_beep = function() {
  var code = '<beep> ';
  return code;
};

Blockly.ByteCode.action_led = function() {
  var dropdown_onoff = this.getFieldValue('onoff');
  var code = '<led'+dropdown_onoff+'> ';
  return code;
};

/***
Blockly.ByteCode.action_wait = function() {
  var text_name = this.getFieldValue('NAME');
  text_name *= 10;
  text_name = isNaN(text_name) ? 0 : text_name ;
  var code = '<%num'+((text_name > 255) ? '16' : '' )+'> ' + splitNumber(text_name) + ' <wait> ';
  return code;
};
/***/

//***
Blockly.ByteCode['action_wait'] = function(block) {
  var value_name = Blockly.ByteCode.valueToCode(block, 'NAME', Blockly.ByteCode.ORDER_ATOMIC);
  //value_name *= 10;
  //var code = value_name+' <%num> 10 * <wait> ';
  var code = value_name+' <wait> ';
  return code;
};
/***/

Blockly.ByteCode.action_gettimer = function() {
  var code = '<timer> ';
  return [code, Blockly.ByteCode.ORDER_NONE];
};

Blockly.ByteCode.action_reset_timer = function() {
  var code = '<resett> '
  return code;
};

Blockly.ByteCode.action_motor = function() {
  var dropdown_a = this.getFieldValue('a');
  var dropdown_b = this.getFieldValue('b');
  var dropdown_c = this.getFieldValue('c');
  var dropdown_d = this.getFieldValue('d');
  //var code = '<'+dropdown_a+dropdown_b+dropdown_c+dropdown_d+'> ';
  if (dropdown_a == 'a') { dropdown_a = 1; }
  if (dropdown_a == '') { dropdown_a = 0; }
  if (dropdown_b == '') { dropdown_b = 0; }
  if (dropdown_c == '') { dropdown_c = 0; }
  if (dropdown_d == '') { dropdown_d = 0; }
  var code = '<%num> '+ (dropdown_a+dropdown_b+dropdown_c+dropdown_d).toString()+' <talkto> ';
  return code;
};

Blockly.ByteCode.motor_action_turn = function() {
  var dropdown_turn = this.getFieldValue('turn');
  var code = '<'+dropdown_turn+'> ';
  return code;
};

Blockly.ByteCode.motor_action_onfor = function(block) {
  var text_second = Blockly.ByteCode.valueToCode(block, 'value', Blockly.ByteCode.ORDER_ATOMIC);
  //text_second *= 10;
  //text_second = isNaN(text_second) ? 0 : text_second;
  //var code = '<%num'+((text_second > 255) ? '16' : '' )+'> ' + splitNumber(text_second) + ' <onfor> ';
  //var code = text_second +' <%num> 10 * <onfor> ';
  var code = text_second +' <onfor> ';
  return code;
};

Blockly.ByteCode.motor_action_thisway = function() {
  var dropdown_thisway = this.getFieldValue('thisway');
  var code = '<'+dropdown_thisway+ '> ';
  return code;
};

Blockly.ByteCode.motor_action_rd = function() {
  var code = '<rd> ';
  return code;
};

Blockly.ByteCode.motor_action_power = function() {
  var dropdown_power = this.getFieldValue('power');
  var code = '<%num> ' + dropdown_power + ' <setpower> ';
  return code;
};

Blockly.ByteCode['servo_seth'] = function(block) {
  var text_heading = block.getFieldValue('heading');
  var code = '<span class="c316">seth ' + text_heading + '</span> \n';
  return '';
};

Blockly.ByteCode['servo_lt'] = function(block) {
  var text_heading = block.getFieldValue('heading');
  var code = '<span class="c316">lt ' + text_heading + '</span> \n';
  return '';
};

Blockly.ByteCode['servo_rt'] = function(block) {
  var text_heading = block.getFieldValue('heading');
  var code = '<span class="c316">rt ' + text_heading + '</span> \n';
  return '';
};

/**  CONTROL  **/

Blockly.ByteCode['control_true'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '<%num> 1 <%num> 1 = ';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.ByteCode.ORDER_NONE];
};

Blockly.ByteCode.control_if = function() {
  var value_condition = Blockly.ByteCode.valueToCode(this, 'condition', Blockly.ByteCode.ORDER_ATOMIC);
  var statements_statement = Blockly.ByteCode.statementToCode(this, 'statement');
  
  var statement = statements_statement.clean();
  var condition = value_condition.clean();
  var listLength = (statement != '') ? statement.split(' ').length + 1 : 1 ;
  listLength = countLength(statement);
  
  var code = condition+' <%list> '+listLength+' '+statement+' <%eol> <if> ';
  return code.clean()+' ';
};

/***
Blockly.ByteCode.controls_if = function() {
  var value_condition = Blockly.ByteCode.valueToCode(this, 'condition', Blockly.ByteCode.ORDER_ATOMIC);
  var statements_statement = Blockly.ByteCode.statementToCode(this, 'statement');
  
  var statement = statements_statement.clean();
  var condition = value_condition.clean();
  var listLength = (statement != '') ? statement.split(' ').length + 1 : 1 ;
  
  var code = condition+' <%list> '+listLength+' '+statement+' <%eol> <if> ';
  return code.clean()+' ';
};

/***/

Blockly.ByteCode.control_ifelse = function() {
  var value_condition = Blockly.ByteCode.valueToCode(this, 'condition', Blockly.ByteCode.ORDER_ATOMIC).clean();
  var statements_if = Blockly.ByteCode.statementToCode(this, 'if').clean();
  var statements_else = Blockly.ByteCode.statementToCode(this, 'else').clean();
  var ifLength = (statements_if != '') ? statements_if.split(' ').length + 1 : 1 ;
  ifLength = countLength(statements_if);
  var elseLength = (statements_else != '') ? statements_else.split(' ').length + 1 : 1 ;
  elseLength = countLength(statements_else);
  var code = value_condition+' <%list> '+ifLength+' '+statements_if+' <%eol> <%list> '+elseLength+' '+statements_else+' <%eol> <ifelse> ';
  return code.clean()+' ';
};

Blockly.ByteCode.control_waituntil = function() {
  var condition = Blockly.ByteCode.valueToCode(this, 'NAME', Blockly.ByteCode.ORDER_ATOMIC).clean();
  var conditionLength = (condition != '') ? condition.split(' ').length + 1 : 1 ;
  conditionLength = countLength(condition);
  var code = '<%list> '+conditionLength+' '+condition+' <%eolr> <waituntil> ';
  return code.clean()+' ';
};

Blockly.ByteCode.control_repeat = function() {
  var value_times = Blockly.ByteCode.valueToCode(this, 'times', Blockly.ByteCode.ORDER_ATOMIC).clean();
  var statements_do = Blockly.ByteCode.statementToCode(this, 'do').clean();
  var doLength = (statements_do != '') ? statements_do.split(' ').length + 1 : 1 ;
  doLength = countLength(statements_do);
  
  var code = '<%num'+((value_times > 255) ? '16' : '' )+'> '+splitNumber(value_times)+' <%list> '+doLength+' '+statements_do+' <%eol> <repeat> ';
  var code = value_times+' <%list> '+doLength+' '+statements_do+' <%eol> <repeat> ';
  return code;
};

Blockly.ByteCode.control_forever = function() {
  var statements_do = Blockly.ByteCode.statementToCode(this, 'do').clean();
  var doLength = (statements_do != '') ? statements_do.split(' ').length + 1 : 1 ;
  doLength = countLength(statements_do);
  var code = '<%list> '+doLength+' '+statements_do+' <%eol> <forever> ';
  return code;
};

var countLength = function(code){
	var codeArr = code.split('(').join('').split(')').join('').clean().split(' ');
	var byteCount = 1;
	codeArr.each(function(item){
		if (item.charAt(0) == '#') {
			byteCount += 2;
		} else if (item.charAt(0) == '$') {
			;
		} else {
			byteCount++;
		}
	});
	return byteCount;
}


/****    INPUT    ****/

Blockly.ByteCode.input_switch = function() {
  var dropdown_switch = this.getFieldValue('switch');
  var code = '<switch'+dropdown_switch+'> ';
  return [code, Blockly.ByteCode.ORDER_NONE];
};

Blockly.ByteCode.input_sensor = function() {
  var dropdown_sensor = this.getFieldValue('sensor');
  // TODO: Assemble ByteCode into code variable.
  var code = '<sensor'+dropdown_sensor+'> ';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.ByteCode.ORDER_NONE];
};

Blockly.ByteCode.input__output__storage_setdp = function() {
  var value_dp = Blockly.ByteCode.valueToCode(this, 'DP', Blockly.ByteCode.ORDER_ATOMIC);
  var code = value_dp+' <setdp> ';
  return code;
};

Blockly.ByteCode.input__output__storage_record = function() {
  var value_value = Blockly.ByteCode.valueToCode(this, 'value', Blockly.ByteCode.ORDER_ATOMIC);
  var code = value_value +' <record> ';
  return code;
};

Blockly.ByteCode.input__output__storage_recall = function() {
  var code = '<recall> ';
  return [code, Blockly.ByteCode.ORDER_NONE];
};

Blockly.ByteCode.input__output__storage_send_serial = function() {
  var value_send = Blockly.ByteCode.valueToCode(this, 'send', Blockly.ByteCode.ORDER_ATOMIC);
  var code = '<send>';
  return code;
};

Blockly.ByteCode.input__output__storage_new_serial = function() {
  var code = '<newserial>';
  return [code, Blockly.ByteCode.ORDER_NONE];
};


Blockly.ByteCode.input__output__storage_get_serial = function() {
  var code = '<serial>';
  return [code, Blockly.ByteCode.ORDER_NONE];
};


Blockly.ByteCode.input__output__storage_new_ir = function() {
  var code = '<newir>';
  return [code, Blockly.ByteCode.ORDER_NONE];
};

Blockly.ByteCode.input__output__storage_get_ir = function() {
  var code = '<ir>';
  return [code, Blockly.ByteCode.ORDER_NONE];
};


/****    MATH    ****/

Blockly.ByteCode.math_number = function() {
  var num = this.getFieldValue('number');
  num = (isNaN(num) ? 0 : num - 0);
  //var code = '<%num'+((text_number > 255) ? '16' : '' )+'> ' + splitNumber(text_number) + ' ';
  var code = '<%num16> ' + Math.floor(num / 256)+' '+(num % 256) + ' ';
  return [code, Blockly.ByteCode.ORDER_NONE];
};


Blockly.ByteCode.math_random = function() {
  var code = '<random> ';
  return [code, Blockly.ByteCode.ORDER_NONE];
};

Blockly.ByteCode.math_equal = function() {
  var value_left = Blockly.ByteCode.valueToCode(this, 'left', Blockly.ByteCode.ORDER_ATOMIC).clean();
  var value_right = Blockly.ByteCode.valueToCode(this, 'right', Blockly.ByteCode.ORDER_ATOMIC).clean();
  var dropdown_cond = this.getFieldValue('cond');
  //var code = '( '+value_left.slice(1, value_left.length-1)+' '+dropdown_cond+' '+value_right.slice(1, value_right.length-1) +' )';
  var code = value_left+' '+value_right+' '+dropdown_cond+' ';
  return [code, Blockly.ByteCode.ORDER_NONE];
};

Blockly.ByteCode.logic_compare = function() {
  var value_left = Blockly.ByteCode.valueToCode(this, 'left', Blockly.ByteCode.ORDER_ATOMIC).clean();
  var value_right = Blockly.ByteCode.valueToCode(this, 'right', Blockly.ByteCode.ORDER_ATOMIC).clean();
  var dropdown_cond = this.getFieldValue('cond');
  //var code = '( '+value_left.slice(1, value_left.length-1)+' '+dropdown_cond+' '+value_right.slice(1, value_right.length-1) +' )';
  var code = value_left+' '+value_right+' '+dropdown_cond+' ';
  return [code, Blockly.ByteCode.ORDER_NONE];
};

Blockly.ByteCode.math_operator = function() {
  var value_1stnum = Blockly.ByteCode.valueToCode(this, '1stNum', Blockly.ByteCode.ORDER_ATOMIC).clean();
  var value_2ndnum = Blockly.ByteCode.valueToCode(this, '2ndNum', Blockly.ByteCode.ORDER_ATOMIC).clean();
  var dropdown_op = this.getFieldValue('op');
  //var code = '( '+value_1stnum.slice(1, value_1stnum.length-1)+' '+dropdown_op+' '+value_2ndnum.slice(1, value_2ndnum.length-1) +' )';
  var code = value_1stnum+' '+value_2ndnum+' '+dropdown_op+' ';
  return [code, Blockly.ByteCode.ORDER_NONE];
};

Blockly.ByteCode.math_andor = function() {
  var value_left = Blockly.ByteCode.valueToCode(this, 'left', Blockly.ByteCode.ORDER_ATOMIC).clean();
  var value_right = Blockly.ByteCode.valueToCode(this, 'right', Blockly.ByteCode.ORDER_ATOMIC).clean();
  var dropdown_andor = this.getFieldValue('andor').toUpperCase();
  //var code = value_left.slice(1, value_left.length-1)+' '+dropdown_andor+' '+value_right.slice(1, value_right.length-1) +' ';
  var code = value_left+' '+value_right+' '+dropdown_andor+' ';
  return [code, Blockly.ByteCode.ORDER_NONE];
};

Blockly.ByteCode.math_not = function() {
  var value_bool = Blockly.ByteCode.valueToCode(this, 'bool', Blockly.ByteCode.ORDER_ATOMIC);
  var code = value_bool+' NOT ';
  return [code, Blockly.ByteCode.ORDER_NONE];
};



/****    VARIABLE    ****/

Blockly.ByteCode.variables_get = function() {
  // Variable getter.
  var code = '[:]:'+Blockly.ByteCode.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE)+'[;]';
  var varName = Blockly.ByteCode.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var code = '<%num> [vo]'+varName+'[vc] <global> ';
  return [code, Blockly.ByteCode.ORDER_ATOMIC];
};

Blockly.ByteCode.variables_set = function() {
  var argument = Blockly.ByteCode.valueToCode(this, 'VALUE', Blockly.ByteCode.ORDER_ASSIGNMENT) || '<%num> 0 ';
  var varName = Blockly.ByteCode.variableDB_.getName(this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  argument = argument.slice(1, argument.length-1);
  var code = 'make "' + varName + ' ' + argument + '\n';
  var code = '<%num> [vo]'+varName+'[vc] '+argument+' <setglobal> ';
  return code;
};




/****    PROCEDURE    ****/

Blockly.ByteCode.procedure_procedure = function(){
	var statements_statement = Blockly.ByteCode.statementToCode(this, 'statement');
	var text_pname = this.getFieldValue('pname');
	// TODO: Assemble ByteCode into code variable.
	//var code = '[SS]to '+text_pname+'\n[SS]'+statements_statement+'end[SS]';
	var code = '[p]('+text_pname+' '+statements_statement+'end)[/p]';
	return code;
}

Blockly.ByteCode['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.ByteCode.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.ByteCode.valueToCode(block, 'ARG' + x,
        Blockly.ByteCode.ORDER_COMMA) || 'null';
  }
  //var code = funcName + '(' + args.join(', ') + ')';
  var code = args.join(' ') + ' '+parseInt('0xff')+' '+parseInt('0xff')+' ';
  var code = args.join(' ') + ' #'+funcName+' ';
  return [code, Blockly.ByteCode.ORDER_FUNCTION_CALL];
};

Blockly.ByteCode['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.ByteCode.variableDB_.getName(
      block.getFieldValue('NAME'), Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.ByteCode.statementToCode(block, 'STACK');
  if (Blockly.ByteCode.INFINITE_LOOP_TRAP) {
    branch = Blockly.ByteCode.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'' + block.id + '\'') + branch;
  }
  var returnValue = Blockly.ByteCode.valueToCode(block, 'RETURN',
      Blockly.ByteCode.ORDER_NONE) || '';
  
//  if (returnValue) {
//    returnValue = '  return ' + returnValue + ';\n';
//  }
  
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.ByteCode.variableDB_.getName(block.arguments_[x],
        Blockly.Variables.NAME_TYPE);
  }
  var code = '(main ' + funcName + '[' + args.join(', ') + '] {\n' +
      branch + returnValue + '} )';
  code = '[p]$' + funcName+' '+args.length+' '+branch + ' ' + returnValue + ' <output>[/p] ';
  
  args.each(function(item, index){
  	code = code.split('<%num> [vo]'+item+'[vc] <global>').join('<%input> '+(args.length - 1 - index));
  });
  
  code = Blockly.ByteCode.scrub_(block, code);
  Blockly.ByteCode.definitions_[funcName] = code;
  //alert(code);
  return null;
};

Blockly.ByteCode['procedures_defnoreturn'] = Blockly.ByteCode['procedures_defreturn'];

Blockly.ByteCode.procedures_callnoreturn=function(a){
	var b = Blockly.ByteCode.variableDB_.getName(a.getFieldValue("NAME"),Blockly.Procedures.NAME_TYPE);
	var c = [];
	for(var d = 0 ; d < a.arguments_.length ; d++) {
		c[d] = Blockly.ByteCode.valueToCode(a,"ARG"+d,Blockly.ByteCode.ORDER_COMMA) || "null" ;
	};
	var code = b+"("+c.join(", ")+");\n";
	return code;
};

/****

Paste your new language here

****/


var splitNumber = function(num){
	return (num > 255) ? (Math.floor(num / 256)+' '+(num % 256)) : num ;
}
