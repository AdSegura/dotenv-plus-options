const fs = require('fs');
const TMP_DIR = __dirname + '/../tmp';
const dotenv = require('dotenv');

module.exports = class Helper {

    /**
     * Create .env file in TMP_DR
     *
     * @param file
     * @param obj
     */
    static create_env(file, obj){
        const txt = Helper.serializeObjectToEnv(obj);
        return fs.writeFileSync(Helper.normalizePath(file), txt);
    }

    /**
     * Create .env file in TMP_DR
     *
     * @param file
     * @param obj
     */
    static create_env_root(file, obj){
        const txt = Helper.serializeObjectToEnv(obj);
        return fs.writeFileSync(Helper.normalizeRootPath(file), txt);
    }

    /**
     * return full path to file in tmp test folder
     *
     * @param file
     * @return {string}
     */
    static normalizePath(file){
        return TMP_DIR + '/' + file
    }

    /**
     * return full path to file in tmp test folder
     *
     * @param file
     * @return {string}
     */
    static normalizeRootPath(file){
        return __dirname + '/../../' + file
    }

    /**
     * Delete a file from TMP_DIR
     *
     * @param file
     */
    static delete_env(file){
        return fs.unlinkSync(Helper.normalizePath(file))
    }

    /**
     * Delete a file from root dir
     *
     * @param file
     */
    static delete_env_root(file){
        try {
            return fs.unlinkSync(Helper.normalizeRootPath(file))
        }catch (e) {
            if(e.code === 'ENOENT') //if try to delete non existing file
                return true;
            throw e;
        }
    }

    static getRootEnv(){
        const dot = dotenv.config({path: __dirname + '/../../.env'});

        if(dot.error) throw dot.error;

        return dot.parsed;
    };

    /**
     * Empty tmp tests dir
     *
     * @return {Promise<any>}
     */
    static emptyTmpDir(){
        return new Promise((resolve, reject) => {
            fs.readdir(TMP_DIR, (err, files) => {
                if(err) return reject(err);
                for(const file of files){
                    fs.unlinkSync(TMP_DIR + '/' + file);
                }
                resolve();
            })
        })
    }

    /**
     * convert object to env file format string
     *
     * @param obj
     * @return {string}
     */
    static serializeObjectToEnv(obj){
        if(typeof obj !== 'object')
            throw new Error('Helper serializeObjectToEnv arg must be object');

        let txt = '';

        Object.keys(obj)
            .forEach(key => {
                if(typeof obj[key] === 'object')
                    obj[key] = JSON.stringify(obj[key]);

                txt += key.toUpperCase() + '=' + obj[key] + '\n'
            });

        return txt;
    }

};
