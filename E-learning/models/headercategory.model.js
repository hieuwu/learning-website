const db = require('../utils/db');

const TBL_USERS = 'headercategory';
module.exports = {
    all() {
        return db.load(`select * from ${TBL_USERS} where isDeleted = false`);
    },
    async simpleSearch(text) {
        return await db.load(`select * from ${TBL_USERS} where HeaderNameCategory= '${text}' and isDeleted = false`);
    },
    async getById(id) {
        let rows =  await db.load(`select * from ${TBL_USERS} where Id = ${id}`);
        return rows[0];
    },
    async updateHeaderCategoryById(id, headerCategory) {
        const condition = {Id: id}; 
        const entity = headerCategory;
        return await db.patch(entity, condition, TBL_USERS);
    },
    async deleteHeaderCategory(id) {
        const condition = {Id: id}; 
        const entity = {isDeleted: true}
        return await db.patch(entity, condition,TBL_USERS);
    },
    async addNewHeaderCategory(newHeaderCategory) {
        return db.add(newHeaderCategory, TBL_USERS);
    }
}