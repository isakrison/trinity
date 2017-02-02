var Direction = {
	up		: 1,
	down	: 2
}

var ClockPosition = {
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
var gameSize = 5;                                                   			// number of circles on one side of the hex
var radius = 100;                                                       		// radius of each circle
var circleSpacing = .435 * radius;                                              // one-half distance between circle origins in the same row
var gameAreaWidth = (2 * radius) + 2 * circleSpacing * ((gameSize * 2) - 2);  	// width of the square area containing the game board
var gameAreaHeight = gameAreaWidth                                      		// height of the square area containing the game board
var canvasPadding = 5															// margin of error for drawing things close to the edge
var circleLineWidth = 3;                                                      	// circle outline thickness
var circleLineColor = "gold";                                                 	// circle outline color
var startingX = radius;                                              			// first circle x coord, where [0,0] is upper left
var startingY = gameAreaHeight / 2;                                     		// first circle y coord, where [0,0] is upper left
var xIncrement = circleSpacing;                                             	// absolute horizontal distance between circle origins
var yIncrement = Math.round(Math.tan(Math.PI / 3) * xIncrement);                // vertical distance between circle origins
var myCircles = []; 	                                                		// array of game circles