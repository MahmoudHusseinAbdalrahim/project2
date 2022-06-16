// @ts-ignore
import client from "../database";
import bcrypt from 'bcrypt'

const pepper = process.env.BCRYPT_PASSWORD as string
const saltRounds = process.env.SALT_ROUNDS as string

export type User = {
    id?: Number;
    first_name: String;
    last_name: String;
    password: String
}

export class UserStore {
    // Show all users
    async index(): Promise<User[]> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error (`Cannot get users. Error: ${err}`)
        }
    }

    // Show one User
    async show(id: number): Promise<User> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            conn.release()
            return result.rows[0]
        }catch (err) {
            throw new Error (`Cannot get users with id= ${id}. Error: ${err}`)      
        }
    }

    // Create User
    async create(u: User): Promise<User> {
        try{
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *'
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))
            const result = await conn.query(sql, [u.first_name, u.last_name, hash])
            const user = result.rows[0]
            conn.release()
            return user    
        }catch (err) {
            throw new Error(`Could not add new user ${u.first_name} ${u.last_name}. Error: ${err}`)
        }
    }

    // Update User
    async update(id: number, u: User): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'UPDATE users SET first_name = $1, last_name = $2, password = $3 WHERE id = ($4) RETURNING *'
            const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds))
            const result = await conn.query(sql, [u.first_name, u.last_name, hash, id])
            const user = result.rows[0]
            conn.release()
            return user
        } catch (err) {
            throw new Error(`Could not update new user ${u.first_name} ${u.last_name}. Error: ${err}`)
        }
    }

    // Delete User
    async destroy(id: number): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'DELETE FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id])
            const userDel = result.rows[0]
            conn.release()
            return userDel
        } catch (err) {
            throw new Error(`Could not delete user ${id}. Error: ${err}`)
        }
    }

    async resetCol(): Promise<User> {
        try {
            // @ts-ignore
            const conn = await client.connect()
            const sql = 'Alter SEQUENCE users_id_seq RESTART'
            const result = await conn.query(sql)
            const userReset = result.rows[0]
            conn.release()
            return userReset
        } catch (err) {
            throw new Error(`Could not reset user id. Error: ${err}`)
        }
    }
    async authenticate(first_name: string, last_name: string, password: string): Promise<User | null> {
        try {
                    // @ts-ignore
        const conn = await client.connect()
        const sql = 'SELECT * FROM users WHERE first_name=($1) AND last_name=($2)'
        const result = await conn.query(sql, [first_name, last_name])
        
        if(result.rows.length) {
    
          const user = result.rows[0]
          conn.release()
    
          if (bcrypt.compareSync(password+pepper, user.password)) {
            return user
          }
        }
    
        return null
      } catch(err) {
        throw new Error(`Could not athenticate user. Error: ${err}`)
      }
    }

}