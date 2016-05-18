
try {
	//console.log($(document));
	
} catch (error) {
	var s1 = document.createElement('script');
	s1.setAttribute('src', 'http://localhost:8888/snap/mootools-core-1.3.2.js');
	document.body.appendChild(s1);
	
	var s2 = document.createElement('script');
	s2.setAttribute('src', 'http://localhost:8888/snap/mootools-more-1.3.2.1.js');
	document.body.appendChild(s2);
	
	var init;
	var kkStr = '';

	

}
var init;
window.sensor = [0, 0, 0, 0, 0, 0, 0, 0];
window.switchh = [false, false, false, false, false, false, false, false];
window.GB = {};

window.GB.talkToGogo = function(data){
	if(ws){
		kk('command::'+data.trim());
		ws.send('command::'+data.trim());
	}
}

var wsImpl = window.WebSocket || window.MozWebSocket;

init = function(){
	
	var key = 'keydown';
	
	var event; // The custom event that will be created
	if (document.createEvent) {
		event = document.createEvent("HTMLEvents");
		event.initEvent(key, true, true);
	} else {
		event = document.createEventObject();
		event.eventType = key;
	}
	event.eventName = key;
	event.keyCode = 801;
	var element = world.worldCanvas;
	if (document.createEvent) {
		element.dispatchEvent(event);
	} else {
		element.fireEvent("on" + event.eventType, event);
	}
	startWebSocket();
	kk(key);
}

var createAndFireEvent = function(key, keyCode){
	var event; 
	if (document.createEvent) {
		event = document.createEvent("HTMLEvents");
		event.initEvent(key, true, true);
	} else {
		event = document.createEventObject();
		event.eventType = key;
	}
	event.eventName = key;
	event.keyCode = keyCode;
	var element = world.worldCanvas;
	if (document.createEvent) {
		element.dispatchEvent(event);
	} else {
		element.fireEvent("on" + event.eventType, event);
	}
}


setTimeout(init, 100);

var normalWS = function(){
	try {
		var ws = new wsImpl('ws://localhost:8316/ws');
	} catch (error) {
		return;
	}
	
	ws.onmessage = function (evt) {
		
		var resp = evt.data.split('::');
		if(resp[0] == 'burst') {
				var rs = resp[1].split('-');
				for (var i = 0; i < 8; i++) {
							window.sensor[i] = rs[i].toInt();
							
							if (window.sensor[i] > 900 && !window.switchh[i]) {
									createAndFireEvent('keydown', 801 + i);
									window.switchh[i] = true;
							} else if (window.sensor[i] < 100 && window.switchh[i]) {
									createAndFireEvent('keyup', 801 + i);
									window.switchh[i] = false;
							}
				}
		} else if (resp[0] == 'status') {
			if (resp[1]=='success') {
			} else if (resp[1]=='disconnect') {
				ws.send(7);
			}
		} else if (resp[0] == 'nodata') {
			window.sensor = [0, 0, 0, 0, 0, 0, 0, 0];
			for (var i = 0; i < 8; i++) {
				createAndFireEvent('keyup', 801 + i);
			}
		}
	};
	
	// when the connection is established, this method is called
	ws.onopen = function () {
	
	};
	
	// when the connection is closed, this method is called
	ws.onclose = function (status) {
		new Element('div', {'id': 'warningMessage', 'class': 'anime12', 'text': 'Connection lost. Reconnecting..'}).inject(document.body);
		setTimeout(function(){
			$('warningMessage').destroy();
			startWebSocket();
		}, 1000);
	}
	
	ws.sendFn = ws.send;
	
	ws.send = function(value){
		if (ws.readyState == 1) {
			ws.sendFn(value);
		}
	}
	
	return ws;
}

var startWebSocket = function(){
	window.ws = normalWS();
}

var kk = function(str){
	if (str != kkStr) {
		console.log(str);
		kkStr = str;
	}
}
