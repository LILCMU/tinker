/**
 * Blockly Apps: Code
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
 * @fileoverview JavaScript for Blockly's Code application.
 * @author fraser@google.com (Neil Fraser)
 */

// Supported languages.
BlocklyApps.LANGUAGES =
    ['ace', 'ar', 'ca', 'cs', 'da', 'de', 'el', 'en', 'es', 'fa', 'fr', 'he',
     'hrx', 'hu', 'is', 'it', 'ko', 'mg', 'ms', 'nl', 'pl', 'pms', 'pt-br',
     'ro', 'ru', 'sco', 'sr', 'sv', 'th', 'tlh', 'tr', 'uk', 'vi', 'zh-hans',
     'zh-hant'];
BlocklyApps.LANG = BlocklyApps.getLang();
BlocklyApps.LANG = 'en';

document.write('<script type="text/javascript" src="generated/' +
               BlocklyApps.LANG + '.js"></script>\n');

/**
 * Create a namespace for the application.
 */
var Code = {};

/**
 * List of tab names.
 * @private
 */
Code.TABS_ = ['blocks', 'gogomon', 'gogocode'];

Code.selected = 'blocks';

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} clickedName Name of tab clicked.
 */
Code.tabClick = function(clickedName) {
  // If the XML tab was open, save and render the content.
  if (false && document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
          window.confirm(BlocklyApps.getMsg('Code_badXml').replace('%1', e));
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
    }
  }

  // Deselect all tabs and hide all panes.
  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.visibility = 'hidden';
  }

  // Select the active tab.
  Code.selected = clickedName;
  document.getElementById('tab_' + clickedName).className = 'tabon';
  // Show the selected pane.
  document.getElementById('content_' + clickedName).style.visibility =
      'visible';
  Code.renderContent();
  Blockly.fireUiEvent(window, 'resize');
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function() {
  var content = document.getElementById('content_' + Code.selected);
  // Initialize the pane.
  if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('content_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
  } else if (content.id == 'content_javascript') {
    var code = Blockly.JavaScript.workspaceToCode();
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'js');
      content.innerHTML = code;
    }
  } else if (content.id == 'content_python') {
    code = Blockly.Python.workspaceToCode();
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'py');
      content.innerHTML = code;
    }
  } else if (content.id == 'content_dart') {
    code = Blockly.Dart.workspaceToCode();
    content.textContent = code;
    if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'dart');
      content.innerHTML = code;
    }
  } else if (content.id == 'content_gogocode') {
  	Code.gogoCodePage();
  } else if (content.id == 'content_cvi') {
//  	var mainArea = $$('#mappingMainArea .wrapper')[0];
//  	mainArea.empty();
//  	var currentSpatial = new Converter();
//  	currentSpatial.inject(mainArea);
  } else if (content.id == 'content_cdi') {
//  	var mainArea = $$('#graphMainArea .wrapper')[0];
//  	mainArea.empty();
//  	var currentSpatial = new Graph();
//  	currentSpatial.inject(mainArea);
  }
};

/**
 * Initialize Blockly.  Called on page load.
 */
