import supertest from 'supertest';
import app from '../../server'
import { User, UserStore } from "../../models/user";
import { Product} from "../../models/product";
import client from '../../database';

const userStore = new UserStore()

const request = supertest(app);
let token = ''

//  Testing  End point Response
describe('Test products endpoint responses', (): void => {
    const product: Product = {
        id: 1,    
        name: 'LG 43',
        price: 7000,
        category: 'TVs'
    }

    beforeAll(async () => {
        const user: User = {
            id: 1,    
            first_name: 'Mahmoud',
            last_name: 'Hussein',
            password: 'pass123'
        }
        const createdUser = await userStore.create(user)
        user.id = createdUser.id
        const response = await request.post('/users/authenticate').set('Content-type', 'application/json').send({
            first_name: 'Mahmoud',
            last_name: 'Hussein',
            password: 'pass123'
        });
        const {token: userToken} = response.body.data;

        token = userToken;
    });

    afterAll(async () => {
        const conn = await client.connect();
        const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1; \nDELETE FROM products; \nALTER SEQUENCE products_id_seq RESTART WITH 1'
        await conn.query(sql)
        conn.release()
    });

    it('create route endpoint', async(): Promise<void> => {
        const response = await request.post('/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            id: 1,    
            name: 'LG 43',
            price: 7000,
            category: 'TVs'
        })
        expect(response.status).toBe(200);
        const {name, price, category} = response.body.data;
        expect(name).toBe('LG 43');
        expect(price).toBe(7000);
        expect(category).toBe('TVs')
     })

    it('index route endpoint', async() => {
        const response = await request.get('/products')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
    })
    
    
    it('show route endpoint', async() => {
        const response = await request.get('/products/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
        const {name, price, category} = response.body.data;
        expect(name).toBe('LG 43');
        expect(price).toBe(7000);
        expect(category).toBe('TVs')
    })

    it('five most popular products route endpoint', async() => {
        const response = await request.get('/five-most-popular')
        .set('Content-type', 'application/json')
        expect(response.status).toBe(200);
    })
    
    it('products by category route endpoint', async() => {
        const response = await request.get('/products-by-category/TVs')
        .set('Content-type', 'application/json')
        expect(response.status).toBe(200);
    })

});
