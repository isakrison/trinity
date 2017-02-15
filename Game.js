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
	generateHexGrid(gameSize * 4 + 1, myCells, Cell)
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
	var centerCellRowIndex = gameSize * 2;
	
	for(i = 0; i < myCells.length; i++) {
		if(i % 2 == 0) {
		// we're on an even-indexed row
			for(j = 0; j < myCells[i].length; j++) {
				if(j % 2 == 0){
				// even-indexed cells in even-indexed rows occupy odd-numbered clock positions (vortices)
					if(i < myCells.length - 4) {
					// cells in this row are 11s and 1s to a row of circles
						if(i < centerCellRowIndex) {
						// cell is in top half of grid
							if(j < myCells[i].length - 2) {
								printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2) + ", " + (j / 2) + "], clock 11");
								assignCell(myCells[i][j], myCircles[i / 2][j / 2], ClockFace.clock_11);
							}
							if(j > 0) {
								printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2) + ", " + (j / 2 - 1) + "], clock 1");
								assignCell(myCells[i][j], myCircles[i / 2][j / 2 - 1], ClockFace.clock_1);
							}
						} else {
						// cell is in bottom half of grid or center row
							if(j > 0 && j < myCells[i].length - 4) {
								printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2) + ", " + (j / 2 - 1) + "], clock 11");
								assignCell(myCells[i][j], myCircles[i / 2][j / 2 - 1], ClockFace.clock_11);
							}
							if(j > 2 && j < myCells[i].length - 2) {
								printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2) + ", " + (j / 2 - 2) + "], clock 1");
								assignCell(myCells[i][j], myCircles[i / 2][j / 2 - 2], ClockFace.clock_1);
							}					
						}
					}
					if(i > 0 && i < myCells.length - 2) {
					// cells in this row are 3s and 9s to a row of circles
						if(j < myCells[i].length - 4) {
							printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2 - 1) + ", " + (j / 2) + "], clock 9");
							assignCell(myCells[i][j], myCircles[i / 2 - 1][j / 2], ClockFace.clock_9);
						}
						if(j > 2) {
							printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2 - 1) + ", " + (j / 2 - 2) + "], clock 3");
							assignCell(myCells[i][j], myCircles[i / 2 - 1][j / 2 - 2], ClockFace.clock_3);
						}				
					}
					if(i > 2) {
					// cells in this row are 5s and 7s to a row of circles
						// cell is in top half of grid or center row
						if(i <= centerCellRowIndex) {
							if(j > 0 && j < myCells[i].length - 4) {
								printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2 - 2) + ", " + (j / 2 - 1) + "], clock 7");
								assignCell(myCells[i][j], myCircles[i / 2 - 2][j / 2 - 1], ClockFace.clock_7);
							}
							if(j > 2 && j < myCells[i].length - 2) {
								printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2 - 2) + ", " + (j / 2 - 2) + "], clock 5");
								assignCell(myCells[i][j], myCircles[i / 2 - 2][j / 2 - 2], ClockFace.clock_5);
							}
						} else {
						// cell is in bottom half of grid					
							if(j < myCells[i].length - 2) {
								printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2 - 2) + ", " + (j / 2) + "], clock 7");
								assignCell(myCells[i][j], myCircles[i / 2 - 2][j / 2], ClockFace.clock_7);
							}
							if(j > 0) {
								printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2 - 2) + ", " + (j / 2 - 1) + "], clock 5");
								assignCell(myCells[i][j], myCircles[i / 2 - 2][j / 2 - 1], ClockFace.clock_5);
							}
						}
					}
				} else {
				// odd-indexed cells in even indexed rows occupy clock positions 6 and 12 (petals)
					/*
						How should we handle (literal) edge cases with these? There are cells here that are not part of any (complete) circle.
						Two possible approaches:
							~ Have only complete circles, which means there will be "phantom" cells just inside the outermost hex of cells
							~ Or, have incomplete circles where charms rotate directly across the "gap"
								- going with this one for now
					*/
					if(i < myCells.length - 4) {
					// cells in this row are 12s to a row of circles
						if(i < centerCellRowIndex) {
						// cell is in top half of grid
							printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2) + ", " + (Math.floor(j / 2)) + "], clock 12");
							assignCell(myCells[i][j], myCircles[i / 2][Math.floor(j / 2)], ClockFace.clock_12);
						} else {
						// cell is in bottom half of grid or center row
							if(j > 1 && j < myCells[i].length - 3) {
								printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2) + ", " + (Math.floor(j / 2) - 1) + "], clock 12");
								assignCell(myCells[i][j], myCircles[i / 2][Math.floor(j / 2) - 1], ClockFace.clock_12);
							}
						}
					}
					if(i > 2) {
					// cells in this row are 6s to a row of circles
						if(i <= centerCellRowIndex) {
						// cell is in top half of grid or center row
							if(j > 1 && j < myCells[i].length - 3) {
								printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2 - 2) + ", " + (Math.floor(j / 2) - 1) + "], clock 6");
								assignCell(myCells[i][j], myCircles[i / 2 - 2][Math.floor(j / 2) - 1], ClockFace.clock_6);
							}
						} else {
						// cell is in bottom half of grid
							printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (i / 2 - 2) + ", " + (Math.floor(j / 2)) + "], clock 6");
							assignCell(myCells[i][j], myCircles[i / 2 - 2][Math.floor(j / 2)], ClockFace.clock_6);
						}						
					}
				}
			}
		} else {
		// cells in odd-indexed rows occupy clock positions 2, 4, 8, and 10 (petals)
			for(j = 0; j < myCells[i].length; j++) {
				if(i < myCells.length - 3) {
				// cells in this row are 2s and 10s to a row of circles
					if(i < centerCellRowIndex) {
					// cell is in top half of grid
						if(j % 2 == 0 && j < myCells[i].length - 3) {
							printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (Math.floor(i / 2)) + ", " + (j / 2) + "], clock 10");
							assignCell(myCells[i][j], myCircles[Math.floor(i / 2)][j / 2], ClockFace.clock_10);
						} else if(j % 2 != 0 && j > 2) {
							printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (Math.floor(i / 2)) + ", " + (Math.floor(j / 2) - 1) + "], clock 2");
							assignCell(myCells[i][j], myCircles[Math.floor(i / 2)][Math.floor(j / 2) - 1], ClockFace.clock_2);
						}
					} else {
					// cell is in bottom half of grid
						if(j % 2 != 0 && j < myCells[i].length - 4) {
							printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (Math.floor(i / 2)) + ", " + (Math.floor(j / 2)) + "], clock 10");
							assignCell(myCells[i][j], myCircles[Math.floor(i / 2)][Math.floor(j / 2)], ClockFace.clock_10);
						} else if(j % 2 == 0 && j > 3) {
							printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (Math.floor(i / 2)) + ", " + (j / 2 - 2) + "], clock 2");
							assignCell(myCells[i][j], myCircles[Math.floor(i / 2)][j / 2 - 2], ClockFace.clock_2);
						}
					}
				}
				if(i > 1) {
				// cells in this row are 4s and 8s to a row of circles
					if(i < centerCellRowIndex) {
					// cell is in top half of grid
						//printMessage("got here: 4/8, cell in top half")
						if(j % 2 != 0 && j < myCells[i].length - 4) {
							printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (Math.floor(i / 2) - 1) + ", " + (Math.floor(j / 2)) + "], clock 8");
							assignCell(myCells[i][j], myCircles[Math.floor(i / 2) - 1][Math.floor(j / 2)], ClockFace.clock_8);
						} else if(j % 2 == 0 && j > 3) {
							printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (Math.floor(i / 2) - 1) + ", " + (j / 2 - 2) + "], clock 4");
							assignCell(myCells[i][j], myCircles[Math.floor(i / 2) - 1][j / 2 - 2], ClockFace.clock_4);
						}
					} else {
					// cell is in bottom half of grid
						//printMessage("got here: 4/8, cell in bottom half")
						if(j % 2 == 0 && j < myCells[i].length - 3) {
							printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (Math.floor(i / 2) - 1) + ", " + (j / 2) + "], clock 8");
							assignCell(myCells[i][j], myCircles[Math.floor(i / 2) - 1][j / 2], ClockFace.clock_8);
						} else if (j % 2 != 0 && j > 2) {
							printMessage("assignCell(myCells[" + i + ", " + j + "], myCircles[" + (Math.floor(i / 2) - 1) + ", " + (Math.floor(j / 2) - 1) + "], clock 4");
							assignCell(myCells[i][j], myCircles[Math.floor(i / 2) - 1][Math.floor(j / 2) - 1], ClockFace.clock_4);
						}
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