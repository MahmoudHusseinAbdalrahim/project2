import supertest from 'supertest';
import app from '../../server'
import { User, UserStore } from "../../models/user";
import { Order, OrderStore } from "../../models/order";
import client from '../../database';

const userStore = new UserStore()
const Store = new OrderStore()

const request = supertest(app);
let token = ''

//  Testing  End point Response
describe('Test products endpoint responses', (): void => {
    const order: Order = {
        id: 1,    
        user_id: '1',
        status: 'active'
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
        const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1; \nDELETE FROM orders; \nALTER SEQUENCE orders_id_seq RESTART WITH 1'
        await conn.query(sql)
        conn.release()
    });


    it('order by user route endpoint', async() => {
        const response = await request.get('/order-by-user/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    })
    
    it('complete order by user route endpoint', async() => {
        const response = await request.get('/complete-order-by-user/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
    })

});
