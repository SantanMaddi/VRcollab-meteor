console.log('in router.js');

FlowRouter.triggers.enter([setSessionUser]);

function setSessionUser(){
  var user_id = Session.get('user');
  if(!user_id){
    // Meteor.call("generateUserID", [], function(error, result){
    //   user_id = result;
    //   Session.set('user', user_id);
    // });
    user_id = Meteor.uuid();
    Session.set('user', user_id);
  }
  console.log('user_id', user_id);
}

FlowRouter.route('/edit', {
  triggersEnter: [function(context, redirect) {
    console.log('/edit route triggersEnter');
    var user_id = Session.get('user'), canvas;
    Meteor.call("createCanvas", user_id, function(error, result){
      canvas = result;
      console.log('new canvas created with id', canvas.canvas_id);
      FlowRouter.go('/edit/' + canvas.canvas_id);
    });
  }],
  action: function(params) {
    throw new Error("this should not get called");
  },
  triggersExit: [function(context){
    console.log('redirecting to /edit/canvas_id');
  }]
});

FlowRouter.route('/', {
  action: function(params, queryParams) {
    console.log('/ or /home route action');
    var user_id = Session.get('user');
    console.log("Yeah! We are on the post:", params.postId);
  }
});

FlowRouter.route('/edit/:canvas_id', {
  action: function(params, queryParams){
    console.log('/edit/', params.canvas_id, 'action');
    var canvas;
    Meteor.call("getCanvas", params.canvas_id, function(error, result){
      canvas = result;
      if(canvas){
        BlazeLayout.render('appLayout', {header: 'headerLayout', nav: 'navigationPanel', main: 'editLayout'});
      }else {
        console.log('canvas_id:', params.canvas_id, 'does not exist');
      }
    });
  }
});
