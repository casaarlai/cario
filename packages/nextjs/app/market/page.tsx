"use client";

import { RefObject, useEffect, useRef, useState } from "react";
import { ApolloQueryResult, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { GET_REQUESTS } from "~~/utils/queries/getRequests";

const Market: NextPage = () => {
  const createRequestModalRef = useRef<HTMLDialogElement>(null);
  const acceptRequestModalRef = useRef<HTMLDialogElement>(null);

  const [chosenRequest, setChosenRequest] = useState(null);

  const { loading, data, refetch } = useQuery(GET_REQUESTS, {
    notifyOnNetworkStatusChange: false,
    pollInterval: 100,
    fetchPolicy: "no-cache",
  });

  const requests = data?.requests.sort((a: any, b: any) => b.blockTimestamp - a.blockTimestamp) || [];

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
          <h1 className="text-xl font-bold">Market</h1>
          <button className="btn btn-primary btn-sm" onClick={() => createRequestModalRef.current?.showModal()}>
            Create
          </button>
          <CreateRequest modalRef={createRequestModalRef} refetch={refetch} />
          {chosenRequest && (
            <AcceptRequest modalRef={acceptRequestModalRef} refetch={refetch} request={chosenRequest} />
          )}
        </div>
        <div className="overflow-x-auto border rounded">
          <table className="table table-auto md:table-fixed flex flex-col gap-3">
            <thead>
              <tr className="border-0 bg-base-200">
                <th className="w-2/12">Requester</th>
                <th className="w-2/12">Amount</th>
                <th className="w-2/12">Message</th>
                <th className="w-2/12">Time</th>
                <th className="w-1/12"></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr className="border-0 bg-base-100 animate-pulse">
                  <td colSpan={5} className="opacity-0">
                    Loading...
                  </td>
                </tr>
              )}
              {!loading &&
                requests.map((request: any, index: number) => (
                  <>
                    <tr key={index} className="border-0 bg-base-100 hover:brightness-110 transition cursor-pointer">
                      <td>{request.requester?.slice(0, 6) + "..." + request.requester?.slice(-4)}</td>
                      <td>{formatEther(request.amount)}</td>
                      <td>
                        {request.message.length > 20 ? `${request.message.substring(0, 20)}...` : request.message}
                      </td>
                      <td>{getMinutesSince(request.blockTimestamp)}</td>
                      <td className="flex items-center justify-center h-full">
                        <button
                          onClick={() => {
                            setChosenRequest(requests[index]);
                            acceptRequestModalRef.current?.showModal();
                          }}
                          className="btn btn-sm btn-neutral"
                        >
                          Accept
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
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

  const handleAcceptRequest = async () => {
    const amosId = formRef.current!.amosId.value;
    try {
      await writeContractAsync({
        functionName: "acceptRequest",
        args: [request.requestId, amosId],
      });

      formRef.current?.reset();
      modalRef.current?.close();
      refetch();
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
                  <span className="label-text">Message from requester</span>
                </div>
                <textarea
                  name="message"
                  className="textarea textarea-bordered h-24"
                  disabled
                  value={request.message}
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
              <button onClick={handleAcceptRequest} className="btn btn-primary btn-sm">
                Confirm
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
};

const CreateRequest = ({
  modalRef,
  refetch,
}: {
  modalRef: RefObject<HTMLDialogElement>;
  refetch: () => Promise<ApolloQueryResult<any>>;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const { writeContractAsync } = useScaffoldWriteContract("CarioIntent");

  const handleCreateRequest = async () => {
    const amos = formRef
      .current!.amos.value.split(";")
      .map((id: string) => id.trim())
      .filter((id: string) => id.length > 0);
    const amount = formRef.current!.amount.value;
    const message = formRef.current!.message.value;
    try {
      await writeContractAsync({
        functionName: "createRequest",
        args: [amos, message],
        value: parseEther(amount),
      });

      formRef.current?.reset();
      modalRef.current?.close();
      refetch();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create a request</h3>
        <p className="py-4">
          Creating a request adds a new request to the market, allowing multiple Amos (KOLs & celebrities) to fill up
          your request.
        </p>
        <form ref={formRef} className="flex flex-col gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Amos (Youtube Channel IDs separated by a semicolon)</span>
            </div>
            <input
              type="text"
              name="amos"
              placeholder="UCUZHFZ9jIKrLroW8LcyJEQQ;UDDEEEZ9jIKrO83W8LcyJUUN"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Amount (ETH)</span>
            </div>
            <input type="text" name="amount" placeholder="0.01" className="input input-bordered w-full" />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Your message</span>
            </div>
            <textarea
              name="message"
              className="textarea textarea-bordered h-24"
              placeholder="Looking for partners who will help Cario expand its reach..."
            ></textarea>
          </label>
        </form>
        <div className="modal-action flex items-center gap-2">
          <form method="dialog">
            <button className="btn btn-sm btn-secondary">Cancel</button>
          </form>
          <button onClick={handleCreateRequest} className="btn btn-primary btn-sm">
            Submit
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default Market;
