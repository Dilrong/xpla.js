/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Counterparty } from '../../core/connection/Counterparty';
import { Version } from '../../core/connection/Version';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgConnectionOpenInit as MsgConnectionOpenInit_pb } from '@xpla/xpla.proto/ibc/core/connection/v1/tx';

/**
 * MsgConnectionOpenInit defines the msg sent by an account on Chain A to initialize a connection with Chain B.
 */
export class MsgConnectionOpenInit extends JSONSerializable<
  any,
  MsgConnectionOpenInit.Data,
  MsgConnectionOpenInit.Proto
> {
  public client_id: string;
  public counterparty?: Counterparty;
  public version?: Version;
  public delay_period: number;
  public signer: AccAddress;
  /**
   * @param client_id identifier of the port to use
   * @param counterparty
   * @param version
   * @param delay_period
   * @param signer signer address
   */
  constructor(
    client_id: string,
    delay_period: number,
    signer: AccAddress,
    counterparty?: Counterparty,
    version?: Version
  ) {
    super();
    this.client_id = client_id;
    this.delay_period = delay_period;
    this.signer = signer;
    this.counterparty = counterparty;
    this.version = version;
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgConnectionOpenInit {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgConnectionOpenInit.Data,
    _?: boolean
  ): MsgConnectionOpenInit {
    const { client_id, counterparty, version, delay_period, signer } = data;
    return new MsgConnectionOpenInit(
      client_id,
      Number.parseInt(delay_period),
      signer,
      counterparty ? Counterparty.fromData(counterparty) : undefined,
      version ? Version.fromData(version) : undefined
    );
  }

  public toData(_?: boolean): MsgConnectionOpenInit.Data {
    const { client_id, counterparty, version, delay_period, signer } = this;
    return {
      '@type': '/ibc.core.connection.v1.MsgConnectionOpenInit',
      client_id,
      delay_period: delay_period.toFixed(),
      signer,
      counterparty: counterparty ? counterparty.toData() : undefined,
      version: version ? version.toData() : undefined,
    };
  }

  public static fromProto(
    proto: MsgConnectionOpenInit.Proto,
    _?: boolean
  ): MsgConnectionOpenInit {
    return new MsgConnectionOpenInit(
      proto.clientId,
      proto.delayPeriod.toNumber(),
      proto.signer,
      proto.counterparty
        ? Counterparty.fromProto(proto.counterparty)
        : undefined,
      proto.version ? Version.fromProto(proto.version) : undefined
    );
  }

  public toProto(_?: boolean): MsgConnectionOpenInit.Proto {
    const { client_id, counterparty, version, delay_period, signer } = this;
    return MsgConnectionOpenInit_pb.fromPartial({
      clientId: client_id,
      delayPeriod: delay_period,
      signer,
      counterparty: counterparty ? counterparty.toProto() : undefined,
      version: version ? version.toProto() : undefined,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.connection.v1.MsgConnectionOpenInit',
      value: MsgConnectionOpenInit_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgConnectionOpenInit {
    return MsgConnectionOpenInit.fromProto(
      MsgConnectionOpenInit_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgConnectionOpenInit {
  export interface Data {
    '@type': '/ibc.core.connection.v1.MsgConnectionOpenInit';
    client_id: string;
    counterparty?: Counterparty.Data;
    version?: Version.Data;
    delay_period: string;
    signer: AccAddress;
  }
  export type Proto = MsgConnectionOpenInit_pb;
}
