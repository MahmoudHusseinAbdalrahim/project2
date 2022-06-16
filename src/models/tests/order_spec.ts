import { OrderStore } from "../order";
import { UserStore } from "../user";

const store = new OrderStore()
const userStore = new UserStore()

describe("Order model", () => {
     it('should have an index method', () => {
        expect(store.index).toBeDefined();
      })
     it('should have a show method', () => {
        expect(store.show).toBeDefined();
      });

      it('should have a order by user method', () => {
        expect(store.orderByUser).toBeDefined();
      });
    
      it('should have a create method', () => {
        expect(store.create).toBeDefined();
      });
    
      it('should have a update method', () => {
        expect(store.update).toBeDefined();
      });
    
      it('should have a delete method', () => {
        expect(store.destroy).toBeDefined();
      });

      it('create method should add an order', async () => {
        await userStore.create({
          id: 1,    
          first_name: 'Mahmoud',
          last_name: 'Hussein',
          password: 'pass123'
        });
        const result = await store.create({
        id: 1,
        user_id: '1',
        status: "active"
    });
      expect(result).toEqual({
        id: 1,
        user_id: '1',
        status: "active"
      });
    });

      it('index method should return a list of orders', async () => {
        const result = await store.index();
        expect(result).toEqual([{
          id: 1,
          user_id: '1',
          status: "active"
        }]);
      });

      it('show method should return the correct order', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
          id: 1,
          user_id: '1',
          status: "active"
        });
      });

      it('order by user method should return the current order by user', async () => {
        const result = await store.orderByUser(1);
        expect(result).toEqual({
          id: 1,
          user_id: '1',
          status: "active"
        });
      });

      it('update method should update the order data', async () => {
        const result = await store.update(1 ,{
          id: 1,
          user_id: '1',
          status: "complete"
        });
        expect(result).toEqual({
          id: 1,
          user_id: '1',
          status: "complete"
        });
      });

      it('delete method should remove the order', async () => {
        store.destroy(1);
        const result = await store.index()
        expect(result).toEqual([]);
        await userStore.destroy(1)
      });
})