// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { FunctionsClient } from
  "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import { ConfirmedOwner } from
  "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import { FunctionsRequest } from
  "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/*
* In this contract we will 
*/

contract CarioIntent is FunctionsClient, ConfirmedOwner {
  using Strings for uint256;
  using FunctionsRequest for FunctionsRequest.Request;

  enum Status { Created, Accepted, Completed }
  
  /* define the request struct which will be used to store the request details
    * requester: the address of the user who made the request
    * famousAmos: the address of the Amos who accepted the request
    * message: the message the requester wants to send to the Amos , this will be later encrypted
    * amount: the amount of ETH the requester is willing to pay for the service
    * status: a boolean to check if the request has been completed     
    * postId: the id of the post the Amos will emit and that needs to be verified by a CL function
    */
  struct Request {
    address requester;
    string message;
    uint256 amount;
    Status status;
    string postId;
  }

  mapping(uint256 => Request) public requests;
  mapping(address => uint256) public carioRequests; //mapping to store the requests for a given Cario user
  mapping(uint256 => string[]) public cariosToAmos; //mapping to store the Amos address for a given Cario user
  mapping(uint256 => uint8) public carioToAmosCount; //mapping to store the number of Amos for a given Cario user
  uint256 public nextRequestId;

  bytes public latestResponse;

  /*
    * Events to be emitted when a request is created, accepted or completed
    * RequestCreated: emitted when a user creates a request
    * RequestAccepted: emitted when an Amos accepts a request, at this point the Amos will be able to decrypt the message
    * RequestCompleted: emitted when an Amos completes a request, at this point the requester will be able to verify the post ID
    */
  event RequestCreated(
    uint256 indexed requestId,
    address indexed requester,
    string message,
    uint256 amount
  );
  event RequestAccepted(uint256 indexed requestId, address indexed famousAmos);
  event RequestCompleted(uint256 indexed requestId, string postId);

  bytes32 public s_lastRequestId;
  bytes public s_lastResponse;
  bytes public s_lastError;
  address public issuerSimpleAddress;
  mapping(bytes32 => Request) public requestToUserArgs;
  mapping(uint256 => mapping(string => bool)) private amosIdExists;
  mapping(address => string) private publicKeyToAmosId;
  mapping(bytes32 => uint256) public clrequestToRequests;// mapping of chainlink requests
  error UnexpectedRequestOr(bytes response);

  event Response(
    bytes32 indexed requestId, bytes response, bytes err, bool success
  );

  constructor(address router)
    FunctionsClient(router)
    ConfirmedOwner(msg.sender)
  { }

  /*
    * Upon create we will do a dutch auction to find the best Amos 
    */
  function createRequest(
    string[] memory _famousAmos,
    string memory _message
  ) external payable returns (uint256 requestId){
    require(msg.value > 0, "Must send some ETH");

    uint256 requestId = nextRequestId++;
    requests[requestId] = Request({
      requester: msg.sender,
      message: _message,
      amount: msg.value,
      status: Status.Created,
      postId: ""
    });
    cariosToAmos[requestId] = _famousAmos;
    carioToAmosCount[requestId] = uint8(_famousAmos.length);

    for (uint256 i = 0; i < _famousAmos.length; i++) {
      amosIdExists[requestId][_famousAmos[i]] = true;
    }

    emit RequestCreated(requestId, msg.sender, _message, msg.value);
    return requestId;
  }

  /*
    * Note: The Amos id is the same as the channel id of the YouTuber
    */
  function acceptRequest(uint256 _requestId, string memory _amosId) external returns (bytes32 hashRequest) {
    Request storage request = requests[_requestId];
    require(request.status != Status.Completed, "Request already completed!");
    request.status = Status.Accepted;
    // Check if _channelId is already in cariosToAmos[_requestId]
    require(amosIdExists[_requestId][_amosId], "Channel ID not requested!");
    publicKeyToAmosId[msg.sender] = _amosId;

    emit RequestAccepted(_requestId, msg.sender);
    //return a keccak of the _requestId, amount, amosid, message and msg.sender
    return keccak256(abi.encodePacked(_requestId, request.amount, _amosId, request.message, msg.sender));
  }

  /*
    // Start Verification
    //1. Call the Chainlink function to verify the post ID
    //2. We do this by checking that the postId has the hash in description
    //3. If the verification is successful, we will transfer the amount to the Amos
  */
  function sendRequest(
    string memory source,
    bytes memory encryptedSecretsUrls,
    uint8 donHostedSecretsSlotID,
    uint64 donHostedSecretsVersion,
    uint256 _requestId,
    string[] memory args, //hash and the videoid
    bytes[] memory bytesArgs,
    uint64 subscriptionId,
    uint32 gasLimit,
    bytes32 donID
  ) external returns (bytes32 requestId) {
    Request storage request = requests[_requestId];
    require(request.status != Status.Completed, "Request already completed!");
    // bytes32 hashToCheck = keccak256(abi.encodePacked(_requestId, request.amount, publicKeyToAmosId[msg.sender], request.message, msg.sender));
    // args[0] = Strings.toHexString(uint256(hashToCheck));
    // args[1]= publicKeyToAmosId[msg.sender];
    FunctionsRequest.Request memory req;
    req.initializeRequestForInlineJavaScript(source);
    if (encryptedSecretsUrls.length > 0) {
      req.addSecretsReference(encryptedSecretsUrls);
    } else if (donHostedSecretsVersion > 0) {
      req.addDONHostedSecrets(donHostedSecretsSlotID, donHostedSecretsVersion);
    }
    if (args.length > 0) req.setArgs(args);
    if (bytesArgs.length > 0) req.setBytesArgs(bytesArgs);
    s_lastRequestId =
      _sendRequest(req.encodeCBOR(), subscriptionId, gasLimit, donID);
    clrequestToRequests[s_lastRequestId] = _requestId;
    return s_lastRequestId;
  }
 
  /**
   * @notice Store latest result/error
   * @param requestId The request ID, returned by sendRequest()
   * @param response Aggregated response from the user code
   * @param err Aggregated error from the user code or from the execution pipeline
   * Either response or error parameter will be set, but never both
   */
  function fulfillRequest(
    bytes32 requestId,
    bytes memory response,
    bytes memory err
  ) internal override {
    (uint256 result) = abi.decode(response, (uint256));
    if (result <= 0) {
        revert UnexpectedRequestOr(response);
    }
    Request storage request = requests[clrequestToRequests[requestId]];
    request.status = Status.Completed;
    emit RequestCompleted(clrequestToRequests[requestId], request.postId);
    // Sign and issue the credentials
    s_lastResponse = response;
    s_lastError = err;
    emit Response(requestId, s_lastResponse, s_lastError, true);
  }

  function getLatestResponse() external view returns (bytes memory) {
    return s_lastResponse;
  }

  /**
   * Chainlink functions end
   */
  
}