Code.init = function() {
  Blockly.pathToBlockly = window.location.pathname.split('index')[0];

	
  BlocklyApps.init();
//alert(Blockly.pathToBlockly);

  var rtl = BlocklyApps.isRtl();
  var container = document.getElementById('content_area');
  var onresize = function(e) {
    var bBox = BlocklyApps.getBBox_(container);
    for (var i = 0; i < Code.TABS_.length; i++) {
      var el = document.getElementById('content_' + Code.TABS_[i]);
      el.style.top = bBox.y + 'px';
      el.style.left = bBox.x + 'px';
      // Height and width need to be set, read back, then set again to
      // compensate for scrollbars.
      el.style.height = bBox.height + 'px';
      el.style.height = (2 * bBox.height - el.offsetHeight) + 'px';
      el.style.width = bBox.width + 'px';
      el.style.width = (2 * bBox.width - el.offsetWidth) + 'px';
    }
    // Make the 'Blocks' tab line up with the toolbox.
    if (Blockly.Toolbox.width) {
      document.getElementById('tab_blocks').style.minWidth =
          (Blockly.Toolbox.width - 38) + 'px';
          // Account for the 19 pixel margin and on each side.
    }
  };
  window.addEventListener('resize', onresize, false);
  var toolbox = document.getElementById('toolbox');
  Blockly.inject(document.getElementById('content_blocks'),
      {path: window.location.pathname.split('index')[0], //+
       rtl: rtl,
       toolbox: toolbox});

  // Add to reserved word list: Local variables in execution evironment (runJS)
  // and the infinite loop detection function.
  Blockly.JavaScript.addReservedWords('code,timeouts,checkTimeout');

  BlocklyApps.loadBlocks('');

  if ('BlocklyStorage' in window) {
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload();
  }

  Code.tabClick(Code.selected);
  Blockly.fireUiEvent(window, 'resize');

  BlocklyApps.bindClick('trashButton', Code.trashBlocks);
  BlocklyApps.bindClick('runButton', Code.runJS);
  BlocklyApps.bindClick('loadButton', Code.clickLoadXML);
  BlocklyApps.bindClick('saveButton', Code.saveXML);
  BlocklyApps.bindClick('runStopButton', Code.handleRunStopGoGoBoard);
  BlocklyApps.bindClick('writeButton', Code.writeToGogoBoard);

  $('loadXML').addEventListener('change', Code.loadXML, false);

  for (var i = 0; i < Code.TABS_.length; i++) {
    var name = Code.TABS_[i];
    BlocklyApps.bindClick('tab_' + name,
        function(name_) {return function() {Code.tabClick(name_);};}(name));
  }
  
  new Element('option', {'text': 'GoGo Board', 'value': 'gogoBoard', 'selected': true}).inject($('boardOptions'));
  new Element('option', {'text': 'Raspberry Pi', 'value': 'rPi'}).inject($('boardOptions'));
  $('boardOptions').addEvent('change', function(){
  	//alert(this.get('value'));
  	document.fireEvent('boardTypeIsChanged');
  	Blockly.Toolbox.tree_.children_[1].setExpanded(true);
  });

  // Lazy-load the syntax-highlighting.
  window.setTimeout(BlocklyApps.importPrettify, 1);
  setTimeout(function(){
	  window.fireEvent('BlocklyIsReady');
	  Blockly.Toolbox.tree_.children_[1].setExpanded(true);
  }, 500);
};

if (window.location.pathname.match(/readonly.html$/)) {
  window.addEventListener('load', BlocklyApps.initReadonly);
} else {
  window.addEventListener('load', Code.init);
}

Code.trashBlocks = function() {
	Code.discard(); 
	Code.renderContent();
	var xml = Blockly.Xml.textToDom('<xml><block type="procedure_procedure" x="250" y="50"><title name="pname">main</title></block></xml>');
	xml.editable = false;
	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
};

/**
 * Execute the user's code.
 * Just a quick and dirty eval.  Catch infinite loops.
 */
Code.runJS = function() {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
  var timeouts = 0;
  var checkTimeout = function() {
    if (timeouts++ > 1000000) {
      throw BlocklyApps.getMsg('Code_timeout');
    }
  };
  var code = Blockly.JavaScript.workspaceToCode();
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    eval(code);
  } catch (e) {
    alert(BlocklyApps.getMsg('Code_badCode').replace('%1', e));
  }
};

