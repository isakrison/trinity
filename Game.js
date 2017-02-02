// here, we declare myGameArea as an object with properties (canvas) and methods (start).
var myGameArea = {
	canvas	: document.createElement("canvas"),
	start	: function () {
				this.canvas.width = gameAreaWidth + (canvasPadding * 2);
				this.canvas.height = gameAreaHeight + (canvasPadding * 2);
				this.context = this.canvas.getContext("2d");                          	// provides a context object for drawing 2d stuff (as opposed to 3d or bitmap)
				document.body.insertBefore(this.canvas, document.body.childNodes[0]);   // inserts the canvas as the very first child of the document - i.e., top of page unless styled otherwise
				//this.interval = setInterval(updateGameArea, 20);
	},
	clear	: function () {
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function defineCircles() {
	var x, y;
	var centerRowIndex = gameSize - 1;
	var rowOffset, rowNumber;
	// generate rows from the outside in
	for (i = 0; i < gameSize; i++) {
		rowOffset = centerRowIndex - i;
		x = transformX(startingX, rowOffset);
		y = transformY(startingY, rowOffset, Direction.up);
		rowNumber = centerRowIndex - rowOffset;
		myCircles[rowNumber] = generateRow(rowNumber, i, x, y);
		if (rowOffset > 0) {
			y = transformY(startingY, rowOffset, Direction.down);
			rowNumber = centerRowIndex + rowOffset;
			myCircles[rowNumber] = generateRow(rowNumber, i, x, y);
		}
	}
}

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

function generateRow(rowNumber, rowSize, x, y){
	var row = [];
	this.x;
	
	for (j = 0; j < gameSize + rowSize; j++) {
		this.x = transformX(x, j * 2);
		row[j] = new Circle(rowNumber, j, new Coordinates(this.x, y));
	}
	
	return row;
}

function drawCircles() {
	for (i = 0; i < myCircles.length; i++) {
		for (j = 0; j < myCircles[i].length; j++) {
			myCircles[i][j].draw();
		}
	}
}

function defineCells() {
	
	/*
		for each circle:
			for each of 6 cell slots:
				check to see if this cell has already been generated on a different circle, and assign if so
					each circle shares one cell with its 2nd-neighbor at each of 6 odd-numbered clock points
				if not, generate the cell			
	*/	
	for (i = 1; i < myCircles.length; i++) {
		for (j = 0; j < myCircles[i].length; j++) {
			assignCells(myCircles[i][j]);					
		}
	}
}

function assignCells(circle) {
	var neighbor, sharedCell;
	
	for (i = 0; i < 6; i++) {
		// check if cell exists
		neighbor = getNeighboringCircle(ClockPosition[i], 2);		
		if (myNeighbor != null) {
			sharedCell = neighbor.getCell(ClockPosition[i > 2 ? i - 3 : i]);
		}
		if (sharedCell != null) {
			sharedCell.circles[clockPosition[i]] = circle;
			circle.cells[i] = sharedCell;
			continue;
		}
		// if not, define one
		circle.cells[i] = new Cell(circle, ClockPositions[i]);
		circle.cells[i].circles[clockposition[i]] = circle;
	}
}

function getNeighboringCircle(circle, clockPosition, distance){
	var neighborRow = getNeighborRow(circle, clockPosition);
	var neighborPosition = getNeighborPosition(circle, clockPosition, neighborRow);
	
	if (neighborRow == null || neighborPosition == null) {
		return null;
	} else if (distance > 1) {
		return myCircles[neighborRow][neighborPosition].getNeighbor(clockPosition, distance - 1);
	} else {
		return myCircles[neighborRow][neighborPosition];
	}
}

function getNeighborRow(circle, clockPosition) {
	switch(clockPosition) {
		// neighbor in row above
		case ClockPosition.clock_1:
		case ClockPosition.clock_11:
			if (circle.rowNumber - 1 >= 0) {
				return circle.rowNumber - 1;
			}
		// neighbor in same row
		case ClockPosition.clock_3:
		case ClockPosition.clock_9:
			return circle.rowNumber;
		// neighbor in row below
		case ClockPosition.clock_5:
		case ClockPosition.clock_7:
			if (circle.rowNumber + 1 < gameSize){
				return circle.rowNumber + 1;
			}
		default:
			return null; // no such row exists
	}
}

function getNeighborPosition(circle, clockPosition, neighborRow) {
	if (neighborRow < circle.rowNumber) {
		// neighbor row is above this row, and smaller (i.e., in upper half of board)
		if (myCircles[neighborRow].length < myCircles[circle.rowNumber].length){
			switch(clockPosition) {
				case ClockPosition.clock_1:
					// same "column" - row position same as this
					if (circle.rowPosition < myCircles[neighborRow].length){
						return circle.rowPosition;
					}
				case ClockPosition.clock_11:
					// previous "column"
					if (circle.rowPosition - 1 >= 0) {
						return circle.rowPosition - 1;
					}
				default:
					return null; // no such row position exists
			}
		// neighbor row is above this row, and larger (i.e., in lower half of board) - positions here will always exist
		} else {
			switch(clockPosition) {
				case ClockPosition.clock_1:
					// next "column"
					return circle.rowPosition + 1;
				case ClockPosition.clock_11:
					// same "column" - row position same as this
					return circle.rowPosition;
			}
		}
	} else if (neighborRow > circle.rowNumber) {
		// neighbor row is below this row, and smaller (i.e., in lower half of board)
		if (myCircles[neighborRow].length < myCircles[circle.rowNumber].length) {
			switch(clockPosition) {
				case ClockPosition.clock_5:
					// same "column" - row position same as this
					if (circle.rowPosition < myCircles[neighborRow].length) {
						return circle.rowPosition;
					}
				case ClockPosition.clock_7:
					// previous "column"
					if (circle.rowPosition - 1 > 0){
						return circle.rowPosition - 1;
					}
				default:
					return null; // no such row position exists
			}
		// neighbor row is below this row, and larger (i.e., in upper half of board) - positions here will always exist
		} else {
			switch(clockPosition) {
				case ClockPosition.clock_5:
					// next "column"
					return circle.rowPosition + 1;
				case ClockPosition.clock_7:
					// same "column" - row position same as this
					return circle.rowPosition;
			}
		}
	} else {
		// neighbor is in same row
		switch(clockPosition) {
			case ClockPosition.clock_3:
				if (circle.rowPosition - 1 >= 0){
					return circle.rowPosition - 1;
				}
			case ClockPosition.clock_9:
				if (circle.rowPosition + 1 < myCircles[circle.rowNumber].length) {
					return circle.rowPosition + 1;
				}
			default:
				return null; // no such row position exists
		}
	}
}

function drawCells() {
	// draw cells
}

function startGame() {
	myGameArea.start();
	defineCircles();
	//defineCells();
	drawCircles();
}

function updateGameArea() {
	myGameArea.clear();
	drawCircles();
}