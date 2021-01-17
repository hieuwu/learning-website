const mysql = require('mysql');
const util = require('util');

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '123456',
    database: 'websitedb',
});

const pool_query = util.promisify(pool.query).bind(pool);

module.exports = {
    load: sql => pool_query(sql),
    add: (entity, tableName) => pool_query(`insert into ${tableName} set ?`, entity),
    del: (condition, tableName) => pool_query(`delete from ${tableName} where ?`, condition),
    delWith2Key: (condition_1, condition_2, tableName) => {
        pool_query(`delete from ${tableName} where ? and ?`, [condition_1, condition_2])
    },
    patch: (entity, condition, tableName) => pool_query(`update ${tableName} set ? where ?`, [entity, condition]),
    patchWith2Key: (entity, condition_1, condition_2, tableName) => {
        pool_query(`update ${tableName} set ? where ? and ?`, [entity, condition_1, condition_2])
    },
};