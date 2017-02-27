const expect = require('expect');

const lambda = require('../lambda/index.js');
const {APP_ID} = require('../lambda/config/config.json');
const lambdaExecutor = require('./lambda-executor');

describe('GetCricketScore', () => {
  it('should get cricket score response', (done) => {
      var event = require('./input/input.json');
      event.session.application.applicationId = APP_ID;

      lambdaExecutor.execute(lambda, event)
        .then((result) => {
          console.log(JSON.stringify(result, undefined, 2));
          //verify result
          done();
        }).catch((err) => {
          console.log(err);
          done(err);
        });
  });
});
