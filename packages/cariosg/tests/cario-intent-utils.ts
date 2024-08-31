import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt, Bytes } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferRequested,
  OwnershipTransferred,
  RequestAccepted,
  RequestCompleted,
  RequestCreated,
  RequestFulfilled,
  RequestSent,
  Response
} from "../generated/CarioIntent/CarioIntent"

export function createOwnershipTransferRequestedEvent(
  from: Address,
  to: Address
): OwnershipTransferRequested {
  let ownershipTransferRequestedEvent = changetype<OwnershipTransferRequested>(
    newMockEvent()
  )

  ownershipTransferRequestedEvent.parameters = new Array()

  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferRequestedEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferRequestedEvent
}

export function createOwnershipTransferredEvent(
  from: Address,
  to: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )

  return ownershipTransferredEvent
}

export function createRequestAcceptedEvent(
  requestId: BigInt,
  famousAmos: Address
): RequestAccepted {
  let requestAcceptedEvent = changetype<RequestAccepted>(newMockEvent())

  requestAcceptedEvent.parameters = new Array()

  requestAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  requestAcceptedEvent.parameters.push(
    new ethereum.EventParam(
      "famousAmos",
      ethereum.Value.fromAddress(famousAmos)
    )
  )

  return requestAcceptedEvent
}

export function createRequestCompletedEvent(
  requestId: BigInt,
  postId: string
): RequestCompleted {
  let requestCompletedEvent = changetype<RequestCompleted>(newMockEvent())

  requestCompletedEvent.parameters = new Array()

  requestCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  requestCompletedEvent.parameters.push(
    new ethereum.EventParam("postId", ethereum.Value.fromString(postId))
  )

  return requestCompletedEvent
}

export function createRequestCreatedEvent(
  requestId: BigInt,
  requester: Address,
  message: string,
  amount: BigInt
): RequestCreated {
  let requestCreatedEvent = changetype<RequestCreated>(newMockEvent())

  requestCreatedEvent.parameters = new Array()

  requestCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromUnsignedBigInt(requestId)
    )
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam("requester", ethereum.Value.fromAddress(requester))
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam("message", ethereum.Value.fromString(message))
  )
  requestCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return requestCreatedEvent
}

export function createRequestFulfilledEvent(id: Bytes): RequestFulfilled {
  let requestFulfilledEvent = changetype<RequestFulfilled>(newMockEvent())

  requestFulfilledEvent.parameters = new Array()

  requestFulfilledEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return requestFulfilledEvent
}

export function createRequestSentEvent(id: Bytes): RequestSent {
  let requestSentEvent = changetype<RequestSent>(newMockEvent())

  requestSentEvent.parameters = new Array()

  requestSentEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromFixedBytes(id))
  )

  return requestSentEvent
}

export function createResponseEvent(
  requestId: Bytes,
  response: Bytes,
  err: Bytes,
  success: boolean
): Response {
  let responseEvent = changetype<Response>(newMockEvent())

  responseEvent.parameters = new Array()

  responseEvent.parameters.push(
    new ethereum.EventParam(
      "requestId",
      ethereum.Value.fromFixedBytes(requestId)
    )
  )
  responseEvent.parameters.push(
    new ethereum.EventParam("response", ethereum.Value.fromBytes(response))
  )
  responseEvent.parameters.push(
    new ethereum.EventParam("err", ethereum.Value.fromBytes(err))
  )
  responseEvent.parameters.push(
    new ethereum.EventParam("success", ethereum.Value.fromBoolean(success))
  )

  return responseEvent
}
