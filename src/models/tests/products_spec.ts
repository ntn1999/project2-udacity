import { ProductStore } from '../products';

const store = new ProductStore();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a product', async () => {
    const result = await store.create({
      name: 'ipad air 4',
      price: 600,
      category: 'Đồ điện tử',
    });
    expect(result).toEqual({
      id: 4,
      name: 'ipad air 4',
      price: 600,
      category: 'Đồ điện tử',
    });
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result[0]).toEqual({
      id: 1,
      name: 'ipad air 4',
      price: 600,
      category: 'Đồ điện tử',
    });
  });

  it('show method should return the correct product', async () => {
    const result = await store.show('1');
    expect(result).toEqual({
      id: 1,
      name: 'ipad air 4',
      price: 600,
      category: 'Đồ điện tử',
    });
  });
});
