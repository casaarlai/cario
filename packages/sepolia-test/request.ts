import { SubscriptionManager, simulateScript, ResponseListener, ReturnType, decodeResult, FulfillmentCode, SecretsManager } from "@chainlink/functions-toolkit";
import { ethers } from "ethers";
import * as envvar from "@chainlink/env-enc";
envvar.config();

import functionsConsumerAbi from './abi/functionsClient.json';
import carioIntentAbiObject from './abi/CarioIntent.json';
import { youtubeFunctionString } from './functions/youtube';
import axios from 'axios';
interface CarioIntentRequest {
  videoOrChannelIds: string[];
  msg: string;
}

const consumerAddress = "0xf1A711837Fee7b0ddB43A73c7b8b23F432f1c6Fb";
const subscriptionId = 164; // REPLACE this with your subscription ID
const explorerUrl= "https://sepolia.basescan.org";
// hardcoded for Polygon Mumbai

// Initialize ethers signer and provider to interact with the contracts onchain
const privateKey: any = process.env.PRIVATE_KEY;
if (!privateKey) {
  console.log("private key not provided - check your environment variables")
}

const rpcUrl = process.env.RPC_URL;
console.log("rpcUrl", rpcUrl)
if (!rpcUrl) {
  console.log('rpcUrl not provided  - check your environment variables')
}

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

