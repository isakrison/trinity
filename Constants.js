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

// initial setup
var gameSize = 4;                                                   			// number of circles on one side of the hex
var radius = 100;                                                       		// radius of each circle
var circleSpacing = Math.round(.435 * radius * 100) / 100;						// one-half distance between circle origins in the same row (2 decimal precision)
var gameAreaWidth = (2 * radius) + 2 * circleSpacing * ((gameSize * 2) - 2);  	// width of the square area containing the game board
var gameAreaHeight = gameAreaWidth                                      		// height of the square area containing the game board
var canvasPadding = 5															// margin of error for drawing things close to the edge
var circleLineWidth = 3;                                                      	// circle outline thickness
var circleLineColor = "gold";                                                 	// circle outline color
var cellLineWidth = 2;															// cell outline thickness
var cellLineColor = "gray";														// cell outline color
var leftmostCircleX = radius;                                              			// first circle of middle row x coord, where [0,0] is upper left
var leftmostCircleY = gameAreaHeight / 2;                                     		// first circle of middle row y coord, where [0,0] is upper left
var circleXIncrement = circleSpacing;                                           // horizontal distance between circle origins in neighboring rows, or one-half distance between circle origins in the same row
var circleYIncrement = Math.round(Math.tan(Math.PI / 3) * circleXIncrement * 100) / 100;	// vertical distance between circle origins in neighboring rows (2 decimal precision)
var cellXIncrement;
var cellYIncrement;
var myCircles = []; 	                                                		// array of game circles
var myCells = [];																// array of game cells