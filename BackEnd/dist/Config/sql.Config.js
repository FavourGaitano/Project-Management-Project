"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
exports.sqlConfig = {
    user: 'sa',
    password: '09909090MKK',
    database: 'Rhyde',
    server: 'DESKTOP-B56002J\KIMWETICH',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
console.log(exports.sqlConfig);
