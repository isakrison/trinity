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
	// trying out a different radius value:
	/*
		Playing with this gives very different effects:
			~ circleRadius give a straightforward hex grid
			~ circleRadius - cellRadius gives the same, but with cleaner lines that work very well visually
			~ circleRadius - cellRadius / 2 gives something closer to the original petal/vertex context
				- visually, this version is actually doable - it's just that the cells would move in straight lines rather than along a smooth curve
				- there are only petals and vertices, and each cell is one or the other - still, you could do interesting things with the rules using
				  just those
				- for visual clarity, probably you'd make the "star" that forms around each cell solid - or possibly eliminate it altogether, though
				  this would make the board less curvy and more geometric. Also, the math would be interesting
	*/
	var drawnRadius = circleRadius - cellRadius * .75;
	
	context = myGameArea.context;
	context.lineWidth = circleLineWidth;
	context.strokeStyle = circleLineColor;
	context.beginPath();
	context.arc(this.x(), this.y(), drawnRadius, 0, convertToRadians(360), false); // x, y, circleRadius, start angle, end angle, boolean counterclockwise
	context.stroke();
};
