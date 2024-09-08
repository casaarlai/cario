// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../contracts/CarioIntent.sol";

contract CarioIntentTest is Test {
    CarioIntent carioIntent;
    address router = address(0x123); // Mock router address

    function setUp() public {
        carioIntent = new CarioIntent(router);
    }

    function testCreateRequest() public {
        string[] memory famousAmos = new string[](2);
        famousAmos[0] = "UC_HI2i2peo1A-STdG22GFsA";//Austin Griffith :-) 
        famousAmos[1] = "UCnjkrlqaWEBSnKZQ71gdyFA"; //Chainlink
        string memory message = "0x59Dc594247860510deC31C3BbdF5f05ae777dFc5";

        // Send some ETH with the transaction
        vm.deal(address(this), 1 ether);
        carioIntent.createRequest{value: 1 ether}(famousAmos, message);

        (address requester, uint256 createdTime, string memory messageReturned, uint256 amount, CarioIntent.Status status, string memory postId) = carioIntent.requests(0);
        assertEq(requester, address(this));
        assertEq(createdTime, block.timestamp);
        assertEq(messageReturned, message);
        assertEq(amount, 1 ether);
        assertEq(uint(status), uint(CarioIntent.Status.Created));
        assertEq(postId, "");

    }

    // function testAcceptRequest() public {
    //     string[] memory famousAmos = new string[](2);
    //     famousAmos[0] = "Amos1";
    //     famousAmos[1] = "Amos2";
    //     string memory message = "Test message";

    //     // Create a request first
    //     vm.deal(address(this), 1 ether);
    //     carioIntent.createRequest{value: 1 ether}(famousAmos, message);

    //     // Accept the request
    //     string memory channelId = "Channel1";
    //     carioIntent.acceptRequest(0, channelId);

    //     (address requester, string memory msg, uint256 amount, CarioIntent.Status status, string memory postId) = carioIntent.requests(0);
    //     assertEq(uint(status), uint(CarioIntent.Status.Accepted));

    //     string[] memory amosList = carioIntent.cariosToAmos(0);
    //     assertEq(amosList.length, 3); // Two initial + one accepted
    //     assertEq(amosList[2], channelId);
    // }

    // function testAcceptRequestFailsIfChannelIdExists() public {
    //     string[] memory famousAmos = new string[](2);
    //     famousAmos[0] = "Amos1";
    //     famousAmos[1] = "Amos2";
    //     string memory message = "Test message";

    //     // Create a request first
    //     vm.deal(address(this), 1 ether);
    //     carioIntent.createRequest{value: 1 ether}(famousAmos, message);

    //     // Accept the request with the same channel ID twice
    //     string memory channelId = "Channel1";
    //     carioIntent.acceptRequest(0, channelId);

    //     // Expect the second call to revert
    //     vm.expectRevert("Channel ID already exists for this request");
    //     carioIntent.acceptRequest(0, channelId);
    // }
}