//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "../contracts/CarioIntent.sol";
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
    CarioIntent carioIntent = new CarioIntent(ChainlinkRouter);
    console.logString(
      string.concat(
        "CarioIntent deployed at: ", vm.toString(address(carioIntent))
      )
    );

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
