import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import jwt, {Secret} from 'jsonwebtoken'

const store = new OrderStore()

const index = async (_req: Request, res: Response) => {
  try {
    const orders = await store.index()
    res.json(orders)
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
   try {
    const order = await store.show(req.params.id as unknown as number)
    res.json(order)
   } catch (err) {
    res.status(400)
    res.json(err)
   }
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status,
        }
        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}


const update = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status,
        }
        
        const updatedOrder = await store.update(req.params.id as unknown as number, order)
        res.json(updatedOrder)
    } catch (err){
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    try {
        const deleted = await store.destroy(req.params.id as unknown as number)
        res.json(deleted)
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

const addProduct = async (req: Request, res: Response) => {
    const orderId: string = req.params.id
    const productId: string = req.body.productId
    const quantity: number = parseInt(req.body.quantity)

    try {
      const addedProduct = await store.addProduct(quantity as number, orderId, productId)
      res.json(addedProduct)
    } catch(err) {
      res.status(400)
      res.json(err)
    }
  } 

  const orderByuser = async (req: Request, res: Response) => {
    try {
        const order = await store.orderByUser(req.params.user_id as unknown as number)
        res.json(order)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
 }

 const completedOrderByuser = async (req: Request, res: Response) => {
    try {
        const order = await store.completedOrderByUser(req.params.user_id as unknown as number)
        res.json(order)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
 }


const orderRoutes = (app: express.Application) => {
  app.get('/orders', verifyAuthToken, index)
  app.get('/orders/:id', verifyAuthToken, show)
  app.post('/orders', verifyAuthToken, create)
  app.put('/updateorders/:id', verifyAuthToken, update)
  app.delete('/delorders/:id', verifyAuthToken, destroy)
  // add product
  app.post('/orders/:id/products',verifyAuthToken, addProduct)
  app.get('/order-by-user/:user_id',verifyAuthToken, orderByuser)
  app.get('/complete-order-by-user/:user_id',verifyAuthToken, completedOrderByuser)
}

export default orderRoutes