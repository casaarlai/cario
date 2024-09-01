"use client";

import { useQuery } from "@apollo/client";
import type { NextComponentType, NextPage } from "next";
import { GET_REQUESTS } from "~~/utils/queries/getRequests";

const Market: NextPage = () => {
  const { loading, data } = useQuery(GET_REQUESTS, {
    variables: {
      orderDirection: "desc",
    },
    notifyOnNetworkStatusChange: false,
    pollInterval: 10000,
    fetchPolicy: "no-cache",
  });

  return (
    <>
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Market</h1>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => (document.getElementById("createRequestModal") as HTMLDialogElement).showModal()}
          >
            Create
          </button>
          <CreateRequest />
        </div>
        <table className="table table-fixed border flex flex-col gap-3">
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
              data.requests.map((request: any, index: number) => (
                <tr key={index} className="border-0 bg-base-100 hover">
                  <td>{request.requester}</td>
                  <td>{request.amount}</td>
                  <td>{request.message}</td>
                  <td className="flex items-center justify-center h-full">
                    <button className="btn btn-sm btn-neutral">Accept</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const CreateRequest: NextComponentType = () => {
  return (
    <dialog id="createRequestModal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create a request</h3>
        <p className="py-4">
          Creating a request adds a new request to the market, allowing multiple Amos (KOLs & celebrities) to fill up
          your request.
        </p>
        <div className="flex flex-col gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Amos</span>
            </div>
            <input type="text" placeholder="Chainlink" className="input input-bordered w-full" />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Amount (ETH)</span>
            </div>
            <input type="text" placeholder="0.01" className="input input-bordered w-full" />
          </label>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Your message</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Looking for partners who will help Cario expand its reach..."
            ></textarea>
          </label>
        </div>
        <div className="modal-action flex items-center gap-2">
          <button className="btn btn-primary btn-sm">Submit</button>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-secondary">Cancel</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default Market;
