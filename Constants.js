/*************
	Config
*************/
// initial setup
var canvasPadding = 5			// minimum distance of game elements from edge of canvas
var gameSize = 4;               // number of circles on one side of the hex
var circleRadius = 100;			// radius of each circle
var circleSpacing = .435		// one-half distance between circle origins in the same row, in radians
var circleLineWidth = 3;		// circle outline thickness
var circleLineColor = "gold";	// circle outline color
var cellRadius = 5;				// radius of each cell
var cellLineWidth = 2;			// cell outline thickness
var cellLineColor = "gray";		// cell outline color

/************
	Enums
************/
var Direction = {
	up		: 1,
	down	: 2
}

var ClockFace = {
	clock_1		: 0,
	clock_3		: 1,
	clock_5		: 2,
	clock_7		: 3,
	clock_9		: 4,
	clock_11	: 5
}

var GamePiece = {
	redSquare		: 1,
	yellowCircle	: 2,
	greenTriangle	: 3,
	blueRectangle	: 4,
	purpleOval		: 5,
	blackDiamond	: 6
}

/************************
	Derived constants
************************/
var circleXIncrement = Math.round(circleSpacing * circleRadius * 100) / 100;		// horizontal distance between circle origins in neighboring rows, or one-half distance between circle origins in the same row
var circleYIncrement = Math.round(													// vertical distance between circle origins in neighboring rows (2 decimal precision)
	Math.tan(convertToRadians(60)) * circleXIncrement * 100) / 100;
var gameAreaWidth = 2 * circleRadius + 2 * circleXIncrement * (gameSize * 2 - 2);	// width of the square area containing the game board
var gameAreaHeight = gameAreaWidth                                      			// height of the square area containing the game board
var leftmostCircleY = gameAreaHeight / 2;                                     		// first circle of middle row y coord, where [0,0] is upper left
var leftmostCircleX = circleRadius;                                              	// first circle of middle row x coord, where [0,0] is upper left