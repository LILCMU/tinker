
var byteCodeObj = {
	'(main': '', 
	'(': '',
	')': '', 
	'<%num>': 1,
	'<%num16>': 2,
	'<%list>': 3, 
	'<%eol>': 4,
	'<%eolr>': 5,
	'<%input>': 6,
	'<stop>': 7,
	'<output>': 8,
	'<repeat>': 9,
	'<if>': 10,
	'<ifelse>': 11,
	'<beep>': 12, 
	'<waituntil>': 14,
	'<forever>': 15,
	'<wait>': 16,
	'<timer>': 17,
	'<resett>': 18,
	'<send>': 19,
	'<ir>': 20,
	'<newir>': 21,
	'<random>': 22,
	'+': 23,
	'-': 24,
	'*': 25,
	'÷': 26,
	'%': 27,
	'=': 28,
	'<setglobal>': 35,
	'<global>': 36,
	'<record>': 39,
	'<recall>': 40,
	'<setdp>': 42,
	'a,': 46,
	'b,': 47,
	'ab,': 48,
	'<on>': 49,
	'<onfor>': 50,
	'<off>': 51,
	'<thisway>': 52,
	'<thatway>': 53,
	'<rd>': 54,
	'<sensor1>': 55,
	'<sensor2>': 56,
	'<switch1>': 57,
	'<switch2>': 58,
	'<setpower>': 59,
	'c,': 63,
	'd,': 64,
	'cd,': 65,
	'abcd,': 66,
	'<sensor3>': 73,
	'<sensor4>': 74,
	'<sensor5>': 75,
	'<sensor6>': 76,
	'<sensor7>': 77,
	'<sensor8>': 78,
	'<switch3>': 79,
	'<switch4>': 80,
	'<switch5>': 81,
	'<switch6>': 82,
	'<switch7>': 83,
	'<switch8>': 84,
	'<ledon>': 85,
	'<ledoff>': 86,
	'<talkto>': 90,
	'<serial>': 95,
	'<newserial>': 96,
	'>': 29,
	'<': 30,
	'AND': 31,
	'OR': 32,
	'NOT': 34
}

String.prototype.replaceObj = function(obj) {
  var replaceString = this;
  var regex; 
  for (n in obj) {
    replaceString = replaceString.split(n).join(obj[n]);
  }
  return replaceString;
};

var generatePseudoCode = function(text){
	var textArr = text.clean().split(' ');
	var word;
	var proc;
	var procName;
	var codeObj = {};
	while (textArr.length > 0) {
		word = textArr.shift();
		switch (word) {
			case 'to':
				proc = new Array();
				procName = textArr.shift();
				break;
			case 'end':
				codeObj[procName] = proc;
				break;
			default:
				proc.push('<'+word+'>');
				break;
		}
	}
	var code = [];
	for(var n in codeObj) {
		code.push('('+n+' '+codeObj[n].join(' ')+')');
	}
	return code.join('\n\n');
}

// update realtime code on text area
function onWorkspaceChange(){
	if (false && $('showCodeArea').hasClass('show')) {
		if($('showCodeArea').hasClass('xmlCode')) {
			var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
			var code = Blockly.Xml.domToPrettyText(xmlDom);
		} else {
    		var code = filterCode(Blockly.Generator.workspaceToCode('JavaScript'));
		}
		//$('codeTextArea').set('text', code).set('rows', code.split('\n').length+1);
		$('codeTextArea').set('html', '<pre>'+code+'</pre>');
	}
	autosaveBlock();
}

function alertCode(){
	var code = filterCode(Blockly.Generator.workspaceToCode('JavaScript'));
	
	alert(code);
}

function showXMLCode(){
	var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
	alert(xmlText);
}


function hideTextArea(){
	$('showCodeArea').removeClass('show').removeClass('fadeInDown').addClass('fadeOutUp');
	//$('alertCode').set('text', 'Show Gogo Code');
	$('xmlCode').set('text', 'Show XML Code');
	setTimeout(function(){$('showCodeArea').setStyle('display', 'none');}, 500);
}

function showTextArea(){
		$('showCodeArea').setStyle('display', 'block');
	$('showCodeArea').removeClass('fadeOutUp').addClass('fadeInDown');
	onWorkspaceChange();
}

function genGlobalVar0(code){
	var codeArr = code.split('(main');
	var variables = codeArr[0].split('[vo]');
	var varArr = [];
	variables.shift();
	variables.each(function(item2){
		varArr.include(item2.split('[vc]')[0]);
	});
	code = codeArr[1].split('end)')[0];//+' 0';
	
	varArr.each(function(item, index){
		code = code.split('[vo]'+item+'[vc]').join(index);
	});
	return code;
}

