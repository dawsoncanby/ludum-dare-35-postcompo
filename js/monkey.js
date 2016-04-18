function createMonkey(x, y, curVelY) {
  var monkey = new Object();
  monkey.x = x;
  monkey.y = y;
  monkey.curVelY = curVelY;
  monkey.horizMoveSpeed = 5;
  monkey.fallAcc = 0.5;
  monkey.jumpVel = 15;
  monkey.onBranch = false;

  monkey.move = function(level, left, right, jump) {
    // move left and right
    if (left) {
      monkey.x -= monkey.horizMoveSpeed * Game.speed;
    }
    if (right) {
      monkey.x += monkey.horizMoveSpeed * Game.speed;
    }

    monkey.curVelY += monkey.fallAcc * Game.speed;

    // check to see if on branch
    monkey.onBranch = false;
    for (var i = 0; i < level.chunks.length; i++) {
      for (var j = 0; j < level.chunks[i].length; j++) {
        if (level.chunks[i][j].name == 'tree_branch') {

          // if monkey will touch a branch in next update
          if (monkey.willTouch(level.chunks[i][j])) {
            // make branch fall
            if (level.chunks[i][j].willFall) {
              level.chunks[i][j].falling = true;
            }
            else {
              // dont fall
              monkey.y = level.chunks[i][j].y;
              monkey.onBranch = true;
              monkey.curVelY = 0;
            }
          }
        }
      }
    }

    if (monkey.onBranch && jump) {
      monkey.curVelY = -monkey.jumpVel;
    }

    monkey.y += monkey.curVelY * Game.speed;

  }

  monkey.willTouch = function(branchToCheck) {
    if (monkey.curVelY < 0) {
      for (var i = 0; i > monkey.curVelY; i--) {
        if (branchToCheck.contains(monkey.x, monkey.y + i)) return true;
      }
    }
    else {
      for (var i = 0; i < monkey.curVelY; i++) {
        if (branchToCheck.contains(monkey.x, monkey.y + i)) return true;
      }
    }
    return false;
  }

  monkey.draw = function() {
    Game.ctx.fillStyle = '#ff0';
    Game.ctx.drawImage(Game.res.monkey, monkey.x - 10 - Game.viewport.x, monkey.y - Game.viewport.y, 40, 60); // draw from monkeys head
  }

  return monkey;
}