const wallet = new ethers.Wallet(privateKey);
const signer = wallet.connect(provider); // create ethers signer for signing transactions
  
    
const makeRequest= async (videoOrChannelId: string, ownerWalletAddress: string): Promise<any> => {
  return new Promise(async (resolve, rej) => {
    // hardcoded for Polygon Mumbai
    const routerAddress = "0xf9B8fc078197181C841c296C876945aaa425B278";
    const linkTokenAddress = "0x0fd9e8d3af1aaee056eb9e802c3a762a667b1904";
    const donId = "fun-base-sepolia-1";
    const gatewayUrls = [
      "https://01.functions-gateway.testnet.chain.link/",
      "https://02.functions-gateway.testnet.chain.link/",
    ];
    // Initialize functions settings
    const source = youtubeFunctionString;
    const abiCoder = new ethers.utils.AbiCoder();
    const keccak256 = ethers.utils.keccak256;

    const _requestId = 0; // Replace with actual requestId
    const amount = ethers.utils.parseEther("0.00001"); // Replace with actual amount
    const publicKeyToAmosId = "UC4nRmZan1X84wnWiW297rTg"; // Replace with actual publicKeyToAmosId
    const message = "hello"; // Replace with actual message
    const sender = "0x29d5ab1282ee60d9bE352D625a65B4f0939a46a1"; // Replace with actual sender address

    const encodedData = abiCoder.encode(
      ["uint256", "uint256", "string", "string", "address"],
      [_requestId, amount, publicKeyToAmosId, message, sender]
    );

    const hash = keccak256(encodedData);
    console.log("Keccak256 hash:", hash);
      const args = ["0xb29209b950a51a3B73c8c078A1876FF26e9d986c","UC4nRmZan1X84wnWiW297rTg",videoOrChannelId];
    const secrets: any = { apiKey: process.env.YOUTUBE_API_KEY, rpcUrl: process.env.RPC_URL };
    const slotIdNumber = 0; // slot ID where to upload the secrets
    const expirationTimeMinutes = 15; // expiration time in minutes of the secrets
    const gasLimit = 300000;
  

    ///////// START SIMULATION ////////////
  
    console.log("Start simulation...", secrets);
  
    const response: any = await simulateScript({
      source: source,
      args: args,
      bytesArgs: [], // bytesArgs - arguments can be encoded off-chain to bytes.
      secrets: secrets, // no secrets in this example
    });
  
    console.log("Simulation result", response);
    const errorString = response.errorString;
    if (errorString) {
      console.log(`❌ Error during simulation: `, errorString);
    } else {
      const returnType = ReturnType.string;
      const responseBytesHexstring = response.responseBytesHexstring;
      if (ethers.utils.arrayify(responseBytesHexstring).length > 0) {
        const decodedResponse = decodeResult(
          response.responseBytesHexstring,
          returnType
        );
        console.log(`✅ Decoded response to ${returnType}: `, decodedResponse);
      }
    }
  
    //////// ESTIMATE REQUEST COSTS ////////
    console.log("\nEstimate request costs...");
    // Initialize and return SubscriptionManager
    const subscriptionManager = new SubscriptionManager({
      signer: signer,
      linkTokenAddress: linkTokenAddress,
      functionsRouterAddress: routerAddress,
    });
    await subscriptionManager.initialize();
  
    // estimate costs in Juels
  
    const gasPriceWei: any = await signer.getGasPrice(); // get gasPrice in wei
  
    const estimatedCostInJuels =
      await subscriptionManager.estimateFunctionsRequestCost({
        donId: donId, // ID of the DON to which the Functions request will be sent
        subscriptionId: subscriptionId, // Subscription ID
        callbackGasLimit: gasLimit, // Total gas used by the consumer contract's callback
        gasPriceWei: BigInt(gasPriceWei), // Gas price in gWei
      });
  
    console.log(
      `Fulfillment cost estimated to ${ethers.utils.formatEther(
        estimatedCostInJuels
      )} LINK`
    );
  
    //////// MAKE REQUEST ////////
  
    // First encrypt secrets and upload the encrypted secrets to the DON
    const secretsManager = new SecretsManager({
      signer: signer,
      functionsRouterAddress: routerAddress,
      donId: donId,
    });
    await secretsManager.initialize();
  
    // Encrypt secrets and upload to DON
    const encryptedSecretsObj = await secretsManager.encryptSecrets(secrets);
  
  
    console.log(
      `Upload encrypted secret to gateways ${gatewayUrls}. slotId ${slotIdNumber}. Expiration in minutes: ${expirationTimeMinutes}`
    );
    
    // Upload secrets
    const uploadResult: any = await secretsManager.uploadEncryptedSecretsToDON({
      encryptedSecretsHexstring: encryptedSecretsObj.encryptedSecrets,
      gatewayUrls: gatewayUrls,
      slotId: slotIdNumber,
      minutesUntilExpiration: expirationTimeMinutes,
    });
  
    if (!uploadResult.success) {
      rej(`Encrypted secrets not uploaded to ${gatewayUrls}`)
    }
  
    console.log(
      `\n✅ Secrets uploaded properly to gateways ${gatewayUrls}! Gateways response: `,
      uploadResult
    );
    
    const donHostedSecretsVersion = parseInt(uploadResult.version); // fetch the reference of the encrypted secrets
    // const donHostedSecretsVersion = 1701864046 // found this after 1 manual try

      console.log("donHostedSecretsVersion", donHostedSecretsVersion)

      console.log("donHostedSecretsVersion", donHostedSecretsVersion)
      const functionsConsumer = new ethers.Contract(
      consumerAddress,
      carioIntentAbiObject,
      signer
    );
    // Actual transaction call
   
    const transaction = await functionsConsumer.sendRequest(
      source, // source
      "0x", // user hosted secrets - encryptedSecretsUrls - empty in this example
      slotIdNumber, // slot ID of the encrypted secrets
      donHostedSecretsVersion, // version of the encrypted secrets
      0, //request ID
      args, //args 1 should have the video id
      [], // bytesArgs - arguments can be encoded off-chain to bytes.
      subscriptionId,
      gasLimit,
      ethers.utils.formatBytes32String(donId) // jobId is bytes32 representation of donId
    );
  
    //return resolve(donHostedSecretsVersion);
  
    // Log transaction details
    console.log(
      `\n✅ Functions request sent! Transaction hash ${transaction.hash}. Waiting for a response...`
    );
  
    console.log(
      `See your request in the explorer ${explorerUrl}/tx/${transaction.hash}`
    );
  
    const responseListener = new ResponseListener({
      provider: provider,
      functionsRouterAddress: routerAddress,
    }); // Instantiate a ResponseListener object to wait for fulfillment.
    
    
   
    (async () => {
      try {
        const response: any = await new Promise((resolve, reject) => {
          responseListener
            .listenForResponseFromTransaction(transaction.hash)
            .then((response: any) => {
              resolve(response); // Resolves once the request has been fulfilled.
            })
            .catch((error: any) => {
              reject(error); // Indicate that an error occurred while waiting for fulfillment.
            });
        });
  
        const fulfillmentCode = response.fulfillmentCode;
  
        if (fulfillmentCode === FulfillmentCode.FULFILLED) {
          console.log(
            `\n✅ Request ${
              response.requestId
            } successfully fulfilled. Cost is ${ethers.utils.formatEther(
              response.totalCostInJuels
            )} LINK.Complete reponse: `,
            response
          );
        } else if (fulfillmentCode === FulfillmentCode.USER_CALLBACK_ERROR) {
          console.log(
            `\n⚠️ Request ${
              response.requestId
            } fulfilled. However, the consumer contract callback failed. Cost is ${ethers.utils.formatEther(
              response.totalCostInJuels
            )} LINK.Complete reponse: `,
            response
          );
        } else {
          console.log(
            `\n❌ Request ${
              response.requestId
            } not fulfilled. Code: ${fulfillmentCode}. Cost is ${ethers.utils.formatEther(
              response.totalCostInJuels
            )} LINK.Complete reponse: `,
            response
          );
        }
  
        const errorString = response.errorString;
        if (errorString) {
          console.log(`\n❌ Error during the execution: `, errorString);
          rej('Error during the execution' + errorString);
        } else {
          const responseBytesHexstring = response.responseBytesHexstring;
          if (ethers.utils.arrayify(responseBytesHexstring).length > 0) {
            const decodedResponse = decodeResult(
              response.responseBytesHexstring,
              ReturnType.uint256
            );
            console.log(
              `\n✅ Decoded response to ${ReturnType.uint256}: `,
              decodedResponse
            );
            resolve({ result: decodedResponse.toString() });
          }
        }
        
      } catch (error) {
        console.error("Error listening for response:", error);
      }
    })();
  })
};

