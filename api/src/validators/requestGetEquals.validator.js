const Ajv = require('ajv');
const ajv = new Ajv({ errorDataPath: 'property' });

/**
 * Method to validate params received on get equals method
 * @param {Object} data 
 * @throws {Error} error specifying if field required (required-field), invalid (type-field)
 * @returns {boolean} true
 */
const validator = async (data) => {
    // schema to validate event
    const schema = {
        properties: {
            array1: { type: "array", items: { type: "integer" } },
            array2: { type: "array", items: { type: "integer" } }
        },
        required: ['array1', 'array2']
    }

    // get he result of validation
    const valid = await ajv.validate(schema, data);

    // if data is not valid, set the correct message to return
    if (!valid) {
        // set the error type according keyword and dataPath
        const errorPath = ajv.errors[0].dataPath.indexOf('[') > 0 ? ajv.errors[0].dataPath.substring(1, ajv.errors[0].dataPath.indexOf('[')) : ajv.errors[0].dataPath.substring(1);
        const errorType = `${ajv.errors[0].keyword}-${errorPath}`;

        // throw an error with defined type
        throw new Error(errorType);
    } else {
        // if valid, return true
        return true;
    }
}

module.exports = { requestGetEqualsValidator: validator };