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
const dotenv_1 = __importDefault(require("dotenv"));
const mssql_1 = __importDefault(require("mssql"));
dotenv_1.default.config();
exports.sqlConfig = {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PWD || 'SQL-SERVER',
    database: process.env.DB_NAME || 'ProjectManagement',
    server: 'FAVOUR\\FAVOUR',
    SECRET: "IUTR87GJWEF",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: false
    }
};
console.log(exports.sqlConfig);
let connect = () => __awaiter(void 0, void 0, void 0, function* () {
    let pool = yield mssql_1.default.connect(exports.sqlConfig);
    if (pool.connected) {
        console.log("connected");
        // let query = 'CREATE TABLE Users(User_id VARCHAR(100) NOT NULL, Name VARCHAR(100) NOT NULL, Email VARCHAR(255) NOT NULL UNIQUE, Role VARCHAR(20), Password VARCHAR(200) NOT NULL, Specialization_area VARCHAR(200))'
        // // let query2 = 'DROP TABLE Users'
        // let result = (await (await pool.connect()).query(query)).rowsAffected
        // console.log(result);
    }
    else {
        console.log('not connected');
    }
});
connect();
