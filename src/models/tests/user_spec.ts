import { UserStore } from "../user";

const store = new UserStore()

describe("User model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    })
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
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

      it('should have an authenticate method', () => {
        expect(store.authenticate).toBeDefined();
      });


      it('create method should add a user', async () => {
        // Start from id = 1
        await store.resetCol()
        const result = await store.create({
        id: 1,    
        first_name: 'Mahmoud',
        last_name: 'Hussein',
        password: 'pass123'
    });
      expect(result.first_name).toBe('Mahmoud')
      expect(result.last_name).toBe('Hussein')
    });

      it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result[0].first_name).toBe('Mahmoud')
        expect(result[0].last_name).toBe('Hussein')
      });

      it('show method should return the correct user', async () => {
        const result = await store.show(1);
        expect(result.first_name).toBe('Mahmoud')
        expect(result.last_name).toBe('Hussein')
      });

      it('update method should update the user data', async () => {
        const result = await store.update(1 ,{
            id: 1,    
            first_name: 'Mohammed',
            last_name: 'Ataa',
            password: 'pass123'
        });
        expect(result.first_name).toBe('Mohammed')
        expect(result.last_name).toBe('Ataa')
      });

      it('delete method should remove the user', async () => {
        await store.destroy(1);
        const result = await store.index()
        expect(result).toEqual([]);
      });

})