const createCarioIntentRequest = async (request: CarioIntentRequest): Promise<any> => {
  try {
    const carioIntentContract = new ethers.Contract(consumerAddress, carioIntentAbiObject, signer);
    const tx = await carioIntentContract.createRequest(
      request.videoOrChannelIds, // Pass the array of strings directly
      request.msg, // Pass the message string directly
      { value: ethers.utils.parseEther("0.00001") } // Sending 0.01 ETH
    );

    console.log(`\n✅ Cario Intent contract call sent! Transaction hash: ${tx.hash}`);
    await tx.wait();
    console.log(`\n✅ Cario Intent contract call confirmed!`);
    return tx;
  } catch (error) {
    console.error(`\n❌ Error sending Cario Intent request: `, error);
    throw error;
  }
};

const acceptCarioIntentRequest = async (): Promise<any> => {
  try {
    const carioIntentContract = new ethers.Contract(consumerAddress, carioIntentAbiObject, signer);
    const requestId = await carioIntentContract.nextRequestId();
    console.log("requestId", requestId.toString());
    const tx = await carioIntentContract.acceptRequest(
      ethers.BigNumber.from(requestId).sub(1),
      "UC4nRmZan1X84wnWiW297rTg", // Pass the message string directly
    );

    // console.log(`\n✅ Cario Intent contract call sent! Transaction hash: ${tx.hash}`);
    // await tx.wait();
    // console.log(`\n✅ Cario Intent contract call confirmed!`);
    // return tx;
  } catch (error) {
    console.error(`\n❌ Error sending Cario Intent request: `, error);
    throw error;
  }
};

createCarioIntentRequest({ videoOrChannelIds: ["UC4nRmZan1X84wnWiW297rTg", "456"], msg: "hello" });
export { makeRequest, createCarioIntentRequest,acceptCarioIntentRequest };