function genGlobalVar(code){
	var codeArr = code.split('[p]');
	var varArr = [];
	var vars = codeArr.shift();
	var variables = vars.split('[vo]');
	variables.shift();
	variables.each(function(item2){
		varArr.include(item2.split('[vc]')[0]);
	});
	
	varArr.each(function(item, index){
		code = code.split('[vo]'+item+'[vc]').join(index);
	});
	
	var proc = [];
	codeArr = code.split('[p]');
	codeArr.shift();
	codeArr.each(function(item){
		var str = item.split('[/p]')[0];
		proc.push(''+str+'');
	});
	
	code = proc.join(' ');
	
	codeArr = code.split('(main');
	var codeArr2 = codeArr[1].split('end)');
	
	code = codeArr2[0]+' 0 '+codeArr[0]+codeArr2[1];
	
	code = code.clean();
	
	codeArr = code.split(' ');
	
	/***
	var variables = codeArr[0].split('[vo]');
	var varArr = [];
	variables.shift();
	variables.each(function(item2){
		varArr.include(item2.split('[vc]')[0]);
	});
	code = codeArr[1].split('end)')[0]+' 0';
	
	varArr.each(function(item, index){
		code = code.split('[vo]'+item+'[vc]').join(index);
	});
	/***/
	
	return code;
}

function filterCode(code) {
	var codeArr;
	codeArr = code.split('[p]');
	codeArr.shift();
	
	var proc = [];
	
	codeArr.each(function(item){
		var str = item.split('[/p]')[0];
		
		var strTmp = str.split('@@');
		str = strTmp[0] + (strTmp[2] ? strTmp[2] : '');
		
		var varArr0 = strTmp[1] ? strTmp[1].split(',') : [] ;
		var varArr = [];
		var variables = str.split('[:]');
		variables.shift();
		variables.each(function(item2){
			varArr.include(item2.split('[;]')[0].split(':')[0]);
		});
		
		varArr0.each(function(item4){
			varArr.erase(item4);
		});
		
		var newVar = '';
		varArr.each(function(item3){
			newVar += '  <span class="c330">set '+item3+' 0</span>\n';
		});
		var str2 = str.replace('[SS]', newVar).replace(/\[:\]/g, '').replace(/\[;\]/g, '');
		proc.push(str2);
	});
	
	code = proc.pop()+'@@';
	code += proc.join('@@');
	
	codeArr = code.split('\n');
	codeArr.clean();
	codeArr = codeArr.filter(function(item, index){
		return (item.clean() != '');
	});
	return codeArr.join('\n').replace(/@@/g, '\n\n');
}

	


