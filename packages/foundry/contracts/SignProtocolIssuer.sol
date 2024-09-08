// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { ISP } from "@ethsign/sign-protocol-evm/src/interfaces/ISP.sol";
import { Attestation } from "@ethsign/sign-protocol-evm/src/models/Attestation.sol";
import { DataLocation } from "@ethsign/sign-protocol-evm/src/models/DataLocation.sol";

contract SignProtocolIssuer is Ownable {
    ISP public spInstance;
    uint64 public schemaId;
    mapping(address partyA => address partyB) public metIRLMapping;

    error ConfirmationAddressMismatch();

    event Endorsed(string videoId, address amos, uint64 attestationId);

    constructor() Ownable(_msgSender()) { }

    function setSPInstance(address instance) external onlyOwner {
        spInstance = ISP(instance);
    }

    function setSchemaID(uint64 schemaId_) external onlyOwner {
        schemaId = schemaId_;
    }

    function createAndSendAttestation(
        string calldata videoId,
        address amos,
        address requester,
        uint256 fees
    ) public {
        //TODO: Later add a required that this can be only called by CarioIntent contract.
        bytes memory attestationData = abi.encode(
            videoId,
            amos,
            fees // Replace with actual fees if needed
        );
        bytes[] memory recipients = new bytes[](2);
        recipients[0] = abi.encode(amos);//create the attestation and send to Amos
        recipients[1] = abi.encode(requester);//create the attestation and send to requester
        Attestation memory attestation = Attestation({
           schemaId: schemaId,
            linkedAttestationId: 0,
            attestTimestamp: 0,
            revokeTimestamp: 0,
            attester: address(this), // cario is the attester
            validUntil: 0,
            dataLocation: DataLocation.ONCHAIN,
            revoked: false,
            recipients: recipients,
            data: attestationData // SignScan assumes this is from `abi.encode(...)`
        });

        uint64 attestationId = spInstance.attest(attestation, "D884A2cb2", "0x", "0x");
        emit Endorsed(videoId, amos, attestationId);
    }
}