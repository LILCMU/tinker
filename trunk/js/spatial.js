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


document.addEvent('init1', function(){
	
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
				event.stop();
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
					currentSpatial.sanpToGrid = !currentSpatial.sanpToGrid;
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

var Spatial = new Class({
	initialize: function(){
		var that = this;
		
		that = new Element('div', {'class': 'spatial'});
		
		that.sanpToGrid = false;
		that.zIndex = 1;
		
		that.GP = { // graphic position
			'top': 20,
			'left': 60,
			'width': 400,
			'height': 400
		}
		
		that.gridAmount = {
			'x': 20,
			'y': 20
		}
		
		that.gridScale = {
			'x': that.GP.width / that.gridAmount.x,
			'y': that.GP.height / that.gridAmount.y
		}
		
		that.setGridAmount = function(x, y){
			that.gridAmount.x = x;
			that.gridAmount.y = y;
			that.setGridScale();
		}
		
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
		}
		
		that.drawCanvas = function(){
			that.canvas.set('width', that.GP.width).set('height', that.GP.height);
			var ctx = that.canvas.getContext("2d");
			ctx.lineWidth = 1;
			ctx.save();
			ctx.restore();
			for (var i = 0, j = 0; i <= that.gridScale.x * that.gridAmount.x; i+=that.gridScale.x, j++) {
				ctx.strokeStyle = (j % 5 == 0) ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.15)';
				ctx.beginPath();
				ctx.moveTo(Math.round(i), 0);
				ctx.lineTo(Math.round(i), that.gridScale.y * that.gridAmount.y);
				ctx.stroke();
			}
			for (var i = 0, j=0; i <= that.gridScale.y * that.gridAmount.y; i+=that.gridScale.y, j++) {
				ctx.strokeStyle = (j % 5 == 0) ? 'rgba(0, 0, 0, 0.25)' : 'rgba(0, 0, 0, 0.15)';
				ctx.beginPath();
				ctx.moveTo(0, Math.round(i));
				ctx.lineTo(that.gridScale.x * that.gridAmount.x, Math.round(i));
				ctx.stroke();
			}
			ctx.save();
		}
		
		that.canvas = new Element('canvas', {
			'class': 'canvasGraphic'
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
		
		new Element('div', {'class': 'toggleGrid '+mouseEvent, 'text': 'toggle grid'})
		.addEvent(click, function(){
			this.toggleClass('gridOn');
			that.sanpToGrid = this.hasClass('gridOn');
		})
		.inject(that.controlArea);
		
		var sensorScale = new SensorScale(that).inject(that.graphArea);
		sensorScale.setScale(-1, -1);
		
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
			new Element('div', {
				'id': 'sensor-'+axis+'-'+sensorNo, 
				'class': mouseEvent+' sensor'+axis+' '+((i == 0 || i == 9) ? "sensorOn" : "")+' '+((i == 1 || i == 8) ? "disabled" : ""), 
				'text': sensorNo,
				'data-axis': axis,
				'data-ss': sensorNo,
				'styles': btnStyle
			})
			.addEvent(mouse.click, function(){
				var nextState = !this.hasClass('sensorOn');
				
				var opAxis = (this.get('data-axis') == 'X') ? 'Y' : 'X';
				var curWay = (this.get('data-axis') == 'X') ? 'v' : 'h';
				var diffWay = (this.get('data-axis') == 'X') ? 'h' : 'v'; 
				
				if (this.hasClass('sensorOn')) {
					this.removeClass('sensorOn');
					$('sensor-'+opAxis+'-'+this.get('data-ss')).removeClass('disabled');
					SS[curWay] = false;
				} else {
					$$('#control-area .sensor'+this.get('data-axis')).removeClass('sensorOn');
					$$('#control-area .sensor'+opAxis).removeClass('disabled');
					SS[curWay] = true;
					if (!this.hasClass('disabled')) {
						
						$('sensor-'+opAxis+'-'+this.get('data-ss')).addClass('disabled');
						this.addClass('sensorOn');
						
					} else {
						SS[diffWay] = false;
						this.removeClass('disabled').addClass('sensorOn');
						$('sensor-'+opAxis+'-'+this.get('data-ss')).addClass('disabled').removeClass('sensorOn');
					}
				}
				
			})
			.inject(that.controlArea);
		}
		
		that.graphArea.addEvent(mouseDown, function(){
			if (!document.body.selectingArea) {
				document.body.currentArea = null;
				$$('.currentArea').removeClass('currentArea');
			}
		}).addEvent(mouseMove, function(event){
			if ($(document.body).hasClass('mouseIsDown')) {
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
					
					currentArea.setStyles({
						'top': prop.newY+px,
						'left': prop.newX+px
					});
					
					//printIf(prop.newX, prop.width, prop.newY, prop.height);
				} else {
					var prop = {'minWidth': that.gridScale.x, 'minHeight': that.gridScale.y};
					prop.startX = (that.SS.v) ? that.gx(Math.min(SPX, CPX) - that.GP.left) : 0;
					prop.startY = (that.SS.h) ? that.gy(Math.min(SPY, CPY) - that.GP.top) : 0;
					prop.width = (that.SS.v) ? Math.max(Math.abs(DX), prop.minWidth) : that.GP.width;
					prop.height = (that.SS.h) ? Math.max(Math.abs(DY), prop.minHeight) : that.GP.height;
					
					k('startY: '+prop.startY+', spy: '+SPY+', cpy: '+CPY+', gp top: '+that.GP.top);
					
					currentArea.setStyles({
						'top': prop.startY+px,
						'left': prop.startX+px,
						'width': prop.width+px,
						'height': prop.height+px
					});
					
					//printIf(prop.startX, prop.width, prop.startY, prop.height);
					
					currentArea.prop = prop;
					
				}
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
			document.body.selectingArea = false;
			//document.body.currentArea = null;
			
		});
		
		that.gx = function(number){
			if (that.sanpToGrid) {
				var newNum = Math.round(Math.round(number / that.gridScale.x) * that.gridScale.x) ;
				return newNum;
				//return ((newNum % (gridScale * 2) ) == 0 ) ? newNum : number;
			}
			return number;
		};
		
		that.gy = function(number){
			if (that.sanpToGrid) {
				var newNum = Math.round(Math.round(number / that.gridScale.y) * that.gridScale.y) ;
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
		
		that.convertToBlockly = function(){
			var strResult = '';
			var areaArr = that.getElements('.area');
			areaArr.each(function(item, index){
				var prop = {};
				prop.x1 = Math.round(item.prop.startX / that.GP.width * 1023);
				prop.x2 = Math.round((item.prop.startX + item.prop.width) / that.GP.width * 1023);
				prop.y2 = Math.round((that.GP.height - item.prop.startY) / that.GP.height * 1023);
				prop.y1 = Math.round((that.GP.height - (item.prop.startY + item.prop.height)) / that.GP.height * 1023);
				//strArr.push("( ("+prop.x1+" < sensor1 and sensor1 < "+prop.x2+") and ("+prop.y1+" < sensor2 and sensor2 < "+prop.y2+") )");
				//var strBlock = 
				strResult = '<block type="procedures_ifreturn" inline="true"><mutation value="1"></mutation><value name="CONDITION"><block type="logic_operation" inline="true"><field name="OP">AND</field><value name="A"><block type="logic_operation" inline="true"><field name="OP">AND</field><value name="A"><block type="logic_compare" inline="true"><field name="OP">LT</field><value name="A"><block type="math_number"><field name="NUM">'+prop.x1+'</field></block></value><value name="B"><block type="variables_get"><field name="VAR">sensor1</field></block></value></block></value><value name="B"><block type="logic_compare" inline="true"><field name="OP">LT</field><value name="A"><block type="variables_get"><field name="VAR">sensor1</field></block></value><value name="B"><block type="math_number"><field name="NUM">'+prop.x2+'</field></block></value></block></value></block></value><value name="B"><block type="logic_operation" inline="true"><field name="OP">AND</field><value name="A"><block type="logic_compare" inline="true"><field name="OP">LT</field><value name="A"><block type="math_number"><field name="NUM">'+prop.y1+'</field></block></value><value name="B"><block type="variables_get"><field name="VAR">sensor2</field></block></value></block></value><value name="B"><block type="logic_compare" inline="true"><field name="OP">LT</field><value name="A"><block type="variables_get"><field name="VAR">sensor2</field></block></value><value name="B"><block type="math_number"><field name="NUM">'+prop.y2+'</field></block></value></block></value></block></value></block></value><value name="VALUE"><block type="logic_boolean"><field name="BOOL">TRUE</field></block></value>'+((strResult == '') ? '' : '<next>'+strResult+'</next>')+'</block>';
				
			});
			//var strResult = 'if ( ' + strArr.join(' or ') + ' )';
			strResult = '<block type="procedures_defreturn" inline="false"><mutation><arg name="sensor1"></arg><arg name="sensor2"></arg></mutation><field name="NAME">convertGraph</field><statement name="STACK">'+strResult+'</statement><value name="RETURN"><block type="logic_boolean"><field name="BOOL">FALSE</field></block></value></block>';
			return strResult;
		};
		
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
			kk(that.lineClickIndex);
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
					that.getElements('.point.selected').each(function(item){
						var thisIndex = item.get('data-index').toInt();
						if (!(thisIndex == 0 || thisIndex == (that.points.length - 1))) 
							that.points.splice(thisIndex, 1);
						item.destroy();
					});
					that.drawPoint();
					event.stop();
					break;
				}
			}
		});
		
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
					switch (event.key) {
						case 'backspace': {
							that.gate[item].set('value', '0').select();
							break;
						}
						case 'enter': {
							kk('enter');
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
		
		that.updateSensor = function(yValue){
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

var SensorScale = new Class({
	initialize: function(obj){
		var that = this;
		
		that = new Element('div', {
			'id': 'ssScale'
		});
		
		that.h = new Element('div', {
			'id': 'ssScale-h',
			'class': 'ssScale'
		}).inject(that);
		
		that.v = new Element('div', {
			'id': 'ssScale-v',
			'class': 'ssScale'
		}).inject(that);
		
		that.setScale = function(x, y){
			if (x < 0) {
				that.v.addClass('disabled');
			} else if (x != 0) {
				that.v.removeClass('disabled');
				that.v.setStyle('left', drawArea.width * x);
			}
			if (y < 0) {
				that.h.addClass('disabled');
			} else if (y != 1) {
				that.h.removeClass('disabled');
				that.h.setStyle('top', drawArea.height * (1 - y));
			}
		};
		
		return that;
	}
});

var Area = new Class({
	initialize: function(obj){
		var that = this;
		
		that = new Element('div', {'class': 'area currentArea', 'styles': {'z-index': ++obj.zIndex}});
		
		that.setPosition = function(top, left, width, height){
			if (width < 0) {
				left = left + width;
				width = 0 - width;
			}
			if (height < 0) {
				top = top + height;
				height = 0 - height;
			}
			top = Math.min(Math.max(top, 0), obj.GP.height - that.prop.minHeight);
			top = (obj.SS.h) ? top : 0;
			var diffLeft = left;
			left = Math.min(Math.max(left, 0), obj.GP.width - that.prop.minWidth);
			deffLeft = left - diffLeft;
			left = (obj.SS.v) ? left : 0;
			height = Math.min(Math.max(height, that.prop.minHeight), obj.GP.height - top);
			height = (obj.SS.h) ? height : obj.GP.height;
			width = Math.min(Math.max(width, that.prop.minWidth), obj.GP.width - left);
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
		
		that.addEvent(mouseDown, function(event){
			document.body.currentArea = this;
			document.body.selectingArea = true;
			$$('.currentArea').removeClass('currentArea');
			document.body.currentArea.setStyle('z-index', ++obj.zIndex).addClass('currentArea');
			
			that.paddingLeft = event.client.x - that.getCoordinates().left;
			that.paddingTop = event.client.y - that.getCoordinates().top;
		});
		
		return that;
	}
});

var printIf = function(startX, width, startY, height){
	var prop = {};
	prop.x1 = Math.round(startX / screenWidth * 1023);
	prop.x2 = Math.round((startX + width) / screenWidth * 1023);
	prop.y1 = Math.round(startY / screenHeight * 1023);
	prop.y2 = Math.round((startY + height) / screenHeight * 1023);
	k("if( ("+prop.x1+" < sensor1 and sensor1 < "+prop.x2+") and ("+prop.y1+" < sensor2 and sensor2 < "+prop.y2+") )");
}