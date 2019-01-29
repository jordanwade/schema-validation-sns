var Ajv = require('ajv');
var ajv = new Ajv();

var schema = {
	properties: {
		foo: { type: 'number' },
		bar: {
			properties: {
				baz: { type: 'string' }
			}
		}
	}
};

var data = {
	foo: 0,
	bar: {
		baz: 'abc'
	}
};

const valid = ajv.validate(schema, data);
if (!valid) console.log(ajv.errors);
