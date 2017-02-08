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
	generateHexGrid(gameSize * 2 - 1, myCircles, Circle)
	/*
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
	
	for (a = 0; a < myCircles.length; a++){
		printMessage("");
		printMessage("myCircles[" + a + "].length = " + myCircles[a].length, "darkorange");
		for (b = 0; b < myCircles[a].length; b++) {
			printMessage("myCircles[" + a + ", " + b + "] = " + typeof myCircles[a][b]);
		}
	}
	*/
}

function generateHexGrid(numberOfRows, gridArray, func_constructor) {
	if(numberOfRows % 2 != 1) {
		// error
		return false;
	}
	
	var rowNumber, rowLength;
	rowNumber = 0;
	rowLength = Math.floor(numberOfRows / 2);
	
	// top half of grid - row length increasing
	for(i = 0; i < Math.ceiling(numberOfRows / 2); i++) {
		rowLength++; 
		var row = [];
		for(j = 0; j < rowLength; j++) {
			row[j] = new func_constructor(i, j);
		}
		gridArray[i] = row;
		rowNumber++;
	}
	// bottom half of grid - row length decreasing
	for(i = rowNumber++; i < numberOfRows; i++) {
		rowLength--;
		var row = [];
		for(j = 0; j < rowLength; j++) {
			row[j] = new func_constructor(i, j);
		}
		gridArray[i] = row;
	}
}

function generateRow(rowNumber, rowSizeModifier, x, y){
	// move x, y logic to circle constructor, making this a pure logic structure builder?
	var row = [];
	this.x;
	
	for (j = 0; j < gameSize + rowSizeModifier; j++) {
		this.x = transformX(x, j * 2);
		row[j] = new Circle(rowNumber, j, new Coordinates(this.x, y));
	}
	
	printMessage("row.length = " + row.length);
	
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
	// define a separate grid of cells
		// there are 2(gameSize) + 1 rows of cells
		// the middle row of cells is 2(gameSize) + 1 cells across
		// the top and bottom rows of cells are gameSize + 1 cells across
	
	generateHexGrid(gameSize * 2 + 1, myCells, Cell)
		
	/*
	for (i = 0; i < myCircles.length; i++) {
		for (j = 0; j < myCircles[i].length; j++) {
			assignCells(myCircles[i][j]);					
		}
	}
	*/
}

function assignCells(circle) {
	// here we already have a grid of cells
	// we just need to assign circles to cells and vice versa
	// two functions maybe, for clarity
	
	
	/*
	var neighbor, sharedCell;
	var clockPosition;
	printMessage("");
	printMessage("in assignCell: myCircles[" + circle.rowNumber + ", " + circle.rowPosition + "]");
	
	for (var key in ClockPosition) {
		printSpaces(4);
		printMessage("clockPosition " + ClockPosition[key]);
		
		clockPosition = ClockPosition[key];
		// check if cell exists
		neighbor = getNeighboringCircle(circle, clockPosition, 2);
		if (neighbor != null) {
			printSpaces(8);
			printMessage("neighbor = myCircles[" + neighbor.rowNumber + ", " + neighbor.rowPosition + "]");
			sharedCell = neighbor.getCell(getOppositeClockPosition(ClockPosition[key]));
		} else {
			printSpaces(8);
			printMessage("neighbor is null");
		}
		if (sharedCell != null) {
			printSpaces(8);
			printMessage("cell = myCircles[" + neighbor.rowNumber + ", " + neighbor.rowPosition + "].cells[" + getOppositeClockPosition(ClockPosition[key]) + "]");
			sharedCell.circles[clockPosition] = circle;
			circle.cells[clockPosition] = sharedCell;
			continue;
		}
		// if not, define one
		printSpaces(8);
		printMessage("defining new Cell");
		circle.cells[clockPosition] = new Cell(circle, clockPosition);
		circle.cells[clockPosition].circles[clockPosition] = circle;
	}
	*/
}

function getOppositeClockPosition(clockPosition) {
	return clockPosition > 2 ? clockPosition - 3 : clockPosition;
}

function getNeighboringCircle(circle, clockPosition, distance){
	printSpaces(12);
	printMessage("in getNeighboringCircle(myCircles[" + circle.rowNumber + ", " + circle.rowPosition + "], clockPosition " + clockPosition + ", distance " + distance + ")");
	
	var neighborRow, neighborPosition
	
	neighborRow = getNeighborRow(circle, clockPosition);
	if(neighborRow == null) {
		return null;
	}	
	neighborPosition = getNeighborPosition(circle, clockPosition, neighborRow);	
	if (neighborPosition == null) {
		return null;
	} else if (distance > 1) {
		return getNeighboringCircle(myCircles[neighborRow][neighborPosition], clockPosition, distance - 1);
	} else {
		return myCircles[neighborRow][neighborPosition];
	}
}

function getNeighborRow(circle, clockPosition) {
	printSpaces(16);
	printMessage("in getNeighborRow(myCircles[" + circle.rowNumber + ", " + circle.rowPosition + "], clockPosition " + clockPosition + ")");
	
	switch(clockPosition) {
		// neighbor in row above
		case ClockPosition.clock_1:
		case ClockPosition.clock_11:
			if (circle.rowNumber - 1 >= 0) {
				printSpaces(20);
				printMessage("neighborRow = " + circle.rowNumber - 1);
				return circle.rowNumber - 1;
			}
			break;
		// neighbor in same row
		case ClockPosition.clock_3:
		case ClockPosition.clock_9: {
			printSpaces(20);
			printMessage("neighborRow is same row");
			return circle.rowNumber;
		}
		break;
		// neighbor in row below
		case ClockPosition.clock_5:
		case ClockPosition.clock_7:
			if (circle.rowNumber + 1 < gameSize){
				printSpaces(20);
				printMessage("neighborRow = " + circle.rowNumber + 1);
				return circle.rowNumber + 1;
			}
	}

	printSpaces(20);
	printMessage("neighborRow is null");
	return null; // no such row exists
}

function getNeighborPosition(circle, clockPosition, neighborRow) {
	printSpaces(16);
	printMessage("in getNeighborPosition(myCircles[" + circle.rowNumber + ", " + circle.rowPosition + "], clockPosition " + clockPosition + ", neighborRow " + neighborRow + ")");
	if (neighborRow < circle.rowNumber) {
		// neighbor row is above this row, and smaller (i.e., in upper half of board)
		if (myCircles[neighborRow].length < myCircles[circle.rowNumber].length){
			printSpaces(20);
			printMessage("neighbor row is above this row, and smaller");
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
			printSpaces(20);
			printMessage("neighbor row is above this row, and larger");
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
			printSpaces(20);
			printMessage("neighbor row is below this row, and smaller");
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
			printSpaces(20);
			printMessage("neighbor row is below this row, and larger");
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
		printSpaces(20);
		printMessage("neighbor is in same row");
		switch(clockPosition) {
			case ClockPosition.clock_3:
				if (circle.rowPosition + 1 < myCircles[circle.rowNumber].length) {
					return circle.rowPosition + 1;
				}
			case ClockPosition.clock_9:
				if (circle.rowPosition - 1 >= 0){
					return circle.rowPosition - 1;
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
	defineCells();
	drawCircles();
}

function updateGameArea() {
	myGameArea.clear();
	drawCircles();
}