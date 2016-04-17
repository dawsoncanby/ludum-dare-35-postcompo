// x and y of top left corner of entity,
// width and height of entity (image)
// relative collider x and y position (collider offset)
// collider width and height
function createEntity(name, x, y, width, height, colliderX, colliderY, colliderWidth, colliderHeight) {
  var entity = new Object();

  entity.name = name;
  entity.x = x;
  entity.y = y;
  entity.width = width;
  entity.height = height;
  entity.colliderX = colliderX;
  entity.colliderY = colliderY;
  entity.colliderWidth = colliderWidth;
  entity.colliderHeight = colliderHeight;

  // set x and y coordinates of this entity
  entity.setPosition = function(x, y) {
    entity.x = x;
    entity.y = y;
  }

  entity.drawBasic = function(fillColor, colliderColor) {
    // draw entity image placeholder
    Game.ctx.fillStyle = fillColor;
    Game.ctx.fillRect(entity.x - Game.viewport.x, entity.y - Game.viewport.y, entity.width, entity.height);

    // draw collider
    Game.ctx.strokeStyle = colliderColor;
    Game.ctx.strokeRect(entity.x + entity.colliderX - Game.viewport.x, entity.y + entity.colliderY - Game.viewport.y,
                      entity.colliderWidth, entity.colliderHeight);
  }

  // check to see if this entity's collider contains a point
  entity.contains = function(x, y) {
    return Utils.getPointInRect(x, y, entity.x + entity.colliderX, entity.y + entity.colliderY,
       entity.colliderWidth, entity.colliderHeight);
  }

  return entity;
}
