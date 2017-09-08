//===============================================================
// FOR MORE DETAILS ABOUT THEESE MODULES VISIT:
// colors https://github.com/Marak/colors.js
// util   https://nodejs.org/dist/latest-v6.x/docs/api/util.html
//===============================================================
const colors = require('colors');
const util   = require('util');

/**
 * 
PASS AN OBJECT TO AN StdMsg INSTANCE, IT WILL RETURN A STRING FORMATTED LIKE BELOW :
USEFUL TO DISPLAY ERROR MESSAGES IN A MORE READABLE FORMAT(or not, depends on taste I think)

----------------------------------------------------------------------------------------------------
ENOENT: error message
----------------------------------------------------------------------------------------------------
ERRNO   error number
----------------------------------------------------------------------------------------------------
CODE    error code
----------------------------------------------------------------------------------------------------
SYSCALL function in which the error was thrown 
----------------------------------------------------------------------------------------------------
PATH    error path
----------------------------------------------------------------------------------------------------

METHOD AND PROPERTIES STARTING WITH _ SHOULD BE PRIVATE

/render/ METHODS DEPENDS ON colors and util modules.

 */

class StdMsg {

  /**
   * CONSTRUCTOR
   * @param {{separators: {color: string, style; string}, labels: {color: string, style: string}, outputs: {color: string, style: string}}} options 
   */
  constructor(options = {}) {

    // LIST OF APPLIABLE COLORS
    this._textColors = ['black'  , 'red'  , 'green'  , 'yellow'  , 'blue'     , 'magenta'  , 'cyan'  , 'white'        , 'gray', 'grey'];

    // LIST OF APPLIABLE STYLES
    this._styles     = ['reset'  , 'bold' , 'dim'    , 'italic'  , 'underline', 'inverse'  , 'hidden', 'strikethrough'                ];
    
    // DEFAULT STYLES AND COLORS
    this._defaultOptions = {
      separators: {
        char: '-',
        length: 100,
        color: 'yellow',
        style: 'dim'
      },
      labels: {
        color: 'red',
        style: 'bold'
      },
      outputs: {
        spacing: 12,
        color: 'cyan',
        style: 'dim'
      }
    };

    // SET _options TO _defaultOptions
    this._options = Object.assign(
      {}, 
      JSON.parse(JSON.stringify(this._defaultOptions)) 
    );

    // SET _options TO options OBJECT PASSED TO THE CONSTRUCTOR
    this._setOptions(options);

    // SET _separator CHARACTERS 
    this._separator = 
      this._options.separators.char
      .repeat(this._options.separators.length)
      .concat('\n');
    
    // SET _spacing USED BETWEEN LABELS AND VALUES
    this._spacing = this._options.outputs.spacing;

  }

