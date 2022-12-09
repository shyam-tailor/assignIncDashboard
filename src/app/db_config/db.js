var mysql = require('mysql')

module.exports = {
    openCon: function (con) {
        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: '',
            database: 'assigninc'
        })
        con.connect((err, result) => {
            if (err) {
                console.log('An error occured in connection')
            }
            else {
                console.log('Connection established')

            }
        })
        return con
    }
}