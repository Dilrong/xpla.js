import { LCDClient } from '../LCDClient';
import { BankAPI } from './BankAPI';

const xpla = new LCDClient({
  chainID: 'cube_47-5',
  URL: 'https://cube-lcd.xpla.dev',
});
const bank = new BankAPI(xpla);

describe('BankAPI', () => {
  describe('balance', () => {
    it('account exists', async () => {
      await bank.balance('xpla1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v');
    });

    it('invalid account', async () => {
      await expect(bank.balance('1234')).rejects.toThrow();
    });
  });

  it('total supply', async () => {
    const totalSupply = await bank.total();
    expect(totalSupply[0].toArray().length).toBeGreaterThan(0);
  });

  describe('parameters', () => {
    it('parameters', async () => {
      const param = await bank.parameters();

      expect(param.default_send_enabled).toBeDefined();
    });
  });
});
