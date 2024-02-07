import express,  {NextFunction, Request, Response, json} from 'express'
import userRouter from './Routes/user.router'
import cors from "cors"

const app = express()

app.use(json())
app.use(cors())
app.use('/users', userRouter)

app.use((error: Error, req: Request, res: Response, next: NextFunction)=>{
    res.json({
        message: error.message
    })
})

let port:number = 4100;

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`); 
})