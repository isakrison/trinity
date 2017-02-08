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

function transformX(x, increments) {
	return x + (xIncrement * increments);
}

function transformY(y, increments, direction) {
	if (direction == Direction.up) {
		return y - (yIncrement * increments);
	} else {
		return y + (yIncrement * increments);
	}
}

function convertToRadians(degrees) {
	return (degrees / 360) * 2 * Math.Pi;
}

function convertToDegrees(radians) {
	return radians / (2 * Math.Pi) * 360;
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