  /**
   * Set options to the options object passed to the constructor
   * Keep the default options If the constructor options properties do not matches
   * @param {{separators: {color: string, style: string}, labels: {color: string, style: string}, outputs: {color: string, style: string}}} options 
   */
  _setOptions(options) {
    // Abort if options is not of type object: default options are kept
    if(
      (typeof options) !== 'object'
      || options instanceof String
      || options instanceof Number
      || options instanceof Array
      || !Boolean(options)
    ) {
      return false;
    }

    // Loop through options
    Object.keys(this._options).forEach(key => {

      // If a property matches
      if(Boolean(options[key])) {

        // Abort if options[key] is not of type object: default options are kept
        if(
          (typeof options[key]) !== 'object'
          || options[key] instanceof String
          || options[key] instanceof Number
          || options[key] instanceof Array
        ) {
          return false;
        }
        // Loop through options[key]
        Object.keys(this._options[key]).forEach(prop => {
          
          // Only check if properties matches
          if(Boolean(options[key][prop])) {
            const value = options[key][prop];
            // Set matched properties
            switch(prop) {
              case 'color':
                if(this._textColors.indexOf(value) !== -1) {
                  this._options[key][prop] = value;
                }
              break;
              case 'style':
                if(this._styles.indexOf(value) !== -1) {
                  this._options[key][prop] = value;
                }
              break;
              case 'spacing':
                if(
                  typeof value === 'string' 
                  || typeof value === 'number' 
                  || value instanceof String
                  || value instanceof Number
                ) {
                  if(!isNaN(parseInt(value, 10)) && isFinite(parseInt(value, 10)))
                  this._options.outputs.spacing = parseInt(value, 10);
                }
              break;
              case 'char':
                if(
                  typeof value === 'string' 
                  || typeof value === 'number' 
                  || value instanceof String
                  || value instanceof Number
                ) {
                  this._options.separators.char = value.toString().charAt(0);
                }
              break;
              case 'length':
                if(
                  typeof value === 'string' 
                  || typeof value === 'number' 
                  || value instanceof String
                  || value instanceof Number
                ) {
                  if(!isNaN(parseInt(value, 10)) && isFinite(parseInt(value, 10)))
                  this._options.separators.length = parseInt(value, 10);
                }
              break;
              default:
            }
          } // End of if(Boolean(options[key][prop]))
        }); // End of Object.keys(this._options[key])
      } // End of if(Boolean(options[key]))
    }); // End of Object.keys(this._options).forEach
  } // End of _setOptions

  /**
   * Return a beautyfied message
   */
  render(message) {
    switch (typeof message) {
      case 'string':
        return this._renderString(message);
      case 'number':
        return this._renderString(message);
      case 'object':
        if(Array.isArray(message)) {
         return this._renderArray(message);
        }
        if(message instanceof String || message instanceof Number) {
         return this._renderString(message.toString());
        }
        return this._renderObject(message);
      default:
        return '';
    }
  }

  /**
   * Beautify a string
   * @param {string} message 
   */
  _renderString(message) {
    return (
      colors[this._options.separators.color][this._options.separators.style](this._separator)
        .concat(colors[this._options.outputs.color][this._options.outputs.style](message))
        .concat('\n')
        .concat(colors[this._options.separators.color][this._options.separators.style](this._separator))
    );
  }

  /**
   * Beautify an object
   * @param {Object} obj 
   */
  _renderObject(obj) {
    const separator = colors[this._options.separators.color][this._options.separators.style](this._separator);
    let output = separator;
    if(obj instanceof Error) {
      output = '\n'.concat(this._renderString(obj.message));
    }
    for(let key in obj) {
      output = 
       output
        .concat(colors[this._options.labels.color][this._options.labels.style](key.toUpperCase()))
        .concat(' '.repeat(Math.abs(this._spacing - key.length)))
        .concat(
          ((typeof obj[key] === 'string') || (typeof obj[key] === 'number'))
          ?
          colors[this._options.outputs.color][this._options.outputs.style](obj[key])
          :
          colors[this._options.outputs.color][this._options.outputs.style](util.inspect(obj[key], true, 1,true))
        )
        .concat('\n')
        .concat(separator)
    }
    return output;
  }

  /**
   * Beautify an array
   * @param {[]} message 
   */
  _renderArray(message) {
    const separator = colors[this._options.separators.color][this._options.separators.style](this._separator);
    let output = separator;
    message.forEach((value, index) => {
      output = 
       output
        .concat(colors[this._options.labels.color][this._options.labels.style](index))
        .concat(' '.repeat(Math.abs(this._spacing - index.toString().length)))
        .concat(
          ((typeof value === 'string') || (typeof value === 'number'))
          ?
          colors[this._options.outputs.color][this._options.outputs.style](value.toString())
          :
          colors[this._options.outputs.color][this._options.outputs.style](util.inspect(message[index], true, 1,true))
        )
        .concat('\n')
        .concat(separator)
    });
    return output;
  }
}

module.exports = StdMsg;