// x and y position, width and height of entity,
// which side it will come from (left/right),
// whether or not it will fall if a player grabs it,
// the max size of a leaf
function createTreeBranch(x, y, width, height, side, willFall, leafSize) {
  var branch = createEntity('tree_branch', x, y, width, height, 0, 0, width, 10); // 10 is height because only top can be grabbed

  // 0 for left side, 1 for right side
  branch.side = side;

  branch.leafSize = leafSize;

  // falling branches will not collide with player
  branch.willFall = willFall;
  branch.falling = false;
  branch.fallSpeed = 7;

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

  branch.update = function() {
    if (branch.falling) {
      branch.y += branch.fallSpeed;
      for (var i = 0; i < branch.leaves.length; i += 3) {
        branch.leaves[i + 1] += branch.fallSpeed;
      }
    }
  }

  branch.draw = function() {
    // draw branch
    Game.ctx.fillStyle = branch.willFall ? '#BAA951' : '#654A1B';
    var branchImg;

    if (branch.willFall) {
      if (branch.side == 0) {
        branchImg = Game.res.treeleftdead;
      }
      else {
        branchImg = Game.res.treerightdead;
      }
    }
    else {
      if (branch.side == 0) {
        branchImg = Game.res.treeleft;
      }
      else {
        branchImg = Game.res.treeright;
      }
    }
    console.log(branchImg);
    Game.ctx.drawImage(branchImg, branch.x - Game.viewport.x, branch.y - Game.viewport.y, branch.width, branch.height);

  }

  return branch;
}
