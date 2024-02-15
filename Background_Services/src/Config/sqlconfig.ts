import dotenv from 'dotenv'

dotenv.config()

console.log(process.env.DB_NAME);


export const sqlConfig = {

    user: process.env.DB_USER || 'sa', 
    password: process.env.DB_PWD || 'SQL-SERVER' ,
    database: process.env.DB_NAME || 'ProjectManagement',
    server :'FAVOUR\\FAVOUR',

    pool:{
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options:{
        encrypt: false,
        trustServerCertificate: true
    }
}

console.log(sqlConfig);
