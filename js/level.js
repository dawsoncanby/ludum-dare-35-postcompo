function createLevel() {
  var level = new Object();

  level.avgBranchWidth = 250;
  level.avgBranchHeight = 30;
  level.branchWidthVar = 100;
  level.branchHeightVar = 10;
  level.branchLeafSize = 50;

  level.maxDistBetweenBranches = 200;
  level.minDistBetweenBranches = 100;
  level.deadBranchProb = 0.6;

  level.airDraftWidth = 75;
  level.airDraftHeight = 100;
  level.airDraftOffset = 30;

  // each chunk is two screen heights tall
  level.chunks = new Array();

  // generate a block of obstacles
  // difficulty will be from 0 to 1
  // yStart tells the generator how far up to start generating
  level.generateChunk = function(yStart) {

    // array holding the spawned trees and airdrafts
    var chunk = new Array();

    // holds where the last tree was spawned
    var currY = yStart;

    while (currY > yStart - Game.height * 2) {
      // decide between left and right side
      var side = Math.random() > .5 ? 0 : 1;

      // decide whether branch is dead or alive
      var willFall = Math.random() < level.deadBranchProb;

      // if a falling branch is going to be created, also create an airdraft
      var draft = createAirDraft(Math.random() * (Game.width - level.airDraftWidth), currY - level.airDraftOffset,
                  level.airDraftWidth, level.airDraftHeight, Math.random() / 3 + .5);

      // specify position and dimensions of branch
      var branchWidth = level.avgBranchWidth +
      (Math.random() > .5 ? -1 : 1) * (level.branchWidthVar / 2 + Math.random() * level.branchWidthVar / 2);

      var branchHeight = level.avgBranchHeight +
      (Math.random() > .5 ? -1 : 1) * (level.branchHeightVar / 2 + Math.random() * level.branchHeightVar / 2);

      var branchX = side == 0 ? 0 : Game.width - branchWidth;
      var branchY = currY;

      // spawn a branch at y = currY according to above params
      var branch = createTreeBranch(branchX, branchY, branchWidth, branchHeight, side, willFall, level.branchLeafSize);

      // add branch to the chunk
      chunk.push(branch);

      // if falling branch, add a draft
      if (willFall) chunk.push(draft);

      // move currY up
      currY -= level.minDistBetweenBranches + (Math.random() * (level.maxDistBetweenBranches - level.minDistBetweenBranches));
    }

    // add this chunk to the list
    level.chunks.push(chunk);

    // remove last chunk to save space
    if (level.chunks.length >= 3)
      level.chunks.shift();
  }

  level.draw = function() {
    for (var i = 0; i < level.chunks.length; i++) {
      for (var j = 0; j < level.chunks[i].length; j++) {
        level.chunks[i][j].draw();
      }
    }
  }

  level.update = function() {
    for (var i = 0; i < level.chunks.length; i++) {
      for (var j = 0; j < level.chunks[i].length; j++) {
        level.chunks[i][j].update();
      }
    }
  }

  return level;
}
