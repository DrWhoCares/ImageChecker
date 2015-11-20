CANVAS_ID		= "canvas";
CANVAS_WIDTH	= 1280;
CANVAS_HEIGHT	= 720;
OK_MIN_SCREEN_RATIO		= 1.33;  
OK_MAX_SCREEN_RATIO		= 1.35;
//--------------------------------------------------------------------------------------------------------------
//DO NOT EDIT ANY ABOVE

//EDIT BETWEEN THE ' ' THE PATH OF THE IMAGE.
//FOR EXAMPLE, IF THE IMAGE IS IN THE SAME FOLDER AS THE .HTML FILE
//AND THE IMAGE IS NAMED cat.png
//THEN DO 'cat.png';
IMG_SRC			= 'image.png';

	//DO NOT EDIT
	//--------------------------------------------------------------------
var Game = {
	
	canvas:		null,
	ctx:		null,
	isInit:		0,
	imgFrame:	0,
	frameTick:	0,
	
	//CHANGE THIS TO THE WIDTH AND HEIGHT OF THE IMAGE
	imgwidth: 	300,
	imgheight:	300,
	
	Init: function() {
		this.canvas = document.getElementById(CANVAS_ID);
		this.ctx = this.canvas.getContext("2d");
		
		this.img = new Image();
        this.img.src = IMG_SRC;
		
		this.isInit = 1;
	},
	//--------------------------------------------------------------------
	
	DrawScreen: function() {
		this.ctx.fillStyle	= "#333333";
		this.ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		
										//CHANGE "0, this.imgFrame*this.imgwdith" TO "this.imgFrame*this.imgheight, 0" IF YOU HAVE A HORIZONTAL SPRITESHEET
																									//CHANGE "0, 0," TO THE X AND Y POSITION YOU WANT THE IMAGE AT
		this.ctx.drawImage(this.img, 0, this.imgFrame*this.imgwidth, this.imgwidth, this.imgheight, 0, 0, this.imgwidth, this.imgheight);
		
		//-----------------------------
		if( this.frameTick === 1 ) {
			this.imgFrame++;
		}
		//-----------------------------
		
		//CHANGE THIS NUMBER TO BE THE NUMBER OF FRAMES YOU HAVE
		if( this.imgFrame >= 1 ) {
			this.imgFrame = 0;
		}
		
		//----------------
		this.frameTick++;
		//----------------
		
		//CHANGE THIS NUMBER TO SPEED UP THE SPEED OF THE ANIMATION
		//IT MUST BE GREATER THAN ZERO
		if( this.frameTick >= 10 ) {
			this.frameTick = 0;
		}
	},
};


//DO NOT EDIT ANY BELOW
//--------------------------------------------------------------------------------------------------------------
window.addEventListener("resize", doResize, false);

function doResize() {
	var canvas = document.getElementById(CANVAS_ID);
	
	// Size things
	UpdateCanvas(canvas);
};

function UpdateCanvas(canvas) {
    var tempDisplay = canvas.style.display;
    canvas.style.display = "block";
   
	canvas.width = CANVAS_WIDTH;   // World Coordinate system size should NOT change
	canvas.height = CANVAS_HEIGHT; // just the viewing size of it (i.e. style)
	
    var rect = canvas.getBoundingClientRect();

	var gameWidth = window.innerWidth;
	var gameHeight = window.innerHeight - rect.top; 
	var scaleToFitX = gameWidth / canvas.width;  
	var scaleToFitY = gameHeight / canvas.height;

	var currentScreenRatio = gameWidth / gameHeight;
	var optimalRatio = Math.min(scaleToFitX, scaleToFitY);

	canvas.style.position = "fixed";
	
	if( currentScreenRatio >= OK_MIN_SCREEN_RATIO && currentScreenRatio <= OK_MAX_SCREEN_RATIO ) {
		canvas.style.width = gameWidth + "px";
		canvas.style.height = gameHeight + "px";
		canvas.style.left = 0 + "px";
	} else {
		canvas.style.width = canvas.width * optimalRatio + "px";
		canvas.style.height = canvas.height * optimalRatio + "px";
		canvas.style.left = ( (gameWidth - (canvas.width * optimalRatio)) / 2 ) + "px";
	}
    
    canvas.style.display = tempDisplay;
};

window.onload = function() {
	Game.Init();
	doResize();
	// Start Game Loop
	if( Game.isInit === 1 ) {
		runGame();
	}
};

function runGame() {
	Game.DrawScreen();
	requestAnimationFrame(runGame);
};