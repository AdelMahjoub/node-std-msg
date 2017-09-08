const StdMsg = require('..');
const assert = require('assert');
const mocha  = require('mocha');

describe('Instances of StdMsg', () => {

  describe('new instances with default options, no arguments passed to the constructor', () => {
    
    const stdMsg = new StdMsg();
    
    it('should instanciate objects', () => {
      assert.strictEqual('object', typeof stdMsg)
    });

    it('should instanciate instances of StdMsg', () => {
      assert(stdMsg instanceof StdMsg);
    });

    it('should have _options as _defaultOptions', () => {
      assert.deepStrictEqual(stdMsg._options, stdMsg._defaultOptions);
    });

    describe('.render(any)', () => {
      it('should return a string when a string is passed as argument', () => {
        assert.strictEqual('string', typeof stdMsg.render('a primitive string'));
      });

      it('should return a string when a number is passed as argument', () => {
        assert.strictEqual('string', typeof stdMsg.render(20));
      });

      it('should return a string when an array is passed as argument', () => {
        const arr = [12, 20, 'test', {name: 'tobi'}, null, {options: {prop: 'default'}}];
        assert.strictEqual('string', typeof stdMsg.render(arr));
      });

      it('should return a string when an object is passed as argument', () => {
        const obj = {
          name: 'Tobi',
          age: 10,
          address: {
            zipCode: 123456,
            country: 'Unknown'
          }
        }
        assert.strictEqual('string', typeof stdMsg.render(obj));
      });

      it('should return a string when an instance of String is passed as argument', () => {
        const str = new String('a string object ?');
        assert.strictEqual('string', typeof stdMsg.render(str));
      });

      it('should return a string when an instance of Number is passed as argument', () => {
        const num = new Number(123);
        assert.strictEqual('string', typeof stdMsg.render(num));
      });

      it('should return a string when an instance of Array is passed as argument', () => {
        const arr = new Array(12, 2, 3, 'test', {foo: 'bar'});
        assert.strictEqual('string', typeof stdMsg.render(arr));
      });

      it('should return a string when null is passed as argument', () => {
        assert.strictEqual('string', typeof stdMsg.render(null));
      });

      it('should return a string when undefined is passed as argument', () => {
        assert.strictEqual('string', typeof stdMsg.render(undefined));
      });

      it('should return a string when an empty object is passed as argument', () => {
        assert.strictEqual('string', typeof stdMsg.render({}));
      });
    });
  });

  describe('new instances with custom options, argument passed to the constructor', () => {

    describe('when unexpected arguments are passed to the constructor', () => {

      it('should instanciate with _defaultOptions if a string is passed to the constructor', () => {
        const stdMsg = new StdMsg('options');
        assert.deepStrictEqual(stdMsg._options, stdMsg._defaultOptions);
        assert.strictEqual('object', typeof stdMsg);
        assert(stdMsg instanceof StdMsg);
      });

      it('should instanciate with _defaultOptions if a number is passed to the constructor', () => {
        const stdMsg = new StdMsg(12358);
        assert.deepStrictEqual(stdMsg._options, stdMsg._defaultOptions);
        assert.strictEqual('object', typeof stdMsg);
        assert(stdMsg instanceof StdMsg);
      });

      it('should instanciate with _defaultOptions if an array is passed to the constructor', () => {
        const stdMsg = new StdMsg([1, 2, 3, 'hello', { name: 'Tobi' }]);
        assert.deepStrictEqual(stdMsg._options, stdMsg._defaultOptions);
        assert.strictEqual('object', typeof stdMsg);
        assert(stdMsg instanceof StdMsg);
      });

      it('should instanciate with _defaultOptions if null is passed to the constructor', () => {
        const stdMsg = new StdMsg(null);
        assert.deepStrictEqual(stdMsg._options, stdMsg._defaultOptions);
        assert.strictEqual('object', typeof stdMsg);
        assert(stdMsg instanceof StdMsg);
      });

      it('should instanciate with _defaultOptions if undefined is passed to the constructor', () => {
        const stdMsg = new StdMsg(undefined);
        assert.deepStrictEqual(stdMsg._options, stdMsg._defaultOptions);
        assert.strictEqual('object', typeof stdMsg);
        assert(stdMsg instanceof StdMsg);
      });

      it('should instanciate with _defaultOptions if an empty object is passed to the constructor', () => {
        const stdMsg = new StdMsg({});
        assert.deepStrictEqual(stdMsg._options, stdMsg._defaultOptions);
        assert.strictEqual('object', typeof stdMsg);
        assert(stdMsg instanceof StdMsg);
      });

      it('should instanciate with _defaultOptions if an instance of String is passed to the constructor', () => {
        const stdMsg = new StdMsg(new String('options'));
        assert.deepStrictEqual(stdMsg._options, stdMsg._defaultOptions);
        assert.strictEqual('object', typeof stdMsg);
        assert(stdMsg instanceof StdMsg);
      });

      it('should instanciate with _defaultOptions if an instance of Number is passed to the constructor', () => {
        const stdMsg = new StdMsg(new Number(123));
        assert.deepStrictEqual(stdMsg._options, stdMsg._defaultOptions);
        assert.strictEqual('object', typeof stdMsg);
        assert(stdMsg instanceof StdMsg);
      });

      it('should instanciate with _defaultOptions if an instance of Array is passed to the constructor', () => {
        const stdMsg = new StdMsg(new Array([1, 2, 3]));
        assert.deepStrictEqual(stdMsg._options, stdMsg._defaultOptions);
        assert.strictEqual('object', typeof stdMsg);
        assert(stdMsg instanceof StdMsg);
      });
    });

    describe('when the passed options have unexpected properties', () => {
      
      it('should instanciate with _defaultOptions when all the properties of the passed options are unexpected', () => {
        const options = {
          firstname: 'Jane',
          lastname: 'Doe',
          address: {
            zipCode: 123456,
            city: new String('Unknown')
          },
          phoneNumbers: [0, 1, 2, 3]
        }
        const stdMsg = new StdMsg(options);
        assert.deepStrictEqual(stdMsg._options, stdMsg._defaultOptions);
        assert.strictEqual('object', typeof stdMsg);
        assert(stdMsg instanceof StdMsg);
      });

      it('should only set the expected _options properties when the passed options are partially unexpected', () => {
        options = {
          separators: {
            foo: 'bar',
            color: 'blue',
            style: 'miaou'
          },
          labels: {
            color: { attack: 'Mangekyu sharingan' },
            style: ['alpha romeo']
          },
          outputs: {
            spacing: null,
            color: 'red',
            style: 'dim'
          }
        }
        const stdMsg = new StdMsg(options);
        assert.notDeepEqual(stdMsg._options, options);
        assert.notDeepEqual(stdMsg._options, stdMsg._defaultOptions);
        assert.strictEqual('object', typeof stdMsg);
        assert(stdMsg instanceof StdMsg);
      });

    });
  });
});