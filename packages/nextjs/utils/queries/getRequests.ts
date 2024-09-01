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
