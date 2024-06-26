import { MsgSendV1B1 } from './MsgSend';
import { Coins } from '../../../Coins';

describe('MsgSend', () => {
  it('deserialize correctly', () => {
    const send = MsgSendV1B1.fromAmino({
      type: 'bank/MsgSend',
      value: {
        from_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        to_address: 'xpla1v9ku44wycfnsucez6fp085f5fsksp47u9x8jr4',
        amount: [
          {
            denom: 'axpla',
            amount: '8102024952',
          },
        ],
      },
    });

    expect(send).toMatchObject({
      from_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      to_address: 'xpla1v9ku44wycfnsucez6fp085f5fsksp47u9x8jr4',
      amount: new Coins({
        uluna: 8102024952,
      }),
    });

    expect(send.toAmino(true)).toMatchObject({
      type: 'bank/MsgSend',
      value: {
        from_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
        to_address: 'xpla1v9ku44wycfnsucez6fp085f5fsksp47u9x8jr4',
        amount: [
          {
            denom: 'axpla',
            amount: '8102024952',
          },
        ],
      },
    });
  });

  it('deserialize correctly proto', () => {
    const send = MsgSendV1B1.fromData({
      '@type': '/cosmos.bank.v1beta1.MsgSend',
      from_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      to_address: 'xpla1v9ku44wycfnsucez6fp085f5fsksp47u9x8jr4',
      amount: [
        {
          denom: 'axpla',
          amount: '8102024952',
        },
      ],
    });

    expect(send).toMatchObject({
      from_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      to_address: 'xpla1v9ku44wycfnsucez6fp085f5fsksp47u9x8jr4',
      amount: new Coins({
        uluna: 8102024952,
      }),
    });

    expect(send.toData()).toMatchObject({
      '@type': '/cosmos.bank.v1beta1.MsgSend',
      from_address: 'xpla1y4umfuqfg76t8mfcff6zzx7elvy93jtp4xcdvw',
      to_address: 'xpla1v9ku44wycfnsucez6fp085f5fsksp47u9x8jr4',
      amount: [
        {
          denom: 'axpla',
          amount: '8102024952',
        },
      ],
    });
  });
});
