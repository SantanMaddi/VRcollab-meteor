Meteor.methods({
  saveCanvas: function(canvas){
    saveCanvas(canvas);
    // Canvases.insert(canvas);
  },
  createCanvas: function(user_id){
    var canvas_id = generateCanvasID();
    var canvas = {
      canvas_id: canvas_id,
      user_id: user_id
    };
    // Meteor.call("saveCanvas", [canvas]);
    saveCanvas(canvas);
    return canvas;
  },
  getCanvas: function(canvas_id){
    return Canvases.findOne({canvas_id: canvas_id});
  }
});

saveCanvas = function saveCanvas(canvas){
  Canvases.insert(canvas);
}
