// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt,
} from "@graphprotocol/graph-ts";

export class OwnershipTransferRequested extends ethereum.Event {
  get params(): OwnershipTransferRequested__Params {
    return new OwnershipTransferRequested__Params(this);
  }
}

export class OwnershipTransferRequested__Params {
  _event: OwnershipTransferRequested;

  constructor(event: OwnershipTransferRequested) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class RequestAccepted extends ethereum.Event {
  get params(): RequestAccepted__Params {
    return new RequestAccepted__Params(this);
  }
}

export class RequestAccepted__Params {
  _event: RequestAccepted;

  constructor(event: RequestAccepted) {
    this._event = event;
  }

  get requestId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get famousAmos(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class RequestCompleted extends ethereum.Event {
  get params(): RequestCompleted__Params {
    return new RequestCompleted__Params(this);
  }
}

export class RequestCompleted__Params {
  _event: RequestCompleted;

  constructor(event: RequestCompleted) {
    this._event = event;
  }

  get requestId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get postId(): string {
    return this._event.parameters[1].value.toString();
  }
}

export class RequestCreated extends ethereum.Event {
  get params(): RequestCreated__Params {
    return new RequestCreated__Params(this);
  }
}

export class RequestCreated__Params {
  _event: RequestCreated;

  constructor(event: RequestCreated) {
    this._event = event;
  }

  get requestId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get requester(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get message(): string {
    return this._event.parameters[2].value.toString();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class RequestFulfilled extends ethereum.Event {
  get params(): RequestFulfilled__Params {
    return new RequestFulfilled__Params(this);
  }
}

export class RequestFulfilled__Params {
  _event: RequestFulfilled;

  constructor(event: RequestFulfilled) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class RequestSent extends ethereum.Event {
  get params(): RequestSent__Params {
    return new RequestSent__Params(this);
  }
}

export class RequestSent__Params {
  _event: RequestSent;

  constructor(event: RequestSent) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class Response extends ethereum.Event {
  get params(): Response__Params {
    return new Response__Params(this);
  }
}

export class Response__Params {
  _event: Response;

  constructor(event: Response) {
    this._event = event;
  }

  get requestId(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get response(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get err(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }

  get success(): boolean {
    return this._event.parameters[3].value.toBoolean();
  }
}

export class CarioIntent__requestToUserArgsResult {
  value0: Address;
  value1: string;
  value2: BigInt;
  value3: i32;
  value4: string;

  constructor(
    value0: Address,
    value1: string,
    value2: BigInt,
    value3: i32,
    value4: string,
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set(
      "value3",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value3)),
    );
    map.set("value4", ethereum.Value.fromString(this.value4));
    return map;
  }

  getRequester(): Address {
    return this.value0;
  }

  getMessage(): string {
    return this.value1;
  }

  getAmount(): BigInt {
    return this.value2;
  }

  getStatus(): i32 {
    return this.value3;
  }

  getPostId(): string {
    return this.value4;
  }
}

export class CarioIntent__requestsResult {
  value0: Address;
  value1: string;
  value2: BigInt;
  value3: i32;
  value4: string;

  constructor(
    value0: Address,
    value1: string,
    value2: BigInt,
    value3: i32,
    value4: string,
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set(
      "value3",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value3)),
    );
    map.set("value4", ethereum.Value.fromString(this.value4));
    return map;
  }

  getRequester(): Address {
    return this.value0;
  }

  getMessage(): string {
    return this.value1;
  }

  getAmount(): BigInt {
    return this.value2;
  }

  getStatus(): i32 {
    return this.value3;
  }

  getPostId(): string {
    return this.value4;
  }
}

export class CarioIntent extends ethereum.SmartContract {
  static bind(address: Address): CarioIntent {
    return new CarioIntent("CarioIntent", address);
  }

  acceptRequest(_requestId: BigInt, _amosId: string): Bytes {
    let result = super.call(
      "acceptRequest",
      "acceptRequest(uint256,string):(bytes32)",
      [
        ethereum.Value.fromUnsignedBigInt(_requestId),
        ethereum.Value.fromString(_amosId),
      ],
    );

    return result[0].toBytes();
  }

  try_acceptRequest(
    _requestId: BigInt,
    _amosId: string,
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "acceptRequest",
      "acceptRequest(uint256,string):(bytes32)",
      [
        ethereum.Value.fromUnsignedBigInt(_requestId),
        ethereum.Value.fromString(_amosId),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  carioRequests(param0: Address): BigInt {
    let result = super.call(
      "carioRequests",
      "carioRequests(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );

    return result[0].toBigInt();
  }

  try_carioRequests(param0: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "carioRequests",
      "carioRequests(address):(uint256)",
      [ethereum.Value.fromAddress(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  carioToAmosCount(param0: BigInt): i32 {
    let result = super.call(
      "carioToAmosCount",
      "carioToAmosCount(uint256):(uint8)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );

    return result[0].toI32();
  }

  try_carioToAmosCount(param0: BigInt): ethereum.CallResult<i32> {
    let result = super.tryCall(
      "carioToAmosCount",
      "carioToAmosCount(uint256):(uint8)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }

  cariosToAmos(param0: BigInt, param1: BigInt): string {
    let result = super.call(
      "cariosToAmos",
      "cariosToAmos(uint256,uint256):(string)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1),
      ],
    );

    return result[0].toString();
  }

  try_cariosToAmos(
    param0: BigInt,
    param1: BigInt,
  ): ethereum.CallResult<string> {
    let result = super.tryCall(
      "cariosToAmos",
      "cariosToAmos(uint256,uint256):(string)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  clrequestToRequests(param0: Bytes): BigInt {
    let result = super.call(
      "clrequestToRequests",
      "clrequestToRequests(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(param0)],
    );

    return result[0].toBigInt();
  }

  try_clrequestToRequests(param0: Bytes): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "clrequestToRequests",
      "clrequestToRequests(bytes32):(uint256)",
      [ethereum.Value.fromFixedBytes(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  getLatestResponse(): Bytes {
    let result = super.call(
      "getLatestResponse",
      "getLatestResponse():(bytes)",
      [],
    );

    return result[0].toBytes();
  }

  try_getLatestResponse(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "getLatestResponse",
      "getLatestResponse():(bytes)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  issuerSimpleAddress(): Address {
    let result = super.call(
      "issuerSimpleAddress",
      "issuerSimpleAddress():(address)",
      [],
    );

    return result[0].toAddress();
  }

  try_issuerSimpleAddress(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "issuerSimpleAddress",
      "issuerSimpleAddress():(address)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  latestResponse(): Bytes {
    let result = super.call("latestResponse", "latestResponse():(bytes)", []);

    return result[0].toBytes();
  }

  try_latestResponse(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "latestResponse",
      "latestResponse():(bytes)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  nextRequestId(): BigInt {
    let result = super.call("nextRequestId", "nextRequestId():(uint256)", []);

    return result[0].toBigInt();
  }

  try_nextRequestId(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "nextRequestId",
      "nextRequestId():(uint256)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  requestToUserArgs(param0: Bytes): CarioIntent__requestToUserArgsResult {
    let result = super.call(
      "requestToUserArgs",
      "requestToUserArgs(bytes32):(address,string,uint256,uint8,string)",
      [ethereum.Value.fromFixedBytes(param0)],
    );

    return new CarioIntent__requestToUserArgsResult(
      result[0].toAddress(),
      result[1].toString(),
      result[2].toBigInt(),
      result[3].toI32(),
      result[4].toString(),
    );
  }

  try_requestToUserArgs(
    param0: Bytes,
  ): ethereum.CallResult<CarioIntent__requestToUserArgsResult> {
    let result = super.tryCall(
      "requestToUserArgs",
      "requestToUserArgs(bytes32):(address,string,uint256,uint8,string)",
      [ethereum.Value.fromFixedBytes(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new CarioIntent__requestToUserArgsResult(
        value[0].toAddress(),
        value[1].toString(),
        value[2].toBigInt(),
        value[3].toI32(),
        value[4].toString(),
      ),
    );
  }

  requests(param0: BigInt): CarioIntent__requestsResult {
    let result = super.call(
      "requests",
      "requests(uint256):(address,string,uint256,uint8,string)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );

    return new CarioIntent__requestsResult(
      result[0].toAddress(),
      result[1].toString(),
      result[2].toBigInt(),
      result[3].toI32(),
      result[4].toString(),
    );
  }

  try_requests(
    param0: BigInt,
  ): ethereum.CallResult<CarioIntent__requestsResult> {
    let result = super.tryCall(
      "requests",
      "requests(uint256):(address,string,uint256,uint8,string)",
      [ethereum.Value.fromUnsignedBigInt(param0)],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new CarioIntent__requestsResult(
        value[0].toAddress(),
        value[1].toString(),
        value[2].toBigInt(),
        value[3].toI32(),
        value[4].toString(),
      ),
    );
  }

  s_lastError(): Bytes {
    let result = super.call("s_lastError", "s_lastError():(bytes)", []);

    return result[0].toBytes();
  }

  try_s_lastError(): ethereum.CallResult<Bytes> {
    let result = super.tryCall("s_lastError", "s_lastError():(bytes)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  s_lastRequestId(): Bytes {
    let result = super.call(
      "s_lastRequestId",
      "s_lastRequestId():(bytes32)",
      [],
    );

    return result[0].toBytes();
  }

  try_s_lastRequestId(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "s_lastRequestId",
      "s_lastRequestId():(bytes32)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  s_lastResponse(): Bytes {
    let result = super.call("s_lastResponse", "s_lastResponse():(bytes)", []);

    return result[0].toBytes();
  }

  try_s_lastResponse(): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "s_lastResponse",
      "s_lastResponse():(bytes)",
      [],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }

  sendRequest(
    source: string,
    encryptedSecretsUrls: Bytes,
    donHostedSecretsSlotID: i32,
    donHostedSecretsVersion: BigInt,
    _requestId: BigInt,
    args: Array<string>,
    bytesArgs: Array<Bytes>,
    subscriptionId: BigInt,
    gasLimit: BigInt,
    donID: Bytes,
  ): Bytes {
    let result = super.call(
      "sendRequest",
      "sendRequest(string,bytes,uint8,uint64,uint256,string[],bytes[],uint64,uint32,bytes32):(bytes32)",
      [
        ethereum.Value.fromString(source),
        ethereum.Value.fromBytes(encryptedSecretsUrls),
        ethereum.Value.fromUnsignedBigInt(
          BigInt.fromI32(donHostedSecretsSlotID),
        ),
        ethereum.Value.fromUnsignedBigInt(donHostedSecretsVersion),
        ethereum.Value.fromUnsignedBigInt(_requestId),
        ethereum.Value.fromStringArray(args),
        ethereum.Value.fromBytesArray(bytesArgs),
        ethereum.Value.fromUnsignedBigInt(subscriptionId),
        ethereum.Value.fromUnsignedBigInt(gasLimit),
        ethereum.Value.fromFixedBytes(donID),
      ],
    );

    return result[0].toBytes();
  }

  try_sendRequest(
    source: string,
    encryptedSecretsUrls: Bytes,
    donHostedSecretsSlotID: i32,
    donHostedSecretsVersion: BigInt,
    _requestId: BigInt,
    args: Array<string>,
    bytesArgs: Array<Bytes>,
    subscriptionId: BigInt,
    gasLimit: BigInt,
    donID: Bytes,
  ): ethereum.CallResult<Bytes> {
    let result = super.tryCall(
      "sendRequest",
      "sendRequest(string,bytes,uint8,uint64,uint256,string[],bytes[],uint64,uint32,bytes32):(bytes32)",
      [
        ethereum.Value.fromString(source),
        ethereum.Value.fromBytes(encryptedSecretsUrls),
        ethereum.Value.fromUnsignedBigInt(
          BigInt.fromI32(donHostedSecretsSlotID),
        ),
        ethereum.Value.fromUnsignedBigInt(donHostedSecretsVersion),
        ethereum.Value.fromUnsignedBigInt(_requestId),
        ethereum.Value.fromStringArray(args),
        ethereum.Value.fromBytesArray(bytesArgs),
        ethereum.Value.fromUnsignedBigInt(subscriptionId),
        ethereum.Value.fromUnsignedBigInt(gasLimit),
        ethereum.Value.fromFixedBytes(donID),
      ],
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBytes());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get router(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AcceptOwnershipCall extends ethereum.Call {
  get inputs(): AcceptOwnershipCall__Inputs {
    return new AcceptOwnershipCall__Inputs(this);
  }

  get outputs(): AcceptOwnershipCall__Outputs {
    return new AcceptOwnershipCall__Outputs(this);
  }
}

export class AcceptOwnershipCall__Inputs {
  _call: AcceptOwnershipCall;

  constructor(call: AcceptOwnershipCall) {
    this._call = call;
  }
}

export class AcceptOwnershipCall__Outputs {
  _call: AcceptOwnershipCall;

  constructor(call: AcceptOwnershipCall) {
    this._call = call;
  }
}

export class AcceptRequestCall extends ethereum.Call {
  get inputs(): AcceptRequestCall__Inputs {
    return new AcceptRequestCall__Inputs(this);
  }

  get outputs(): AcceptRequestCall__Outputs {
    return new AcceptRequestCall__Outputs(this);
  }
}

export class AcceptRequestCall__Inputs {
  _call: AcceptRequestCall;

  constructor(call: AcceptRequestCall) {
    this._call = call;
  }

  get _requestId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _amosId(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class AcceptRequestCall__Outputs {
  _call: AcceptRequestCall;

  constructor(call: AcceptRequestCall) {
    this._call = call;
  }

  get hashRequest(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class CreateRequestCall extends ethereum.Call {
  get inputs(): CreateRequestCall__Inputs {
    return new CreateRequestCall__Inputs(this);
  }

  get outputs(): CreateRequestCall__Outputs {
    return new CreateRequestCall__Outputs(this);
  }
}

export class CreateRequestCall__Inputs {
  _call: CreateRequestCall;

  constructor(call: CreateRequestCall) {
    this._call = call;
  }

  get _famousAmos(): Array<string> {
    return this._call.inputValues[0].value.toStringArray();
  }

  get _message(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class CreateRequestCall__Outputs {
  _call: CreateRequestCall;

  constructor(call: CreateRequestCall) {
    this._call = call;
  }

  get requestId(): BigInt {
    return this._call.outputValues[0].value.toBigInt();
  }
}

export class HandleOracleFulfillmentCall extends ethereum.Call {
  get inputs(): HandleOracleFulfillmentCall__Inputs {
    return new HandleOracleFulfillmentCall__Inputs(this);
  }

  get outputs(): HandleOracleFulfillmentCall__Outputs {
    return new HandleOracleFulfillmentCall__Outputs(this);
  }
}

export class HandleOracleFulfillmentCall__Inputs {
  _call: HandleOracleFulfillmentCall;

  constructor(call: HandleOracleFulfillmentCall) {
    this._call = call;
  }

  get requestId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get response(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get err(): Bytes {
    return this._call.inputValues[2].value.toBytes();
  }
}

export class HandleOracleFulfillmentCall__Outputs {
  _call: HandleOracleFulfillmentCall;

  constructor(call: HandleOracleFulfillmentCall) {
    this._call = call;
  }
}

export class SendRequestCall extends ethereum.Call {
  get inputs(): SendRequestCall__Inputs {
    return new SendRequestCall__Inputs(this);
  }

  get outputs(): SendRequestCall__Outputs {
    return new SendRequestCall__Outputs(this);
  }
}

export class SendRequestCall__Inputs {
  _call: SendRequestCall;

  constructor(call: SendRequestCall) {
    this._call = call;
  }

  get source(): string {
    return this._call.inputValues[0].value.toString();
  }

  get encryptedSecretsUrls(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }

  get donHostedSecretsSlotID(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get donHostedSecretsVersion(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _requestId(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get args(): Array<string> {
    return this._call.inputValues[5].value.toStringArray();
  }

  get bytesArgs(): Array<Bytes> {
    return this._call.inputValues[6].value.toBytesArray();
  }

  get subscriptionId(): BigInt {
    return this._call.inputValues[7].value.toBigInt();
  }

  get gasLimit(): BigInt {
    return this._call.inputValues[8].value.toBigInt();
  }

  get donID(): Bytes {
    return this._call.inputValues[9].value.toBytes();
  }
}

export class SendRequestCall__Outputs {
  _call: SendRequestCall;

  constructor(call: SendRequestCall) {
    this._call = call;
  }

  get requestId(): Bytes {
    return this._call.outputValues[0].value.toBytes();
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
