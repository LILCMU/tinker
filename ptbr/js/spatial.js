//zIndex = 1;
//var grid = false;
//var gridScaleX = 10;
//var gridScaleY = 10;
//var gridAmountX = 20;
//var gridAmountY = 30;
//var drawArea = {};
//var SS = {'h': true, 'v': true};

//var sensorScale;
//var converter;
//var graph;
var currentSpatial;
//alert(currentSpatial);


document.addEvent('init1ww', function(){

	var thisLocation = location.href.split('#')[1];
	if (thisLocation == 'spatial') {
		createSpatial();
	} else {
		createConverter();
	}
	$$('#mainMenu a').addEvent(mouseClick, function(event){
		//alert(location);
		setTimeout(function(){location.reload(true)}, 10);
		//event.stop();
	});

	$(document.body).addEvent('keydown', function(event){
		switch (event.key) {
			case 'backspace': {
				//event.stop();
				break;
			}
		}
	});

	$(document.body).addEvent('keyup', function(event){
		switch (event.key) {
			case 'backspace':
			case 'd': {
				$$('.currentArea').destroy();
				//event.stop();
				break;
			}
			case 'g': {
				if (currentSpatial)
					currentSpatial.snapToGrid = !currentSpatial.snapToGrid;
				break;
			}
		}
	});
});

var createConverter = function(){
	currentSpatial = new Converter();
	currentSpatial.inject($('wrapper'));
}

var createSpatial = function(){
	currentSpatial = new Graph();
	currentSpatial.inject($('wrapper'));
}


var SensorScale = new Class({
	initialize: function(obj){
		var that = this;

		that = new Element('div', {
			'id': 'ssScale',
			'class': 'eventNone selectNone'
		});

		that.h = new Element('div', {
			'id': 'ssScale-h',
			'class': 'ssScale'
		}).inject(that);

		that.v = new Element('div', {
			'id': 'ssScale-v',
			'class': 'ssScale'
		}).inject(that);

		that.dot = new Element('div', {
			'id': 'ssScale-dot',
			'class': 'ssScale',
			'styles': {
				'width': 11+px,
				'height': 11+px,
				'border-radius': 5+px
			}
		}).inject(that);

		that.setScale = function(x, y){
			if (x < 0) {
				that.v.addClass('disabled');
			} else /*if (x != 0)*/ {
				that.v.removeClass('disabled');
				that.v.setStyle('left', obj.GP.width * x);
			}
			if (y < 0) {
				that.h.addClass('disabled');
			} else /*if (y != 1)*/ {
				that.h.removeClass('disabled');
				that.h.setStyle('top', obj.GP.height * (1 - y));
			}
			if (x >= 0 && y >= 0) {
				that.dot.setStyles({
					'left': (obj.GP.width * x - 5)+px,
					'top': (obj.GP.height * (1 - y) - 5)+px,
					'display': 'block'
				});
			} else {
				that.dot.setStyles({
					'display': 'none'
				});
			}
			//kk(x+', '+ y);
		};

		that.setThickness = function(v1, v2){
			that.v.setStyle('width', v1+px);
			that.h.setStyle('height', v2+px);
		}

		return that;
	}
});


var Spatial = new Class({
	initialize: function(){
		var that = this;

		that = new Element('div', {'class': 'spatial'});

		that.snapToGrid = false;
		that.zIndex = 1;
		that.yAxis = true;
        that.expand = false;

        that.input = {'X':{'min': 0, 'max': 1000}, 'Y':{'min': 0, 'max': 1000}};

		that.GP = { // graphic position
			'top': 20,
			'left': 60,
			'width': 400,
			'height': 400
		};

		that.gridAmount = {
			'x': 20,
			'y': 20
		};

		that.gridScale = {
			'x': that.GP.width / that.gridAmount.x,
			'y': that.GP.height / that.gridAmount.y
		};

		that.step = {
			'x': 20,
			'y': 20
		};

		that.stepArr = {
			'x': [],
			'y': []
		};

		that.lineNumArr = {
			'x': [],
			'y': []
		};

		that.init = {
			'x': 0,
			'y': 0
		};

		that.setGridAmount = function(x, y){
			that.gridAmount.x = x;
			that.gridAmount.y = (that.yAxis) ? y : 1 ;
			that.setGridScale();
			document.fireEvent('gridAmountChange');
		};

		that.setGridScale = function(){
			that.gridScale.x = that.GP.width / that.gridAmount.x;
			that.gridScale.y = that.GP.height / that.gridAmount.y;
			that.drawCanvas();
		};

		that.setGP = function(){
			that.canvas.setStyles({
				'top': that.GP.top + px,
				'left': that.GP.left + px,
				'width': that.GP.width + px,
				'height': that.GP.height + px
			});

			that.graphArea.setStyles({
				'top': that.GP.top + px,
				'left': that.GP.left + px,
				'width': that.GP.width + px,
				'height': that.GP.height + px
			});

			that.setGridScale();
		};

		that.setWidth = function(width){
			that.GP.width = width;
			that.setGP();
		};

		that.setHeight = function(height){
			that.GP.height = height;
			that.setGP();
		};

		that.drawCanvas = function(){
			that.canvas.setStyle('width', (that.GP.width+10) + px).setStyle('height', (that.GP.height+10) + px);
			that.canvas.set('width', that.GP.width+10).set('height', that.GP.height+10);
			var ctx = that.canvas.getContext("2d");
			ctx.lineWidth = 1;
			ctx.save();
			ctx.restore();
            ctx.font = "10px Arial";
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)' ;


			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(0, that.gridScale.y * that.gridAmount.y);
			ctx.stroke();


//var i = (step * 0.5) * that.gridScale.x;
//if (i > 10) {
//	i = Math.ceil((i * 2) * 0.1) * 5;
//	//i = (i - that.input.X.min + (step * 0.5)) * that.gridScale.x;
//}
//alert(i);
//var i = 1;
			//alert(step);
			//alert(that.gridScale.x);

			var i = 0;
			that.step.x = Math.ceil(that.gridAmount.x / ((that.expand) ? 40 : 20));
			if (that.step.x > 10) {
				that.step.x = Math.round((that.step.x * 2) * 0.1) * 5;
				i = (Math.ceil((that.input.X.min * 1) * 0.1) * 10) - that.input.X.min;
				i = (i * that.gridScale.x);
				//i += (that.gridScale.x * step);
			}
			that.init.x = i;
			that.stepArr.x = [0];
			that.lineNumArr.x = [that.input.X.min];

			for (var j = 1; i <= that.gridScale.x * that.gridAmount.x; j++) {
				ctx.strokeStyle = (j % 5 == 0) ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)';
				ctx.beginPath();
				ctx.moveTo(Math.round(i), 0);

            	var mathNO = Math.round((i / (that.gridScale.x * that.gridAmount.x)) * (that.input.X.max-that.input.X.min));
            	mathNO += that.input.X.min;
            	that.lineNumArr.x.push(mathNO);
                if (j % 2 == 0) {
                    ctx.fillText( mathNO, Math.round(i) - 7, that.gridScale.y * that.gridAmount.y );
                }

				ctx.lineTo(Math.round(i), that.gridScale.y * that.gridAmount.y);
				ctx.stroke();

				that.stepArr.x.push(i);
				i += (that.gridScale.x * that.step.x);
			}
			ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
			ctx.beginPath();
			ctx.moveTo(that.gridScale.x * that.gridAmount.x, 0);
			ctx.lineTo(that.gridScale.x * that.gridAmount.x, that.gridScale.y * that.gridAmount.y);
			ctx.stroke();
			that.stepArr.x.push(400);
			that.lineNumArr.x.push(that.input.X.max);


			ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
			ctx.beginPath();
			ctx.moveTo(0, that.gridScale.y * that.gridAmount.y);
			ctx.lineTo(that.gridScale.x * that.gridAmount.x, that.gridScale.y * that.gridAmount.y);
			ctx.stroke();

			i = (that.gridScale.y * that.gridAmount.y);
			that.step.y = Math.ceil(that.gridAmount.y / 20);
			if (that.step.y > 10) {
				that.step.y = Math.round((that.step.y * 2) * 0.1) * 5;
				i -= ((Math.ceil((that.input.Y.min * 1) * 0.1) * 10) - that.input.Y.min) * that.gridScale.y;
				//i -= that.gridScale.y * step;
			}
			that.init.y = i;
			that.stepArr.y = [400];
			that.lineNumArr.y = [that.input.Y.min];

			for (var j = 1; i >= 0 ; j++) {
				ctx.strokeStyle = (j % 5 == 0) ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.15)';
				ctx.beginPath();
				ctx.moveTo(0, Math.round(i));

				var mathNO = Math.round(that.input.Y.max-((i / (that.gridScale.y * that.gridAmount.y)) * (that.input.Y.max-that.input.Y.min)));
				that.lineNumArr.y.push(mathNO);
                if (j % 2 == 0) {
                    ctx.fillText( mathNO, 0, Math.round(i) + 4 );
                }

                ctx.lineTo(that.gridScale.x * that.gridAmount.x, Math.round(i));
				ctx.stroke();

				that.stepArr.y.unshift(i);
				i -= (that.gridScale.y * that.step.y);
			}
			ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
			ctx.beginPath();
			ctx.moveTo(0, 0);
			ctx.lineTo(that.gridScale.x * that.gridAmount.x, 0);
			ctx.stroke();
			that.stepArr.y.unshift(0);
			that.lineNumArr.y.push(that.input.Y.max);

			// kk('===00===');
			// kk(that.stepArr.x);
			// kk(that.stepArr.y);
			//
			// kk('===11===');
			// kk(that.lineNumArr.x);
			// kk(that.lineNumArr.y);

			ctx.save();
		}

		that.canvas = new Element('canvas', {
			'class': 'canvasGraphic selectNone eventNone'
		}).inject(that);

		that.controlArea = new Element('div', {
			'class': 'controlArea'
		}).inject(that);

		that.graphArea = new Element('div', {
			'class': 'graphArea ' + mouseEvent + ' ' +keyUpEvent
		}).inject(that);

		that.result = new Element('div', {
			'class': 'result'
		}).inject(that.controlArea);

		that.points = [{'x': 0, 'y': that.GP.height}, {'x': that.GP.width, 'y': 0}];


