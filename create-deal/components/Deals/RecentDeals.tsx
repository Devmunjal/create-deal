import { Customer } from "@/utils /types";
import React from "react";

interface Deal {
  id: string;
  customer: Customer;
  street: string;
  createdAt: string;
}

interface Props {
  recentDeals: Deal[];
}

function RecentDeals(props: Props) {
  return (
    <ul
      role="list"
      className="list-none divide-y divide-gray-200"
      aria-label="Recent deals"
    >
      {props.recentDeals && props.recentDeals.length > 0 ? (
        props.recentDeals.map((deal) => {
          return (
            <li
              key={deal.id}
              className="flex flex-row items-center p-2 py-3 justify-between w-full"
            >
              <div className="flex flex-row items-center">
                <div className="justify-center">
                  <div className="mr-4">
                    <img
                      className="w-10 rounded-full"
                      src="https://picsum.photos/512"
                      alt="profile picture"
                      aria-hidden="true"
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <span
                    className="font-bold text-black"
                    aria-label={deal.customer.name}
                  >
                    {deal?.customer?.name}
                  </span>
                  <span
                    className="text-sm text-gray-500"
                    aria-label={deal.street}
                  >
                    {deal?.street}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span
                  className="font-bold text-black"
                  aria-label={`Deal value: $${deal.id}`}
                >
                  $1234
                </span>
                <span
                  className="text-sm text-gray-500"
                  aria-label={`Deal created on ${new Date(
                    deal.createdAt
                  ).toLocaleDateString()}`}
                >
                  {new Date(deal.createdAt)?.toLocaleDateString()}
                </span>
              </div>
            </li>
          );
        })
      ) : (
        <li
          className="text-sm text-gray-500"
          role="listitem"
          aria-label="No recent deals"
        >
          No recent deals
        </li>
      )}
    </ul>
  );
}

export default RecentDeals;
