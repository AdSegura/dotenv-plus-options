const {it} = require("mocha");
const chai = require("chai");
const expect = chai.expect;

module.exports = function suite(Config) {
    it('should throw adSegConfigError when dotenv cannot read forced .env file with path dotenv options', done => {
        try {
            new Config(null, {path: __dirname + '/../lib/.nonexisting_env'});
        }catch (e) {
            expect(e.name).eq('AdSegConfigError');
            expect(e.code).eq('ENOENT');
            done();
        }

    });
};
