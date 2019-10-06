[![Build Status](https://api.travis-ci.org/adsegura/dotenv-plus-options.svg?branch=master)](https://travis-ci.org/adsegura/dotenv-plus-options)

# dotenv-plus-options
This module loads environment variables from a .env file, if there are one, (with dotenv package)
and **any options given to the constructor**, mixing it all into `config.options`

Constructor `options` **always takes preference** over options from `.env` file.

## Install
```sh
$> npm i dotenv-plus-options
```
## Prerequisites
* NodeJs `>=v6.17.1 (npm v3.10.10)`

# Usage 
```js
const {Config} = require('dotenv-plus-options');
let config;

config = new Config();
config = new Config(options);
config = new Config(options, dotenv_options);
config = new Config(null, dotenv_options);

config.options = {foo: 'bar', baz: ['foo', 'bar']}
```

```js
/**
 .env file on CWD:
 DB_USER=John
 ALLOWED=["foo", "bar"]
 OBJ={"id": 1, "op": ["one","two"]}
 */

const {Config} = require('dotenv-plus-options');

class App extends Config {
    constructor(opt){
        super(opt)
    }
}

const app = new App({db_user: 'root', baz: 2});

console.log(app.options);

/**
 {
  db_user: 'root', //constructor options always takes preference
  allowed: [ 'foo', 'bar' ],
  obj: { id: 1, op: [ 'one', 'two' ] },
  baz: 2
  }
 */
```

### dotenv options
* [dotenv options](https://github.com/motdotla/dotenv#options)

# Tests
```bash
> npm run test
```

### Dependencies
* [dotenv module](https://github.com/motdotla/dotenv#readme)

### Contributing
Pull requests are welcome.

### License
[MIT](https://choosealicense.com/licenses/mit/)
