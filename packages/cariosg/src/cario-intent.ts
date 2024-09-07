import {
  RequestAccepted as RequestAcceptedEvent,
  RequestCreated as RequestCreatedEvent
} from "../generated/CarioIntent/CarioIntent"
import {
  Request,
  AcceptedAmos
} from "../generated/schema"
import { CarioIntent } from "../generated/CarioIntent/CarioIntent"
import { ethereum } from "@graphprotocol/graph-ts"
import { BigInt } from "@graphprotocol/graph-ts"


export function handleRequestAccepted(event: RequestAcceptedEvent): void {
  let entity = AcceptedAmos.load(event.params.requestId.toString())
  if (entity == null) {
    entity = new AcceptedAmos(
      event.params.requestId.toString()
    )
  }

  entity.requestId = event.params.requestId
  // Initialize the amosIds array if it doesn't exist
  if (entity.amosIds == null) {
    entity.amosIds = []
  }

  // Add the new _amosId to the array
  let amosIds = entity.amosIds as string[]
  amosIds.push(event.params._amosId)

  // Assign the updated array back to the entity
  entity.amosIds = amosIds

  entity.save()
}

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
  // Fetch cariosToAmos data using a contract call
  let contract = CarioIntent.bind(event.address)
  let countResult = contract.try_carioToAmosCount(event.params.requestId)
  if (!countResult.reverted) {
    let count = countResult.value
    let cariosToAmos: string[] = []

    // Loop through the count and fetch each Amos
    for (let i = 0; i < count; i++) {
      let cariosToAmosResult = contract.try_cariosToAmos(event.params.requestId, BigInt.fromI32(i))
      if (!cariosToAmosResult.reverted) {
        cariosToAmos.push(cariosToAmosResult.value)
      }
    }

    // Store the concatenated results in the entity
    entity.cariosToAmos = cariosToAmos.join(',')
  } else {
    entity.cariosToAmos = ""
  }
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
