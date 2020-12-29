const db = require('../utils/db');

const TBL_USERS = 'category';
module.exports = {
    all() {
        return db.load(`select * from ${TBL_USERS}`);
    }
}