//		setTimeout(function(){
//			that.parent = that.getParent();
//		}, 10);

		return that;
	}
});

var Graph = new Class({
	Extends: Spatial,
	initialize: function(){
		var that = this.parent();

		that.SS = {'h': true, 'v': true};
		that.addClass('graph');
		that.type = 'sensor';
        that.expand = false;
		that.setStyles({
			'width': '100%',
			'height': '100%'
		});

		new Element('div', {'class': 'toggleGrid '+mouseEvent, 'text': 'toggle grid'})
		.addEvent(click, function(){
			this.toggleClass('gridOn');
			that.snapToGrid = this.hasClass('gridOn');
		})
		.inject(that.controlArea);

		that.sensorScale = new SensorScale(that).inject(that.graphArea);
		that.sensorScale.setScale(-1, -1);

		that.sensorX = 1;
		that.sensorY = 2;

		that.input = {
			'X': {
				'type': 'Sensor',
				'value': 1,
				'snapToGrid': false,
				'userSnap': true,
				'max': 1024,
				'min': 0
			},
			'Y': {
				'type': 'Sensor',
				'value': 1,
				'snapToGrid': false,
				'userSnap': true,
				'max': 1024,
				'min': 0
			}
		};

		for (var i = 0; i < 16; i++) {
			var sensorNo = (i % 8) + 1;
			var axis = (i < 8) ? 'X' : 'Y';
			if (i < 8) {
				var axis = 'X';
				var btnStyle = {
					'top': (that.GP.height + 10 + that.GP.top) + px,
					'left': (that.GP.width / 8 * (sensorNo-1) + that.GP.left) + px,
					'width': (that.GP.width / 8) + px,
					'height': 25+px
				};
			} else {
				var axis = 'Y';
				var btnStyle = {
					'left': (that.GP.left - 40) + px,
					'top': (that.GP.height / 8 * (8 - sensorNo) + that.GP.top) + px,
					'width': 25 + px,
					'height': (that.GP.height / 8) + px
				};
			}
			var sensorBTN = new Element('div', {
				'id': 'sensor-'+axis+'-'+sensorNo,
				'class': mouseEvent+' sensor'+axis+' '+((i == 0 || i == 9) ? "sensorOn" : "")+' '+((i == 1 || i == 8) ? "disabled1" : ""),
				'text': sensorNo,
				'data-axis': axis,
				'data-ss': sensorNo,
				'styles': btnStyle
			})
			.addEvent('click', function(){
				var nextState = !this.hasClass('sensorOn');

				var curAxis = this.get('data-axis');
				var opAxis = (curAxis == 'X') ? 'Y' : 'X';
				var curWay = (curAxis == 'X') ? 'v' : 'h';
				var diffWay = (curAxis == 'X') ? 'h' : 'v';

				if (this.hasClass('sensorOn')) {
					//this.removeClass('sensorOn');
					//$('sensor-'+opAxis+'-'+this.get('data-ss')).removeClass('disabled');
					//that.SS[curWay] = false;

					//that["sensor"+curAxis] = 0;
				} else {
					that.controlArea.getElements('.sensor'+curAxis).removeClass('sensorOn');
					that.controlArea.getElements('.sensor'+opAxis).removeClass('disabled');
					that.SS[curWay] = true;
					if (!this.hasClass('disabled')) {

						//$('sensor-'+opAxis+'-'+this.get('data-ss')).addClass('disabled');
						this.addClass('sensorOn');

					} else {
						that.SS[diffWay] = false;
						this.removeClass('disabled').addClass('sensorOn');
						//$('sensor-'+opAxis+'-'+this.get('data-ss')).addClass('disabled').removeClass('sensorOn');
					}
					that["sensor"+curAxis] = this.get('data-ss').toInt();

					var str = (that.type == 'switch') ? 'Switch ' : 'Sensor ' ;

					if (curAxis == 'X') {
						$('selectLeftSensor').set('text', str+this.get('data-ss'));
					} else {
						$('selectRightSensor').set('text', str+this.get('data-ss'));
					}

				}

				setTimeout(function(){
					that.getParent('.contentSpatial').fireEvent('changeSensor', that);
				}, 10);

				setTimeout(function(){
					that.controlArea.getElements('.sensorX').removeClass('flipInX').addClass('flipOutX');
					that.controlArea.getElements('.sensorY').removeClass('flipInX').addClass('flipOutX');
				}, 10);

			})
			.inject(that.controlArea);


			/**
			if (i == 0 || i == 9) {
				setTimeout(function(){
					sensorBTN.fireEvent('click');

				}, 10);
			}

			/***/
		}

		that.snapX = function(){
			if ((that.step.x > 10) && that.input.X.userSnap) return true;
			return false;
		}

		that.snapY = function(){
			if ((that.step.y > 10) && that.input.Y.userSnap) return true;
			return false;
		}



		that.controlArea.getElements('.sensorX, .sensorY').addClass('fast').addClass('flipOutX');
		var selectLeftSensor = new Element('div', {'id': 'selectLeftSensor', 'text': 'Sensor X'});
		selectLeftSensor.inject(that.controlArea);
		selectLeftSensor.addEvent('click', function(){
			//that.controlArea.getElements('.sensorX').removeClass('flipOutX').addClass('flipInX');
			document.fireEvent('showInputPopup', 'X');
		});

		//that.controlArea.getElements('.sensorX, .sensorY').fade('hide');
		var selectRightSensor = new Element('div', {'id': 'selectRightSensor', 'text': 'Right Sensor x'});
		selectRightSensor.inject(that.controlArea);
		selectRightSensor.addEvent('click', function(){
			//that.controlArea.getElements('.sensorY').removeClass('flipOutX').addClass('flipInX');
			document.fireEvent('showInputPopup', 'Y');
		});

		var switchLabel = new Element('div', {'class': 'switchLabel', 'html': '<div class="label1">Right Pressed</div><div class="label2">None Pressed</div><div class="label3">Both Pressed</div><div class="label4">Left Pressed</div>'});
		switchLabel.inject(that.controlArea);

		that.graphArea.addEvent(mouseDown, function(){
			if (!document.body.selectingArea) {
				document.body.currentArea = null;
				//$$('.currentArea').removeClass('currentArea');
				$$('.currentArea').each(function(item){
					item.setStyle('background-color', 'hsla('+item.areaColor+', 91%, 56%, 0.3)');
					item.removeClass('currentArea');
				});
			}
			that.graphArea.addClass('mouseIsDown');
		});

		that.addEvent(mouseMove, function(event){
			if ($(document.body).hasClass('mouseIsDown') && that.graphArea.hasClass('mouseIsDown')) {
				if (!document.body.currentArea) {
					var currentArea = new Area(that);
					currentArea.inject(that.graphArea);
					document.body.currentArea = currentArea;
				} else {
					var currentArea = document.body.currentArea;
				}

				var SPX = Math.min(Math.max($(document.body).startPoint.x - this.getParent('.spatialWrapper').getCoordinates().left, that.GP.left), that.GP.left+that.GP.width);
				var CPX = Math.min(Math.max($(document.body).currentPoint.x - this.getParent('.spatialWrapper').getCoordinates().left, that.GP.left), that.GP.left+that.GP.width);
				var SPY = Math.min(Math.max($(document.body).startPoint.y - this.getParent('.spatialWrapper').getCoordinates().top, that.GP.top), that.GP.top+that.GP.height);
				var CPY = Math.min(Math.max($(document.body).currentPoint.y - this.getParent('.spatialWrapper').getCoordinates().top, that.GP.top), that.GP.top+that.GP.height);
				var DX = that.gx(CPX - that.GP.left) - that.gx(SPX - that.GP.left);
				var DY = that.gy(CPY- that.GP.top) - that.gy(SPY - that.GP.top);

//				var newNum = Math.max(DX + currentArea.prop.startX, 0);
//				if (that.step.x > 10) {
//					for (var i = 0; i < that.stepArr.x.length; i++) {
//						if (newNum < that.stepArr.x[i]) break;
//					}
//					newNum = ((that.stepArr.x[i] - newNum) < (newNum - that.stepArr.x[i-1])) ? that.stepArr.x[i] : that.stepArr.x[i-1] ;
//					newNum = Math.round(newNum * 0.1) * 10;
//				}
//				kk('DX: '+DX+', newNum'+newNum);
//				DX = newNum - currentArea.prop.startX;

				if (currentArea.hasClass('resize')) {
					var corner = currentArea.getFirst('.mouseDown');
					var prop = currentArea.prop;

					switch (corner.get('data-corner')) {
						case 'TT': {
							currentArea.setPosition(prop.startY + DY, prop.startX, prop.width, prop.height - DY);
							break;
						}
						case 'BB': {
							currentArea.setPosition(prop.startY, prop.startX, prop.width, prop.height + DY);
							break;
						}
						case 'LL': {
							currentArea.setPosition(prop.startY, prop.startX + DX, prop.width - DX, prop.height);
							break;
						}
						case 'RR': {
							currentArea.setPosition(prop.startY, prop.startX, prop.width + DX, prop.height);
							break;
						}
						case 'TL': {
							currentArea.setPosition(prop.startY + DY, prop.startX + DX, prop.width - DX, prop.height - DY);
							break;
						}
						case 'TR': {
							currentArea.setPosition(prop.startY + DY, prop.startX, prop.width + DX, prop.height - DY);
							break;
						}
						case 'BL': {
							currentArea.setPosition(prop.startY, prop.startX + DX, prop.width - DX, prop.height + DY);
							break;
						}
						case 'BR': {
							currentArea.setPosition(prop.startY, prop.startX, prop.width + DX, prop.height + DY);
							break;
						}
					}
				} else if (document.body.selectingArea) {
					var prop = currentArea.prop;
					prop.newX = Math.min(Math.max(prop.startX + DX, 0), that.GP.width - prop.width);
					prop.newY = Math.min(Math.max(prop.startY + DY, 0), that.GP.height - prop.height);

					if (that.snapX()) {
						prop.newX = returnClosest(prop.newX, that.stepArr.x);
					}
					if (that.snapY()) {
						prop.newY = returnClosest(prop.newY, that.stepArr.y);
					}

					currentArea.setStyles({
						'top': prop.newY+px,
						'left': prop.newX+px
					});

					//printIf(prop.newX, prop.width, prop.newY, prop.height);
				} else {
					var prop = {'minWidth': that.gridScale.x, 'minHeight': that.gridScale.y};
					//var prop = {'minWidth': 20, 'minHeight': 20};
					prop.startX = (that.SS.v) ? that.gx(Math.min(SPX, CPX) - that.GP.left) : 0;
					prop.startY = (that.SS.h) ? that.gy(Math.min(SPY, CPY) - that.GP.top) : 0;
					prop.width = (that.SS.v) ? Math.max(Math.abs(DX), prop.minWidth) : that.GP.width;
					prop.height = (that.SS.h) ? Math.max(Math.abs(DY), prop.minHeight) : that.GP.height;

					//k('startY: '+prop.startY+', spy: '+SPY+', cpy: '+CPY+', gp top: '+that.GP.top);
					//kk(SPX+', '+CPX+', '+that.GP.left);
					//kk(prop.startX);

					if ((prop.startX+prop.minWidth) > that.GP.width) {
						prop.startX = that.GP.width - prop.width;
					}

					if ((prop.startY+prop.minHeight) > that.GP.height) {
						prop.startY = that.GP.height - prop.height;
					}

					prop.startX = returnClosest(prop.startX, that.stepArr.x);
					var right = prop.startX + prop.width;
					right = returnClosest(right, that.stepArr.x);
					prop.width = right - prop.startX;

					prop.startY = returnClosest(prop.startY, that.stepArr.y);
					var bottom = prop.startY + prop.height;
					bottom = returnClosest(bottom, that.stepArr.y);
					prop.height = bottom - prop.startY;

					currentArea.setStyles({
						'top': prop.startY+px,
						'left': prop.startX+px,
						'width': prop.width+px,
						'height': prop.height+px
					});

					//printIf(prop.startX, prop.width, prop.startY, prop.height);
					currentArea.prop = prop;

				}
				currentArea.updateBound();
			} else {
				// *** kk(event.event.offsetX +", "+ event.event.offsetY);

				//sensorScale.setScale(event.event.offsetX / drawArea.width, 1 - (event.event.offsetY / drawArea.height));
			}
		});

		that.addEvent(mouseUp, function(){
			if (document.body.selectingArea && $(document.body).hasClass('mouseIsMove')) {
				var currentArea = document.body.currentArea;
				currentArea.prop.startX = currentArea.prop.newX;
				currentArea.prop.startY = currentArea.prop.newY;

				if (currentArea.hasClass('resize')) {
					currentArea.prop.width = currentArea.prop.newW;
					currentArea.prop.height = currentArea.prop.newH;
					currentArea.removeClass('resize');
					currentArea.getChildren().removeClass('mouseDown');
				}
				//document.body.selectingArea = false;
			}
				setTimeout(function(){
					that.getParent('.contentSpatial').fireEvent('changeGraph', that);
				}, 10);
			document.body.selectingArea = false;
			//document.body.currentArea = null;
			that.graphArea.removeClass('mouseIsDown');

		});

		that.graphArea.addEvent(keyUpEvent, function(event){
			switch (event.key) {
				case 'backspace':
				case 'd': {
					if (!$('tab_cdi').hasClass('tabon')) break;
					that.deleteSelectedArea();
					event.stop();
					break;
				}
			}
		});

		that.deleteSelectedArea = function(){
			that.getElement('.currentArea').destroy();
			setTimeout(function(){
				that.getParent('.contentSpatial').fireEvent('changeGraph', that);
			}, 10);
			document.body.selectingArea = false;
		}

		that.gx0 = function(number){
			if (that.snapToGrid) {
				var newNum = Math.round(Math.round(number / that.gridScale.x) * that.gridScale.x) ;
				return newNum;
				//return ((newNum % (gridScale * 2) ) == 0 ) ? newNum : number;
			}
			return number;
		};

		that.gy0 = function(number){
			if (that.snapToGrid) {
				var newNum = Math.round(Math.round(number / that.gridScale.y) * that.gridScale.y) ;
				return newNum;
				//return ((newNum % (gridScale * 2) ) == 0 ) ? newNum : number;
			}
			return number;
		};

		that.gx = function(number){
			if ( that.input.X.snapToGrid) {
				var newNum = Math.round(Math.round(number / that.gridScale.x) * that.gridScale.x) ;
//				newNum = Math.round(number * 0.1) * 10;
//				kk(that.step.x * that.gridScale.x);
//				newNum = 0;
//				while (newNum < number) {
//					newNum = ((newNum == 0) ? that.init.x : newNum + (that.step.x * that.gridScale.x) );
//				}
//				newNum = Math.round(newNum * 0.1) * 10;
//				kk('sanp x: ' + number + ', ' + newNum);


//				if (that.step.x > 10) {
//					for (var i = 0; i < that.stepArr.x.length; i++) {
//						if (newNum < that.stepArr.x[i]) break;
//					}
//					newNum = ((that.stepArr.x[i] - newNum) < (newNum - that.stepArr.x[i-1])) ? that.stepArr.x[i] : that.stepArr.x[i-1] ;
//					newNum = Math.round(newNum * 0.1) * 10;
//				}

				//kk('newNum : ' + newNum);
				return newNum;
				//return ((newNum % (gridScale * 2) ) == 0 ) ? newNum : number;
			}
			return number;
		};

		that.gy = function(number){
			if (that.input.Y.snapToGrid) {
				var newNum = Math.round(Math.round(number / that.gridScale.y) * that.gridScale.y) ;
				//kk('snap y: ' + number);
				return newNum;
				//return ((newNum % (gridScale * 2) ) == 0 ) ? newNum : number;
			}
			return number;
		};

		that.convertToText = function(){
			var strArr = [];
			that.getElements('.area').each(function(item){
				var prop = {};
				prop.x1 = Math.round(item.prop.startX / that.GP.width * 1023);
				prop.x2 = Math.round((item.prop.startX + item.prop.width) / that.GP.width * 1023);
				prop.y2 = Math.round((that.GP.height - item.prop.startY) / that.GP.height * 1023);
				prop.y1 = Math.round((that.GP.height - (item.prop.startY + item.prop.height)) / that.GP.height * 1023);
				strArr.push("( ("+prop.x1+" < sensor1 and sensor1 < "+prop.x2+") and ("+prop.y1+" < sensor2 and sensor2 < "+prop.y2+") )");
			});
			var strResult = 'if ( ' + strArr.join(' or ') + ' )';
			return strResult;
		};

		that.convertToBlockly0 = function(){
			var strResult = '';
			var areaArr = that.getElements('.area');

			var varStr = 'INNER';
			var startVarValue = 8316;
			areaArr.each(function(item, index){
				var prop = {};
				prop.x1 = Math.round(item.prop.startX / that.GP.width * 1023);
				prop.x2 = Math.round((item.prop.startX + item.prop.width) / that.GP.width * 1023);
				prop.y2 = Math.round((that.GP.height - item.prop.startY) / that.GP.height * 1023);
				prop.y1 = Math.round((that.GP.height - (item.prop.startY + item.prop.height)) / that.GP.height * 1023);
				var areaName = '';
				if (item.getElement('.areaName') && item.getElement('.areaName').get('text') != '') {
					areaName = item.getElement('.areaName').get('text').clean().split(' ').join('-').split('_').join('-').camelCase();
					varStr = varStr.split('INNER').join('<block type="variables_set" inline="false"><field name="VAR">'+areaName+'</field><value name="VALUE"><block type="math_number"><field name="number">'+startVarValue+'</field></block></value><next>INNER</next></block>');
					startVarValue++;
				}

				strResult = '<block type="control_if" inline="false"><value name="condition"><block type="math_andor" inline="true"><field name="andor">and</field><value name="left"><block type="math_andor" inline="true"><field name="andor">and</field><value name="left"><block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="math_number"><field name="number">'+prop.x1+'</field></block></value><value name="right"><block type="input_sensor"><title name="sensor">'+that.sensorX+'</title></block></value></block></value><value name="right"><block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="input_sensor"><title name="sensor">'+that.sensorX+'</title></block></value><value name="right"><block type="math_number"><field name="number">'+prop.x2+'</field></block></value></block></value></block></value><value name="right"><block type="math_andor" inline="true"><field name="andor">and</field><value name="left"><block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="math_number"><field name="number">'+prop.y1+'</field></block></value><value name="right"><block type="input_sensor"><title name="sensor">'+that.sensorY+'</title></block></value></block></value><value name="right"><block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="input_sensor"><title name="sensor">'+that.sensorY+'</title></block></value><value name="right"><block type="math_number"><field name="number">'+prop.y2+'</field></block></value></block></value></block></value></block></value><statement name="statement"><block type="variables_set" inline="false"><field name="VAR">returnValue</field><value name="VALUE">'+((areaName == '') ? '<block type="math_number"><field name="number">1</field></block>' : '<block type="variables_get"><field name="VAR">'+areaName+'</field></block>')+'</value></block></statement>'+((strResult == '') ? '' : '<next>'+strResult+'</next>')+'</block>';
			});


			var varArr = varStr.split('INNER');

			strResult = '<block type="procedures_defreturn" inline="false"><mutation></mutation><field name="NAME">[TITLE]</field><statement name="STACK"><block type="variables_set" inline="false"><field name="VAR">returnValue</field><value name="VALUE"><block type="math_number"><field name="number">0</field></block></value><next>'+varArr[0]+strResult+varArr[1]+'</next></block></statement><value name="RETURN"><block type="variables_get"><field name="VAR">returnValue</field></block></value></block></value></block>';

			if (that.type == 'switch') {
				strResult = '';
				var varStr = 'INNER';
				var startVarValue = 8316;
				areaArr.each(function(item, index){
					var prop = {};
					prop.x1 = Math.round(item.prop.startX / that.GP.width * 1023);
					prop.x2 = Math.round((item.prop.startX + item.prop.width) / that.GP.width * 1023);
					prop.y2 = Math.round((that.GP.height - item.prop.startY) / that.GP.height * 1023);
					prop.y1 = Math.round((that.GP.height - (item.prop.startY + item.prop.height)) / that.GP.height * 1023);

					var leftStr = '<block type="math_equal" inline="true"><field name="cond">'+((prop.x1 < 256) ? '&lt;' : '&gt;' )+'</field><value name="left"><block type="input_sensor"><title name="sensor">'+that.sensorX+'</title></block></value><value name="right"><block type="math_number"><field name="number">512</field></block></value></block>';
					if (prop.x1 < 256 && prop.x2 > 768) {
						leftStr = '<block type=​"control_true">​</block>​';
						leftStr = '<block type="control_true"></block>';
						//alert(leftStr);
					}
					var rightStr = '<block type="math_equal" inline="true"><field name="cond">'+((prop.y1 < 256) ? '&lt;' : '&gt;' )+'</field><value name="left"><block type="input_sensor"><title name="sensor">'+that.sensorY+'</title></block></value><value name="right"><block type="math_number"><field name="number">512</field></block></value></block>';
					if (prop.y1 < 256 && prop.y2 > 768) {
						rightStr = '<block type=​"control_true">​</block>​';
						rightStr = '<block type="control_true"></block>';
					}

					var areaName = '';
					if (item.getElement('.areaName') && item.getElement('.areaName').get('text') != '') {
						areaName = item.getElement('.areaName').get('text').clean().split(' ').join('-').split('_').join('-').camelCase();
						varStr = varStr.split('INNER').join('<block type="variables_set" inline="false"><field name="VAR">'+areaName+'</field><value name="VALUE"><block type="math_number"><field name="number">'+startVarValue+'</field></block></value><next>INNER</next></block>');
						startVarValue++;
					}
					strResult = '<block type="control_if" inline="false"><value name="condition"><block type="math_andor" inline="true"><field name="andor">and</field><value name="left">'+leftStr+'</value><value name="right">'+rightStr+'</value></block></value><statement name="statement"><block type="variables_set" inline="false"><field name="VAR">returnValue</field><value name="VALUE">'+((areaName == '') ? '<block type="math_number"><field name="number">1</field></block>' : '<block type="variables_get"><field name="VAR">'+areaName+'</field></block>')+'</value></block></statement>'+((strResult == '') ? '' : '<next>'+strResult+'</next>')+'</block>';

				});


				var varArr = varStr.split('INNER');
				strResult = '<block type="procedures_defreturn" inline="false"><mutation></mutation><field name="NAME">[TITLE]</field><statement name="STACK"><block type="variables_set" inline="false"><field name="VAR">returnValue</field><value name="VALUE"><block type="math_number"><field name="number">0</field></block></value><next>'+varArr[0]+strResult+varArr[1]+'</next></block></statement><value name="RETURN"><block type="variables_get"><field name="VAR">returnValue</field></block></value></block>';



			}

			return strResult;

		};

		that.convertToBlockly = function(){
			var strResult = '';
			var areaArr = that.getElements('.area');
			var newArr = [];
			areaArr.each(function(item){
				newArr[that.zIndex - item.zIndex] = item;
			});
			areaArr = newArr.clean();

			var varStr = 'INNER';
			var startVarValue = 8316;

			areaArr.each(function(item, index){
				var prop = {};
				var range = {
					'x': that.input.X.max - that.input.X.min,
					'y': that.input.Y.max - that.input.Y.min
				};
				prop.x1 = Math.round(item.prop.startX / that.GP.width * range.x);
				prop.x2 = Math.round((item.prop.startX + item.prop.width) / that.GP.width * range.x);
				prop.y2 = Math.round((that.GP.height - item.prop.startY) / that.GP.height * range.y);
				prop.y1 = Math.round((that.GP.height - (item.prop.startY + item.prop.height)) / that.GP.height * range.y);


				var leftStr = '';
				var rightStr = '';

				if (that.input.X.type == 'Sensor') {
					leftStr = '<block type="math_andor" inline="true"><field name="andor">and</field><value name="left"><block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="math_number"><field name="number">'+prop.x1+'</field></block></value><value name="right"><block type="input_sensor"><title name="sensor">'+that.input.X.value+'</title></block></value></block></value><value name="right"><block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="input_sensor"><title name="sensor">'+that.input.X.value+'</title></block></value><value name="right"><block type="math_number"><field name="number">'+prop.x2+'</field></block></value></block></value></block>';
				} else if (that.input.X.type == 'Switch') {
					leftStr = '<block type="math_equal" inline="true"><field name="cond">'+((prop.x1 < 256) ? '&lt;' : '&gt;' )+'</field><value name="left"><block type="input_sensor"><title name="sensor">'+that.input.X.value+'</title></block></value><value name="right"><block type="math_number"><field name="number">512</field></block></value></block>';
					if (prop.x1 < 256 && prop.x2 > 768) {
						leftStr = '<block type="control_true"></block>';
					}
				} else if (that.input.X.type == 'Variable') {
					leftStr = '<block type="math_andor" inline="true"><field name="andor">and</field><value name="left"><block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="math_number"><field name="number">'+prop.x1+'</field></block></value><value name="right"><block type="variables_get"><field name="VAR">'+that.input.X.value+'</field></block></value></block></value><value name="right"><block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="variables_get"><field name="VAR">'+that.input.X.value+'</field></block></value><value name="right"><block type="math_number"><field name="number">'+prop.x2+'</field></block></value></block></value></block>';

				}

				if (!that.yAxis) {
					rightStr = '<block type="control_true"></block>';
				} else if (that.input.Y.type == 'Sensor') {
					var rightStr = '<block type="math_andor" inline="true"><field name="andor">and</field><value name="left"><block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="math_number"><field name="number">'+prop.y1+'</field></block></value><value name="right"><block type="input_sensor"><title name="sensor">'+that.input.Y.value+'</title></block></value></block></value><value name="right"><block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="input_sensor"><title name="sensor">'+that.input.Y.value+'</title></block></value><value name="right"><block type="math_number"><field name="number">'+prop.y2+'</field></block></value></block></value></block>';
				} else if (that.input.Y.type == 'Switch') {
					var rightStr = '<block type="math_equal" inline="true"><field name="cond">'+((prop.y1 < 256) ? '&lt;' : '&gt;' )+'</field><value name="left"><block type="input_sensor"><title name="sensor">'+that.input.Y.value+'</title></block></value><value name="right"><block type="math_number"><field name="number">512</field></block></value></block>';
					if (prop.y1 < 256 && prop.y2 > 768) {
						rightStr = '<block type="control_true"></block>';
					}
				}else if (that.input.Y.type == 'Variable') {
					rightStr = '<block type="math_andor" inline="true"><field name="andor">and</field><value name="left"><block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="math_number"><field name="number">'+prop.y1+'</field></block></value><value name="right"><block type="variables_get"><field name="VAR">'+that.input.Y.value+'</field></block></value></block></value><value name="right"><block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="variables_get"><field name="VAR">'+that.input.Y.value+'</field></block></value><value name="right"><block type="math_number"><field name="number">'+prop.y2+'</field></block></value></block></value></block>';

				}


				var areaName = '';
				if (item.getElement('.areaName') && item.getElement('.areaName').get('text') != '') {
					areaName = item.getElement('.areaName').get('text').clean().split(' ').join('-').split('_').join('-').camelCase().split('-').join('');
					varStr = varStr.split('INNER').join('<block type="variables_set" inline="false"><field name="VAR">'+areaName+'</field><value name="VALUE"><block type="math_number"><field name="number">'+startVarValue+'</field></block></value><next>INNER</next></block>');
					startVarValue++;
				}

				strResult = '<block type="control_if" inline="false"><value name="condition"><block type="math_andor" inline="true"><field name="andor">and</field><value name="left">'+leftStr+'</value><value name="right">'+rightStr+'</value></block></value><statement name="statement"><block type="variables_set" inline="false"><field name="VAR">returnValue</field><value name="VALUE">'+((areaName == '') ? '<block type="math_number"><field name="number">1</field></block>' : '<block type="variables_get"><field name="VAR">'+areaName+'</field></block>')+'</value></block></statement>'+((strResult == '') ? '' : '<next>'+strResult+'</next>')+'</block>';
			});


			var mutation = '';
			if (that.input.X.type == 'Variable') mutation += '<arg name="'+that.input.X.value+'"></arg>';
			if (that.input.Y.type == 'Variable') mutation += '<arg name="'+that.input.Y.value+'"></arg>';
			var varArr = varStr.split('INNER');

			strResult = '<block type="procedures_defreturn" inline="false"><mutation>'+mutation+'</mutation><field name="NAME">[TITLE]</field><statement name="STACK"><block type="variables_set" inline="false"><field name="VAR">returnValue</field><value name="VALUE"><block type="math_number"><field name="number">0</field></block></value><next>'+varArr[0]+strResult+varArr[1]+'</next></block></statement><value name="RETURN"><block type="variables_get"><field name="VAR">returnValue</field></block></value></block></value></block>';

			/***
			if (that.type == 'switch') {
				strResult = '';
				var varStr = 'INNER';
				var startVarValue = 8316;
				areaArr.each(function(item, index){
					var prop = {};
					prop.x1 = Math.round(item.prop.startX / that.GP.width * 1023);
					prop.x2 = Math.round((item.prop.startX + item.prop.width) / that.GP.width * 1023);
					prop.y2 = Math.round((that.GP.height - item.prop.startY) / that.GP.height * 1023);
					prop.y1 = Math.round((that.GP.height - (item.prop.startY + item.prop.height)) / that.GP.height * 1023);

					var leftStr = '<block type="math_equal" inline="true"><field name="cond">'+((prop.x1 < 256) ? '&lt;' : '&gt;' )+'</field><value name="left"><block type="input_sensor"><title name="sensor">'+that.sensorX+'</title></block></value><value name="right"><block type="math_number"><field name="number">512</field></block></value></block>';
					if (prop.x1 < 256 && prop.x2 > 768) {
						leftStr = '<block type=​"control_true">​</block>​';
						leftStr = '<block type="control_true"></block>';
						//alert(leftStr);
					}
					var rightStr = '<block type="math_equal" inline="true"><field name="cond">'+((prop.y1 < 256) ? '&lt;' : '&gt;' )+'</field><value name="left"><block type="input_sensor"><title name="sensor">'+that.sensorY+'</title></block></value><value name="right"><block type="math_number"><field name="number">512</field></block></value></block>';
					if (prop.y1 < 256 && prop.y2 > 768) {
						rightStr = '<block type=​"control_true">​</block>​';
						rightStr = '<block type="control_true"></block>';
					}

					var areaName = '';
					if (item.getElement('.areaName') && item.getElement('.areaName').get('text') != '') {
						areaName = item.getElement('.areaName').get('text').clean().split(' ').join('-').split('_').join('-').camelCase();
						varStr = varStr.split('INNER').join('<block type="variables_set" inline="false"><field name="VAR">'+areaName+'</field><value name="VALUE"><block type="math_number"><field name="number">'+startVarValue+'</field></block></value><next>INNER</next></block>');
						startVarValue++;
					}
					strResult = '<block type="control_if" inline="false"><value name="condition"><block type="math_andor" inline="true"><field name="andor">and</field><value name="left">'+leftStr+'</value><value name="right">'+rightStr+'</value></block></value><statement name="statement"><block type="variables_set" inline="false"><field name="VAR">returnValue</field><value name="VALUE">'+((areaName == '') ? '<block type="math_number"><field name="number">1</field></block>' : '<block type="variables_get"><field name="VAR">'+areaName+'</field></block>')+'</value></block></statement>'+((strResult == '') ? '' : '<next>'+strResult+'</next>')+'</block>';

				});


				var varArr = varStr.split('INNER');
				strResult = '<block type="procedures_defreturn" inline="false"><mutation></mutation><field name="NAME">[TITLE]</field><statement name="STACK"><block type="variables_set" inline="false"><field name="VAR">returnValue</field><value name="VALUE"><block type="math_number"><field name="number">0</field></block></value><next>'+varArr[0]+strResult+varArr[1]+'</next></block></statement><value name="RETURN"><block type="variables_get"><field name="VAR">returnValue</field></block></value></block>';



			}
			/***/

			return strResult;

		};

		that.updateSensor = function(rs){
			var rsArr = rs.split(':');
			//var rightElem = that.controlArea.getElement('.sensorY.sensorOn');
			//var rightSensor = (rightElem) ? rsArr[rightElem.get('data-ss') - 1].toInt() / 1024 : -1;
			//var leftElem = that.controlArea.getElement('.sensorX.sensorOn');
			//var leftSensor = (leftElem) ? rsArr[leftElem.get('data-ss') - 1].toInt() / 1024 : -1;

			//that.yAxis
			//kk(that.input.X.value - 1);
			var xSensor = rsArr[that.input.X.value - 1].toInt() / 1024;
			var ySensor = (that.yAxis) ? rsArr[that.input.Y.value - 1].toInt() / 1024 : -1;

			that.sensorScale.setScale(xSensor, ySensor);
			//
			that.highlightArea(xSensor, ySensor);
		}

		that.highlightArea = function(x, y){

			x = that.GP.width * x;
			y = that.GP.height * (1 - y);
			var noArea = true;
			var areaArr = that.graphArea.getElements('.area');
			var newArr = [];
			areaArr.each(function(item){
				newArr[that.zIndex - item.zIndex] = item;
			});
			areaArr = newArr.clean();
			areaArr.each(function(item){
				//kk('hi');
				//kk(item.prop);
				item.removeClass('highlight');
				if (!noArea) return;
				if ((item.prop.startX < x && x < (item.prop.startX + item.prop.width)) && ( !that.yAxis || (item.prop.startY < y && y < (item.prop.startY + item.prop.height)))) {
					item.addClass('highlight');
					noArea = false;
				}
			});

		}

		that.setType = function(type, var1, var2){

			that.type = type;
			that.removeClass('snap');
			that.getParent().removeClass('switch');
			that.setHeight(400);
			that.snapToGrid = false;
			$$('#selectLeftSensor, .sensorX').setStyle('top', '430px');
			$('selectRightSensor').removeClass('hideLabel');
			if (type == 'switch') {
				that.snapToGrid = true;
				that.addClass('snap');
				that.getParent().addClass('switch');
				that.setGridAmount(2,2);
			} else if (type == 'sensor') {
				that.setGridAmount(20,20);
			} else if (type == 'onesensor') {
				that.setGridAmount(20,1);
				that.setHeight(100);
				$$('#selectLeftSensor, .sensorX').setStyle('top', '130px');
				$('selectRightSensor').addClass('hideLabel');
				//that.SS = {'h': true, 'v': true};
			}

			var1 = var1.toInt() || 1;
			var1 = (var1 < 1) ? 1 : ((var1 > 8) ? 8 : var1 );

			var2 = var2.toInt() || 2;
			var2 = (var2 < 1) ? 2 : ((var2 > 8) ? 8 : var2 );

			that.sensorX = var1;
			that.sensorY = var2;

//
//			setTimeout(function () {
//				$('sensor-X-'+that.sensorX).fireEvent('click');
//				$('sensor-Y-'+that.sensorY).fireEvent('click');
//
//			}, 50);

		};

		that.expandGraph = function(expand){
            that.expand = expand;
            if (expand) {
                //that.gridAmount.y = 40;
				that.setWidth(1000);
				that.getParent().setStyles({
                    'width': 1150 + px,
                    'z-index': 200,
                    'background-color': 'white'
                });
			} else {
                //that.gridAmount.y = 20;
				that.setWidth(400);
				that.getParent().setStyle('width', 480 + px);
			}

            document.fireEvent('gridAmountChange');
		};

		that.enableYAxis = function(value){
			that.yAxis = value;
			if (value) {
				that.setHeight(400);
				$$('#selectLeftSensor, .sensorX').setStyle('top', '430px');
				$('selectRightSensor').removeClass('hideLabel');
				that.sensorScale.setThickness(2, 2);
				that.removeClass('oneInput');
			} else {
				that.setHeight(100);
				$$('#selectLeftSensor, .sensorX').setStyle('top', '130px');
				$('selectRightSensor').addClass('hideLabel');
				that.setGridAmount(that.gridAmount.x, 1);
				that.sensorScale.setThickness(6, 0);
				that.addClass('oneInput');
			}
		};

		that.setTypeNew = function(axis, value, type, min, max){
			that.input[axis] = {
				'type': type,
				'value': value,
				'snapToGrid': (((max - min) <= 40) || type == 'Switch'),
				'userSnap': true,
				'max': max.toInt() || 1000,
				'min': min.toInt() || 0
			}
			var amountX = that.input.X.max - that.input.X.min;
			amountX = (that.input.X.type == 'Switch') ? 2 : amountX;
			var amountY = that.input.Y.max - that.input.Y.min;
			amountY = (that.input.Y.type == 'Switch') ? 2 : amountY;

			//alert(amountY);

			if (axis == 'X') {
				$('selectLeftSensor').set('text', type + ' ' + value);
			} else {
				$('selectRightSensor').set('text', type + ' ' + value);
			}

			that.setGridAmount(amountX, amountY);
		};

		that.getTextData = function(){
			var areaArr = that.getElements('.area');
			var dataArr = [];
			areaArr.each(function(item){
				dataArr.push(item.prop.startY + '#' + ((that.expand) ? Math.round(item.prop.startX * 0.4) : item.prop.startX ) + '#' + ((that.expand) ? Math.round(item.prop.width * 0.4) : item.prop.width ) + '#' + item.prop.height + '#' + ((item.getElement('.areaName') && item.getElement('.areaName').get('text') != '') ? item.getElement('.areaName').get('text') : '') + '#' + item.areaColor);
			});

			return dataArr;
		}

		that.setArea = function(areaArr){
			that.getElements('.area').destroy();
			areaArr.each(function(item){
				item = item.clean();
				if (item != '') {
					var areaPosition = item.split('#');
                    if (that.expand) {
                        areaPosition[1] = areaPosition[1].toInt() * 2.5;
                        areaPosition[2] = areaPosition[2].toInt() * 2.5;
                    }
					var currentArea = new Area(that);
					currentArea.prop = {
						'minWidth': that.gridScale.x,
						'minHeight': that.gridScale.y,
						'startY': areaPosition[0].toInt(),
						'startX': areaPosition[1].toInt(),
						'width': areaPosition[2].toInt(),
						'height': areaPosition[3].toInt()
					};
					currentArea.inject(that.graphArea);
					currentArea.setPosition(areaPosition[0].toInt(), areaPosition[1].toInt(), areaPosition[2].toInt(), areaPosition[3].toInt());
					currentArea.prop.startX = currentArea.prop.newX;
					currentArea.prop.startY = currentArea.prop.newY;
					currentArea.prop.width = currentArea.prop.newW;
					currentArea.prop.height = currentArea.prop.newH;
					if (areaPosition[4] && areaPosition[4].clean() != '') {
						new Element('div', {'class': 'areaName', 'text': areaPosition[4].clean()}).inject(currentArea, 'top');
						currentArea.areaName = areaPosition[4].clean();
					}
					if (areaPosition[5]) {
						currentArea.areaColor = areaPosition[5].toInt();
						currentArea.setStyle('background-color', 'hsla('+currentArea.areaColor+', 91%, 56%, 0.3)');
					}
				}
			});
			setTimeout(function(){
				that.getParent('.contentSpatial').fireEvent('changeGraph', that);
			}, 110);
		}

		that.resetArea = function(areaArr){
			//changeGraph
			that.setArea(areaArr);
		}

		that.rearrangeArea = function(){
			var areaArr = that.graphArea.getElements('.area');
			var newArr = [];
			areaArr.each(function(item){
				newArr[item.zIndex] = item;
			});
			kk('newArr');
			kk(newArr.clean());
			areaArr = newArr.clean();
			areaArr.each(function(item, index){
				item.setStyle('z-index', index+1);
				item.zIndex = index+1;
			});
			that.zIndex = areaArr.length;
		}

		that.setGP();

		return that;
	}
});

