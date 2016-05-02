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
Game.debug = false;

// game instance variables
var testLevel;
var nextChunkStart;
var lavaHeight;
var lavaRiseSpeed = 5;

var player;
var isMonkey;
var swapKeyHeldLastFrame;
var score;

var showingStartScreen = true;

// load resources
Game.loadRes = function() {
  // load textures for the game
  Game.res.backgroundImg = Game.loadImage('res/background.png');
  Game.res.airdraft = Game.loadImage('res/airdraft.png');
  Game.res.bird = Game.loadImage('res/bird.png');
  Game.res.monkey = Game.loadImage('res/monkey.png');
  Game.res.treeleftdead = Game.loadImage('res/tree_left_dead.png');
  Game.res.treeleft = Game.loadImage('res/tree_left.png');
  Game.res.treerightdead = Game.loadImage('res/tree_right_dead.png');
  Game.res.treeright = Game.loadImage('res/tree_right.png');

}

Game.loadImage = function(src) {
  var img = new Image();
  img.src = src;
  return img;

}

// game initailization logic
Game.start = function() {
  Game.ctx.imageSmoothingEnabled = false;

  Game.speed = 1;
  testLevel = createLevel();
  insMonkey = true;
  player = createMonkey(Game.width / 2, Game.height / 2, 0);
  lavaHeight = Game.height;
  nextChunkStart = Game.height;
  swapKeyHeldLastFrame = false;
  score = 0;
  Game.updateChunks();
  // spawn a tree for monkey to stand on
  testLevel.chunks[0].push(createTreeBranch(0, player.y, Game.width, 30, 0, false, 40));

}

// game update logic
Game.update = function() {
  Input.onGamepadUpdate();

  var moveLeft = Input.keys[65];
  var moveRight = Input.keys[68];
  var jump = Input.keys[87];
  var swap = Input.keys[32];
  var enter = Input.keys[13];
  if (Input.gamePad != undefined) {
    // move speed for player
    var xSpeed = Utils.applyDeadzone(Input.gamePad.axes[0], 0.25);
    moveLeft = xSpeed < 0;
    moveRight = xSpeed > 0;

    // jump if monkey
    jump = Input.gamePad.buttons[1].pressed;

    // swap between characters
    swap = Input.gamePad.buttons[0].pressed;

    enter = Input.gamePad.buttons[9].pressed;
  }

  console.log("Swap: " + swap + "\nJump: " + jump + "\nxSpeed: " + xSpeed);

  if (showingStartScreen) {
    Game.speed = 0;
    if (enter) {
      showingStartScreen = false;
      Game.speed = 1;
    }
  }

  testLevel.update();
  Game.updateChunks();

  player.move(testLevel, moveLeft, moveRight, jump);

  score = Game.height / 2 - player.y;
  if (score < 0) score = 0;

  // force player to stay in screen
  if (player.x > Game.width) player.x = 1;
  if (player.x < 0) player.x = Game.width - 1;

  // follow player with camera
  Game.viewport.y -= (Game.viewport.y - player.y) / 2;
  Game.viewport.y -= Game.height / 4;

  // swap between monkey and bird
  if (swap && !swapKeyHeldLastFrame) {
    if (isMonkey) {
      player = createBird(player.x, player.y, player.curVelY);
    }
    else {
      player = createMonkey(player.x, player.y, player.curVelY);
    }
    isMonkey = !isMonkey;
  }

  // prevent double swapping if key is held
  if (swap) {
    swapKeyHeldLastFrame = true;
  }
  else {
    swapKeyHeldLastFrame = false;
  }

  // check for loss
  if (player.y > lavaHeight) {
      Game.speed = 0;
      if (enter) {
        Game.start();
      }
  }
  lavaHeight -= lavaRiseSpeed * Game.speed;

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
  Game.ctx.drawImage(Game.res.backgroundImg, 0, 0);

  testLevel.draw();

  player.draw();

  // draw lava
  Game.ctx.fillStyle = '#f00';
  Game.ctx.fillRect(0, lavaHeight - Game.viewport.y, Game.width, Game.height);

  Game.ctx.fillStyle = '#000';
  Game.ctx.font = '20px Arial';
  Game.ctx.fillText("Score: " + Math.floor(score), 10, 30);

  // check for loss
  if (player.y > lavaHeight) {
      Game.ctx.fillText("You died! Press enter to retry", 100, 100);
  }

  if (showingStartScreen) {
    Game.ctx.fillText("Press enter to start!", 100, 100);
  }
}

Game.updateChunks = function() {
  // generate a new chunk when player gets high enough
  if (player.y < nextChunkStart + 500) {
    testLevel.generateChunk(nextChunkStart);
    nextChunkStart -= Game.height * 2;
  }
}
