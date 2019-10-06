'use strict';

const dotenv = require('dotenv');

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
module.exports = class Config {
    /**
     * New Config Class
     *
     * @param opt options
     * @param dotOpt dotenv options, optional param
     */
    constructor(opt, dotOpt) {
        opt = opt || {};
        const conf = dotenv.config(dotOpt);

        this.dotconf = conf.parsed ? Config.prepareDotConf(conf.parsed) : {};
        this.options = {...this.dotconf, ...opt};
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
    static prepareDotConf(obj) {
        const conf = Config.toLowerKeys(obj);

        Object.keys(conf).forEach(key => {
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
    static parseString(str) {
        if (typeof str !== 'string')
            throw new Error('Config parseString arg not string');

        try{
            return JSON.parse(str);
        }catch (e) {
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
    static toLowerKeys(obj) {
        if (typeof obj !== 'object')
            throw new Error('Helper toLowerKeys arg not object');

        return Object.keys(obj)
            .reduce((dest, key) => {
                dest[key.toLowerCase()] = obj[key];
                return dest;
            }, {});
    }
};
