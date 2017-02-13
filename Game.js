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

var myCircles = [];
var myCells = [];

function generateInitialBoard() {	
	defineCircles();
	defineCells();
	defineCircleCellRelations();
	drawCircles();
	drawCells();
}

function defineCircles() {
	generateHexGrid(gameSize * 2 - 1, myCircles, Circle)
}

function defineCells() {	
	generateHexGrid(gameSize * 2 + 1, myCells, Cell)
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
	for(i = 0; i < Math.ceil(numberOfRows / 2); i++) {
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
	return true;
}

function defineCircleCellRelations() {
	var centerCellRowIndex = gameSize;
	
	for(i = 0; i < myCells.length; i++) {
		for(j = 0; j < myCells[i].length; j++) {
			// the cells in this row are 11s and 1s to a row of circles
			if(i < myCells.length - 2) {
				// cell is in top half of grid
				if(i < centerCellRowIndex) {
					if(j < myCells[i].length - 1) {
						// cell is 11 to myCircles[i, j]
						// printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + i + ", " + j + "], clock 11");
						assignCell(myCells[i][j], myCircles[i][j], ClockFace.clock_11);
					}
					if(j > 0) {
						// cell is 1 to myCircles[i, j-1]
						// printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + i + ", " + (j - 1) + "], clock 1");
						assignCell(myCells[i][j], myCircles[i][j - 1], ClockFace.clock_1);
					}
				// cell is in bottom half of grid or center row
				} else {
					if(j > 0 && j < myCells[i].length - 2) {
						// cell is 11 to myCircles[i, j-1]
						// printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + i + ", " + (j - 1) + "], clock 11");
						assignCell(myCells[i][j], myCircles[i][j - 1], ClockFace.clock_11);
					}
					if(j > 1 && j < myCells[i].length - 1) {
						// cell is 1 to myCircles[i, j-2]
						// printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + i + ", " + (j - 2) + "], clock 1");
						assignCell(myCells[i][j], myCircles[i][j - 2], ClockFace.clock_1);
					}					
				}
			}
			// the cells in this row are 3s and 9s to a row of circles
			if(i > 0 && i < myCells.length - 1) {
				if(j < myCells[i].length - 2) {
					// cell is 9 to myCircles[i-1, j]
					// printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i - 1) + ", " + j + "], clock 9");
					assignCell(myCells[i][j], myCircles[i - 1][j], ClockFace.clock_9);
				}
				if(j > 1) {
					// cell is 3 to myCircles[i-1, j-2]
					// printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i - 1) + ", " + (j - 2) + "], clock 3");
					assignCell(myCells[i][j], myCircles[i - 1][j - 2], ClockFace.clock_3);
				}				
			}
			// the cells in this row are 5s and 7s to a row of circles
			if(i > 1) {
				// cell is in top half of grid or center row
				if(i <= centerCellRowIndex) {
					if(j > 0 && j < myCells[i].length - 2) {
						// cell is 7 to myCircles[i-2, j-1]
						// printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i - 2) + ", " + (j - 1) + "], clock 7");
						assignCell(myCells[i][j], myCircles[i - 2][j - 1], ClockFace.clock_7);
					}
					if(j > 1 && j < myCells[i].length - 1) {
						// cell is 5 to myCircles[i-2, j-2]
						// printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i - 2) + ", " + (j - 2) + "], clock 5");
						assignCell(myCells[i][j], myCircles[i - 2][j - 2], ClockFace.clock_5);
					}
				// cell is in bottom half of grid
				} else {					
					if(j < myCells[i].length - 1) {
						// cell is 7 to myCircles[i-2, j]
						// printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i - 2) + ", " + j + "], clock 7");
						assignCell(myCells[i][j], myCircles[i - 2][j], ClockFace.clock_7);
					}
					if(j > 0) {
						// cell is 5 to myCircles[i-2, j-1]
						// printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i - 2) + ", " + (j - 1) + "], clock 5");
						assignCell(myCells[i][j], myCircles[i - 2][j - 1], ClockFace.clock_5);
					}
				}
			}
		}
	}
}

function assignCell(cell, circle, clockPosition) {
	circle.cells[clockPosition] = cell;
	cell.circles[clockPosition] = circle;
}

function drawCircles() {
	drawGrid(myCircles);
}

function drawCells() {
	drawGrid(myCells);
}

function drawGrid(gridArray) {
	for (i = 0; i < gridArray.length; i++) {
		for (j = 0; j < gridArray[i].length; j++) {
			gridArray[i][j].draw();
		}
	}
}

function getOppositeClockPosition(clockPosition) {
	return clockPosition > 2 ? clockPosition - 3 : clockPosition;
}

function getNeighboringCircle(circle, clockPosition, distance){	
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
	switch(clockPosition) {
		// neighbor in row above
		case ClockFace.clock_1:
		case ClockFace.clock_11:
			if (circle.rowNumber - 1 >= 0) {
				return circle.rowNumber - 1;
			}
			break;
		// neighbor in same row
		case ClockFace.clock_3:
		case ClockFace.clock_9: {
			return circle.rowNumber;
		}
		break;
		// neighbor in row below
		case ClockFace.clock_5:
		case ClockFace.clock_7:
			if (circle.rowNumber + 1 < gameSize){
				return circle.rowNumber + 1;
			}
	}

	return null; // no such row exists
}

function getNeighborPosition(circle, clockPosition, neighborRow) {
	if (neighborRow < circle.rowNumber) {
		// neighbor row is above this row, and smaller (i.e., in upper half of board)
		if (myCircles[neighborRow].length < myCircles[circle.rowNumber].length){
			switch(clockPosition) {
				case ClockFace.clock_1:
					// same "column" - row position same as this
					if (circle.rowPosition < myCircles[neighborRow].length){
						return circle.rowPosition;
					}
				case ClockFace.clock_11:
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
				case ClockFace.clock_1:
					// next "column"
					return circle.rowPosition + 1;
				case ClockFace.clock_11:
					// same "column" - row position same as this
					return circle.rowPosition;
			}
		}
	} else if (neighborRow > circle.rowNumber) {
		// neighbor row is below this row, and smaller (i.e., in lower half of board)
		if (myCircles[neighborRow].length < myCircles[circle.rowNumber].length) {
			switch(clockPosition) {
				case ClockFace.clock_5:
					// same "column" - row position same as this
					if (circle.rowPosition < myCircles[neighborRow].length) {
						return circle.rowPosition;
					}
				case ClockFace.clock_7:
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
				case ClockFace.clock_5:
					// next "column"
					return circle.rowPosition + 1;
				case ClockFace.clock_7:
					// same "column" - row position same as this
					return circle.rowPosition;
			}
		}
	} else {
		// neighbor is in same row
		switch(clockPosition) {
			case ClockFace.clock_3:
				if (circle.rowPosition + 1 < myCircles[circle.rowNumber].length) {
					return circle.rowPosition + 1;
				}
			case ClockFace.clock_9:
				if (circle.rowPosition - 1 >= 0){
					return circle.rowPosition - 1;
				}
			default:
				return null; // no such row position exists
		}
	}
}

function startGame() {
	myGameArea.start();
	generateInitialBoard();
}

function updateGameArea() {
	myGameArea.clear();
	drawCircles();
}