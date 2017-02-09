function Circle(rowNumber, rowPosition) {
	this.rowNumber = rowNumber;		// which row this circle is in (first row is zero)
	this.rowPosition = rowPosition;	// what position this circle occupies in its row (first position is zero)
	this.coordinates = this.findCoordinates(rowNumber, rowPosition); // circle origin coordinates
	this.cells = [];
}

Circle.prototype.findCoordinates = function(rowNumber, rowPosition) {
	var centerRowIndex, rowOffset;
	var x, y;
	
	centerRowIndex = gameSize - 1;
	rowOffset = Math.abs(centerRowIndex - rowNumber);
	x = transformX(leftmostCircleX, circleXIncrement, rowPosition * 2 + rowOffset);
	y = rowNumber <= centerRowIndex ? transformY(leftmostCircleY, circleYIncrement, rowOffset, Direction.up)
		: transformY(leftmostCircleY, circleYIncrement, rowOffset, Direction.down);
	
	return new Coordinates(x + canvasPadding, y + canvasPadding);
}

Circle.prototype.x = function() {
	return this.coordinates.x;
};

Circle.prototype.y = function() {
	return this.coordinates.y;
};

Circle.prototype.getCell = function(clockPosition){
	if(typeof this.cells[clockPosition] === "undefined") {
		return null;
	}
	return this.cells[clockPosition];
};
		
Circle.prototype.draw = function() {
	context = myGameArea.context;
	context.lineWidth = circleLineWidth;
	context.strokeStyle = circleLineColor;
	context.beginPath();
	context.arc(this.x(), this.y(), radius, 0, 2 * Math.PI, false); // x, y, radius, start angle, end angle, boolean counterclockwise
	context.stroke();
};
