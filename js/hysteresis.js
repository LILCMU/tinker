var area1 = function(x){
	if (x < 600 && x > 0) {
		return 8316;
	} else {
		return 0;
	}
}

var area2 = function(y){
	if (y > 400 && y < 1000) {
		return 8317;
	} else {
		return 0;
	}
}

var area3 = function(z){
	if ((z > 450 && z < 800) || z > 1000) {
		return 8318;
	} else {
		return 0;
	}
}

var currentArea = 'none';
var checkArea = function(value){
	if (area1(value) && area2(value)) {
		//currentArea = 'left';
	} else if (area1(value)) {
		currentArea = 'left';
	} else if (area2(value)) {
		currentArea = 'right';
	} else {
		currentArea = 'none';
	}
	return currentArea;
}

var checkArea2 = function(v){
	if (area1(v) && area2(v) && area3(v)) {
		//currentArea = 'area1';
	} else if (area1(v) && area2(v)) {
		//currentArea = 'area1';
	} else if (area2(v) && area3(v)) {
		//currentArea = 'area2';
	} else if (area1(v) && area3(v)) {
		//currentArea = 'area3';
	} else if (area1(v) && area2(v)) {
		//currentArea = 'area1';
	} else if (area1(v)) {
		currentArea = 'area1';
	} else if (area2(v)) {
		currentArea = 'area2';
	} else if (area3(v)) {
		currentArea = 'area3';
	} else {
		currentArea = 'none';
	}
	return currentArea;
}

var returnValue = 0;
function filterInput(value){
	if (value > 3) {
		returnValue = 1;
	} else if (value < 2) {
		returnValue = 0;
	}
	return returnValue;
}

var area1Index = 1;
var area2Index = 3;
var area3Index = 2;
var countIndex = 3;

var checkArea4 = function(v){
	var diff = countIndex;
	if (area1(v) && (countIndex - area1Index) < diff) {
		diff = (countIndex - area1Index);
		currentArea = area1(v);
	}
	if (area2(v) && (countIndex - area2Index) < diff) {
		diff = (countIndex - area2Index);
		currentArea = area2(v);
	}
	if (area3(v) && (countIndex - area3Index) < diff) {
		diff = (countIndex - area3Index);
		currentArea = area3(v);
	}
	countIndex++;
	if (currentArea == area1(v)) {
		area1Index = countIndex;
	} else if (currentArea == area2(v)) {
		area2Index = countIndex;
	} else if (currentArea == area3(v)) {
		area3Index = countIndex;
	}
	return currentArea;
}

var checkArea3 = function(v){
	if (area1(v) && area2(v) && area3(v)) {
		//currentArea = 'area1';
		if (area1Index == countIndex) {
			currentArea = area1(v);
		} else if (area2Index == countIndex) {
			currentArea = area2(v);
		} else if (area3Index == countIndex) {
			currentArea = area3(v);
		}
	} else if (area1(v) && area2(v)) {
		//currentArea = 'area1';
		
	} else if (area2(v) && area3(v)) {
		//currentArea = 'area2';
	} else if (area1(v) && area3(v)) {
		//currentArea = 'area3';
	} else if (area1(v) && area2(v)) {
		//currentArea = 'area1';
	} else if (area1(v)) {
		currentArea = 'area1';
	} else if (area2(v)) {
		currentArea = 'area2';
	} else if (area3(v)) {
		currentArea = 'area3';
	} else {
		currentArea = 'none';
	}
	return currentArea;
}


var funcA = function(){
	return 'areaA';
}
var funcB = function(){
	return 'areaB';
}
var funcC = function(){
	return 'areaC';
}

var callFunc = function(){
	funcA();
	funcB();
	funcC();
	

}