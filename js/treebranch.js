// x and y position, width and height of entity,
// which side it will come from (left/right),
// whether or not it will fall if a player grabs it,
// the max size of a leaf
function createTreeBranch(x, y, width, height, side, willFall, leafSize) {
  var branch = createEntity(x, y, width, height, x, y, width, height);

  // 0 for left side, 1 for right side
  branch.side = side;

  branch.leafSize = leafSize;

  // falling branches will not collide with player
  branch.willFall = willFall;
  branch.falling = false;

  // generate some random leaves
  // the array will be organized [leaf0x, leaf0y, leaf0size, leaf1x, ...]
  branch.leaves = new Array();
  branch.numLeaves = Math.floor(Math.random() * 5) + 5;
  for (var i = 0; i < branch.numLeaves; i++) {
    var x;
    var y;
    var size;

    // create variation in leaf
    x = (side == 0 ? branch.width / 2 + Math.random() * branch.width / 1.5
      : branch.x - branch.leafSize / 2 + Math.random() * branch.width / 2);
    y = branch.y - Math.random() * branch.leafSize + branch.height / 1.5;
    size = Math.random() * branch.leafSize / 2 + branch.leafSize / 2;

    // add to list
    branch.leaves.push(x);
    branch.leaves.push(y);
    branch.leaves.push(size);
  }

  branch.draw = function() {
    // draw branch
    Game.ctx.fillStyle = branch.willFall ? '#BAA951' : '#654A1B';
    Game.ctx.fillRect(branch.x - Game.viewport.x, branch.y - Game.viewport.y, branch.width, branch.height);

    // draw leaves
    Game.ctx.fillStyle = branch.willFall ? '#2FCD39' : '#235726';
    for (var i = 0; i < branch.leaves.length; i += 3) {
      Game.ctx.fillRect(branch.leaves[i] - Game.viewport.x, branch.leaves[i + 1] - Game.viewport.y,
        branch.leaves[i + 2], branch.leaves[i + 2]);
    }
  }

  return branch;
}
