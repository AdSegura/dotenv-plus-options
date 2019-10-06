const {describe} = require('mocha');
const config_class_suite = require('./suites/config.test');
const config_errors_suite = require('./suites/errors.test');
const {Config} = require('../dist');

describe('Test Config Module', config_class_suite.bind(this, Config));
describe('Test Errors Config Module', config_errors_suite.bind(this, Config));
