// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

enum DataLocation {
    IPFS,
    ARWEAVE,
    ON_CHAIN
}

struct Attestation {
    uint64 schemaId;
    uint64 linkedAttestationId;
    uint64 attestTimestamp;
    uint64 revokeTimestamp;
    address attester;
    uint64 validUntil;
    DataLocation dataLocation;
    bool revoked;
    bytes[] recipients;
    bytes data;
}

interface IExternalContract {
    function attest(Attestation calldata attestation) external;
}

contract SignProtocolIssuer {
    IExternalContract public externalContract;

    constructor(address _externalContractAddress) {
        externalContract = IExternalContract(_externalContractAddress);
    }

    function createAndSendAttestation(
        uint64 schemaId,
        uint64 linkedAttestationId,
        uint64 attestTimestamp,
        uint64 revokeTimestamp,
        address attester,
        uint64 validUntil,
        DataLocation dataLocation,
        bool revoked,
        bytes[] calldata recipients,
        bytes calldata data
    ) external {
        Attestation memory attestation = Attestation({
            schemaId: schemaId,
            linkedAttestationId: linkedAttestationId,
            attestTimestamp: attestTimestamp,
            revokeTimestamp: revokeTimestamp,
            attester: attester,
            validUntil: validUntil,
            dataLocation: dataLocation,
            revoked: revoked,
            recipients: recipients,
            data: data
        });

        externalContract.attest(attestation);
    }
}