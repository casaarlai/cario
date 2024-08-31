import {
  RequestCreated as RequestCreatedEvent
} from "../generated/CarioIntent/CarioIntent"
import {
  Request
} from "../generated/schema"


// export function handleRequestAccepted(event: RequestAcceptedEvent): void {
//   let entity = new RequestAccepted(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.requestId = event.params.requestId
//   entity.famousAmos = event.params.famousAmos

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleRequestCompleted(event: RequestCompletedEvent): void {
//   let entity = new RequestCompleted(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.requestId = event.params.requestId
//   entity.postId = event.params.postId

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

export function handleRequestCreated(event: RequestCreatedEvent): void {
  let entity = new Request(event.params.requestId.toHex())
  entity.requestId = event.params.requestId
  entity.requester = event.params.requester
  entity.message = event.params.message
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

// export function handleRequestFulfilled(event: RequestFulfilledEvent): void {
//   let entity = new RequestFulfilled(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.CarioIntent_id = event.params.id

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleRequestSent(event: RequestSentEvent): void {
//   let entity = new RequestSent(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.CarioIntent_id = event.params.id

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleResponse(event: ResponseEvent): void {
//   let entity = new Response(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.requestId = event.params.requestId
//   entity.response = event.params.response
//   entity.err = event.params.err
//   entity.success = event.params.success

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }
