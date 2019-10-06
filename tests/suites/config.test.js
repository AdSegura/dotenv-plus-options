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
        Helper.create_env_root('.env',
            {app_key: 'rootKey123', db_user: 'luser', allowed_cookies: ["k1","k2"]});

        done();
    });

    after(done => {
        Helper.emptyTmpDir().then(done)
    });

    it('should read root .env file', done => {
        const config = new Config();
        expect(config.options.app_key).eq('rootKey123');
        done();
    });

    it('should read custom path .env file', done => {
        Helper.create_env('foo1', {app_key:'12345', allowed_cookies: ['co1', 'co2']});
        const config = new Config(null, {path:__dirname + '/../tmp/foo1'});
        expect(config.options.allowed_cookies[1]).eq('co2');
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
        const config = new Config({app_key: 'foo'});
        expect(config.options.app_key).eq('foo');
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
