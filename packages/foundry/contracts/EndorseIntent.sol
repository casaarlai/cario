// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract EndorseIntent is FunctionsClient, ConfirmedOwner {
    using Strings for uint256;
    using FunctionsRequest for FunctionsRequest.Request;

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
        address famousAmos;
        string message;
        uint256 amount;
        bool completed;
        string postId;
    }

    mapping(uint256 => Request) public requests;
    uint256 public nextRequestId;

    bytes32 public latestRequestId;
    bytes public latestResponse;
    bytes public latestError;

    /*
    * Events to be emitted when a request is created, accepted or completed
    * RequestCreated: emitted when a user creates a request
    * RequestAccepted: emitted when an Amos accepts a request, at this point the Amos will be able to decrypt the message
    * RequestCompleted: emitted when an Amos completes a request, at this point the requester will be able to verify the post ID
    */
    event RequestCreated(uint256 indexed requestId, address indexed requester, address indexed famousAmos, string message, uint256 amount);
    event RequestAccepted(uint256 indexed requestId, address indexed famousAmos);
    event RequestCompleted(uint256 indexed requestId, string postId);
    bytes32 public s_lastRequestId;
    bytes public s_lastResponse;
    bytes public s_lastError;
    address public issuerSimpleAddress;
    mapping(bytes32 => Request) public requestToUserArgs;
    
    error UnexpectedRequestOr(bytes response);

    event Response(bytes32 indexed requestId, bytes response, bytes err, bool success);

    constructor(
        address router
    ) FunctionsClient(router) ConfirmedOwner(msg.sender) {}

    /*
    * Upon create we will do a dutch auction to find the best Amos 
    */
    function createRequest(address _famousAmos, string memory _message) external payable {
        require(msg.value > 0, "Must send some ETH");

        uint256 requestId = nextRequestId++;
        requests[requestId] = Request({
            requester: msg.sender,
            famousAmos: _famousAmos,
            message: _message,
            amount: msg.value,
            completed: false,
            postId: ""
        });

        emit RequestCreated(requestId, msg.sender, _famousAmos, _message, msg.value);
    }

    function acceptRequest(uint256 _requestId) external {
        Request storage request = requests[_requestId];
        require(msg.sender == request.famousAmos, "Only the Amos can accept");
        require(!request.completed, "Request already completed");
        requestToUserArgs[latestRequestId] = Request({
            requester: msg.sender,
            famousAmos: request.famousAmos,
            message: request.message,
            amount: request.amount,
            completed: false,
            postId: ""
        });
        emit RequestAccepted(_requestId, msg.sender);
    }

    /*
    * Note: Multiple Amos's can accept the request but only the first one will be able to complete it and recover the amount
    */
    function completeRequest(uint256 _requestId, string memory _postId) external {
        Request storage request = requests[_requestId];
        require(msg.sender == request.famousAmos, "Only the Amos can complete");
        require(!request.completed, "Request already completed");

        request.postId = _postId;
    }


    function sendRequest(
        string memory source,
        bytes memory encryptedSecretsUrls,
        uint8 donHostedSecretsSlotID,
        uint64 donHostedSecretsVersion,
        string[] memory args,
        bytes[] memory bytesArgs,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) external returns (bytes32 requestId) {
        FunctionsRequest.Request memory req;
        req.initializeRequestForInlineJavaScript(source);
        if (encryptedSecretsUrls.length > 0)
            req.addSecretsReference(encryptedSecretsUrls);
        else if (donHostedSecretsVersion > 0) {
            req.addDONHostedSecrets(
                donHostedSecretsSlotID,
                donHostedSecretsVersion
            );
        }
        if (args.length > 0) req.setArgs(args);
        if (bytesArgs.length > 0) req.setBytesArgs(bytesArgs);
        s_lastRequestId = _sendRequest(
            req.encodeCBOR(),
            subscriptionId,
            gasLimit,
            donID
        );
        return s_lastRequestId;
    }
    /**
     * @notice Send a pre-encoded CBOR request
     * @param request CBOR-encoded request data
     * @param subscriptionId Billing ID
     * @param gasLimit The maximum amount of gas the request can consume
     * @param donID ID of the job to be invoked
     * @return requestId The ID of the sent request
     */
    function sendRequestCBOR(
        bytes memory request,
        uint64 subscriptionId,
        uint32 gasLimit,
        bytes32 donID
    ) external onlyOwner returns (bytes32 requestId) {
        s_lastRequestId = _sendRequest(
            request,
            subscriptionId,
            gasLimit,
            donID
        );
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
        (uint result) = abi.decode(response, (uint));
    
        Request storage request = requests[result];
        request.completed = true;
        payable(request.famousAmos).transfer(request.amount);
        // emit RequestCompleted(reqId, request.postId);
        s_lastResponse = response;
        s_lastError = err;
        emit Response(requestId, s_lastResponse, s_lastError, true);
    
    }


    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
    }

    receive() external payable {}
}