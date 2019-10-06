const {describe} = require('mocha');
const config_class_suite = require('./suites/config.test');
const {Config} = require('../dist');

describe('Test Config Module', config_class_suite.bind(this, Config));
