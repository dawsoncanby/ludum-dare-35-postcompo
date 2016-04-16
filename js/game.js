var Game = new Object();

// the .res object holds all of the resources for the game
Game.res = new Object();

// updates per second
Game.ups = 30;

// can be used to slow down or speed up time
Game.speed = 1.0;

// the window size in pixels
Game.width = 240;
Game.height = 320;

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

// load resources
Game.loadRes = function() {

  // load textures for the game
  Game.res.tex1 = Utils.loadImage('res/black.png');
}

// game initailization logic
Game.start = function() {

  Game.ctx.imageSmoothingEnabled = false;

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

}
