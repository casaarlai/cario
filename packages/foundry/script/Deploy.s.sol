//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/CarioIntent.sol";
import "../contracts/SignProtocolIssuer.sol";
import "./DeployHelpers.s.sol";

contract DeployScript is ScaffoldETHDeploy {
  error InvalidPrivateKey(string);

  function run() external {
    uint256 deployerPrivateKey = setupLocalhostEnv();
    if (deployerPrivateKey == 0) {
      revert InvalidPrivateKey(
        "You don't have a deployer account. Make sure you have set DEPLOYER_PRIVATE_KEY in .env or use `yarn generate` to generate a new random account"
      );
    }
    vm.startBroadcast(deployerPrivateKey);
    address ChainlinkRouter = 0xf9B8fc078197181C841c296C876945aaa425B278;
    // address Attestator = 0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD;

    CarioIntent carioIntent = new CarioIntent(ChainlinkRouter);
    console.logString(
      string.concat(
        "CarioIntent deployed at: ", vm.toString(address(carioIntent))
      )
    );

    // SignProtocolIssuer signProtocolIssuer = new SignProtocolIssuer();
    // console.logString(
    //   string.concat(
    //     "SignProtocolIssuer deployed at: ", vm.toString(address(signProtocolIssuer))
    //   )
    // );
    // signProtocolIssuer.setSPInstance(address(Attestator));
    // signProtocolIssuer.setSchemaID(0x179);
    // Ad hoc testing
    // SignProtocolIssuer signProtocolIssuer = SignProtocolIssuer(0x217F2EEBc1E0898a97B82364cabe814Ec2E01Cb3);

    // signProtocolIssuer.setSchemaID(0x17a);
    // bytes[] memory recipients = new bytes[](1);
    // recipients[0] = abi.encode(0x217F2EEBc1E0898a97B82364cabe814Ec2E01Cb3);
    // signProtocolIssuer.createAndSendAttestation( "test", 0x4e4af2a21ebf62850fD99Eb6253E1eFBb56098cD, 0, recipients );  

    vm.stopBroadcast();

    /**
     * This function generates the file containing the contracts Abi definitions.
     * These definitions are used to derive the types needed in the custom scaffold-eth hooks, for example.
     * This function should be called last.
     */
    exportDeployments();
  }

  function test() public { }
}
