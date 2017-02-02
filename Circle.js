function Circle(rowNumber, rowPosition, coordinates) {
	this.rowNumber = rowNumber;		// which row this circle is in (first row is zero)
	this.rowPosition = rowPosition;	// what position this circle occupies in its row (first position is zero)
	this.coordinates = coordinates;
	this.coordinates.x += canvasPadding;	// center x coordinate
	this.coordinates.y += canvasPadding;	// center y coordinate
	var cells = [];
}

Circle.prototype.getCell(clockPosition){
	if(typeof cells[clockPosition] === "undefined") {
		return null;
	}
	return cells[clockPosition];
}
		
Circle.prototype.draw = function() {
	//alert("got here: Circle.draw");
	context = myGameArea.context;
	context.lineWidth = circleLineWidth;
	context.strokeStyle = circleLineColor;
	context.beginPath();
	context.arc(this.coordinates.x, this.coordinates.y, radius, 0, 2 * Math.PI, false); // x, y, radius, start angle, end angle, boolean counterclockwise
	alert("x = " + this.coordinates.x + "\ny = " + this.coordinates.y);
	context.stroke();
	//alert("got here: end of Circle.draw");
}
