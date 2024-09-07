import { gql } from "@apollo/client";

export const GET_REQUESTS = gql`
  query GetRequests {
    requests {
      id
      requestId
      requester
      message
      amount
      cariosToAmos
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;

export const GET_REQUESTS_BY_IDS = gql`
  query GetRequestsByIds($requestIds: [ID!]!) {
    requests(where: { requestId_in: $requestIds }) {
      id
      requestId
      requester
      message
      amount
      cariosToAmos
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`;
