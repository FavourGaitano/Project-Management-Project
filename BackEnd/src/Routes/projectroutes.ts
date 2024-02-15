import {Router} from "express"
import {createProject, getAllProjects, getOneProject, updateProject, deleteProject, assignUser, completeProject} from "../Controller/project.controller"
import { verifyToken } from "../Middlewares/verifyToken";

const projectRouter = Router()

projectRouter.post('/', createProject)
projectRouter.get('/' , verifyToken, getAllProjects)
projectRouter.get("/:project_id" , verifyToken, getOneProject)
projectRouter.put("/:project_id" , verifyToken, updateProject);
projectRouter.delete("/:project_id" , verifyToken, deleteProject);
projectRouter.post("/:project_id" , verifyToken, assignUser)
projectRouter.post("/completed/:project_id" , verifyToken, completeProject)


export default projectRouter