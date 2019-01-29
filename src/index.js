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

var validate = ajv.compile(schema);
console.log(`Data Valid: ${validate(data)}`);
console.log(data);
