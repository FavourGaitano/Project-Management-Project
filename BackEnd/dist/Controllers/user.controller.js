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
exports.createUser = void 0;
const mssql_1 = __importDefault(require("mssql"));
const uuid_1 = require("uuid");
const sql_Config_1 = require("../Config/sql.Config");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = (0, uuid_1.v4)();
        const { user_id, name, email, description, registered_user } = req.body;
        const newUser = { user_id: id, name, email, description, registered_user };
        const pool = yield mssql_1.default.connect(sql_Config_1.sqlConfig);
        let result = (yield pool.request()
            .input("user_id", mssql_1.default.VarChar, id)
            .input("name", mssql_1.default.VarChar, name)
            .input("email", mssql_1.default.VarChar, email)
            .input("description", mssql_1.default.VarChar, description)
            .input("registered_user", mssql_1.default.VarChar, registered_user)
            .execute('createdUser')).rowsAffected;
        console.log(result);
        return res.json({
            message: "Account created successfully",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
});
exports.createUser = createUser;
// export const getUsers = async (req: Request, res: Response) => {
//     try {
//       const procedureName = "getUsers";
//     //   const result = query(`EXEC ${procedureName}`);
//     //   return res.json(result.recordset);
//     } catch (error) {
//       console.log(error);
//     }
//   };
