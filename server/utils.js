console.log('in utils.js');
var Hashids = Meteor.npmRequire('hashids');

generateCanvasID = function generateCanvasID(){
  var userHashids = new Hashids("VRcollab, virtual reality editor for developers");
  return userHashids.encode(Date.now());
}
