"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { ApolloQueryResult, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { encodePacked, formatEther, keccak256 } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { GET_ACCEPTED_AMOS_BY_AMOS_ID, GET_ACCEPTED_AMOS_BY_REQUEST_ID } from "~~/utils/queries/getAmosRequests";
import { GET_REQUESTS_BY_IDS } from "~~/utils/queries/getRequests";
import { notification } from "~~/utils/scaffold-eth";

// Function to generate hash for message
function hashRequest(_requestId: number, amount: number, _amosId: string, message: string, sender: string): string {
  const encoded = encodePacked(
    ["uint256", "uint256", "string", "string", "address"],
    [BigInt(_requestId), BigInt(amount), _amosId, message, sender],
  );

  return keccak256(encoded);
}

const Accepted: NextPage = () => {
  const acceptRequestModalRef = useRef<HTMLDialogElement>(null);
  const amosIdInputRef = useRef<HTMLInputElement>(null);

  const [amosId, setAmosId] = useState<string | null>(null);
  const [chosenRequest, setChosenRequest] = useState(null);

  const { loading: acceptedAmosLoading, data: acceptedAmos } = useQuery(GET_ACCEPTED_AMOS_BY_AMOS_ID, {
    variables: { amosId },
    notifyOnNetworkStatusChange: false,
    pollInterval: 1000,
    fetchPolicy: "no-cache",
  });

  const requestIds =
    !acceptedAmosLoading &&
    acceptedAmos?.acceptedAmos_collection.map((a: { requestId: string }) => {
      return a.requestId;
    });

  const {
    loading: requestsLoading,
    data: r,
    refetch: refetchRequests,
  } = useQuery(GET_REQUESTS_BY_IDS, {
    variables: { requestIds },
    notifyOnNetworkStatusChange: false,
    pollInterval: 1000,
    fetchPolicy: "no-cache",
  });

  const requests = !requestsLoading && r?.requests;

  // Function to get minutes, hours or days since blockTimestamp
  const getMinutesSince = (blockTimestamp: number) => {
    const diff = Math.floor((Date.now() / 1000 - blockTimestamp) / 60);
    if (diff < 60) {
      return `${diff} mins ago`;
    } else if (diff < 60 * 24) {
      return `${Math.floor(diff / 60)} hours ago`;
    } else {
      return `${Math.floor(diff / (60 * 24))} days ago`;
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 md:px-0 py-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Find accepted requests</h1>
          <div className="join">
            <input
              className="input input-bordered join-item"
              placeholder="Amos ID (e.g. @chainlink)"
              ref={amosIdInputRef}
            />
            <button
              onClick={() => setAmosId(amosIdInputRef.current?.value || null)}
              className="btn join-item rounded-r"
            >
              Search
            </button>
          </div>
          {chosenRequest && (
            <AcceptRequest modalRef={acceptRequestModalRef} refetch={refetchRequests} request={chosenRequest} />
          )}
        </div>
        <div className="overflow-x-auto shadow-md shadow-secondary rounded">
          <table className="table table-auto md:table-fixed flex flex-col gap-3">
            <thead>
              <tr className="border-0 bg-base-200">
                <th className="w-2/12">Requester</th>
                <th className="w-2/12">Amount (ETH)</th>
                <th className="w-2/12">Message</th>
                <th className="w-2/12">Requested on</th>
                <th className="w-1/12"></th>
              </tr>
            </thead>
            <tbody>
              {requestsLoading && (
                <tr className="border-0 bg-base-100 animate-pulse">
                  <td colSpan={5} className="opacity-0">
                    Loading...
                  </td>
                </tr>
              )}
              {!requestsLoading && !requests && (
                <tr className="border-0 bg-base-100">
                  <td colSpan={5} className="text-center">
                    No requests found.
                  </td>
                </tr>
              )}
              {!requestsLoading &&
                requests &&
                requests.length > 0 &&
                requests.map((request: any, index: number) => {
                  const hashed = hashRequest(
                    request.requestId,
                    request.amount,
                    request.cariosToAmos,
                    request.message,
                    request.requester,
                  );
                  return (
                    <>
                      <tr key={index} className="border-0 bg-base-100 hover:brightness-110 transition cursor-pointer">
                        <td>{request.requester?.slice(0, 6) + "..." + request.requester?.slice(-4)}</td>
                        <td>{formatEther(request.amount)}</td>
                        <td>{hashed.length > 15 ? hashed.slice(0, 15) + "..." : hashed}</td>
                        <td>{getMinutesSince(request.blockTimestamp)}</td>
                        <td className="flex items-center justify-center h-full">
                          <button
                            onClick={() => {
                              setChosenRequest(requests[index]);
                              acceptRequestModalRef.current?.showModal();
                            }}
                            className="btn btn-sm btn-neutral"
                          >
                            Fulfill
                          </button>
                        </td>
                      </tr>
                    </>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const AcceptRequest = ({
  modalRef,
  refetch,
  request,
}: {
  modalRef: RefObject<HTMLDialogElement>;
  refetch: () => Promise<ApolloQueryResult<any>>;
  request: any;
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [step, setStep] = useState("info");

  const { writeContractAsync } = useScaffoldWriteContract("CarioIntent");

  const {
    loading: acceptedAmosLoading,
    data: acceptedAmos,
    refetch: refetchAcceptedAmos,
  } = useQuery(GET_ACCEPTED_AMOS_BY_REQUEST_ID, {
    variables: { requestId: request.requestId },
    notifyOnNetworkStatusChange: false,
    pollInterval: 100,
    fetchPolicy: "no-cache",
  });

  const acceptedAmosIds = !acceptedAmosLoading && acceptedAmos.acceptedAmos_collection[0].amosIds;

  const handleAcceptRequest = async () => {
    const amosId = formRef.current!.amosId.value;
    try {
      if (acceptedAmosIds.includes(amosId)) {
        notification.error("You have already accepted this request!");
        throw new Error("You have already accepted this request");
      }

      await writeContractAsync({
        functionName: "acceptRequest",
        args: [request.requestId, amosId],
      });

      formRef.current?.reset();
      modalRef.current?.close();
      refetch();
      refetchAcceptedAmos();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    setStep("info");
  }, [request.requestId]);

  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Accept request</h3>
        {step === "info" && (
          <>
            <p></p>
            <form className="flex flex-col gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Requester</span>
                </div>
                <input
                  type="text"
                  name="requester"
                  disabled
                  value={request.requester}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Amos</span>
                </div>
                <div className="flex gap-1 rounded-lg p-3 bg-base-200">
                  {request.cariosToAmos.split(",").map((amos: string) => (
                    <div key={amos} className="badge">
                      {amos}
                    </div>
                  ))}
                </div>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Amount (ETH)</span>
                </div>
                <input
                  type="text"
                  name="amount"
                  disabled
                  value={formatEther(request.amount)}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Requested on</span>
                </div>
                <input
                  type="text"
                  name="amount"
                  disabled
                  value={new Date(request.blockTimestamp * 1000).toLocaleString()}
                  className="input input-bordered w-full"
                />
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">You are to include this hash in your post</span>
                </div>
                <textarea
                  name="message"
                  className="textarea textarea-bordered h-24"
                  disabled
                  value={hashRequest(
                    request.requestId,
                    request.amount,
                    request.cariosToAmos,
                    request.message,
                    request.requester,
                  )}
                ></textarea>
              </label>
            </form>
            <div className="modal-action flex items-center gap-2">
              <form method="dialog">
                <button className="btn btn-sm btn-secondary">Cancel</button>
              </form>
              <button onClick={() => setStep("confirm")} className="btn btn-primary btn-sm">
                Next
              </button>
            </div>
          </>
        )}
        {step === "confirm" && (
          <>
            <p className="py-4 font-light">
              If you are not listed under the Amos, you can still accept the request but you will not be eligible to
              receive the reward even if you fulfil the request.
            </p>
            <form onSubmit={e => e.preventDefault()} ref={formRef} className="flex flex-col gap-4">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">These Amos have already accepted</span>
                </div>
                <div className="flex gap-1 rounded-lg p-3 bg-base-200">
                  {acceptedAmosIds &&
                    acceptedAmosIds.map((amos: string) => (
                      <div key={amos} className="badge">
                        {amos}
                      </div>
                    ))}
                </div>
              </label>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Your Amos ID (Youtube Channel ID)</span>
                </div>
                <input
                  type="text"
                  name="amosId"
                  placeholder="UCUZHFZ9jIKrLroW8LcyJEQQ"
                  className="input input-bordered w-full"
                />
              </label>
            </form>
            <div className="modal-action flex items-center gap-2">
              <button onClick={() => setStep("info")} className="btn btn-sm btn-secondary">
                Back
              </button>
              <button onClick={handleAcceptRequest} disabled={acceptedAmosLoading} className="btn btn-primary btn-sm">
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

export default Accepted;
