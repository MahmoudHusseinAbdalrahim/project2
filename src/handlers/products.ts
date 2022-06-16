import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import jwt, {Secret} from 'jsonwebtoken'

const store = new ProductStore()

const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json({data: products})
  } catch (err) {
    res.status(400)
    res.json(err)
  }
}

const show = async (req: Request, res: Response) => {
   try {
    const product = await store.show(req.params.id as unknown as number)
    res.json({data: {...product}})
   } catch (err) {
    res.status(400)
    res.json(err)
   }
}

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }

        const newProduct = await store.create(product)
        res.json({data: {...newProduct}})
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const getFiveMostPopularProduct = async (req: Request, res: Response) => {
    try {
        const popular = await store.topFivePopularProducts()
        res.json(popular)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const getProductsByCategory = async (req: Request, res: Response) => {
    try{
        const products = await store.productsByCategory(req.params.category)
        res.json(products)
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

const productRoutes = (app: express.Application) => {
  app.get('/products', verifyAuthToken, index)
  app.get('/products/:id', verifyAuthToken, show)
  app.post('/products',verifyAuthToken, create)
  app.get('/five-most-popular', getFiveMostPopularProduct)
  app.get('/products-by-category/:category', getProductsByCategory)
}

export default productRoutes