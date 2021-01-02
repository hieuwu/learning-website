const db = require('../utils/db');

const TBL_USERS = 'category';
module.exports = {
    all() {
        return db.load(`select * from ${TBL_USERS}`);
    },
    async getbyHeaderID(ID) {
        return await db.load(`select * from ${TBL_USERS} where HeaderCategoryID= '${ID}'`);
    },
    async searchByFulltext(text) {
        return await db.load(`select * from ${TBL_USERS} where match(nameCategory) against('${text}')`);
    }

};