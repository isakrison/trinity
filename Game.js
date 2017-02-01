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
					myCircles[i][j].defineCells();					
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