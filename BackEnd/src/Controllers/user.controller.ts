import mssql from 'mssql';
import { Request, Response, query } from "express";
import { v4 } from 'uuid'
import { USers } from '../Interfaces/User';
import { sqlConfig } from '../Config/sql.Config';

export const createUser = async (req: Request, res: Response) => {
    try {
        const id = v4();
        const {user_id, name, email, description, registered_user }: USers = req.body;
        const newUser: USers = { user_id: id, name, email, description, registered_user };

        const pool = await mssql.connect(sqlConfig);

        let result = (await pool.request()
            .input("user_id", mssql.VarChar, id)
            .input("name", mssql.VarChar, name)
            .input("email", mssql.VarChar, email)
            .input("description", mssql.VarChar, description)
            .input("registered_user", mssql.VarChar, registered_user)
            .execute('createdUser')).rowsAffected;

        console.log(result);

        return res.json({
            message: "Account created successfully",
        });
    }  catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while processing the request." });
    }
};

// export const getUsers = async (req: Request, res: Response) => {
//     try {
//       const procedureName = "getUsers";
//     //   const result = query(`EXEC ${procedureName}`);
//     //   return res.json(result.recordset);
//     } catch (error) {
//       console.log(error);
//     }
//   };
  


























