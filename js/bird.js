function createBird(x, y, curVelY) {
  var bird = new Object();

  bird.x = x;
  bird.y =y;
  bird.curVelY = curVelY;
  bird.fallAcc = 0.3;
  bird.horizMoveSpeed = 4;
  bird.draftBoostSpeed = 3;
  bird.maxVertSpeed = 10;

  bird.move = function(level, left, right) {
    bird.curVelY += bird.fallAcc * Game.speed;
    if (-bird.curVelY > bird.maxVertSpeed) bird.curVelY = -bird.maxVertSpeed;

    for (var i = 0; i < level.chunks.length; i++) {
      for (var j = 0; j < level.chunks[i].length; j++) {
        if (level.chunks[i][j].name == 'air_draft') {
          // if bird touches a draft
          if (level.chunks[i][j].contains(bird.x, bird.y)) {
            bird.curVelY -= level.chunks[i][j].strength * bird.draftBoostSpeed;
          }
        }
      }
    }

    if (left) {
      bird.x -= bird.horizMoveSpeed * Game.speed;
    }
    if (right) {
      bird.x += bird.horizMoveSpeed * Game.speed;
    }

    bird.y += bird.curVelY * Game.speed;
  }

  bird.draw = function() {
    Game.ctx.fillStyle = '#0ff';
    Game.ctx.fillRect(bird.x - 10 - Game.viewport.x, bird.y - 3 - Game.viewport.y, 20, 6);
  }

  return bird;
}
