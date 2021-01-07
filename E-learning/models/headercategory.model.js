const db = require('../utils/db');

const TBL_USERS = 'headercategory';
module.exports = {
    all() {
        return db.load(`select * from ${TBL_USERS}`);
    },
    async simpleSearch(text) {
        return await db.load(`select * from ${TBL_USERS} where HeaderNameCategory= '${text}'`);
    },
}