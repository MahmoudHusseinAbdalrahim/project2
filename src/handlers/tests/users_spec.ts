import supertest from 'supertest';
import app from '../../server'
import { User, UserStore } from "../../models/user";
import client from '../../database';

const store = new UserStore()

const request = supertest(app);
let token = ''

//  Testing  End point Response
describe('Test users endpoint responses', (): void => {
    const user: User = {
        id: 1,    
        first_name: 'Mahmoud',
        last_name: 'Hussein',
        password: 'pass123'
    }

    afterAll(async () => {
        const conn = await client.connect();
        const sql = 'DELETE FROM users; \nALTER SEQUENCE users_id_seq RESTART WITH 1;'
        await conn.query(sql)
        conn.release()
    });
    it('authenticate route endpoint', async (): Promise<void> => {
        const createdUser = await store.create(user)
        user.id = createdUser.id
        const response = await request.post('/users/authenticate').set('Content-type', 'application/json').send({
            first_name: 'Mahmoud',
            last_name: 'Hussein',
            password: 'pass123'
        });
        expect(response.status).toBe(200);
        const {first_name, last_name, token: userToken} = response.body.data;
        expect(first_name).toBe('Mahmoud');
        expect(last_name).toBe('Hussein');
        token = userToken;
    });

    it('create route endpoint', async(): Promise<void> => {
        const response = await request.post('/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            first_name: 'Mohamed',
            last_name: 'Abdalhady',
            password: "hady123"
        })
        expect(response.status).toBe(200);
        const {first_name, last_name} = response.body.data;
        expect(first_name).toBe('Mohamed');
        expect(last_name).toBe('Abdalhady');
    })

    it('index route endpoint', async() => {
        const response = await request.get('/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(2);
    })
    
    
    it('show route endpoint', async() => {
        const response = await request.get('/users/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(response.status).toBe(200);
        const {first_name, last_name} = response.body.data;
        expect(first_name).toBe('Mahmoud');
        expect(last_name).toBe('Hussein');
    })

    it('update route endpoint', async() => {
        const response = await request.put('/updateusers/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            first_name: 'Mahmoud',
            last_name: 'Altayyeb',
            password: "pass124"
        })
        expect(response.status).toBe(200);
        const {first_name, last_name} = response.body.data;
        expect(first_name).toBe('Mahmoud');
        expect(last_name).toBe('Altayyeb');
    })
    
    it('Delete route endpoint', async() => {
        const response = await request.delete('/delusers/1')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .send({
            first_name: 'Mahmoud',
            last_name: 'Altayyeb',
            password: "pass124"
        })
        expect(response.status).toBe(200);
        const responseIndex = await request.get('/users')
        .set('Content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        expect(responseIndex.body.data.length).toBe(1);

    })

});


export default token;