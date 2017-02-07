function Cell(Circle, ClockPosition) {
	this.coordinates = this.findCoordinates(Circle, ClockPosition);
	this.currentContents;	// game tile currently occupying this cell
	this.circles = [];		// circle at index [i] is the circle *that has this cell* at ClockPosition i
}

Cell.prototype.findCoordinates = function(circle, clockPosition) {
	var angle, x, y;
	// vector math here
	// distance from circle center = circleSpacing
	// diameter of cell = (radius - centerSpacing) * 2
	switch(clockPosition) {
		case ClockPosition.clock_1:
			angle = convertToRadians(60);
			break;
		case ClockPosition.clock_3:
			angle = convertToRadians(0);
			break;
		case ClockPosition.clock_5:
			angle = convertToRadians(300);
			break;
		case ClockPosition.clock_7:
			angle = convertToRadians(240);
			break;
		case ClockPosition.clock_9:
			angle = convertToRadians(180);
			break;
		case ClockPosition.clock_11:
			angle = convertToRadians(120);
			break;
		default:
			return null;
	}
	
	x = Math.round(Math.cos(angle) * circleSpacing);
	y = Math.round(Math.sin(angle) * circleSpacing);
	
	return new Coordinates(circle.x + x, circle.y + y);
}

Cell.prototype.x = function() {
	return this.coordinates.x;
}

Cell.prototype.y = function() {
	return this.coordinates.y;
}

Cell.prototype.draw = function() {
	context = myGameArea.context;
	context.lineWidth = cellLineWidth;
	context.strokeStyle = cellLineColor;
	context.beginPath();
	context.arc(this.coordinates.x, this.coordinates.y, (radius - centerSpacing) * 2, 0, 2 * Math.PI, false); // x, y, radius, start angle, end angle, boolean counterclockwise
	context.stroke();
}