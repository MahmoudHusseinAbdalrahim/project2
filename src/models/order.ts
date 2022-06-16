// @ts-ignore
import client from "../database";

export type Order = {
    id?: Number;
    user_id: string;
    status: String
}

export class OrderStore {
    // Show all orders
    async index(): Promise<Order[]> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Cannot get orders. Error: ${err}`)
        }
    }

    // Show one Order
    async show(id: number): Promise<Order> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        }catch (err) {
            throw new Error (`Cannot get orders with id= ${id}. Error: ${err}`)      
        }
    }

    // Create Order
    async create(o: Order): Promise<Order> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *'
            const result = await conn.query(sql, [o.user_id, o.status])
            const order = result.rows[0]
            conn.release()
            return order    
        }catch (err) {
            throw new Error(`Could not add new order with id = ${o.id}. Error: ${err}`)
        }
    }

    // Update Order
    async update(id: number, o: Order): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'UPDATE orders SET user_id = ($1), status = ($2) WHERE id = ($3) RETURNING *'
            const result = await conn.query(sql, [o.user_id, o.status, id])
            const order = result.rows[0]
            conn.release()
            return order
        } catch (err) {
            throw new Error(`Could not update new order with id = ${id}. Error: ${err}`)
        }
    }

    // Delete Order
    async destroy(id: number): Promise<Order> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'DELETE FROM orders WHERE id=($1)'
            const result = await conn.query(sql, [id])
            const orderDel = result.rows[0]
            conn.release()
            return orderDel
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`)
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
         // get order to see if it is open
        try {
            const ordersql = 'SELECT * FROM orders WHERE id=($1)'
            //@ts-ignore
            const conn = await client.connect()

            const result = await conn.query(ordersql, [orderId])

            const order = result.rows[0]

            if (order.status !== "active") {
                throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`)
            }
    
            conn.release()
        } catch (err) {
            throw new Error(`${err}`)
        }
  

        try {
          const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
          //@ts-ignore
          const conn = await client.connect()

          const result = await conn.query(sql, [quantity, orderId, productId])
          const order = result.rows[0]
          
          conn.release()
          
          return order
        } catch (err) {
          throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`)
        }
      }

    // Show Current Order by user
    async orderByUser(user_id: number): Promise<Order> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
            const result = await conn.query(sql, [user_id, 'active'])
            conn.release()
            return result.rows[result.rows.length - 1]
        }catch (err) {
            throw new Error (`Cannot get order by user id = ${user_id}. Error: ${err}`)      
        }
    }

    // Completed Orders by user
    async completedOrderByUser(user_id: number): Promise<Order[]> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM orders WHERE user_id=($1) AND status=($2)'
            const result = await conn.query(sql, [user_id, 'complete'])
            conn.release()
            return result.rows
        }catch (err) {
            throw new Error (`Cannot get order by user id = ${user_id}. Error: ${err}`)      
        }
    }

}