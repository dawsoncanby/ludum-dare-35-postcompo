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
// typing '\' will decrease speed
// typing '/' will increase speed
Game.debug = true;

// game instance variables
var testLevel;
var nextChunkStart = Game.height;

var player;
var isMonkey;
var swapKeyHeldLastFrame = false;

// load resources
Game.loadRes = function() {
  // load textures for the game
}

// game initailization logic
Game.start = function() {  
  Game.ctx.imageSmoothingEnabled = false;

  testLevel = createLevel();
  insMonkey = true;
  player = createMonkey(Game.width / 2, Game.height / 2, 0);

}

// game update logic
Game.update = function() {

  testLevel.update();
  Game.updateChunks();

  player.move(testLevel, Input.keys[65], Input.keys[68], Input.keys[87]);

  // follow player with camera
  Game.viewport.y -= (Game.viewport.y - player.y) / 2;
  Game.viewport.y -= Game.height / 4;

  // swap between monkey and bird
  if (Input.keys[32] && !swapKeyHeldLastFrame) {
    if (isMonkey) {
      player = createBird(player.x, player.y, player.curVelY);
    }
    else {
      player = createMonkey(player.x, player.y, player.curVelY);
    }
    isMonkey = !isMonkey;
  }

  // prevent double swapping if key is held
  if (Input.keys[32]) {
    swapKeyHeldLastFrame = true;
  }
  else {
    swapKeyHeldLastFrame = false;
  }

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
      Game.speed -= .01;
    if (Input.keys[220])
      Game.speed += 1;
  }
}

// draw to screen
Game.draw = function() {
  Game.ctx.fillStyle = '#fff';
  Game.ctx.fillRect(0, 0, Game.width, Game.height);

  testLevel.draw();

  player.draw();
}

Game.updateChunks = function() {
  // generate a new chunk when player gets high enough
  if (player.y < nextChunkStart + 200) {
    testLevel.generateChunk(nextChunkStart);
    nextChunkStart -= Game.height * 2;
  }
}
