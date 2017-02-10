/**************
	OBJECTS
**************/

function Coordinates(x, y) {
	this.x = x;
	this.y = y;
}

/****************
	FUNCTIONS
*****************/

function transformX(x, increment, numberOfIncrements) {
	return Math.round(x + (increment * numberOfIncrements));
}

function transformY(y, increment, numberOfIncrements, direction) {
	if (direction == Direction.up) {
		return Math.round(y - (increment * numberOfIncrements));
	} else {
		return Math.round(y + (increment * numberOfIncrements));
	}
}

function convertToRadians(degrees) {
	return (degrees / 360) * 2 * Math.PI;
}

function convertToDegrees(radians) {
	return radians / (2 * Math.PI) * 360;
}

/**************************
	DEBUGGING FUNCTIONS
***************************/

function printMessage(message) {
	var outputDiv = document.getElementById("messages");
	outputDiv.innerHTML += message + "<br/>";	
}

function printSpaces(numberOfSpaces) {
	var outputDiv = document.getElementById("messages");
	for(i = 0; i < numberOfSpaces; i++) {
		outputDiv.innerHTML += "&nbsp;";
	}
}