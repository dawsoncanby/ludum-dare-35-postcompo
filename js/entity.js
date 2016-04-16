// x and y of top left corner of entity,
// width and height of entity (image)
// relative collider x and y position (collider offset)
// collider width and height
function createEntity(x, y, width, height, colliderX, colliderY, colliderWidth, colliderHeight) {
  var entity = new Object();

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

  // return an array of size 8 holding the entities bounding box corner coordinates
  entity.getBounds = function() {
    var bounds = new Array();
    // top left
    bounds.push(entity.x + entity.colliderX);
    bounds.push(entity.y + entity.colliderY);

    // top right
    bounds.push(entity.x + entity.colliderX + entity.colliderWidth);
    bounds.push(entity.y + entity.colliderY);

    // bottom left
    bounds.push(entity.x + entity.colliderX);
    bounds.push(entity.y + entity.colliderY + entity.colliderHeight);

    // bottom right
    bounds.push(entity.x + entity.colliderX + entity.colliderWidth);
    bounds.push(entity.y + entity.colliderY + entity.colliderHeight);

    return bounds;
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

  // check to see if this entity's collider intersects other's collider
  entity.isTouching = function(other) {
    // get corners of other entity
    var bounds = other.getBounds();
    // loop through and check to see if one of the
    // other entities corners are in this entities collider
    for (var i = 0; i < bounds.length; i += 2) {
      if (Utils.getPointInRect(bounds[i], bounds[i + 1],
        entity.x + entity.colliderX, entity.y + entity.colliderY,
         entity.colliderWidth, entity.colliderHeight)) {
        return true;
      }
    }
    return false;
  }


  entity.willTouch = function(newX, newY, other) {
    // store current position
    var oldX = entity.x;
    var oldY = entity.y;

    // move entity and check for touches
    entity.setPosition(newX, newY);
    var touches = entity.isTouching(other);

    // return to original position
    entity.setPosition(oldX, oldY);

    return touches;
  }

  return entity;
}
