function Cell(rowNumber, rowPosition) {
	this.rowNumber = rowNumber;		// which row this cell is in (first row is zero)
	this.rowPosition = rowPosition;	// what position this cell occupies in its row (first position is zero)
	//this.coordinates = this.findCoordinates(rowNumber, rowPosition); // center of cell
	this.currentContents;	// game tile currently occupying this cell
	this.circles = [];		// circle at index [i] is the circle *that has this cell* at ClockFace i
	this.drawn = false;
}

Cell.prototype.findCoordinates = function(circle, clockPosition) {
	//var angle, x, y;
	
	var centerRowIndex, rowOffset;
	var x, y;
	
	centerRowIndex = gameSize - 1;
	rowOffset = Math.abs(centerRowIndex - rowNumber);
	x = transformX(leftmostCircleX, rowPosition * 2 + rowOffset);
	y = rowNumber <= centerRowIndex ? transformY(leftmostCircleY, rowOffset, Direction.up) : transformY(leftmostCircleY, rowOffset, Direction.down);
	
	return new Coordinates(x + canvasPadding, y + canvasPadding);
	
	
	// vector math here
	// distance from circle center = circleSpacing
	// diameter of cell = (radius - centerSpacing) * 2
	/*
	switch(clockPosition) {
		case ClockFace.clock_1:
			angle = convertToRadians(60);
			break;
		case ClockFace.clock_3:
			angle = convertToRadians(0);
			break;
		case ClockFace.clock_5:
			angle = convertToRadians(300);
			break;
		case ClockFace.clock_7:
			angle = convertToRadians(240);
			break;
		case ClockFace.clock_9:
			angle = convertToRadians(180);
			break;
		case ClockFace.clock_11:
			angle = convertToRadians(120);
			break;
		default:
			return null;
	}
	
	x = Math.round(Math.cos(angle) * circleSpacing);
	y = Math.round(Math.sin(angle) * circleSpacing);
	
	return new Coordinates(circle.x + x, circle.y + y);
	*/
};

Cell.prototype.x = function() {
	return this.coordinates.x;
};

Cell.prototype.y = function() {
	return this.coordinates.y;
};

Cell.prototype.draw = function() {
	/*
	context = myGameArea.context;
	context.lineWidth = cellLineWidth;
	context.strokeStyle = cellLineColor;
	context.beginPath();
	context.arc(this.x(), this.y(), (radius - centerSpacing) * 2, 0, 2 * Math.PI, false); // x, y, radius, start angle, end angle, boolean counterclockwise
	context.stroke();
	*/
	this.drawn = true;
};