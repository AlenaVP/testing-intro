const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

const getIds = (items) => items.map(({ id }) => id);

describe('searchProducts', () => {
  test("'Наушники' находит товар с ID 1", () => {
    expect(getIds(searchProducts(products, 'Наушники'))).toEqual([1]);
  });

  test("'Чистый код' находит товар с ID 6", () => {
    expect(getIds(searchProducts(products, 'Чистый код'))).toEqual([6]);
  });

  test("'Настольная лампа' находит товар с ID 4", () => {
    expect(getIds(searchProducts(products, 'Настольная лампа'))).toEqual([4]);
  });

  test("поиск 'javascript' не зависит от регистра", () => {
    expect(getIds(searchProducts(products, 'javascript'))).toEqual([3]);
  });

  test("поиск 'ЧЕХОЛ' не зависит от регистра", () => {
    expect(getIds(searchProducts(products, 'ЧЕХОЛ'))).toEqual([5]);
  });

  test("поиск 'наушники' не зависит от регистра", () => {
    expect(getIds(searchProducts(products, 'наушники'))).toEqual([1]);
  });

  test('пустой запрос возвращает все товары', () => {
    expect(getIds(searchProducts(products, ''))).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('запрос из пробелов возвращает все товары', () => {
    expect(getIds(searchProducts(products, '   '))).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('запрос из табуляции и переноса строки возвращает все товары', () => {
    expect(getIds(searchProducts(products, '\t\n'))).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
