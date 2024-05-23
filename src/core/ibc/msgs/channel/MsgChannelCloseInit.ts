/* eslint-disable @typescript-eslint/no-unused-vars */
import { JSONSerializable } from '../../../../util/json';
import { AccAddress } from '../../../bech32';
import { Any } from '@xpla/xpla.proto/google/protobuf/any';
import { MsgChannelCloseInit as MsgChannelCloseInit_pb } from '@xpla/xpla.proto/ibc/core/channel/v1/tx';

/**
 * MsgChannelCloseInit defines a msg sent by a Relayer to Chain A to close a channel with Chain B.
 */
export class MsgChannelCloseInit extends JSONSerializable<
  any,
  MsgChannelCloseInit.Data,
  MsgChannelCloseInit.Proto
> {
  /**
   * @param port_id identifier of the port to use
   * @param channel channel info
   * @param signer signer address
   */
  constructor(
    public port_id: string,
    public channel_id: string,
    public signer: AccAddress
  ) {
    super();
  }

  public static fromAmino(_: any, _isClassic?: boolean): MsgChannelCloseInit {
    throw new Error('Amino not supported');
  }

  public toAmino(_?: boolean): any {
    throw new Error('Amino not supported');
  }

  public static fromData(
    data: MsgChannelCloseInit.Data,
    _?: boolean
  ): MsgChannelCloseInit {
    const { port_id, channel_id, signer } = data;
    return new MsgChannelCloseInit(port_id, channel_id, signer);
  }

  public toData(_?: boolean): MsgChannelCloseInit.Data {
    const { port_id, channel_id, signer } = this;
    return {
      '@type': '/ibc.core.channel.v1.MsgChannelCloseInit',
      port_id,
      channel_id,
      signer,
    };
  }

  public static fromProto(
    proto: MsgChannelCloseInit.Proto,
    _?: boolean
  ): MsgChannelCloseInit {
    return new MsgChannelCloseInit(proto.portId, proto.channelId, proto.signer);
  }

  public toProto(_?: boolean): MsgChannelCloseInit.Proto {
    const { port_id, channel_id, signer } = this;
    return MsgChannelCloseInit_pb.fromPartial({
      portId: port_id,
      channelId: channel_id,
      signer,
    });
  }

  public packAny(_?: boolean): Any {
    return Any.fromPartial({
      typeUrl: '/ibc.core.channel.v1.MsgChannelCloseInit',
      value: MsgChannelCloseInit_pb.encode(this.toProto()).finish(),
    });
  }

  public static unpackAny(msgAny: Any, _?: boolean): MsgChannelCloseInit {
    return MsgChannelCloseInit.fromProto(
      MsgChannelCloseInit_pb.decode(msgAny.value)
    );
  }
}

export namespace MsgChannelCloseInit {
  export interface Data {
    '@type': '/ibc.core.channel.v1.MsgChannelCloseInit';
    port_id: string;
    channel_id: string;
    signer: AccAddress;
  }
  export type Proto = MsgChannelCloseInit_pb;
}
