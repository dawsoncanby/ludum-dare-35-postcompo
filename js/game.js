var Game = new Object();

// the .res object holds all of the resources for the game
Game.res = new Object();

// updates per second
Game.ups = 30;

// can be used to slow down or speed up time
Game.speed = 1.0;

// the window size in pixels
Game.width = 480;
Game.height = 640;

// used as a camera which can be moved around
// all entities are drawn with respect to the viewport's x and y
Game.viewport = {
  x: 0,
  y: 0
}

// when set to true:
// colliders will be drawn
// typing '\' will set Game.speed to 0
// typing '/' will set Game.speed to 1
Game.debug = true;

// game instance variables
var testLevel;
var nextChunkStart = Game.height;

// load resources
Game.loadRes = function() {
  // load textures for the game
}

// game initailization logic
Game.start = function() {
  Game.ctx.imageSmoothingEnabled = false;

  testLevel = createLevel();

}

// game update logic
Game.update = function() {

  Game.updateChunks();


  // debug stuff
  if (Game.debug) {

    // move viewport up and down
    if (Input.keys[38]) {
      Game.viewport.y -= 5;
    }
    if (Input.keys[40]) {
      Game.viewport.y += 5;
    }

    // start and stop the game
    if (Input.keys[191])
      Game.speed = 0;
    if (Input.keys[220])
      Game.speed = 1;
  }
}

// draw to screen
Game.draw = function() {
  Game.ctx.fillStyle = '#fff';
  Game.ctx.fillRect(0, 0, Game.width, Game.height);

  testLevel.draw();
}

Game.updateChunks = function() {
  // generate a new chunk when camera gets high enough
  if (Game.viewport.y < nextChunkStart + 100) {
    testLevel.generateChunk(nextChunkStart);
    nextChunkStart -= Game.height * 2;
  }
}