var initTinker = function() {

	
	Blockly.Tooltip.MARGINS = 20;
	Blockly.Tooltip.OFFSET_Y = -25;
	Blockly.Tooltip.OFFSET_X = 10;
	Blockly.Tooltip.HOVER_MS = 350;
	
	//Blockly.mainWorkspace.getCanvas().addEventListener('blocklyWorkspaceChange', onWorkspaceChange, false);
	
	$('gogoStatus').dispose().inject($('title'), 'after');
	$('gogoStatusArea').dispose();
	
	$$('#motorA, #motorB, #motorC, #motorD').addEvent('click', function(){
		this.toggleClass('selected');
		//var id = this.get('id');
		//console.log('id: '+id);
		var motor = ($('motorA').hasClass('selected') ? 1 : 0) +  ($('motorB').hasClass('selected') ? 2 : 0) +  ($('motorC').hasClass('selected') ? 4 : 0) +  ($('motorD').hasClass('selected') ? 8 : 0)
		//ws.send(3);
		//ws.send(String.fromCharCode(0x80, motor, 0));
		ws.send('command::talkToMotor::'+motor);
		
		switch(this.get('id')) {
			case 'motorA':
				break;
		}
		//ws.send(String.fromCharCode(0x80, 0x04, 0));
		//console.log('String: ['+String.fromCharCode(0x80, 0x04, 0)+']');
	});
	
	$('sensorOptionBTN').addClass('selected displayNone');
	$('sensorOptionBTN').addEvent('click', function(){
		this.toggleClass('selected');
		this.set('text', ((this.hasClass('selected')) ? 'ON' : 'OFF' ));
		if(!this.hasClass('selected')){
			//ws.send(7);
			for (var i = 0; i < 8; i++) {
				$('sensor'+(i+1)).getFirst('.gate').setStyle('height', '100%');
				$('sensor'+(i+1)).getElements('.sensorValue').set('text', '0');
			}
		} else {
			//ws.send(6);
		}
	});
	
	$$('#setMotorPower select')[0].addEvent('change', function(){
		var power = this.get('value');
		ws.send('command::setPower::'+power);
//		ws.send(3);
//		ws.send(String.fromCharCode((power*4+64+32),0));
	});
	$$('#motorOn, #motorOff, #motorBreak, #motorCoast, #motorThisway, #motorRD, #motorThatway, #beep, #ledOn, #ledOff').addEvent('click', function(){
		switch (this.get('id')) {
			case 'motorOn':
				ws.send('command::motorOn');
				break;
			case 'motorOff':
				ws.send('command::motorOff');
				break;
			case 'motorBreak':
				break;
			case 'motorCoast':
				break;
			case 'motorThisway':
				ws.send('command::motorCW');
				break;
			case 'motorRD':
				ws.send('command::motorRD');
				break;
			case 'motorThatway':
				ws.send('command::motorCCW');
				break;
			case 'beep':
				ws.send('command::beep');
				break;
			case 'ledOn':
				ws.send('command::ledOn');
				break;
			case 'ledOff':
				ws.send('command::ledOff');
				break;
		}
	});
	
	
	setTimeout(function(){
		document.fireEvent('initReady');
		Blockly.bindEvent_(Blockly.mainWorkspace.getCanvas(), 'blocklyWorkspaceChange', null, onWorkspaceChange);
	}, 100);
	autoloadBlock();

	
	return 0;
	//startWebSocket();
	
	
	$('gogoBTN').addEvent('click', function(){
		gogoMonitor.removeClass('displayNone');
	});
	
	
	$('byteBTN').addEvent('click', function(){
		var code = Blockly.Generator.workspaceToCode('PseudoCode').clean();
		//alert(code);
		var byteCode = code.replaceObj(byteCodeObj);
		//alert(byteCode);
		
		
		
		return;
		//alert(String.fromCharCode.apply(String, byteCode.clean().split(' ')));
		if(true || confirm('Do you want to download these byte codes to Gogo Board?\n\n'+byteCode)){
			//ws.send("burn::");
			ws.send("burn::"+String.fromCharCode.apply(String, byteCode.clean().split(' ')));
		}
	});
	
	$('pseudoBTN').addEvent('click', function(){
		//var code = filterCode(Blockly.Generator.workspaceToCode('PseudoCode'));
		var code = Blockly.Generator.workspaceToCode('PseudoCode').clean();
		//var pseudoCode = generatePseudoCode(code);
		//alert('hello');
		alert(code);
	});
	
	Blockly.inject(document.body, {path: './', toolbox: document.getElementById('toolbox')});
	
//	var rootBlock = new Blockly.Block(Blockly.mainWorkspace,'procedure_procedure');
//	rootBlock.initSvg();
//	rootBlock.render();
//	rootBlock.editable = false;
	
	
	
	
	
	$('showCodeArea').setStyle('max-height',($(document.body).getSize().y - 180)+'px');
	
	$('menuBTN').addEvent('click', function(event){
		if(!$('menuContainer').hasClass('hide')) hideTextArea();
		$('menuContainer').toggleClass('hide');
	});
	
	$('xmlCode').addEvent('click', function(){
		if ($('showCodeArea').hasClass('show') && $('showCodeArea').hasClass('xmlCode') ) {
			hideTextArea();
		} else if ($('showCodeArea').hasClass('show') && !$('showCodeArea').hasClass('xmlCode') ){
			$('showCodeArea').addClass('xmlCode');
			$('xmlCode').set('text', 'Hide XML Code');
			$('alertCode').set('text', 'Show Gogo Code');
			onWorkspaceChange();
		} else {
			$('showCodeArea').addClass('xmlCode').addClass('show');
			$('xmlCode').set('text', 'Hide XML Code');
			showTextArea();
		}
	});
	
	/***
	$('alertCode').addEvent('click', function(){
		if ($('showCodeArea').hasClass('show') && !$('showCodeArea').hasClass('xmlCode') ) {
			hideTextArea();
		} else if ($('showCodeArea').hasClass('show') && $('showCodeArea').hasClass('xmlCode') ){
			$('showCodeArea').removeClass('xmlCode');
			$('xmlCode').set('text', 'Show XML Code');
			$('alertCode').set('text', 'Hide Gogo Code');
			onWorkspaceChange();
		} else {
			$('showCodeArea').removeClass('xmlCode').addClass('show');
	  	$('alertCode').set('text', 'Hide Gogo Code');
	  	showTextArea();
		}
	});
	/***/
	$('alertCode').addEvent('click', function(){
		$('showCodeArea').addClass('show');
		onWorkspaceChange();
		showTextArea();
	});
	
	$('gogoCodeHeader').addEvent('mousedown', function(event){
		$('showCodeArea').mouseXStart = event.page.x;
		$('showCodeArea').mouseYStart = event.page.y;
		$('showCodeArea').pos = $('showCodeArea').getPosition();
		$('showCodeArea').mouseIsDown = true;
	});
	
	$('gogoCodeCloseBTN').addEvent('click', function(){
		hideTextArea();
	});
	
	$('saveCode').addEvent('click', function(){
		//save();
		autosaveBlock();
	});
	
	$('loadCode').addEvent('click', function(){
		$('load').click();
	});
	
	$('newCode').addEvent('click', function(){
		//$('load').click();
		Blockly.mainWorkspace.clear();
		var xml = Blockly.Xml.textToDom('<xml><block type="procedure_procedure" x="250" y="50"><title name="pname">main</title></block></xml>');
		xml.editable = false;
		Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
	});
	
	$('load').addEventListener('change', load, false);
	
	var tooltipText = $$('.blocklyTooltipText')[0];
	
	
	//new Element( 'div', {'id': 'gogoMonitorHeader'}).inject($('gogoMonitor'), 'top');
	$('gogoMonitorHeader').addEvent('mousedown', function(event){
		$('gogoMonitor').mouseXStart = event.page.x;
		$('gogoMonitor').mouseYStart = event.page.y;
		$('gogoMonitor').pos = $('gogoMonitor').getPosition();
		$('gogoMonitor').mouseIsDown = true;
	});
	
	
	/***
	$('beep').addEvent('click', function(){
		ws.send(3);
		ws.send(String.fromCharCode(0xc4,0));
	});
	$('ledOn').addEvent('click', function(){
		ws.send(3);
		ws.send(String.fromCharCode(0xc0,0));
	});
	$('ledOff').addEvent('click', function(){
		ws.send(3);
		ws.send(String.fromCharCode(0xc1,0));
	});
	/***/
	
	
	
	
	
	document.body.addEvent('mousemove', function(event){
		if ($('gogoMonitor').mouseIsDown) {
			document.body.addClass('selectNone');
			$('gogoMonitor').setStyles({
				'left': ($('gogoMonitor').pos.x - ($('gogoMonitor').mouseXStart - event.page.x))+'px',
				'top': ($('gogoMonitor').pos.y - ($('gogoMonitor').mouseYStart - event.page.y))+'px',
				'bottom': 'auto'
			});
		} else if ($('showCodeArea').mouseIsDown) {
			document.body.addClass('selectNone');
			$('showCodeArea').setStyles({
				'left': ($('showCodeArea').pos.x - ($('showCodeArea').mouseXStart - event.page.x))+'px',
				'top': ($('showCodeArea').pos.y - ($('showCodeArea').mouseYStart - event.page.y))+'px',
				'bottom': 'auto'
			});
		}
	}).addEvent('mouseup', function(){
		$('gogoMonitor').mouseIsDown = false;
		$('showCodeArea').mouseIsDown = false;
		document.body.removeClass('selectNone');
	}).addEvent('keydown', function(event){
		console.log('key: '+event.key);
	});
	
	$('gogoMonitorCloseBTN').addEvent('click', function(){
		$('gogoMonitor').addClass('displayNone');
	})
	
}
//document.fireEvent('');

