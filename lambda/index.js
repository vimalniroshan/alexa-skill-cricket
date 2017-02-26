const Alexa = require('alexa-sdk');

var standardHandlers = {
  'AMAZON.HelpIntent': function () {
      this.emit(':ask', 'You can ask for your favourite cricket team\'s score!', 'Sorry, what is the team name?');
   },

  'SessionEndedRequest': function () {
      this.emit(':saveState', true); // Be sure to call :saveState to persist your session attributes in DynamoDB
  },
  'Unhandled': function () {
      this.emit(':ask', 'Sorry, I didn\'t get that. Try saying a team name.', 'Try saying a team name.');
  }
};


var intentHandlers = {
  'CricketScore' : function () {
    this.emit(':tell', 'India won the first test match against Australia');
    console.log("Slots: ", this.event.request.intent.slots);
  }
};

exports.handler = function (event, context, callback) {
  var alexa = Alexa.handler(event, context);
  //alexa.appId = 'amzn1.echo-sdk-ams.app.b0828e5b-9c8a-4b1c-a4ee-ccb0cea643a9';
  alexa.registerHandlers(standardHandlers, intentHandlers);
  alexa.execute();
};
