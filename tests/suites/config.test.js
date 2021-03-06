const {it} = require("mocha");
const chai = require("chai");
const expect = chai.expect;
const Helper = require('../lib/helper');

module.exports = function suite(Config) {
    /**
     * get Root .env file
     * @return {*}
     */
    const getRootEnv = () => {
        return Config.prepareDotConf(Helper.getRootEnv());
    };

    before(done => {
        Helper.create_env('.env',
            {app_key: 'rootKey123', db_user: 'luser', allowed_cookies: ["k1","k2"]});

        done();
    });

    it('should read root .env file', done => {
        const config = new Config();
        expect(config.options.app_key).eq('rootKey123');
        done();
    });

    it('should read custom path .env file', done => {
        const config = new Config(null, {path: __dirname + '/../lib/.custom_env'});
        expect(config.options.array1[0]).eq('k1');
        done();
    });

    it('should read empty .env file and config.dotconf should be empty', done => {
        const config = new Config(null, {path: __dirname + '/../lib/.custom_empty_env'});
        expect((Object.keys(config.dotconf)).length === 0).eq(true);
        done();
    });

    it('should read bad format .env file and config.dotconf should be empty', done => {
        const config = new Config(null, {path: __dirname + '/../lib/.bad_env'});
        expect((Object.keys(config.dotconf)).length === 0).eq(true);
        done();
    });

    it('should parse Arrays and Objects from .env file', done => {
        const config = new Config(null, {path: __dirname + '/../lib/.custom_env'});
        expect(Array.isArray(config.options.array1)).eq(true);
        expect(Array.isArray(config.options.array2)).eq(true);
        expect(typeof config.options.obj1 === 'object').eq(true);
        done();
    });

    it('should override .env value with constructor options', done => {
        const config = new Config({app_key: 'resistance is futile'});
        expect(config.options.app_key).eq('resistance is futile');
        const compared = Object.assign({}, getRootEnv(), config.options);
        expect(compared).eql(config.options);
        done();
    });

    it('should add new option value, with constructor options, that it\'s not present at .env file', done => {
        const config = new Config({baz:1});
        const compared = Object.assign({}, getRootEnv(), config.options);
        expect(compared).eql(config.options);
        done();
    });

    it('should work with no root .env file found', done => {
        Helper.delete_env_root('.env');
        const config = new Config({baz:1});
        expect(config.options).eql({baz:1});
        done();
    });

    it('should work with no root .env file found and no options pass to constructor', done => {
        Helper.delete_env_root('.env');
        const config = new Config();
        expect(config.options).eql({});
        done();
    });
};
