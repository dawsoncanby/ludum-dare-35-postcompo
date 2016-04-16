function createAirDraft(x, y, width, height, strength) {
  var draft = createEntity(x, y, width, height, x, y, width, height);

  draft.strength = strength;

  draft.draw = function() {
    // amount of color = strength
    var colorFromStrength = Math.floor(strength * 8 + 8).toString(16);

    Game.ctx.fillStyle = '#' + colorFromStrength + '' + colorFromStrength + '' + colorFromStrength;

    Game.ctx.fillRect(draft.x, draft.y, draft.width, draft.height);
  }

  return draft;
}