var Converter = new Class({
	Extends: Spatial,
	initialize: function(){
		var that = this.parent();

		that.addClass('converter');

		that.lineClickIndex = 0;
		that.showDash = false;

		that.graphArea.addEvent('click', function(event){

			//that.points.push({'x': event.event.offsetX, 'y': event.event.offsetY});
			//kk(that.lineClickIndex);
			if (that.lineClickIndex != 0) {
				var newPoint = {
					'x': event.client.x - that.graphArea.getCoordinates().left,
					'y': event.client.y - that.graphArea.getCoordinates().top
				};
				that.points.splice(that.lineClickIndex, 0, newPoint);
				that.lineClickIndex = 0;
				that.drawPoint();
			}

		}).addEvent(mouseDown, function(){
			that.getElements('.point.selected').removeClass('selected');
		}).addEvent(mouseMove, function(event){
			if (that.currentPoint) {
				that.currentPoint.fireEvent('mouseMoving', event);
			}
		}).addEvent(mouseUp, function(event){
			if (that.currentPoint) {
				that.currentPoint.fireEvent('mouseUpping', event);
			}
		}).addEvent('mouseout', function(event){
			if (event.relatedTarget === that.controlArea) {
				if (that.currentPoint) {
					that.currentPoint.fireEvent('mouseUpping', event);
				}
			}
		}).addEvent(keyUpEvent, function(event){
			switch (event.key) {
				case 'backspace':
				case 'd': {
					if (!$('tab_cvi').hasClass('tabon')) break;
					console.log('key2: '+event.key);
					that.deleteSelectedPoint();
					event.stop();
					break;
				}
			}
		});

		that.deleteSelectedPoint = function(){
			that.getElements('.point.selected').each(function(item){
				var thisIndex = item.get('data-index').toInt();
				if (!(thisIndex == 0 || thisIndex == (that.points.length - 1)))
					that.points.splice(thisIndex, 1);
				item.destroy();
			});
			that.drawPoint();
		}

		that.setPoints = function(points){
			that.points = points;
			that.drawPoint();
		}

		/** controllInput
			width: 40px, height: 20px

		**/
		that.drawController = function(){
			var controlWH = {'w': 40, 'h': 20};
			that.gate = {};
			that.gateType = ['maxY', 'minY', 'maxX', 'minX'];
			that.gate.maxY = new Element('input', {
				'type': 'text',
				'value': '1000',
				'class': 'controllInput maxY',
				'styles': {
					'top': that.GP.top + px,
					'left': (that.GP.left - 10 - 40) + px
				}
			}).inject(that.controlArea);

			that.gate.minY = new Element('input', {
				'type': 'text',
				'value': '0',
				'class': 'controllInput minY',
				'styles': {
					'top': (that.GP.top + that.GP.height - controlWH.h) + px,
					'left': (that.GP.left - 10 - controlWH.w) + px
				}
			}).inject(that.controlArea);

			that.gate.maxX = new Element('input', {
				'type': 'text',
				'value': '1000',
				'class': 'controllInput maxX',
				'styles': {
					'top': (that.GP.top + that.GP.height + 10) + px,
					'left': (that.GP.left + that.GP.width - controlWH.w) + px
				}
			}).inject(that.controlArea);

			that.gate.minX = new Element('input', {
				'type': 'text',
				'value': '0',
				'class': 'controllInput minX',
				'styles': {
					'top': (that.GP.top + that.GP.height + 10) + px,
					'left': (that.GP.left) + px
				}
			}).inject(that.controlArea);

			that.gate.hideInput = new Element('input', {'type': 'text'}).inject(new Element('div', {'styles':{'opacity': '0', 'width': '0', 'height': '0', 'overflow': 'hidden'}}).inject(that.controlArea));

			that.gateType.each(function(item){
				that.gate[item].addEvent('keydown', function(event){
					console.log('eee');
					switch (event.key) {
						case 'backspace': {
							that.gate[item].set('value', '0').select();
							break;
						}
						case 'enter': {

							that.gate.hideInput.select();
							break;
						}
						default: {
							that.gate[item].get('value');
							break;
						}
					}
				}).addEvent(mouseUp, function(){
					that.gate[item].select();
				});
			});
		}

		that.drawDashLine = function(){
			that.hDash = new Element('div', {
				'class': 'hDash'
			}).inject(that.graphArea).fade('hide');
			that.vDash = new Element('div', {
				'class': 'vDash'
			}).inject(that.graphArea).fade('hide');
			that.popupPoint = new Element('div', {
				'class': 'popupPoint',
				'text': '0 => 0'
			}).inject(that.graphArea).fade('hide');
		};

		that.showDashLine = function(point){
			if (!that.showDash) {
				that.showDash = true;
				that.hDash.fade('show');
				that.vDash.fade('show');
				that.popupPoint.fade('show');
			}
			that.hDash.setStyles({
				'width': point.x,
				'top': point.y
			});
			that.vDash.setStyles({
				'left': point.x,
				'top': point.y,
				'height': that.GP.height - point.y
			});
			var xValue = (((point.x * (that.gate.maxX.get('value').toInt() - that.gate.minX.get('value').toInt())) / that.GP.width) + that.gate.minX.get('value').toInt()).toFixed(1);
			var yValue = ((((that.GP.height - point.y) * (that.gate.maxY.get('value').toInt() - that.gate.minY.get('value').toInt())) / that.GP.height) + that.gate.minY.get('value').toInt()).toFixed(1) ;
			that.popupPoint.setStyles({
				'top': (point.y - 40) + px,
				'left': (point.x - 53) + px
			}).set('text', (yValue+'').replace('.0', '') + " => " + (xValue+'').replace('.0', ''));

		};

		that.hideDashLine = function(){
			if (that.showDash) {
				that.showDash = false;
				that.hDash.fade('hide');
				that.vDash.fade('hide');
				that.popupPoint.fade('hide');
			}
		};

		that.drawPoint = function(){
			that.getElements('.point').destroy();
			that.points.each(function(item, index){
				new Element('div', {
					'class': 'point '+mouseEvent,
					'styles': {
						'top': item.y + px,
						'left': item.x + px
					},
					'data-pointX': item.x,
					'data-pointY': item.y,
					'data-index': index
				})
				.addEvent(click, function(){
					this.addClass('selected');
				})
				.addEvent(mouseDown, function(event){
					this.mouseDiff = {
						'x': 0,
						'y': 0
					};
					this.mouseStart = event.client;
					this.addClass('currentPoint');
					that.currentPoint = this;
					this.newPoint = {
						'x': this.get('data-pointX').toInt(),
						'y': this.get('data-pointY').toInt()
					};
				})
				.addEvent('mouseover', function(){
					var newPoint = {
						'x': this.get('data-pointX').toInt(),
						'y': this.get('data-pointY').toInt()
					};
					//that.showDashLine(newPoint);
				})
				.addEvent('mouseout', function(){
					that.hideDashLine();
				})
				.addEvent('mouseMoving', function(event){
					if (this.hasClass('currentPoint')) {
						this.mouseDiff = {
							'x': event.client.x - this.mouseStart.x,
							'y': event.client.y - this.mouseStart.y
						};
						var thisIndex = this.get('data-index').toInt();
						this.newPoint = {
							'x': this.get('data-pointX').toInt() + this.mouseDiff.x,
							'y': this.get('data-pointY').toInt() + ((thisIndex == 0 || thisIndex == (that.points.length - 1)) ? 0 : this.mouseDiff.y)
						};

						this.newPoint.x = Math.max(0, Math.min(this.newPoint.x, that.GP.width));
						if (!(thisIndex == 0 || thisIndex == (that.points.length - 1))) {
							this.newPoint.y = Math.max(that.points[thisIndex+1].y + 2, Math.min(this.newPoint.y, that.points[thisIndex-1].y - 2));
						}
						//that.showDashLine(this.newPoint);

						this.setStyles({
							'top': this.newPoint.y + px,
							'left': this.newPoint.x + px
						});
						that.points[thisIndex] = this.newPoint;

						that.drawLine();
					};

				})
				.addEvent('mouseUpping', function(event){
					if (this.hasClass('currentPoint')) {
						this.set('data-pointX', this.newPoint.x);
						this.set('data-pointY', this.newPoint.y);
						this.removeClass('currentPoint');
						that.currentPoint = null;
					}
				})
				.inject(that.graphArea);

			});
			that.drawLine();
		};

		that.drawLine = function(){
			that.getElements('.line').destroy();
			that.points.each(function(item, index){

				if (index != 0) {
					new Line(that.points[index-1], that.points[index])
					.set('data-index', index)
					.addClass(mouseEvent)
					.addEvent(mouseUp, function(event){
						that.lineClickIndex = this.get('data-index');
					})
					.addEvent('mousemove', function(event){
						var newPoint = {
							'x': event.client.x - that.graphArea.getCoordinates().left,
							'y': event.client.y - that.graphArea.getCoordinates().top
						};
						//that.showDashLine(newPoint);
					})
					.addEvent('mouseout', function(){
						that.hideDashLine();
					})
					.inject(that.graphArea);
				}
			});
			setTimeout(function(){
				that.getParent('.contentSpatial').fireEvent('changeGraph', that);
			}, 10);
		}

		that.YtoX = function(yInput){
			var startPointIndex = -1;
			that.points.each(function(item, index){
				//k(item);
				//var yValue = ((((that.GP.height - item.y) * (that.gate.maxY.get('value').toInt() - that.gate.minY.get('value').toInt())) / that.GP.height) + that.gate.minY.get('value').toInt()).toFixed(1) ;
				var yValue = that.convertY(item.y);
				if (startPointIndex == -1 && yValue > yInput ) {
					startPointIndex = index - 1;
				}
			});

			if (startPointIndex == -1) {
				return -1;
			} else {
				var mValue = (that.convertY(that.points[startPointIndex + 1].y) - that.convertY(that.points[startPointIndex].y)) / (that.convertX(that.points[startPointIndex + 1].x) - that.convertX(that.points[startPointIndex].x));
				var xOutput = ((yInput - that.convertY(that.points[startPointIndex].y)) / mValue) + that.convertX(that.points[startPointIndex].x);
				return xOutput;
			}
		}

		that.YtoXGenerator = function(){
			that.mArr = [];
			that.cArr = [];
			that.points.each(function(item, index){
				if (index > 0) {
					var mValue = (that.convertY(that.points[index].y) - that.convertY(that.points[index-1].y)) / (that.convertX(that.points[index].x) - that.convertX(that.points[index-1].x));
					that.mArr.push(mValue.toFixed(2).toFloat());
					//cArr.push(that.convertY(that.points[index].y) / (mValue * that.convertX(that.points[index].x)));
					that.cArr.push((that.convertX(that.points[index].x) - (that.convertY(that.points[index].y) / mValue)).toFixed(2).toFloat());
				}
			});
			k(that.mArr);
			k(that.cArr);
			var strResult = '';
			that.points.each(function(item, index){
				if (index > 0) {
					if (strResult != '') {
						strResult += ' \nelse ';
					}
					strResult += 'if ( y < '+that.convertY(that.points[index].y)+' ) {';
					//strResult += '\n\t x = ((y - '+that.cArr[index-1]+') / '+that.mArr[index-1]+');';
					strResult += '\n\t x = ((y - '+that.convertY(that.points[index-1].y)+') / '+that.mArr[index-1]+') + '+that.convertX(that.points[index-1].x)+';';
					strResult += '\n }';
				}
			});
			that.result.set('text', strResult);
			return strResult;
		}

		that.YtoXBlockly = function(){
			that.mArr = [];
			that.cArr = [];
			that.points.each(function(item, index){
				if (index > 0) {
					var mValue = (that.convertY(that.points[index].y) - that.convertY(that.points[index-1].y)) / (that.convertX(that.points[index].x) - that.convertX(that.points[index-1].x));
					that.mArr.push(mValue.toFixed(2).toFloat());
					//cArr.push(that.convertY(that.points[index].y) / (mValue * that.convertX(that.points[index].x)));
					that.cArr.push((that.convertX(that.points[index].x) - (that.convertY(that.points[index].y) / mValue)).toFixed(2).toFloat());
				}
			});

			var strResult = '';
			that.points.each(function(item, index){
				if (index > 0) {
					strResult += '<value name="IF'+(index-1)+'"><block type="logic_compare" inline="true"><field name="OP">LT</field><value name="A"><block type="variables_get"><field name="VAR">[VAR1]</field></block></value><value name="B"><block type="math_number" ><field name="NUM">'+that.convertY(that.points[index].y)+'</field></block></value></block></value>';
					strResult += '<statement name="DO'+(index-1)+'"><block type="variables_set" inline="true"><field name="VAR">x</field><value name="VALUE"><block type="math_arithmetic" inline="true"><field name="OP">ADD</field><value name="A"><block type="math_arithmetic" inline="true"><field name="OP">DIVIDE</field><value name="A"><block type="math_arithmetic" inline="true"><field name="OP">MINUS</field><value name="A"><block type="variables_get"><field name="VAR">[VAR1]</field></block></value><value name="B"><block type="math_number" ><field name="NUM">'+that.convertY(that.points[index-1].y)+'</field></block></value></block></value><value name="B"><block type="math_number"><field name="NUM">'+that.mArr[index-1]+'</field></block></value></block></value><value name="B"><block type="math_number"><field name="NUM">'+that.convertX(that.points[index-1].x)+'</field></block></value></block></value></block></statement>';
				}
			});

			/***
			<block type="control_if" inline="false"><value name="condition"><block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="math_number"><field name="number">0</field></block></value><value name="right"><block type="variables_get"><field name="VAR">i</field></block></value></block></value><statement name="statement"><block type="variables_set" inline="false"><field name="VAR">j</field><value name="VALUE"><block type="math_operator" inline="true"><field name="op">+</field><value name="1stNum"><block type="math_operator" inline="true"><field name="op">÷</field><value name="1stNum"><block type="math_operator" inline="true"><field name="op">-</field><value name="1stNum"><block type="variables_get"><field name="VAR">i</field></block></value><value name="2ndNum"><block type="math_number"><field name="number">666</field></block></value></block></value><value name="2ndNum"><block type="math_number"><field name="number">777</field></block></value></block></value><value name="2ndNum"><block type="math_number"><field name="number">888</field></block></value></block></value></block></statement></block>


			<block type="variables_set" id="2" inline="false" x="376" y="201"><field name="VAR">j</field><value name="VALUE"><block type="math_operator" id="3" inline="true"><field name="op">+</field><value name="1stNum"><block type="math_operator" id="4" inline="true"><field name="op">÷</field><value name="1stNum"><block type="math_operator" id="5" inline="true"><field name="op">-</field><value name="1stNum"><block type="variables_get" id="6"><field name="VAR">i</field></block></value><value name="2ndNum"><block type="math_number" id="7"><field name="number">666</field></block></value></block></value><value name="2ndNum"><block type="math_number" id="8"><field name="number">777</field></block></value></block></value><value name="2ndNum"><block type="math_number" id="9"><field name="number">888</field></block></value></block></value></block>

			<block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="variables_get"><field name="VAR">i</field></block></value><value name="right"><block type="math_number"><field name="number">500</field></block></value></block>

			<block type="control_if" id="2" inline="false" x="262" y="142"></block>

			<block type="control_ifelse" id="2" inline="false" x="380" y="104"></block>

			<block type="control_if" id="2" inline="false" x="225" y="291"><value name="condition">...</value><statement name="statement"...</statement></block>

			<block type="control_ifelse" inline="false"><value name="condition">...</value><statement name="if">...</statement><statement name="else">...</statement></block>

			/***/

			strResult = '<block type="procedures_defreturn" inline="false"><mutation><arg name="[VAR1]"></arg></mutation><field name="NAME">[TITLE]</field><statement name="STACK"><block type="controls_if" inline="false"><mutation elseif="'+(that.points.length - 2)+'"></mutation>'+strResult+'</block></statement><value name="RETURN"><block type="variables_get"><field name="VAR">x</field></block></value></block>';
			//strResult += '<block type="procedures_callreturn" inline="false" x="243" y="187"><mutation name="convertYtoX"><arg name="y"></arg></mutation></block>';

			//return strResult;

			var strResult = '';
			//kk(that.points);
			//kk(that.points.reverse());
			var pl = that.points.length;
			that.points.each(function(item, index){
				if (index > 0) {

					var condition = '<block type="math_equal" inline="true"><field name="cond">&lt;</field><value name="left"><block type="variables_get"><field name="VAR">[VAR1]</field></block></value><value name="right"><block type="math_number"><field name="number">'+that.convertY(that.points[pl - index].y)+'</field></block></value></block>';
					var statement = '<block type="variables_set" inline="false"><field name="VAR">x</field><value name="VALUE"><block type="math_operator" inline="true"><field name="op">+</field><value name="1stNum"><block type="math_operator" inline="true"><field name="op">÷</field><value name="1stNum"><block type="math_operator" inline="true"><field name="op">-</field><value name="1stNum"><block type="variables_get"><field name="VAR">[VAR1]</field></block></value><value name="2ndNum"><block type="math_number"><field name="number">'+that.convertY(that.points[pl - index - 1].y)+'</field></block></value></block></value><value name="2ndNum"><block type="math_number"><field name="number">'+that.mArr[pl - index - 1]+'</field></block></value></block></value><value name="2ndNum"><block type="math_number"><field name="number">'+that.convertX(that.points[pl - index - 1].x)+'</field></block></value></block></value></block>';
					if (index == 1) {
						strResult = '<block type="control_if" inline="false"><value name="condition">'+condition+'</value><statement name="statement">'+statement+'</statement></block>';
					} else {
						strResult = '<block type="control_ifelse" inline="false"><value name="condition">'+condition+'</value><statement name="if">'+statement+'</statement><statement name="else">'+strResult+'</statement></block>';
					}
				}
			});

			strResult = '<block type="procedures_defreturn" inline="false"><mutation><arg name="[VAR1]"></arg></mutation><field name="NAME">[TITLE]</field><statement name="STACK">'+strResult+'</statement><value name="RETURN"><block type="variables_get"><field name="VAR">x</field></block></value></block>';

			return strResult;
		}

		that.convertX = function(xInput){
			var xOutput = (((xInput * (that.gate.maxX.get('value').toInt() - that.gate.minX.get('value').toInt())) / that.GP.width) + that.gate.minX.get('value').toInt()).toFixed(1);
			return xOutput.toFloat();
		}

		that.convertY = function(yInput){
			var yOutput = ((((that.GP.height - yInput) * (that.gate.maxY.get('value').toInt() - that.gate.minY.get('value').toInt())) / that.GP.height) + that.gate.minY.get('value').toInt()).toFixed(1) ;
			return yOutput.toFloat();
		}

		that.updateSensor = function(rs){
			var rsArr = rs.split(':');
			var yValue = rsArr[0];
			var xValue = that.YtoX(yValue);

			//kk(yValue+', '+xValue);
			that.showDashLine({
				'x': xValue * (that.GP.width) / (that.gate.maxX.get('value').toInt() - that.gate.minX.get('value').toInt()),
				'y': (1 - (yValue / (that.gate.maxY.get('value').toInt() - that.gate.minY.get('value').toInt()))) * (that.GP.height)
			});

		}

		that.getTextData = function(){
			var data = [];
			that.points.each(function(item){
				data.push(item.x+'#'+item.y);
			});
			return data.join(';;');
		}


		that.setGP();
		that.drawController();
		that.drawDashLine();
		that.drawPoint();
		that.drawLine();

		return that;
	}
});

