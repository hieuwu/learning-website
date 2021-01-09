const db = require('../utils/db');

const TBL_USERS = 'category';
module.exports = {
    all() {
        return db.load(`select * from ${TBL_USERS} where isDeleted = false`);
    },
    async getbyHeaderID(ID) {
        return await db.load(`select * from ${TBL_USERS} where HeaderCategoryID= '${ID}'`);
    },
    async searchByFulltext(text) {
        return await db.load(`select * from ${TBL_USERS} where match(nameCategory) against('${text}') and isDeleted = false`);
    },
    async getCategoryById(categoryId) {
        let rows = await db.load(`select * from ${TBL_USERS} where Id=${categoryId}`);
        return rows[0];
    },
    async updateCategoryById(categoryId, category) {
        const condition = {Id: categoryId}; 
        const entity = category;
        return await db.patch(entity, condition, TBL_USERS);
    },
    async getHeaderID(categoryId) {
        return await db.load(`select * from ${TBL_USERS} where Id = ${categoryId}`)
    },
    async deleteCategory(categoryId) {
        const condition = {Id: categoryId}; 
        const entity = {isDeleted: true}
        return await db.patch(entity, condition,TBL_USERS);
    },
    async addNewCategory(newCategory) {
        return db.add(newCategory, TBL_USERS);
    }
};