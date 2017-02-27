require('../config/config.js');

const AWS = require('aws-sdk');
AWS.config.region = process.env.REGION || 'region unknown';

const sts = new AWS.STS();

var context = (onComplete, onFailure) => {
   var context = require('./input/context.json');
   context.done = function(error, result) {
       console.log('context.done');
       onComplete({error, result});
       //process.exit();
   }
   context.succeed = function(result) {
       console.log('context.succeed');
       onComplete({result});
       //process.exit();
   }
   context.fail = function(error) {
       console.log('context.fail');
       onFailure({error});
       //process.exit();
   }

   return context;
}

var execute = (lambda, event) => {
    return new Promise((resolve, reject) => {
      sts.assumeRole({
            RoleArn: process.env.ROLE_ARN,
            RoleSessionName: 'emulambda'
          }, function(err, data) {
              if(err) {
                reject(`Error invoking lambda function : ${err}`);
              } else {
                AWS.config.update({
                    accessKeyId: data.Credentials.AccessKeyId,
                    secretAccessKey: data.Credentials.SecretAccessKey,
                    sessionToken: data.Credentials.sessionToken
                });
                var Module = require('module');
                var originalRequire = Module.prototype.require;
                Module.prototype.require = function(){
                  if (arguments[0] === 'aws-sdk'){
                    return AWS;
                  } else {
                    return originalRequire.apply(this, arguments);
                  }
                };

                lambda.handler(event, context(resolve, reject));
              }
          });
    });
};

module.exports = {
  execute
};
