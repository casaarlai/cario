"use client";

import { RefObject, useRef } from "react";
import { ApolloQueryResult, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { formatEther, parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { GET_REQUESTS } from "~~/utils/queries/getRequests";

const Market: NextPage = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const { loading, data, refetch } = useQuery(GET_REQUESTS, {
    notifyOnNetworkStatusChange: false,
    pollInterval: 100,
    fetchPolicy: "no-cache",
  });

  const requests = data?.requests.sort((a: any, b: any) => b.blockTimestamp - a.blockTimestamp) || [];

  return (
    <>
      <div className="container mx-auto px-4 md:px-0 py-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Market</h1>
          <button className="btn btn-primary btn-sm" onClick={() => modalRef.current?.showModal()}>
            Create
          </button>
          <CreateRequest modalRef={modalRef} refetch={refetch} />
        </div>
        <div className="overflow-x-auto border rounded">
          <table className="table table-auto md:table-fixed flex flex-col gap-3">
            <thead>
              <tr className="border-0">
                <th className="w-2/5">Requester</th>
                <th className="w-1/5">Amount</th>
                <th className="w-1/5">Message</th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr className="border-0 bg-base-100 animate-pulse">
                  <td colSpan={4} className="opacity-0">
                    Loading...
                  </td>
                </tr>
              )}
              {!loading &&
                requests.map((request: any, index: number) => (
                  <tr key={index} className="border-0 bg-base-100 hover">
                    <td>{request.requester}</td>
                    <td>{formatEther(request.amount)}</td>
                    <td>{request.message}</td>
                    <td className="flex items-center justify-center h-full">
                      <button className="btn btn-sm btn-neutral">Accept</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
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
