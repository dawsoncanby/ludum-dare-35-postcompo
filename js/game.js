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
var testBranch;
var testBranch2;
var testDraft;

// load resources
Game.loadRes = function() {
  // load textures for the game
}

// game initailization logic
Game.start = function() {

  Game.ctx.imageSmoothingEnabled = false;
  testBranch = createTreeBranch(0, 100, 60, 20, 0, false, 50);
  testBranch2 = createTreeBranch(300, 300, 180, 30, 1, true, 50);
  testDraft = createAirDraft(100, 400, 100, 130, Math.random());
}

// game update logic
Game.update = function() {

  // debug stuff
  if (Game.debug) {
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
  testBranch.draw();
  testBranch2.draw();
  testDraft.draw();
}
