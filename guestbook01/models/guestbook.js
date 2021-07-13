const mysql = require('mysql');
const util = require('util');

const dbconn = require('./dbconn');

module.exports = {
    findAll: async function(){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            return await query(
                "select no, name, date_format(reg_date, '%Y/%m/%d') as regDate, message from guestbook order by no desc",
                []
            );
        } catch (e) {
            console.error(e);
        } finally {
            conn.end();
        }
    },
    insert: async function(guestbook){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            return await query(
                "insert into guestbook values(null, ?, ?, ?, now())",
                Object.values(guestbook)
            );
        } catch (e) {
            console.log(e);
        } finally {
            conn.end();
        }
    },
    delete: async function(userinfo){
        const conn = dbconn();
        const query = util.promisify(conn.query).bind(conn);
        try {
            return await query(
                "delete from guestbook where no=? and password=?",
                Object.values(userinfo)
            );
        } catch (e) {
            console.log(e);
        } finally {
            conn.end();
        }
    }
}