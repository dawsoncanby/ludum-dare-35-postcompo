// x and y of top left corner of entity,
// relative collider x and y position
// collider width and height
function createEntity(x, y, colliderX, colliderY, colliderWidth, colliderHeight) {
  var entity = new Object();

  entity.x = x;
  entity.y = y;
  entity.colliderX = colliderX;
  entity.colliderY = colliderY;
  entity.colliderWidth = colliderWidth;
  entity.colliderHeight = colliderHeight;

  // set x and y coordinates of this entity
  entity.setPosition = function(x, y) {
    entity.x = x;
    entity.y = y;
  }

  // return an array of size 4 holding the entities bounding box corner coordinates
  entity.getBounds() {
    var bounds = new Array();
    bounds.push(entity.x + entity.colliderX);
    bounds.push(entity.y + entity.colliderY);
    bounds.push(entity.x + entity.colliderX + entity.colliderWidth);
    bounds.push(entity.y + entity.colliderY + entity.colliderHeight);
    return bounds;
  }

  return entity;
}
