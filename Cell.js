function Cell(rowNumber, rowPosition) {
	this.rowNumber = rowNumber;		// which row this cell is in (first row is zero)
	this.rowPosition = rowPosition;	// what position this cell occupies in its row (first position is zero)
	this.coordinates = this.findCoordinates(rowNumber, rowPosition); // center of cell
	this.currentContents;	// game tile currently occupying this cell
	this.circles = [];		// circle at index [i] is the circle *that has this cell* at ClockFace i
	this.phantom = false;
}

Cell.prototype.findCoordinates = function(rowNumber, rowPosition) {
	var centerRowIndex, rowOffset;
	var x, y;
	
	centerRowIndex = gameSize * 2;
	rowOffset = Math.abs(centerRowIndex - rowNumber);
	
	x = transformX(leftmostCircleX, circleXIncrement, rowPosition + rowOffset / 2 - 2);
	y = rowNumber <= centerRowIndex ? transformY(leftmostCircleY, circleYIncrement / 2, rowOffset, Direction.up)
		: transformY(leftmostCircleY, circleYIncrement / 2, rowOffset, Direction.down);
		
	//printMessage("myCells[" + rowNumber + ", " + rowPosition + "]: x = " + x + "; y = " + y);
	
	return new Coordinates(x + canvasPadding, y + canvasPadding);
};

Cell.prototype.x = function() {
	return this.coordinates.x;
};

Cell.prototype.y = function() {
	return this.coordinates.y;
};

Cell.prototype.draw = function() {
	if(this.circles.length == 0) {
		this.phantom = true;
	} else {
		context = myGameArea.context;
		context.lineWidth = cellLineWidth;
		context.strokeStyle = cellLineColor;
		context.beginPath();
		context.arc(this.x(), this.y(), cellRadius, 0, convertToRadians(360), false); // x, y, circleRadius, start angle, end angle, boolean counterclockwise
		context.stroke();
	}
};