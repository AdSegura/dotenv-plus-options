module.exports = class ConfigError extends Error {
    constructor(err) {

        super(err.message);

        this.name = 'AdSegConfigError';
        this.code = err.code;
        this.stack = err.stack;
        this.message = err.message;
    }
};
