const db = require("../utils/db");
const config = require('../config/default.json');
const TBL_USERS = "user_profile";
const TBL_VERIFICATION = "verification";
const TBL_Teach_profile = "Teach_profile";
const TBL_ENROLLED_COURSE = "enrolledcourse";
module.exports = {
    all() {
        return db.load(`select * from ${TBL_USERS}`);
    },
    async single(id) {
        const rows = await db.load(`select * from ${TBL_USERS} where IdUser = ${id}`);
        if (rows.length === 0) return null;
        return rows[0];
    },
    async singleByUserName(username) {
        const rows = await db.load(
            `select * from ${TBL_USERS} where UserName = '${username}'`
        );
        if (rows.length === 0) return null;
        return rows[0];
    },
    add(entity) {
        return db.add(entity, TBL_USERS);
    },
    editName(Username, fullName) {
        const condition = { Username: Username };
        const entity = { FullName: fullName };
        // var sql = `UPDATE ${TBL_USERS} SET FullName = '${fullName}' WHERE UserName = '${Username}'`
        return db.patch(entity, condition, TBL_USERS);
    },
    changePassword(Username, NewPassword) {
        const condition = { Username: Username };
        const entity = { password: NewPassword };
        // var sql = `UPDATE ${TBL_USERS} SET FullName = '${fullName}' WHERE UserName = '${Username}'`
        return db.patch(entity, condition, TBL_USERS);
    },
    async createVerifyCode(entity) {
        return db.add(entity, TBL_VERIFICATION);
    },
    async isAvailableCode(code) {
        let rows = await db.load(`select* from verification where otp='${code}'`);
        return rows[0];
    },
    async getAllTeacher() {
        return await db.load(`select * from ${TBL_USERS} where isTeacher = 1`);
    },
    async pageByAllTeacher(offset) {
        return await db.load(`select * from ${TBL_USERS} 
    left join teach_profile
    on user_profile.IdUser = teach_profile.IdUser
    where user_profile.isTeacher = 1 and teach_profile.status != "Processing"
    limit ${config.pagination.limit} offset ${offset}`);
    },
    async countAllTeacher() {
        let rows = await db.load(`select count(*) as total from ${TBL_USERS} 
    where isTeacher = 1`);
        return rows[0].total;
    },
    async blockTeacher(id) {
        const condition = { IdUser: id };
        const entity = { status: "Block" };
        return await db.patch(entity, condition,TBL_Teach_profile);
    },
    async unblockTeacher(id) {
        const condition = { IdUser: id };
        const entity = { status: "Accept" };
        return await db.patch(entity, condition, TBL_Teach_profile);
    },
    async getPendingTeacher() {
        return await db.load(`select * from ${TBL_USERS} 
    left join teach_profile
    on user_profile.IdUser = teach_profile.IdUser
    where user_profile.isTeacher = 1 and teach_profile.status = "Processing"`);
    },
    async approvePendingTeacher(id) {
        const condition = { IdUser: id };
        const entity = { status: "Accept" };
        const isTeacher = { isTeacher: 1, Permission: "teacher" };
        await db.patch(entity, condition, TBL_Teach_profile);
        return await db.patch(isTeacher, condition, TBL_USERS);
    },
    async singleTeacher(id) {
        const rows = await db.load(`select * from ${TBL_USERS}
    left join teach_profile
    on user_profile.IdUser = teach_profile.IdUser
    where user_profile.IdUser = ${id}`);
        if (rows.length === 0) return null;
        return rows[0];
    },
    async declinePendingTeacher(id) {
        const condition = { IdUser: id };
        await db.del(condition, TBL_Teach_profile);
    },
    addTeachProfile(entity) {
        return db.add(entity, TBL_Teach_profile);
    },
    async getTeachProfileById(id) {
        return await db.load(`select * from ${TBL_Teach_profile} where IdUser= ${id}`);
    },
    editBio(IdUser, Biography) {
        const condition = { IdUser: IdUser };
        const entity = { Biography: Biography };
        return db.patch(entity, condition, TBL_Teach_profile);
    },
    async allUser() {
        return db.load(`select * from ${TBL_USERS} where isTeacher != 1 and UserName != 'admin'`);
    },
    async pageByAllUser(offset) {
        return await db.load(`select * from ${TBL_USERS} 
    where isTeacher != 1 and UserName != 'admin'
    limit ${config.pagination.limit} offset ${offset}`);
    },
    async countAllUser() {
        let rows = await db.load(`select count(*) as total from ${TBL_USERS} 
    where isTeacher != 1 and UserName != 'admin'`);
        return rows[0].total;
    },
    async countCoursesOfUser(userId) {
        let rows = await db.load(`SELECT count(*) as total FROM ${TBL_ENROLLED_COURSE}
    where IDUser = ${userId}`);
        return rows[0].total;
    },
    async getAdminProfile() {
        let rows = await db.load(`select* from ${TBL_USERS} where UserName='admin'`);
        return rows[0];
    },
    async blockStudent(id) {
        const condition = { IdUser: id };
        const entity = { isBlocked: true };
        return await db.patch(entity, condition,TBL_USERS);
    },
    async unblockStudent(id) {
        const condition = { IdUser: id };
        const entity = { isBlocked: false };
        return await db.patch(entity, condition,TBL_USERS);
    }
};