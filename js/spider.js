function createSpider(branch) {
  var spider = new Object();
  spider.name = 'spider';
  spider.yOffset = -32;
  spider.x = branch.x + 5;
  spider.y = branch.y + spider.yOffset;
  spider.maxSpeed = 3;
  spider.minSpeed = 1;
  spider.moveVel = Math.random() * spider.maxSpeed + spider.minSpeed;
  spider.moveVel *= Math.random() > 0.5 ? 1 : -1;


  spider.move = function() {
    if (spider.x < branch.x || spider.x > branch.x + branch.width) {
      spider.moveVel *= -1
    }
    spider.x += spider.moveVel * Game.speed;;
  }

  spider.update = function() {
    spider.move();
    if (Utils.dist(spider.x, spider.y, Game.player.x, Game.player.y) <= 40) {
      Game.alive = false;
    }
  }

  spider.draw = function() {
    Game.ctx.drawImage(Game.res.spider, spider.x - 32 - Game.viewport.x, spider.y - 32 - Game.viewport.y, 64, 64);
  }

  return spider;
}
