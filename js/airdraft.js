function createAirDraft(x, y, width, height, strength) {
  var draft = createEntity('air_draft', x, y, width, height, 0, 0, width, height);

  draft.strength = strength;

  draft.update = function() {
    
  }

  draft.draw = function() {
    // amount of color = strength
    var colorFromStrength = Math.floor(strength * 8 + 8).toString(16);

    Game.ctx.fillStyle = '#' + colorFromStrength + '' + colorFromStrength + '' + colorFromStrength;

    Game.ctx.fillRect(draft.x - Game.viewport.x, draft.y - Game.viewport.y, draft.width, draft.height);
  }

  return draft;
}
