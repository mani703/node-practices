const mysql = require('mysql');
const dbconn = require('./dbconn');

module.exports = {
    findAll: async function(){
        const conn = dbconn();
        const query = function(sql, data){
            return new Promise(function(resolve, reject){
                conn.query(
                    sql,
                    data,
                    function(error, rows, field) {
                    });                
            });
        }

        try {
            /*
            */
            const results = await query("select first_name, last_name, email from emaillist order by no desc", []);
            return results; 
        } catch(e){
            console.error(e);    
        } finally{
            conn.end();
        }
    },
    insert: function(){

    }
}