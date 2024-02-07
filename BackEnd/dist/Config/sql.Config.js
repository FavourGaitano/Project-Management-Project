"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlConfig = void 0;
// import * as mssql from "mssql";
const mssql_1 = __importDefault(require("mssql"));
exports.sqlConfig = {
    user: 'sa',
    password: '09909090MKK',
    database: 'Rhyde',
    server: 'DESKTOP-B56002J\\KIMWETICH',
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
let connect = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        yield mssql_1.default.connect('Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true');
        let query1 = "CREATE TABLE test(testcol VARCHAR(20))";
        const result = yield mssql_1.default.query(query1);
        console.dir(result);
    }
    catch (err) {
        console.log(err);
    }
});
console.log(exports.sqlConfig);
