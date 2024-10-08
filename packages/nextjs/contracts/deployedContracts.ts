/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  84532: {
    SignProtocolIssuer: {
      address: "0xe3be1b9818cd42029e5eed010bcf2edaff9e82b0",
      abi: [
        {
          type: "constructor",
          inputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "createAndSendAttestation",
          inputs: [
            {
              name: "videoId",
              type: "string",
              internalType: "string",
            },
            {
              name: "amos",
              type: "address",
              internalType: "address",
            },
            {
              name: "requester",
              type: "address",
              internalType: "address",
            },
            {
              name: "fees",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "metIRLMapping",
          inputs: [
            {
              name: "partyA",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "partyB",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "renounceOwnership",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "schemaId",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint64",
              internalType: "uint64",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "setSPInstance",
          inputs: [
            {
              name: "instance",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "setSchemaID",
          inputs: [
            {
              name: "schemaId_",
              type: "uint64",
              internalType: "uint64",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "spInstance",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "contract ISP",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "transferOwnership",
          inputs: [
            {
              name: "newOwner",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "Endorsed",
          inputs: [
            {
              name: "videoId",
              type: "string",
              indexed: false,
              internalType: "string",
            },
            {
              name: "amos",
              type: "address",
              indexed: false,
              internalType: "address",
            },
            {
              name: "attestationId",
              type: "uint64",
              indexed: false,
              internalType: "uint64",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "OwnershipTransferred",
          inputs: [
            {
              name: "previousOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "newOwner",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "ConfirmationAddressMismatch",
          inputs: [],
        },
        {
          type: "error",
          name: "OwnableInvalidOwner",
          inputs: [
            {
              name: "owner",
              type: "address",
              internalType: "address",
            },
          ],
        },
        {
          type: "error",
          name: "OwnableUnauthorizedAccount",
          inputs: [
            {
              name: "account",
              type: "address",
              internalType: "address",
            },
          ],
        },
      ],
      inheritedFunctions: {
        owner: "lib/openzeppelin-contracts/contracts/access/Ownable.sol",
        renounceOwnership: "lib/openzeppelin-contracts/contracts/access/Ownable.sol",
        transferOwnership: "lib/openzeppelin-contracts/contracts/access/Ownable.sol",
      },
    },
    CarioIntent: {
      address: "0x8af4091ae8ceede7cb6dc47b9829124d2a48fa6a",
      abi: [
        {
          type: "constructor",
          inputs: [
            {
              name: "router",
              type: "address",
              internalType: "address",
            },
            {
              name: "_issuerSimpleAddress",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "DISCOUNT_RATE",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "acceptOwnership",
          inputs: [],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "acceptRequest",
          inputs: [
            {
              name: "_requestId",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "_amosId",
              type: "string",
              internalType: "string",
            },
          ],
          outputs: [
            {
              name: "hashRequest",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "carioRequests",
          inputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "carioToAmosCount",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint8",
              internalType: "uint8",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "cariosToAmos",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "clrequestToRequests",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "createRequest",
          inputs: [
            {
              name: "_famousAmos",
              type: "string[]",
              internalType: "string[]",
            },
            {
              name: "_message",
              type: "string",
              internalType: "string",
            },
          ],
          outputs: [
            {
              name: "requestId",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "payable",
        },
        {
          type: "function",
          name: "getLatestMinimumBid",
          inputs: [
            {
              name: "_requestId",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "getLatestResponse",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes",
              internalType: "bytes",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "handleOracleFulfillment",
          inputs: [
            {
              name: "requestId",
              type: "bytes32",
              internalType: "bytes32",
            },
            {
              name: "response",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "err",
              type: "bytes",
              internalType: "bytes",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "issuerSimpleAddress",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "latestResponse",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes",
              internalType: "bytes",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "nextRequestId",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "owner",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "address",
              internalType: "address",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "requestToUserArgs",
          inputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "requester",
              type: "address",
              internalType: "address payable",
            },
            {
              name: "createdTime",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "message",
              type: "string",
              internalType: "string",
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "status",
              type: "uint8",
              internalType: "enum CarioIntent.Status",
            },
            {
              name: "postId",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "requests",
          inputs: [
            {
              name: "",
              type: "uint256",
              internalType: "uint256",
            },
          ],
          outputs: [
            {
              name: "requester",
              type: "address",
              internalType: "address payable",
            },
            {
              name: "createdTime",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "message",
              type: "string",
              internalType: "string",
            },
            {
              name: "amount",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "status",
              type: "uint8",
              internalType: "enum CarioIntent.Status",
            },
            {
              name: "postId",
              type: "string",
              internalType: "string",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_lastError",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes",
              internalType: "bytes",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_lastRequestId",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "s_lastResponse",
          inputs: [],
          outputs: [
            {
              name: "",
              type: "bytes",
              internalType: "bytes",
            },
          ],
          stateMutability: "view",
        },
        {
          type: "function",
          name: "sendRequest",
          inputs: [
            {
              name: "source",
              type: "string",
              internalType: "string",
            },
            {
              name: "encryptedSecretsUrls",
              type: "bytes",
              internalType: "bytes",
            },
            {
              name: "donHostedSecretsSlotID",
              type: "uint8",
              internalType: "uint8",
            },
            {
              name: "donHostedSecretsVersion",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "_requestId",
              type: "uint256",
              internalType: "uint256",
            },
            {
              name: "args",
              type: "string[]",
              internalType: "string[]",
            },
            {
              name: "bytesArgs",
              type: "bytes[]",
              internalType: "bytes[]",
            },
            {
              name: "subscriptionId",
              type: "uint64",
              internalType: "uint64",
            },
            {
              name: "gasLimit",
              type: "uint32",
              internalType: "uint32",
            },
            {
              name: "donID",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          outputs: [
            {
              name: "requestId",
              type: "bytes32",
              internalType: "bytes32",
            },
          ],
          stateMutability: "nonpayable",
        },
        {
          type: "function",
          name: "transferOwnership",
          inputs: [
            {
              name: "to",
              type: "address",
              internalType: "address",
            },
          ],
          outputs: [],
          stateMutability: "nonpayable",
        },
        {
          type: "event",
          name: "OwnershipTransferRequested",
          inputs: [
            {
              name: "from",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "to",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "OwnershipTransferred",
          inputs: [
            {
              name: "from",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "to",
              type: "address",
              indexed: true,
              internalType: "address",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "RequestAccepted",
          inputs: [
            {
              name: "requestId",
              type: "uint256",
              indexed: true,
              internalType: "uint256",
            },
            {
              name: "famousAmos",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "amosId",
              type: "string",
              indexed: false,
              internalType: "string",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "RequestCompleted",
          inputs: [
            {
              name: "requestId",
              type: "uint256",
              indexed: true,
              internalType: "uint256",
            },
            {
              name: "postId",
              type: "string",
              indexed: false,
              internalType: "string",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "RequestCreated",
          inputs: [
            {
              name: "requestId",
              type: "uint256",
              indexed: true,
              internalType: "uint256",
            },
            {
              name: "requester",
              type: "address",
              indexed: true,
              internalType: "address",
            },
            {
              name: "message",
              type: "string",
              indexed: false,
              internalType: "string",
            },
            {
              name: "amount",
              type: "uint256",
              indexed: false,
              internalType: "uint256",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "RequestFulfilled",
          inputs: [
            {
              name: "id",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "RequestSent",
          inputs: [
            {
              name: "id",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32",
            },
          ],
          anonymous: false,
        },
        {
          type: "event",
          name: "Response",
          inputs: [
            {
              name: "requestId",
              type: "bytes32",
              indexed: true,
              internalType: "bytes32",
            },
            {
              name: "response",
              type: "bytes",
              indexed: false,
              internalType: "bytes",
            },
            {
              name: "err",
              type: "bytes",
              indexed: false,
              internalType: "bytes",
            },
            {
              name: "success",
              type: "bool",
              indexed: false,
              internalType: "bool",
            },
          ],
          anonymous: false,
        },
        {
          type: "error",
          name: "EmptyArgs",
          inputs: [],
        },
        {
          type: "error",
          name: "EmptySecrets",
          inputs: [],
        },
        {
          type: "error",
          name: "EmptySource",
          inputs: [],
        },
        {
          type: "error",
          name: "NoInlineSecrets",
          inputs: [],
        },
        {
          type: "error",
          name: "OnlyRouterCanFulfill",
          inputs: [],
        },
        {
          type: "error",
          name: "UnexpectedRequestOr",
          inputs: [
            {
              name: "response",
              type: "bytes",
              internalType: "bytes",
            },
          ],
        },
      ],
      inheritedFunctions: {
        handleOracleFulfillment:
          "lib/chainlink-brownie-contracts/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol",
        acceptOwnership: "lib/chainlink-brownie-contracts/contracts/src/v0.8/shared/access/ConfirmedOwner.sol",
        owner: "lib/chainlink-brownie-contracts/contracts/src/v0.8/shared/access/ConfirmedOwner.sol",
        transferOwnership: "lib/chainlink-brownie-contracts/contracts/src/v0.8/shared/access/ConfirmedOwner.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
