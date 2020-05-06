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
  let loader, context
  const options = getOptions(this)||{}
  validateOptions(schema, options, "svg-loader")

  if (! isLimitReached(options.limit,source)){
    // El loader elegido es el preferente
    loader = require( getLoader(options.loader || 'svg-inline-loader') )
    // Context es la variable que se empleará como contexto "this" en la llamada al loader elegido
    context = {
      ...this, 
      // Query es la propiedad que contiene las "options" empleadas para el loader elegido
      query: getQuery(options.loader) || 
        {
          removeSVGTagAttrs: false
        } 
    }    
  }else{    
    // El loader elegido es el fallback
    loader = require( getLoader(options.fallback || 'file-loader') )
    // Context es la variable que se empleará como contexto "this" en la llamada al loader elegido
    context = {
      ...this, 
      // Query es la propiedad que contiene las "options" empleadas para el loader elegido
      query: getQuery(options.fallback) || 
        {
          name: "[contenthash].[ext]",
          outputPath: "/css/img/",
        }
    }
  }
  try{
    // En la llamada al loader elegido debe preservarse el contexto (objeto this replicado en context)
    return loader.call(context, source)             
  }catch(error){
    return `export default ${ JSON.stringify(source) }`
  }
}