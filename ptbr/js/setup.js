var px = 'px';
var currentPlatform = 'iPad';
var mouseEvent = 'mouseEvent';
var mouseDown = 'mousedown';
var mouseMove = 'mousemove';
var mouseUp = 'mouseup';
var mouseClick = 'click';
var keyUpEvent = 'keyUpEvent';
var click = 'mouseClick';
var mobileDevice = false;
var elemPrototype;
var screenWidth, screenHeight;
var currentFile = {};
var tempK = "";

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

if(Browser.Platform.name == 'ios') {
	mobileDevice = true;
	mouseDown = 'touchstart';
	mouseMove = 'touchmove';
	mouseUp = 'touchend';
	mouseClick = 'touchend';
	document.fireEvent('init');
	document.addEventListener("deviceready", onDeviceReady, false);
}

window.addEvent('domready', function(){
	document.fireEvent('init');

});

function onDeviceReady(){
	//

}

window.onresize = function(event) {
	screenWidth = $(document.body).getCoordinates().width.toInt();
	screenHeight = $(document.body).getCoordinates().height.toInt();
	document.fireEvent('windowResize');
}

var gesture = {'zoom': 'gestureZoom', 'rotate': 'gestureRotate', 'twoMoveY': 'twoFingerMoveY', 'twoMoveX': 'twoFingerMoveX', 'swipeX': 'gestureSwipeX', 'swipeY': 'gestureSwipeY'};
var gestureEvent = 'gestureEvent';
var mouseEventMove = 'mouseEventMove';
var mouse = {'click': 'mouseClick', 'move': 'mouseMoveEvent', 'up': 'mouseUpEvent'};
var mouseEventTick = 'mouseEventTick';

document.addEvent('init', function(){

	$(document.body).addEvent(mouseDown, function(event){
		$(document.body).addClass('mouseIsDown').addClass('mouseIsNotMove').removeClass('mouseIsMove');
		$(document.body).startPoint = event.client;
		$(document.body).distance = {'x': 0, 'y': 0};

		if(false && event.target.hasClass(mouseEvent)) {
			event.target.addClass(mouseEventTick);
		}

		$(document.body).startTime = now();
		$(document.body).touches = event.touches;

		if(false && event.target.hasClass(gestureEvent)) {
			event.target.addClass(mouseEventMove);
		}
	});
	$(document.body).addEvent(mouseMove, function(event){
		$(document.body).addClass('mouseIsMove').removeClass('mouseIsNotMove');
		$(document.body).currentPoint = event.client;
		$(document.body).distance = {
			'x': ($(document.body).currentPoint.x - $(document.body).startPoint.x),
			'y': ($(document.body).currentPoint.y - $(document.body).startPoint.y)
		};

		event.distance = $(document.body).distance;
		$$('.'+mouseEvent+'.'+mouseEventTick).fireEvent(mouse.move, event);

		if (event.touches && event.touches.length == 2) {
			var scale = Math.abs(1-event.scale);
			var rotation = Math.abs(event.rotation);
			$$('.'+gestureEvent+'.'+mouseEventMove).fireEvent(gesture.zoom, event);
			$$('.'+gestureEvent+'.'+mouseEventMove).fireEvent(gesture.rotate, event);

			if (scale < 0.15 && rotation < 20) {
				if (Math.abs(event.client.x - $(document.body).startPoint.x) > 10) {
					event.distance = event.client.x - $(document.body).startPoint.x;
					$$('.'+gestureEvent+'.'+mouseEventMove).fireEvent(gesture.twoMoveX, event);
				}
				if (Math.abs(event.client.y - $(document.body).startPoint.y) > 10) {
					event.distance = event.client.y - $(document.body).startPoint.y;
					$$('.'+gestureEvent+'.'+mouseEventMove).fireEvent(gesture.twoMoveY, event);
				}
			}
		}
	});
	$(document.body).addEvent(mouseUp, function(event){

		var delX = event.client.x - $(document.body).startPoint.x;
		var delY = event.client.y - $(document.body).startPoint.y;
		event.distance = {'x': delX, 'y': delY};
		$$('.'+mouseEvent+'.'+mouseEventTick).fireEvent(mouse.up, event);

		if($(document.body).hasClass('mouseIsDown') && $(document.body).hasClass('mouseIsNotMove')) {
			$$('.'+mouseEvent+'.'+mouseEventTick).fireEvent(mouse.click, event);
		}
		$(document.body).removeClass('mouseIsDown');
		$$('.'+mouseEvent+'.'+mouseEventTick).removeClass(mouseEventTick);

		if((now() - $(document.body).startTime) < 250) {
			if (Math.abs(delX) > Math.abs(delY)){
				if (Math.abs(delX) > 100) {
					event.distance = delX;
					$$('.'+gestureEvent+'.'+mouseEventMove).fireEvent(gesture.swipeX, event);
				}
			} else {
				if (Math.abs(delY) > 100) {
					event.distance = delY;
					$$('.'+gestureEvent+'.'+mouseEventMove).fireEvent(gesture.swipeY, event);
				}
			}
		}
		$$('.'+gestureEvent+'.'+mouseEventMove).removeClass(mouseEventMove);
	});
	$(document.body).addEvent('keyup', function(event){
		$$('.'+keyUpEvent).fireEvent(keyUpEvent, event);
	});

	screenWidth = $(document.body).getStyle('width').toInt();
	screenHeight = $(document.body).getStyle('height').toInt();

	if(Browser.Platform.name == 'ios') {
		//currentPlatform = device.platform;
	}

	$(document.body).startPoint = {'x': 0, 'y': 0};
	$(document.body).addClass(currentPlatform);

	elemPrototype = new Element('div', {'class': 'elemPrototype','styles': {
		'width': screenWidth+px,
		'height': screenHeight+px
	}});

	$('inputReadText') && $('inputReadText').addEventListener('change', loadTextFile, false);
});

