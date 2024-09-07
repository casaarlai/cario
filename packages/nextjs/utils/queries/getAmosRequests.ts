import { gql } from "@apollo/client";

export const GET_ACCEPTED_AMOS_BY_REQUEST_ID = gql`
  query GetAcceptedAmos($requestId: BigInt!) {
    acceptedAmos_collection(where: { requestId: $requestId }) {
      id
      amosIds
      requestId
    }
  }
`;

export const GET_ACCEPTED_AMOS_BY_AMOS_ID = gql`
  query GetFilteredAmos($amosId: String!) {
    acceptedAmos_collection(filter: { amosIds: { contains: $amosId } }) {
      amosIds
      id
      requestId
    }
  }
`;
