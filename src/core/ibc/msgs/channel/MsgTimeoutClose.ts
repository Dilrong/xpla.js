/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Height } from '../../core/client/Height';
import { Packet } from '../../core/channel/Packet';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgTimeoutOnClose as MsgTimeoutOnClose_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

/**
 * MsgTimeoutOnClose timed-out packet upon counterparty channel closure.
 */
export class MsgTimeoutOnClose extends JSONSerializable<
  any,
  MsgTimeoutOnClose.Data,
  MsgTimeoutOnClose.Proto
> {
  /**
   * @param packet
   * @param proof_unreceived
   * @param proof_height
   * @param proof_close
   * @param next_seuqnce_recv
   * @param signer signer address
   */
  constructor(
    public packet: Packet | undefined,
    public proof_unreceived: string,
    public proof_close: string,
    public proof_height: Height | undefined,
    public next_sequence_recv: number,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgTimeoutOnClose {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgTimeoutOnClose.Data,
    _?: boolean
  ): MsgTimeoutOnClose {
    const {
      packet,
      proof_unreceived,
      proof_close,
      proof_height,
      next_sequence_recv,
      signer,
    } = data;
    return new MsgTimeoutOnClose(
      packet ? Packet.fromData(packet) : undefined,
      proof_close,
      proof_unreceived,
      proof_height ? Height.fromData(proof_height) : undefined,
      Number.parseInt(next_sequence_recv),
      signer
    );
  }

  public toData(_?: boolean): MsgTimeoutOnClose.Data {
    const {
      packet,
      proof_unreceived,
      proof_close,
      proof_height,
      next_sequence_recv,
      signer,
    } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgTimeoutOnClose',
      packet: packet ? packet.toData() : undefined,
      proof_unreceived,
      proof_close,
      proof_height: proof_height ? proof_height.toData() : undefined,
      next_sequence_recv: next_sequence_recv.toFixed(),
      signer,
    };
  }

  public static fromProto(
    proto: MsgTimeoutOnClose.Proto,
    _?: boolean
  ): MsgTimeoutOnClose {
    return new MsgTimeoutOnClose(
      proto.packet ? Packet.fromProto(proto.packet) : undefined,
      Buffer.from(proto.proofUnreceived).toString('base64'),
      Buffer.from(proto.proofClose).toString('base64'),
      proto.proofHeight ? Height.fromProto(proto.proofHeight) : undefined,
      proto.nextSequenceRecv.toNumber(),
      proto.signer
    );
  }

  public toProto(_?: boolean): MsgTimeoutOnClose.Proto {
    const {
      packet,
      proof_unreceived,
      proof_close,
      proof_height,
      next_sequence_recv,
      signer,
    } = this;
    return MsgTimeoutOnClose_pb.fromPartial({
      packet: packet ? packet.toProto() : undefined,
      proofUnreceived: Buffer.from(proof_unreceived, 'base64'),
      proofClose: Buffer.from(proof_close, 'base64'),
      proofHeight: proof_height ? proof_height.toProto() : undefined,
      nextSequenceRecv: next_sequence_recv,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgTimeoutOnClose',
      value: MsgTimeoutOnClose_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgTimeoutOnClose {
    return MsgTimeoutOnClose.fromProto(
      MsgTimeoutOnClose_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgTimeoutOnClose {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgTimeoutOnClose';
    packet?: Packet.Data;
    proof_unreceived: string;
    proof_close: string;
    proof_height?: Height.Data;
    next_sequence_recv: string;
    signer: AccAddress;
  }
  export type Proto = MsgTimeoutOnClose_pb;
}
