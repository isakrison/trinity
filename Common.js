function Coordinates(x, y) {
	this.x = x;
	this.y = y;
}

function convertToRadians(degrees) {
	return (degrees / 360) * 2 * Math.Pi;
}

function convertToDegrees(radians) {
	return radians / (2 * Math.Pi) * 360;
}