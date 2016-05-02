var Input = {
  keys: new Array(222),
  gamePad: new Object(),

  onKeyDown: function(e) {
    var code = e.keyCode;
    for (var i = 0; i < Input.keys.length; i++) {
      if (code == i) {
        Input.keys[i] = true;
      }
    }
  },

  onKeyUp: function (e) {
    var code = e.keyCode;
    for (var i = 0; i < Input.keys.length; i++) {
      if (code == i) {
        Input.keys[i] = false;
      }
    }
  },

  onGamepadUpdate: function() {
    Input.gamePad = navigator.getGamepads()[0];
  }
};

var Utils = {
    dist: function(p1, p2, p3, p4) {
      return Math.sqrt(((p3 - p1) * (p3 - p1)) + ((p4 - p2) * (p4 - p2)));
    },

    getPointInRect: function(p1, p2, r1, r2, r3, r4) {
      return p1 >= r1 && p1 <= r1 + r3 && p2 >= r2 && p2 <= r2 + r4;
    },

    toRadians: function(degreeVal) {
      return degreeVal * Math.PI / 180;
    },

    loadImage: function(src) {
      var img = new Image();
      img.src = src;
      return img;
    },

    // controller dead zone
    applyDeadzone: function(number, threshold){
       percentage = (Math.abs(number) - threshold) / (1 - threshold);

       if(percentage < 0)
          percentage = 0;

       return percentage * (number > 0 ? 1 : -1);
    }

};
