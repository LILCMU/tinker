var wsImpl = window.WebSocket || window.MozWebSocket;
var mainToolbox;

document.addEvent('domready', function(){
	//initPi();
	
	$('gogoMonitor').dispose().inject('content_gogomon');
	initSpatial();
	startWebSocket();
});


function initMappingPreview(updateFunc) {
  updateMappingPreview.updateFunc = updateFunc;
  //updateMappingPreview();
  updateMappingPreview.updateFunc('<xml></xml>');
}

function updateMappingPreview() {
  if (updateMappingPreview.updateFunc) {
    var code = document.getElementById('languagePre').textContent;
    updateMappingPreview.updateFunc(xmlText);
  }
}

function initGraphPreview(updateFunc) {
  updateGraphPreview.updateFunc = updateFunc;
  //updateGraphPreview();
  updateGraphPreview.updateFunc('<xml></xml>');
}

function updateGraphPreview() {
  if (updateGraphPreview.updateFunc) {
    var code = document.getElementById('languagePre').textContent;
    updateGraphPreview.updateFunc(xmlText);
  }
}

var initSpatial = function(){

	/***
	var mainArea = new Element('div', {'id': 'mappingMainArea'}).inject($('content_mapping'));
	
	new Element('p', {'text': 'Convert1'}).inject(mainArea);
	new Element('div', {'id': 'mappingWrapper'}).inject(mainArea);
	new Element('div', {'id': 'mappingControl'}).inject(mainArea);
	
	new Element('div', {'id': 'mappingProcedure'}).inject($('content_mapping'));
	new Element('div', {'id': 'mappingExBlock'}).inject($('content_mapping'));
	/***/
	
	mainToolbox = $('toolbox');
	
	var mapping = $('spatialContentTemplate').clone();
	mapping.set('id', 'mappingMainArea').inject($('content_cvi'));
	mapping.getElement('.iframe').set('src', 'mappingPreview.html?ltr');
	mapping.getElement('.submit').addEvent('click', function(){
		var converter = mapping.getElement('.spatial.converter');
		
		var newBlock = converter.YtoXBlockly();
		
		var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		var xmlText = Blockly.Xml.domToPrettyText(xmlDom).replace('</xml>', '');
		
		//xmlText += newBlock+'</xml>';
		xmlText += '</xml>';
		updateMappingPreview.updateFunc('<xml>'+newBlock+'</xml>');
		
		xmlDom = Blockly.Xml.textToDom(xmlText);
		
		if (xmlDom) {
		  Blockly.mainWorkspace.clear();
		  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
		}
		
		var mappingToolbox = mainToolbox.getElement('.toolMappingBlock');
		var newBlock = new Element('block', {'html': '<mutation name="convertYtoX"><arg name="y"></arg></mutation>'});
		newBlock.setAttribute('type', 'procedures_callreturn');
		newBlock.inject(mappingToolbox);
		
		Blockly.updateToolbox(mainToolbox);
		
		var newBlockBTN = new Element('a', {'class': 'mappingBlock', 'text': 'convertYtoX'});
		newBlockBTN.inject(mapping.getElement('.procedure'));
		
		//Code.tabClick('blocks');
	});
	
	var graph = $('spatialContentTemplate').clone();
	graph.set('id', 'graphMainArea').inject($('content_cdi'));
	graph.getElement('.iframe').set('src', 'graphPreview.html?ltr');
	
	graph.getElement('.mainArea p').set('text', 'Graph: ConvertGraph');
	graph.getElement('.procedure p').set('text', 'Graph Blocks');
	
	graph.getElement('.submit').addEvent('click', function(){
		
		//***
		//alert('hi');
		var currentGraph = graph.getElement('.spatial.graph');
		
		var newBlock = currentGraph.convertToBlockly();
		
		var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
		var xmlText = Blockly.Xml.domToPrettyText(xmlDom).replace('</xml>', '');
		
		//xmlText += newBlock+'</xml>';
		xmlText += '</xml>';
		updateGraphPreview.updateFunc('<xml>'+newBlock+'</xml>');
		
		xmlDom = Blockly.Xml.textToDom(xmlText);
		
		if (xmlDom) {
		  Blockly.mainWorkspace.clear();
		  Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
		}
		
		var mappingToolbox = mainToolbox.getElement('.toolGraphBlock');
		var newBlock = new Element('block', {'html': '<mutation name="convertGraph"><arg name="sensor1"></arg><arg name="sensor2"></arg></mutation>'});
		newBlock.setAttribute('type', 'procedures_callreturn');
		//k(newBlock);
		//k(mappingToolbox);
		newBlock.inject(mappingToolbox);
		
		Blockly.updateToolbox(mainToolbox);
		
		var newBlockBTN = new Element('a', {'class': 'graphBlock', 'text': ''});
		newBlockBTN.inject(graph.getElement('.procedure'));
		
		//Code.tabClick('blocks');
		/***/
		
	});
	
	//Code.tabClick('graph'); 
}

var normalWS = function(){
	var ws = new wsImpl('ws://localhost:8316/ws');
	
	ws.onmessage = function (evt) {
		console.log(evt.data);
		var resp = evt.data.split('::');
		if(resp[0] == 'burst') {
			$('gogoStatus').addClass('on');
			if($('sensorOptionBTN').hasClass('selected')) {
				var rs = resp[1].split('-');
				for (var i = 0; i < 8; i++) {
					//if(!(Math.abs(rs[i] - rs1[i]) > 950 && Math.abs(rs[i] - rs2[i]) > 950)) {
						$('sensor'+(i+1)).getFirst('.gate').setStyle('height', (100 - (rs[i] / 10.24))+'%');
						$('sensor'+(i+1)).getElements('.sensorValue').set('text', rs[i]);
					//}
				}
				rs2 = rs1;
				rs1 = rs;
			}
		} else if (resp[0] == 'status') {
			if (resp[1]=='success') {
				$('gogoStatus').addClass('on');
			} else if (resp[1]=='disconnect') {
				if ($('sensorOptionBTN').hasClass('selected')) {
					$('sensorOptionBTN').fireEvent('click');
				}
				$('gogoStatus').removeClass('on');
				ws.send(7);
			}
		} else if (resp[0] == 'nodata') {
			$('gogoStatus').removeClass('on');
			for (var i = 0; i < 8; i++) {
				//if(!(Math.abs(rs[i] - rs1[i]) > 950 && Math.abs(rs[i] - rs2[i]) > 950)) {
					$('sensor'+(i+1)).getFirst('.gate').setStyle('height', (100)+'%');
					$('sensor'+(i+1)).getElements('.sensorValue').set('text', '0');
				//}
			}
		}
	};
	
	// when the connection is established, this method is called
	ws.onopen = function () {
		//this.send(6)
		//inc.innerHTML += '.. connection open<br/>';
	};
	
	// when the connection is closed, this method is called
	ws.onclose = function (status) {
		new Element('div', {'id': 'warningMessage', 'class': 'anime12', 'text': 'Connection lost. Reconnecting..'}).inject(document.body);
		setTimeout(function(){
			$('warningMessage').destroy();
			startWebSocket();
		}, 1000);
	}
	return ws;
}

var startWebSocket = function(){
	window.ws = normalWS();
}