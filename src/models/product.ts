// @ts-ignore
import client from "../database";

export type Product = {
    id?: Number;
    name: String;
    price: Number;
    category: String
}

export class ProductStore {
    // Show all products
    async index(): Promise<Product[]> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM products'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Cannot get products. Error: ${err}`)
        }
    }

    // Show one Product
    async show(id: number): Promise<Product> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        }catch (err) {
            throw new Error (`Cannot get products with id= ${id}. Error: ${err}`)      
        }
    }

    // Create Product
    async create(p: Product): Promise<Product> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [p.name, p.price, p.category])
            const product = result.rows[0]
            conn.release()
            return product    
        }catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
        }
    }

    // Update Product
    async update(id: number, p: Product): Promise<Product> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'UPDATE products SET name = ($1), price = ($2), category = ($3) WHERE id = ($4) RETURNING *'
            const result = await conn.query(sql, [p.name, p.price, p.category, id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not update new product ${p.name}. Error: ${err}`)
        }
    }

    // Delete Product
    async destroy(id: number): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [id])
            const product = result.rows[0]
            conn.release()
            return product
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`)
        }
    }

    // Show Top Five Most Popular Products
    async topFivePopularProducts(): Promise<{name: string}[]> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT products.name FROM products JOIN order_products ON products.id = order_products.product_id  GROUP BY products.name ORDER BY count(*) DESC LIMIT 5'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Cannot get top five popular products. Error: ${err}`)
        }
    }

     // Show Top Five Most Popular Products
     async productsByCategory(category: string): Promise<Product[]> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM products WHERE category = ($1)'
            const result = await conn.query(sql, [category])
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Cannot get products by category. Error: ${err}`)
        }
    }
}