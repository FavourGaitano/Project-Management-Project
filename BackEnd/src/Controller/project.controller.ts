import { Request, Response } from "express";
import { v4 } from "uuid";
import { Project } from "../Interface/project.interface";
import mssql from "mssql";
import bcrypt from "bcrypt";
import { sqlConfig } from "../config/sql.config";
import Connection from "../DbHelper/dbhelper";
import { registerUserSchema } from "../Validators/users.validators";

const dbhelper = new Connection();

export const createProject = async (req: Request, res: Response) => {
  try {
    const id = v4();

    const { projectname, description, createdate, enddate }: Project = req.body;

    console.log(req.body);

    // let {error} = registerUserSchema.validate(req.body)

    // if(error){
    //   return res.status(404).json({
    //       error: error.details[0].message
    //   })
    // }

    const pool = await mssql.connect(sqlConfig);

    let result = (
      await pool
        .request()

        .input("project_id", mssql.VarChar, id)
        .input("projectname", mssql.VarChar, projectname)
        .input("description", mssql.VarChar, description)
        .input("createdate", mssql.VarChar, createdate)
        .input("enddate", mssql.VarChar, enddate)
        .execute("createProject")
    ).rowsAffected;

    console.log(result);

    return res.status(200).json({
      message: "Project created successfully",
    });
  } catch (error) {
    return res.json({ error: error });
  }
};

//Dbhelper get all users
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    //   let {error} = registerUserSchema.validate(req.body)

    //   if(error){
    //     return res.status(404).json({
    //         error: error.details[0].message
    //     })
    // }

    let projects = await dbhelper.execute("getAllProjects");

    if (projects.recordset.length > 0) {
      return res.json({
        projects,
      });
    } else {
      return res.json({
        message: "No projects found",
      });
    }
  } catch (error: any) {
    return res.json({
      error: error.originalError.info.message,
    });
  }
};

//Dbhelper get project by id

export const getOneProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.project_id;
    console.log("Project ID:", id);
    let project = await dbhelper.execute("getOneProject", { project_id: id });

    return res.json({ project });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue retrieving project" });
  }
};

//Dbhelper update project

export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.project_id;

    const { projectname, description, createdate, enddate }: Project = req.body;

    console.log("User ID:", id);

    let project = await dbhelper.execute("updateProject", {
      project_id: id,
      projectname,
      description,
      createdate,
      enddate,
    });

    return res.json({
      message: "Project updated successfully",
    });
  } catch (error) {
    console.log("Error in updating data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue updating project" });
  }
};

//Dbhelper delete project

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.project_id;
    console.log("Project ID:", id);
    let user = await dbhelper.execute("deleteProject", { project_id: id });

    return res.json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue deleting project" });
  }
};

//Assign user a project

export const assignUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.project_id;

    const { user_id }: Project = req.body;
    console.log("project ID:", id);

    let user = (await dbhelper.execute("checkUser", {
      user_id: user_id })).recordset;

      if(user[0].isAssigned){
        res.status(200).json({
          message: "User already has a project"
        })
      } else {
        let assign = (await dbhelper.execute("assignUser", {
          project_id: id,
          user_id: user_id
        })).recordset

        res.status(200).json({
          message: "Project assigned to user",
          assign
        })
      }
    
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue assigningProject" });
  }
};

// Mark as complete on project

export const completeProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.project_id;
    console.log("Project ID:", id);
    const { user_id } = req.body
    let user = await dbhelper.execute("completeProject", { project_id: id, user_id: user_id });

    return res.json({ message: "Project completed successfully" });
  } catch (error) {
    console.log("Error in getting data from database", error);
    return res
      .status(400)
      .json({ message: "There was an issue marking project as complete" });
  }
};
