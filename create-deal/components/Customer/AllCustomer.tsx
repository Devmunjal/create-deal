import { Customer } from "@/utils /types";
import { EditOutlined } from "@mui/icons-material";
import React from "react";

interface Props {
  customers: Customer[];
  editButton: boolean;
  onClick?: (customer: Customer) => void;
}

function AllCustomer(props: Props) {
  return (
    <ul
      className="list-none"
      role="list"
      aria-label="List of customers"
      aria-labelledby="customers-list"
    >
      {props.customers && props.customers.length > 0 ? (
        props.customers.map((customer: Customer, i: number) => (
          <li
            key={i}
            onClick={() => props.onClick && props.onClick(customer)}
            className="py-2 cursor-pointer"
            role="listitem"
            aria-label={`List item: ${customer.name}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full overflow-hidden mr-4">
                  <img
                    src={`https://picsum.photos/512?random=${i}`}
                    alt={`Profile picture of ${customer.name}`}
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-black text-lg font-bold">
                    {customer.name}
                  </span>
                  <p className="block text-sm text-gray-500">
                    {customer.email}
                  </p>
                </div>
              </div>
              {props.editButton && (
                <div className="flex items-center">
                  <EditOutlined
                    className="text-gray-500"
                    aria-label="Edit customer"
                  />
                </div>
              )}
            </div>
          </li>
        ))
      ) : (
        <span className="text-gray-500" role="status" aria-live="polite">
          No customers found
        </span>
      )}
    </ul>
  );
}

export default AllCustomer;