Code.loadProcedure = function() {
	var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	var allBlocks = $(xml).getElements('block');
	var tinkerBlocks = [];
	allBlocks.each(function(item){
		if (item.getAttribute('type') == 'procedures_callreturn') {
			//tinkerBlocks.push(item);
			tinkerBlocks.include(item.getElement('mutation').get('name'));
		}
	});
	
	// var mapping = $('mappingMainArea');
	// var blockArr = mapping.getElements('.mappingBlock');
	var xmlArr = [];
	// blockArr.each(function(item){
	// 	if (tinkerBlocks.indexOf(item.title) != -1) {
	// 		mapping.spatial.setPoints(item.points);
	// 		xmlArr.push(mapping.spatial.YtoXBlockly().split('[TITLE]').join(item.title).split('[VAR1]').join(item.var1));
	// 		//mapping.getXML(xmlArr[xmlArr.length - 1]);
	// 	}
	// });
	// mapping.spatial.setPoints(mapping.currentBlock.points);
	
	// var condition = $('conditionMainArea');
	// var blockArr = condition.getElements('.condBlock');
	//var xmlArr = [];
	// blockArr.each(function(item){
	// 	if (tinkerBlocks.indexOf(item.title) != -1) {
	// 		condition.spatial.setArea(item.area);
	// 		xmlArr.push(condition.spatial.convertToBlockly().split('[TITLE]').join(item.title).split('[VAR1]').join(item.var1).split('[VAR2]').join(item.var2));
	// 		//mapping.getXML(xmlArr[xmlArr.length - 1]);
	// 	}
	// });
	// condition.spatial.setArea(condition.currentBlock.area);
	
	//return 0;
	var xmlText = xmlArr.join(' ');
	
	
	var data = Blockly.Xml.domToText(xml).split('</xml>')[0];
	
	Blockly.mainWorkspace.clear();
	xml = Blockly.Xml.textToDom(data+xmlText+'</xml>');
	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
	return data;
}

Code.restoreProcedure = function(data){
	Blockly.mainWorkspace.clear();
	var xml = Blockly.Xml.textToDom(data+'</xml>');
	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
}

Code.gogoCodePage = function() {
	var code = Code.genGogoCode();
	$('content_gogocode').set('html', code);
}

Code.genGogoCode = function(){
	var sourceCode = Code.loadProcedure();
	
	var code = Blockly.GogoCode.workspaceToCode();
	code = filterCode(code);
	code = code.split(';').join('');
	
	Code.restoreProcedure(sourceCode);
	
	return code;
}

Code.writeToGogoBoard = function(){
	var code = Code.genGogoCode();
	if ($('tab_gogocode').hasClass('tabon')) {
		code = $('content_gogocode').get('html');
	}
	
	code = code.split(' < ').join('&lt;');
	code = code.split(' > ').join('&gt;');
	code = code.replace(/(<([^>]+)>)/ig,"").clean();
	code = code.split('&lt;').join(' < ');
	code = code.split('&gt;').join(' > ');
	
	code = code.split('newline').join('\n');
	
	code = code.split('and true').join('');
	
	ws.send('logo::'+code);
	kk('logo::'+code);
}

Code.handleRunStopGoGoBoard = function(){
  ws.send('command::runStop');
}


