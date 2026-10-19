const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

const getIds = (items) => items.map(({ id }) => id);

describe('sortProductsByPrice', () => {
  test("все товары с направлением 'asc' сортируются по возрастанию цены", () => {
    expect(getIds(sortProductsByPrice(products, 'asc'))).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('направление по умолчанию сортирует по возрастанию цены', () => {
    expect(getIds(sortProductsByPrice(products))).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] с направлением 'asc' сортируются по возрастанию", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    expect(getIds(sortProductsByPrice(subset, 'asc'))).toEqual([3, 4, 1]);
  });

  test("все товары с направлением 'desc' сортируются по убыванию цены", () => {
    expect(getIds(sortProductsByPrice(products, 'desc'))).toEqual([1, 2, 4, 5, 6, 3]);
  });

  test("товары [3, 1, 4] с направлением 'desc' сортируются по убыванию", () => {
    const subset = products.filter(({ id }) => [3, 1, 4].includes(id));
    // Фильтрация по исходному products сохраняет порядок [1, 3, 4], поэтому формируем нужный порядок явно.
    const orderedSubset = [subset.find(({ id }) => id === 3), subset.find(({ id }) => id === 1), subset.find(({ id }) => id === 4)];
    expect(getIds(sortProductsByPrice(orderedSubset, 'desc'))).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] с направлением 'desc' сортируются по убыванию", () => {
    const subset = products.filter(({ id }) => [5, 2, 6].includes(id));
    const orderedSubset = [subset.find(({ id }) => id === 5), subset.find(({ id }) => id === 2), subset.find(({ id }) => id === 6)];
    expect(getIds(sortProductsByPrice(orderedSubset, 'desc'))).toEqual([2, 5, 6]);
  });

  test("вызов с 'asc' не меняет исходный массив [1, 3, 4]", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    sortProductsByPrice(subset, 'asc');
    expect(getIds(subset)).toEqual([1, 3, 4]);
  });

  test("вызов с 'desc' не меняет исходный массив [1, 3, 4]", () => {
    const subset = products.filter(({ id }) => [1, 3, 4].includes(id));
    sortProductsByPrice(subset, 'desc');
    expect(getIds(subset)).toEqual([1, 3, 4]);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров', () => {
    sortProductsByPrice(products);
    expect(getIds(products)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
