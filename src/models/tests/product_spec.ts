import { Product, ProductStore } from "../product";

const store = new ProductStore()

describe("product model", () => {
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

      it('create method should add a product', async () => {
        const result = await store.create({
        id: 1,    
        name: 'Burger',
        price: 5.5,
        category: "food"
    });
      expect(result).toEqual({
        id: 1,    
        name: 'Burger',
        price: 5.5,
        category: "food"
      });
    });

      it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
            id: 1,    
            name: 'Burger',
            price: 5.5,
            category: "food"
        }]);
      });

      it('show method should return the correct product', async () => {
        const result = await store.show(1);
        expect(result).toEqual({
            id: 1,    
            name: 'Burger',
            price: 5.5,
            category: "food"
        });
      });
})