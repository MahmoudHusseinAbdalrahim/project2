import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt, {Secret} from 'jsonwebtoken'

const store = new UserStore()

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json({data: users})
}

const show = async (req: Request, res: Response) => {
   const user = await store.show(req.params.id as unknown as number)
   res.json({data: {...user}})
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        }

        const newUser = await store.create(user)
        res.json({data: {...newUser}})
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}


const update = async (req: Request, res: Response) => {
    try {
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password
        }
        
        const updatedUser = await store.update(req.params.id as unknown as number, user)
        res.json({data: {...updatedUser}})
    } catch (err){
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.destroy(req.params.id as unknown as number)
        res.json({data: {deleted}})
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const authenticate = async (req: Request, res: Response) => {
    const user: User = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
      }
    try {

        const authenticate = await store.authenticate(user.first_name as string, user.last_name as string, user.password as string)
        var token = jwt.sign({user: authenticate}, process.env.TOKEN_SECRET as string)
        res.json({data: {...user, token}})
    } catch (err) {
        res.status(400)
        res.json(err)   
    }
}

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
    try{
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        jwt.verify(token, process.env.TOKEN_SECRET as Secret)
        next()
    } catch (err) {
        res.status(401)
        res.json(`Invaled token ${err}`)
        return
    }
}



const userRoutes = (app: express.Application) => {
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id', verifyAuthToken, show)
  app.post('/users',verifyAuthToken, create)
  app.put('/updateusers/:id',verifyAuthToken, update)
  app.delete('/delusers/:id', verifyAuthToken, destroy)
  app.post('/users/authenticate', authenticate)
}

export default userRoutes