Code.writeToGogoBoard1 = function() {
	var sourceCode = Code.loadProcedure();
	var code = Blockly.ByteCode.workspaceToCode().clean();
	//alert(code);
	code = genGlobalVar(code);
	//alert(code);
	
	
	var byteCode = code.replaceObj(byteCodeObj).clean();
	
	var codeArr = byteCode.split(' ');
	
	var byteCount = 0;
	var varArr = [];
	var varObj = {};
	codeArr.each(function(item){
		if (item.charAt(0) == '#') {
			byteCount += 2;
		} else if (item.charAt(0) == '$') {
			var num = byteCount + 32768;
			var bytePos = (Math.floor(num / 256)+' '+(num % 256));
			varObj[item.split('$')[1]] = bytePos;
			varArr.push(item.split('$')[1]);
		} else {
			byteCount++;
		}
	});
	
	varArr.each(function(item){
		byteCode = byteCode.split('#'+item+' ').join(varObj[item]+' ');
		byteCode = byteCode.split('$'+item+' ').join(' ').clean();
	});
	
	var code = Blockly.GogoCode.workspaceToCode();
	code = filterCode(code);
	code = code.split(' < ').join('&lt;');
	code = code.split(' > ').join('&gt;');
	code = code.replace(/(<([^>]+)>)/ig,"").clean();
	
	code = code.split('&lt;').join(' < ');
	code = code.split('&gt;').join(' > ');
	
	code = code.split('newline').join('\n');
	
	//alert(String.fromCharCode.apply(String, byteCode.clean().split(' ')));
	if(true || confirm('Do you want to download these byte codes to Gogo Board?\n\n'+byteCode)){
		//ws.send("burn::");
		//ws.send("burn::"+String.fromCharCode.apply(String, byteCode.clean().split(' ')));
		ws.send('logo::'+code);
		kk('logo::'+code);
	}
	Code.restoreProcedure(sourceCode);
};

Code.clickLoadXML = function(){
	$('loadXML').click();
}

Code.loadXML = function(event) {
  var files = event.target.files;
  // Only allow uploading one file.
  if (files.length != 1) {
    return;
  }

  // FileReader
  var reader = new FileReader();
  reader.onloadend = function(event) {
    var target = event.target;
    // 2 == FileReader.DONE
    if (target.readyState == 2) {
      
      var mappingElem = "";
      var conditionElem = "";
      
      try {
        var newText = target.result;
        var mappingText = newText.split('<mapping>')[1];
        if (mappingText) {
        	mappingElem = mappingText.split("</mapping>")[0];
        	newText = newText.split('<mapping>')[0]+mappingText.split("</mapping>")[1];
        }
        
        var conditionText = newText.split('<condition>')[1];
        if (conditionText) {
        	conditionElem = conditionText.split("</condition>")[0];
        	newText = newText.split('<condition>')[0]+conditionText.split("</condition>")[1];
        }
        var xml = Blockly.Xml.textToDom(newText);
      } catch (e) {
      	alert('Error parsing XML:\n' + e);
        return;
      }
      
      // if (mappingElem) {
      //   console.log('========mapping===========');
	     //  window.localStorage.setItem('mappingBlock', mappingElem);
	     //  mapping.loadData();
      // }
      // if (conditionElem) {
      //   console.log('========condition===========');
	     //  window.localStorage.setItem('conditionBlock', conditionElem);
	     //  condition.loadData();
      // }
      
      if(xml.childElementCount == 0) return;
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
    }
    // Reset value of input after loading because Chrome will not fire
    // a 'change' event if the same file is loaded again.
    document.getElementById('loadXML').value = '';
  };
  reader.readAsText(files[0]);
}

Code.saveXML = function() {
  var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
  
  // var mappingData = window.localStorage.getItem('mappingBlock');
  // var conditionData = window.localStorage.getItem('conditionBlock');
  
  // var mappingElem = new Element('mapping', {'html': mappingData});
  // var conditionElem = new Element('condition', {'html': conditionData});
  
  // $(xml).grab(mappingElem);
  // $(xml).grab(conditionElem);
  
  var data = Blockly.Xml.domToText(xml);

  console.log(data);

	//return;

  // Store data in blob.
  //var builder = new BlobBuilder();
  //builder.append(data);
  //console.log(builder);
  //saveAs(builder.getBlob('text/plain;charset=utf-8'), 'block.xml');
  var name = prompt("Name of this file","blocks");
  if (name) {
	  var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
	  saveAs(blob, name+'.xml');
  }
}




/**
 * Discard all blocks from the workspace.
 */
Code.discard = function() {
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 ||
      window.confirm(BlocklyApps.getMsg('Code_discard').replace('%1', count))) {
    Blockly.mainWorkspace.clear();
    window.location.hash = '';
  }
};
