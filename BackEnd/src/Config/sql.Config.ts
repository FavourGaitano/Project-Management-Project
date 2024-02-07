// import * as mssql from "mssql";
import mssql from 'mssql'

export const sqlConfig = {
    user:'sa',
    password:'09909090MKK',
    database: 'Rhyde',
    server: 'DESKTOP-B56002J\\KIMWETICH',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate:true
    }
};

let connect = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await mssql.connect('Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true')
        let query1 = "CREATE TABLE test(testcol VARCHAR(20))"
        const result = await mssql.query(query1)
        console.dir(result)
    } catch (err) {
        console.log(err);
        
    }
}

console.log(sqlConfig);