document.addEvent('spatialIsReady', initTinker);

function autosaveBlock(){
	var xml = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
	var data = Blockly.Xml.domToText(xml);
	
	// Store data in blob.
	window.localStorage.setItem('autoSaveBlock', data);
}

function autoloadBlock(){
	//return;
	var xml = Blockly.Xml.textToDom('<xml><block type="procedure_procedure" x="250" y="50"><title name="pname">main</title></block></xml>');
	xml.editable = false;
	xml.deletable = false;
	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
	
	//return;
	
	var loadedBlock = window.localStorage.getItem('autoSaveBlock');
	//alert(loadedBlock.split('procedure_procedure')[1]);
	if (!loadedBlock) return;
	if (!(loadedBlock.split('procedure_procedure')[1])) {
		loadedBlock = loadedBlock.split('</xml>')[0]+'<block type="procedure_procedure" x="100" y="50"><title name="pname">main</title></block></xml>';
	}
	try {
	  var xml = Blockly.Xml.textToDom(loadedBlock);
	} catch (e) {
		
	  return;
	}
	if(xml.childElementCount == 0) return;
	Blockly.mainWorkspace.clear();
	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
}


function bin2hex (s) {
  var i, l, o = "", n;

  s += "";

  for (i = 0, l = s.length; i < l; i++) {
    n = s.charCodeAt(i).toString(16)
    o += n.length < 2 ? "0" + n : n;
  }

  return o;
}
