require('dotenv').config();
const Ajv = require('ajv');
const AWS = require('aws-sdk');

const ajv = new Ajv();

const schema = {
  properties: {
    foo: { type: 'number' },
    bar: {
      properties: {
        baz: { type: 'string' }
      }
    }
  }
};

const data = {
  foo: 0,
  bar: {
    baz: 'abc'
  }
};

const valid = ajv.validate(schema, data);
if (!valid) console.log(ajv.errors);

console.log(`Data Valid: ${valid}`);
console.log(data);

// Set region
AWS.config.update({ region: process.env.AWS_TOPIC_REGION });

// Create publish parameters
if (valid) {
  let params = {
    Message: 'FAKE_TEST_MESSAGE_2' /* required */,
    TopicArn: process.env.AWS_TOPIC_ARN
  };
  // Create promise and SNS service object
  let publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' })
    .publish(params)
    .promise();

  // Handle promise's fulfilled/rejected states
  publishTextPromise
    .then(function(data) {
      console.log(
        `Message ${params.Message} send sent to the topic ${params.TopicArn}`
      );
      console.log('MessageID is ' + data.MessageId);
    })
    .catch(function(err) {
      console.error(err, err.stack);
    });
}
