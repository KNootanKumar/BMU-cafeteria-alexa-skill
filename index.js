var admin = require("firebase-admin");
var Alexa = require('alexa-sdk');

// Fetch the service account key JSON file contents
var serviceAccount = require("JSON FILE GOES HERE");

// Initialize the app with a custom auth variable, limiting the server's access
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "DATABASE URL GOES HERE"
});
// The app only has access as defined in the Security Rules


exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function() { //Executes when a new session is launched
        this.emit('LaunchIntent');
    },

    'LaunchIntent': function() {
        this.emit(':ask', "Welcome to Cafeteria Alexa Skill. I can Povide you the menu details of your mess. please choose your mess LBF or Dcafe");
    },

    'LBFMess': function() {
      var self = this;
      var db = admin.database();
      var ref = db.ref();
      ref.child("LBF").on("value", function(snapshot) {
        return self.emit(':ask',"item1 is "+snapshot.val().item1+"\nitem2 is "+snapshot.val().item2+"\nTodays special item is "+snapshot.val().special);
      });
    },

    'DcafeMess': function() {
      var self = this;
      var db = admin.database();
      var ref = db.ref();
      ref.child("Dcafe").on("value", function(snapshot) {
        return self.emit(':ask',"item1 is "+snapshot.val().item1+"\nitem2 is "+snapshot.val().item2+"\nTodays special item is "+snapshot.val().special);
      });
    },

    'AMAZON.CancelIntent': function() {
        this.emit(':ask', "Welcome to Cafeteria Alexa Skill.I will Povide you the menu details of your mess. please choose your mess LBF or Dcafe")
      },

	   'AMAZON.HelpIntent': function() {
        this.emit(':ask', "Welcome to Cafeteria Alexa Skill.I will Povide you the menu details of your mess. please choose your mess LBF or Dcafe ");
    },

    'AMAZON.StopIntent': function() {
        this.emit(':tell', "Thanks for using the Cafeteria Alexa Skill. Hope you enjoyed the conversation. Will be waiting until your next visit .until then Good Bye! ");
    }

}
