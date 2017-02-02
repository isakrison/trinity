function Cell(Circle, ClockPosition) {
	var coordinates = GetCoordinates(Circle, ClockPosition);
	var currentContents;	// game tile currently occupying this cell
	var circles = [];		// circle at index [i] is the circle *that has this cell* at ClockPositions[i]
}

Cell.prototype.getCoordinates = function(circle, clockPosition) {
	// vector math here
}

Cell.prototype.draw = function() {
	
}