var c = function(str){
	if (!($('console-document'))) {
		new Element('div', {'id': 'console-document'}).inject($(document.body), 'top');
	}
	$('console-document').set('html', str);
}

var k = function(str){
	console.log(str);
}

var kk = function(str){
	if (tempK != str) {
		tempK = str;
		console.log(str);
	}
}

var rewriteURL = function(text, replaceText){
	text = text.split('"./').join('"data/'+replaceText+'/');
	text = text.split("'./").join("'data/"+replaceText+"/");
	text = text.split("url(./").join("url(data/"+replaceText+"/");
	text = text.split('[PLF]').join(currentPlatform);
    return text;
}

var checkConnection = function(){
	if (mobileDevice) {
		var networkState = navigator.network.connection.type;

		var states = {};
		states[Connection.UNKNOWN]  = false;
		states[Connection.ETHERNET] = true;
		states[Connection.WIFI]     = true;
		states[Connection.CELL_2G]  = true;
		states[Connection.CELL_3G]  = true;
		states[Connection.CELL_4G]  = true;
		states[Connection.NONE]     = false;

		return states[networkState];
	} else {
		return true;
	}
}

function now(){
	return new Date().getTime();
}

function loadTextFile() {
	var files = event.target.files;
	// Only allow uploading one file.
	if (files.length != 1) {
		return;
	}

	// FileReader
	var reader = new FileReader();
	reader.onloadend = function(event) {
		currentFile = {
			'type': files[0].type.split('/')[1],
			'name': files[0].name,
			'size': files[0].size
		};
		var target = event.target;
		// 2 == FileReader.DONE
		if (target.readyState == 2) {
			currentFile.text = target.result;
			$(document.body).fireEvent('fileLoaded');
		}
		// Reset value of input after loading because Chrome will not fire
		// a 'change' event if the same file is loaded again.
		document.getElementById('inputReadText').value = '';
	};
	reader.readAsText(files[0]);
}


/***
 *
 *
 * $('test1').addEvent(gesture.swipeX, function(event){c(event.distance)});
 * $('test2').addEvent(click, function(event){k('click')});
 *
 *
 ***/
