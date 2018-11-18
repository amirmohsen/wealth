import getData from '.';

describe('getData', () => {

  afterAll(() => {
    jest.resetModules();
  });

  test('should return the same object everytime (initially empty)', () => {
    let data: any = getData();

    expect(data).toEqual({});

    data.GBP = {};

    expect(data).toEqual({
      GBP: {},
    });

    data = getData();

    expect(data).toEqual({
      GBP: {},
    });

    data.GBP.symbol = '£';

    data = getData();

    expect(data).toEqual({
      GBP: {
        symbol: '£',
      },
    });

    delete data.GBP;

    data = getData();

    expect(data).toEqual({});
  });
});
