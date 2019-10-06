'use strict';

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var dotenv = require('dotenv');

var ConfigError = require('./configError');
/**
 * Config will read config options:
 *  - from CWD .env file,
 *  - from custom .env file,
 *  - from options object passed to constructor
 *      and mix all into config.options
 *
 *  Constructor options supersedes .env file options
 *
 * Usage:
 *  new Config()
 *  new Config(options)
 *  new Config(options, dotenv_options)
 *  new Config(null, dotenv_options)
 *
 *  config.options = {foo: 'bar', baz: ['foo', 'bar']}
 *
 * @type {module.Config}
 */


module.exports =
/*#__PURE__*/
function () {
  /**
   * New Config Class
   *
   * @param opt options
   * @param dotOpt dotenv options, optional param
   */
  function Config(opt, dotOpt) {
    _classCallCheck(this, Config);

    opt = opt || {};
    var dotConf = dotenv.config(dotOpt); // dotenv path forced by dotOpt options path?
    // if any errors parsing custom path throw error

    if (dotOpt && dotConf.error) throw new ConfigError(dotConf.error);
    this.dotconf = dotConf.parsed ? Config.prepareDotConf(dotConf.parsed) : {};
    this.options = _objectSpread({}, this.dotconf, {}, opt);
  }
  /**
   * prepareDotConf
   *
   * > Object keys to lowerCase
   * > string comma values to array
   *
   * @param obj
   * @return {*}
   */


  _createClass(Config, null, [{
    key: "prepareDotConf",
    value: function prepareDotConf(obj) {
      var conf = Config.toLowerKeys(obj);
      Object.keys(conf).forEach(function (key) {
        conf[key] = Config.parseString(conf[key]);
      });
      return conf;
    }
    /**
     * parse string
     *  parse str to object/Array or return str
     *
     * @param str
     * @return {any}
     */

  }, {
    key: "parseString",
    value: function parseString(str) {
      if (typeof str !== 'string') throw new Error('Config parseString arg not string');

      try {
        return JSON.parse(str);
      } catch (e) {
        return str;
      }
    }
    /**
     * Object keys to lowerCase
     *
     * {FOO:1} => {foo: 1}
     *
     * @param obj
     * @return {{}}
     */

  }, {
    key: "toLowerKeys",
    value: function toLowerKeys(obj) {
      if (_typeof(obj) !== 'object') throw new Error('Helper toLowerKeys arg not object');
      return Object.keys(obj).reduce(function (dest, key) {
        dest[key.toLowerCase()] = obj[key];
        return dest;
      }, {});
    }
  }]);

  return Config;
}();