var Line = new Class({
    initialize: function(first, second){
        var that = this;
        if (first.x > second.x) {
        	var temp = first;
        	first = second;
        	second = temp;
        }
		var x = (second.x) - (first.x);
		var y = (second.y) - (first.y);
		var rad = Math.atan(y / x);
		var length = Math.sqrt((y*y) + (x*x));
		that = new Element('div', {
			'class': 'line ',
			'styles': {
				'width': length+'px',
				'top': (first.y)+'px',
				'left': (first.x)+'px',
				'-webkit-transform': 'rotate('+rad+'rad) translate3d(0px, 0px, 0px)'
			}
		});
		return that;
    }
});

var drawGraphic = function(){

}

var Area = new Class({
	initialize: function(obj){
		var that = this;

		that = new Element('div', {'class': 'area currentArea', 'styles': {'z-index': ++obj.zIndex}});
		//that.prop = {'minWidth': obj.gridScale.x, 'minHeight': obj.gridScale.y};

		that.zIndex = obj.zIndex;
		that.areaColor = 213;

		that.setPosition = function(top, left, width, height){


		/***/
//			kk('old left: '+left);
			if (obj.step.x > 10) {
//				for (var i = 0; i < obj.stepArr.x.length; i++) {
//					if (left < obj.stepArr.x[i]) break;
//				}
//				left = ((obj.stepArr.x[i] - left) < (left - obj.stepArr.x[i-1])) ? obj.stepArr.x[i] : obj.stepArr.x[i-1] ;
				//left = Math.round(left * 0.1) * 10;
				left = returnClosest(left, obj.stepArr.x);
				var right = left + width;
				right = returnClosest(right, obj.stepArr.x);
				width = right - left;

			}
//			kk('new left: '+left);

			/***
			if (obj.step.x > 10) {
				for (var i = 0; i < obj.stepArr.x.length; i++) {
					if (right < obj.stepArr.x[i]) break;
				}
				right = ((obj.stepArr.x[i] - right) < (right - obj.stepArr.x[i-1])) ? obj.stepArr.x[i] : obj.stepArr.x[i-1] ;
				//left = Math.round(left * 0.1) * 10;
			}
			/***/

			if (obj.step.y > 10) {
				top = returnClosest(top, obj.stepArr.y);
				var bottom = top + height;
				bottom = returnClosest(bottom, obj.stepArr.y);
				height = bottom - top;
			}


			if (width < 0) {
				left = left + width;
				width = 0 - width;
			}
			if (height < 0) {
				top = top + height;
				height = 0 - height;
			}
			top = Math.min(Math.max(top, 0), obj.GP.height - obj.gridScale.y);
			top = (obj.SS.h) ? top : 0;


			var diffLeft = left;
			left = Math.min(Math.max(left, 0), obj.GP.width - obj.gridScale.x);
			deffLeft = left - diffLeft;
			left = (obj.SS.v) ? left : 0;
			height = Math.min(Math.max(height, obj.gridScale.y), obj.GP.height - top);
			height = (obj.SS.h) ? height : obj.GP.height;
			width = Math.min(Math.max(width, obj.gridScale.x), obj.GP.width - left);
			width = (obj.SS.v) ? width : obj.GP.width;
			that.setStyles({
				'top': top+px,
				'left': left+px,
				'width': width+px,
				'height': height+px
			});
			that.prop.newX = left;
			that.prop.newY = top;
			that.prop.newW = width;
			that.prop.newH = height;

			that.updateBound();
		};

		that.updateBound = function(){
			//kk(that.prop);
			var prop = {};
			var range = {
				'x': obj.input.X.max - obj.input.X.min,
				'y': obj.input.Y.max - obj.input.Y.min
			};
			prop.x1 = Math.round(that.getStyle('left').toInt() / obj.GP.width * range.x);
			prop.x2 = Math.round((that.getStyle('left').toInt() + that.getStyle('width').toInt()) / obj.GP.width * range.x);
			prop.y2 = Math.round((obj.GP.height - that.getStyle('top').toInt()) / obj.GP.height * range.y);
			prop.y1 = Math.round((obj.GP.height - (that.getStyle('top').toInt() + that.getStyle('height').toInt())) / obj.GP.height * range.y);

			that.getElement('.boundNumber.top').set('text', prop.y2+obj.input.Y.min);
			that.getElement('.boundNumber.bottom').set('text', prop.y1+obj.input.Y.min);
			that.getElement('.boundNumber.left').set('text', prop.x1+obj.input.X.min);
			that.getElement('.boundNumber.right').set('text', prop.x2+obj.input.X.min);

//			that.getElement('.boundNumber.left').set('text', Math.round((prop.x1 + obj.input.X.min) * 0.1) * 10);
//			that.getElement('.boundNumber.right').set('text', Math.round((prop.x2 + obj.input.X.min) * 0.1) * 10);
		};

		var cornerType = ['TT', 'BB', 'LL', 'RR', 'TL', 'TR', 'BL', 'BR'];
		for (var i = 0; i < 8; i++) {
			new Element('div', {'class': ((i < 4) ? 'areaSide' : 'areaCorner')+' '+cornerType[i], 'data-corner': cornerType[i]}).addEvent(mouseDown, function(event){
				that.addClass('resize');
				this.addClass('mouseDown');
				var diff;

				var leftFN = function(){
					if (!obj.SS.v) return;
					diff = event.event.offsetX;
					that.prop.width = obj.gx(that.prop.width - diff);
					that.prop.startX = obj.gx(that.prop.startX + diff);
				};
				var rightFN = function(){
					if (!obj.SS.v) return;
					diff = $(event.target).getCoordinates(event.target.parentNode).left + event.event.offsetX - that.prop.width;
					that.prop.width = obj.gx(that.prop.width + diff);
				};
				var topFN = function(){
					if (!obj.SS.h) return;
					diff = event.event.offsetY;
					that.prop.height = obj.gy(that.prop.height - diff);
					that.prop.startY = obj.gy(that.prop.startY + diff);
				};
				var bottomFN = function(){
					if (!obj.SS.h) return;
					diff = $(event.target).getCoordinates(event.target.parentNode).top + event.event.offsetY - that.prop.height;
					that.prop.height = obj.gy(that.prop.height + diff);
				};
				switch (this.get('data-corner')) {
					case 'TT': topFN(); break;
					case 'BB': bottomFN(); break;
					case 'LL': leftFN(); break;
					case 'RR': rightFN(); break;
					case 'TL': topFN(); leftFN(); break;
					case 'TR': topFN(); rightFN(); break;
					case 'BL': bottomFN(); leftFN(); break;
					case 'BR': bottomFN(); rightFN(); break;
				}

				that.setStyles({
					'top': that.prop.startY+px,
					'left': that.prop.startX+px,
					'width': that.prop.width+px,
					'height': that.prop.height+px
				});

			}).inject(that);

		}

		new Element('div', {'class': 'boundNumber top'}).inject(that);
		new Element('div', {'class': 'boundNumber left'}).inject(that);
		new Element('div', {'class': 'boundNumber right'}).inject(that);
		new Element('div', {'class': 'boundNumber bottom'}).inject(that);

		new Element('div', {'class': 'changeNameBTN mouseEvent'}).addEvent(mouse.click, function(event){
			event.stop();
			var name = prompt("Name of this area", ((that.areaName) ? that.areaName : ''));
			if (name && name.clean() != '') {
				that.areaName = name;
				if (that.getElement('.areaName')) {
					that.getElement('.areaName').set('text', name);
				} else {
					new Element('div', {'class': 'areaName', 'text': name}).inject(that, 'top');
				}
				setTimeout(function(){
					obj.getParent('.contentSpatial').fireEvent('changeSensor', obj);
					obj.getParent('.contentSpatial').fireEvent('changeGraph', obj);
				}, 10);
			}
		}).inject(that);

		new Element('div', {'class': 'changeColorBTN mouseEvent'}).addEvent(mouse.click, function(event){
			event.stop();
			var color = prompt("Color of this area (0 - 360)", that.areaColor);
			if (color && color.toInt()) {
				that.areaColor = color % 360;
				that.setStyle('background-color', 'hsla('+color+',100%,50%,'+((that.hasClass('currentArea')) ? '0.65' : '0.3')+')');
			}
		}).inject(that);

		that.addEvent(mouseDown, function(event){
			document.body.currentArea = this;
			document.body.selectingArea = true;

			$$('.currentArea').each(function(item){
				item.setStyle('background-color', 'hsla('+item.areaColor+', 91%, 56%, 0.3)');
				item.removeClass('currentArea');
			});
			document.body.currentArea.setStyles({'z-index': ++obj.zIndex, 'background-color': 'hsla('+document.body.currentArea.areaColor+', 91%, 56%, 0.65)'}).addClass('currentArea');
			document.body.currentArea.zIndex = obj.zIndex;

			obj.rearrangeArea();

			that.paddingLeft = event.client.x - that.getCoordinates().left;
			that.paddingTop = event.client.y - that.getCoordinates().top;

		});

		that.addEvent('dblclick0', function(){
			var name = prompt("Name of this area","");
			if (name && name.clean() != '') {
				that.areaName = name;
				if (that.getElement('.areaName')) {
					that.getElement('.areaName').set('text', name);
				} else {
					new Element('div', {'class': 'areaName', 'text': name}).inject(that, 'top');
				}
				setTimeout(function(){
					obj.getParent('.contentSpatial').fireEvent('changeSensor', obj);
					obj.getParent('.contentSpatial').fireEvent('changeGraph', obj);
				}, 10);
			}
		});

		return that;
	}
});

var returnClosest = function(num, arr){
	num = Math.max(0, Math.min(arr[arr.length-1], num));
	for (var i = 0; i < arr.length; i++) {
		if (num < arr[i]) break;
	}
	num = ((arr[i] - num) < (num - arr[i-1])) ? arr[i] : arr[i-1] ;
	return num;
}

var printIf = function(startX, width, startY, height){
	var prop = {};
	prop.x1 = Math.round(startX / screenWidth * 1023);
	prop.x2 = Math.round((startX + width) / screenWidth * 1023);
	prop.y1 = Math.round(startY / screenHeight * 1023);
	prop.y2 = Math.round((startY + height) / screenHeight * 1023);
	k("if( ("+prop.x1+" < sensor1 and sensor1 < "+prop.x2+") and ("+prop.y1+" < sensor2 and sensor2 < "+prop.y2+") )");
}
