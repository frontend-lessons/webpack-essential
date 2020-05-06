const { getOptions } = require('loader-utils');
const validateOptions = require('schema-utils');

const schema = {
  type: "object",
  properties: {
    limit: {
      description: "Module (or resource) size limit in bytes",
      anyOf: [
        {type: "integer"},
        {type: "null"}
      ]
    },
    loader: {
      description: "Primary loader to use with the module (or resource)",
      anyOf: [
        {type: "object"},
        {type: "string"},
        {type: "null"}        
      ]
    },
    fallback: {
      description: "Fallback loader to use when size limit is reached",
      anyOf: [
        {type: "object"},
        {type: "string"},
        {type: "null"}
      ]
    },
  },
  additionalProperties: true
};

module.exports = function(source) {
  const options = getOptions(this);

  validateOptions(schema, options, 'Example Loader');

  // Apply some transformations to the source...

  return `export default ${ JSON.stringify(source) }`;
}