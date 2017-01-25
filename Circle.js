function Circle(rowNumber, rowPosition, x, y) {
	this.rowNumber = rowNumber;		// which row this circle is in (first row is zero)
	this.rowPosition = rowPosition;	// what position this circle occupies in its row (first position is zero)
	this.x = x + canvasPadding;		// center x coordinate
	this.y = y + canvasPadding;		// center y coordinate
	var cells = [];
}

Circle.prototype.getNeighbor = function(clockPosition, distance) {
	neighborRow = getNeighborRow(clockPosition);
	neighborPosition = getNeighborPosition(clockPosition, neighborRow);
	
	if (neighborRow == null || neighborPosition == null) {
		return null;
	} else if (distance > 1) {
		return myCircles[neighborRow][neighborPosition].getNeighbor(clockPosition, distance - 1);
	} else {
		return myCircles[neighborRow][neighborPosition];
	}
}

Circle.prototype.getNeighborRow = function(clockPosition) {
	switch(clockPosition) {
		// neighbor in row above
		case ClockPosition.clock_1:
		case ClockPosition.clock_11:
			if (rowNumber - 1 >= 0) {
				return rowNumber - 1;
			}
		// neighbor in same row
		case ClockPosition.clock_3:
		case ClockPosition.clock_9:
			return rowNumber;
		// neighbor in row below
		case ClockPosition.clock_5:
		case ClockPosition.clock_7:
			if (rowNumber + 1 < gameSize){
				return rowNumber + 1;
			}
		default:
			return null; // no such row exists
	}
}

Circle.prototype.getNeighborPosition = function(clockPosition, neighborRow) {
	if (neighborRow < rowNumber) {
		// neighbor row is above this row, and smaller (i.e., in upper half of board)
		if (myCircles[neighborRow].length < myCircles[rowNumber].length){
			switch(clockPosition) {
				case ClockPosition.clock_1:
					// same "column" - row position same as this
					if (rowPosition < myCircles[neighborRow].length){
						return rowPosition;
					}
				case ClockPosition.clock_11:
					// previous "column"
					if (rowPosition - 1 >= 0) {
						return rowPosition - 1;
					}
				default:
					return null; // no such row position exists
			}
		// neighbor row is above this row, and larger (i.e., in lower half of board) - positions here will always exist
		} else {
			switch(clockPosition) {
				case ClockPosition.clock_1:
					// next "column"
					return rowPosition + 1;
				case ClockPosition.clock_11:
					// same "column" - row position same as this
					return rowPosition;
			}
		}
	} else if (neighborRow > rowNumber) {
		// neighbor row is below this row, and smaller (i.e., in lower half of board)
		if (myCircles[neighborRow].length < myCircles[rowNumber].length) {
			switch(clockPosition) {
				case ClockPosition.clock_5:
					// same "column" - row position same as this
					if (rowPosition < myCircles[neighborRow].length) {
						return rowPosition;
					}
				case ClockPosition.clock_7:
					// previous "column"
					if (rowPosition - 1 > 0){
						return rowPosition - 1;
					}
				default:
					return null; // no such row position exists
			}
		// neighbor row is below this row, and larger (i.e., in upper half of board) - positions here will always exist
		} else {
			switch(clockPosition) {
				case ClockPosition.clock_5:
					// next "column"
					return rowPosition + 1;
				case ClockPosition.clock_7:
					// same "column" - row position same as this
					return rowPosition;
			}
		}
	} else {
		// neighbor is in same row
		switch(clockPosition) {
			case ClockPosition.clock_3:
				if (rowPosition - 1 >= 0){
					return rowPosition - 1;
				}
			case ClockPosition.clock_9:
				if (rowPosition + 1 < myCircles[rowNumber].length) {
					return rowPosition + 1;
				}
			default:
				return null; // no such row position exists
		}
	}
}
		
Circle.prototype.draw = function() {
	context = myGameArea.context;
	context.lineWidth = circleLineWidth;
	context.strokeStyle = circleLineColor;
	context.beginPath();
	context.arc(this.x, this.y, radius, 0, 2 * Math.PI, false); // x, y, radius, start angle, end angle, boolean counterclockwise
	context.stroke();
}
