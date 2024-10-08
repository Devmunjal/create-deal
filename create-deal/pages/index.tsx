import RecentDeals from "@/components/Deals/RecentDeals";
import {
  BusinessCenter,
  ChevronRight,
  ErrorRounded,
  Group,
} from "@mui/icons-material";
import { useEffect } from "react";
import { useAppContext } from "./_app";
import NextAppointment from "@/components/Dashboard/NextAppointment";
import DealTasksList from "@/components/Deals/DealTasksList";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS } from "@/utils /queries/customers";
import AllCustomer from "@/components/Customer/AllCustomer";
import { GET_DEALS } from "@/utils /queries/deals";
import React from "react";

export default function Home() {
  const { setTitle, setCustomers, setDeals } = useAppContext();
  useEffect(() => {
    setTitle("Dashboard");
  }, []);

  const { data: customers } = useQuery(GET_CUSTOMERS);
  const { data: deals } = useQuery(GET_DEALS);

  useEffect(() => {
    if (customers?.customers.length > 0) {
      setCustomers(customers.customers);
    }

    if (deals?.deals.length > 0) {
      setDeals(deals.deals);
    }
    return () => {};
  }, [customers, deals]);

  return (
    <div
      className="flex flex-col sm:flex-row lg:flex-row md:flex-row gap-4 lg:gap-0 md:gap-0 xl:gap-4"
      aria-label="Dashboard"
    >
      <div className="flex flex-col w-full xl:w-[70%] lg:w-[80%] md:w-full sm:w-full">
        {/* First Row */}
        <div className="flex flex-col md:flex-row md:p-4">
          <div
            className="bg-blue-700 text-white rounded-lg p-4 md:p-1 lg:p-4 flex flex-col justify-between h-full md:w-[30%] lg:w-[30%]"
            aria-label="Next Appointment"
            role="region"
          >
            <NextAppointment />
          </div>

          <div
            className="bg-white rounded-lg p-4 h-full md:w-[70%] lg:w-[70%] md:ml-4"
            aria-label="Recent Deals"
            role="region"
          >
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold text-black">Recent Deals</h2>
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline"
                aria-label="View All Recent Deals"
              >
                View All
              </a>
            </div>
            <RecentDeals recentDeals={deals?.deals?.slice(0, 5)} />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col md:flex-row md:p-4">
          <div
            className="grid grid-rows-1 h-full md:w-[30%] lg:w-[30%] md:grid-rows-2 gap-4"
            aria-label="Customers and Deals"
            role="region"
          >
            <div
              className="bg-white rounded-lg p-4 flex flex-col justify-between h-full"
              aria-label="Customers"
              role="region"
            >
              <div className="flex justify-between py-4">
                <div>
                  <h2 className="text-lg font-sm text-gray-500 mb-4">
                    Customers
                  </h2>
                  <p className="text-3xl font-bold text-black">
                    {customers?.customers?.length || 0}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-green-300 rounded-full p-4">
                    <Group className="text-green-900" />
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-white rounded-lg p-4 flex flex-col  align-center h-full"
              aria-label="Deals"
              role="region"
            >
              <div className="flex justify-between py-4">
                <div>
                  <h2 className="text-lg font-sm text-gray-500 mb-4">Deals</h2>
                  <p className="text-3xl font-bold text-black">
                    {deals?.deals?.length || 0}
                  </p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-red-300 rounded-full p-4">
                    <BusinessCenter className="text-red-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-lg p-4 h-full md:w-[70%] lg:w-[70%] md:ml-4"
            aria-label="Tasks To Do"
            role="region"
          >
            <div className="flex justify-between border-b pb-4">
              <div className=" flex flex-row justify-between w-full">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full overflow-hidden mr-4">
                    <img
                      src="https://picsum.photos/512"
                      alt="profile picture"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-black text-lg font-bold">
                      John Doe
                    </span>
                    <p className="block text-sm text-gray-500">
                      123 Main St, Anytown USA 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="bg-blue-300 text-blue-700 rounded-full mr-2 p-2 px-4">
                    Processing
                  </div>
                  <div className="p-1">
                    <ChevronRight className="text-blue-700" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 h-[250px] overflow-y-auto">
              <DealTasksList />
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col p-4 lg:p-0 md:p-0 md:w-full xl:w-[30%] lg:w-[20%] md:w-full sm:w-full lg:ml-0  md:ml-0 xl:ml-4"
        aria-label="Customers"
        role="region"
      >
        <div className="flex flex-col justify-between">
          <div className="py-4">
            <div className="flex items-center justify-between pb-3">
              <h2 className="text-lg font-bold text-black">Customers</h2>
              <Link href="#">
                <p className="text-blue-500 text-sm">View All</p>
              </Link>
            </div>
            <AllCustomer
              customers={customers?.customers.slice(0, 3)}
              editButton={true}
            />
          </div>
        </div>
        <div
          className="mt-4 p-4 rounded-xl bg-white"
          aria-label="Tasks To Do"
          role="region"
        >
          <div className="flex items-center justify-between pb-6">
            <h2 className="text-lg font-bold text-black">Tasks To Do</h2>
            <Link href="#">
              <p className="text-blue-500 text-sm">View All</p>
            </Link>
          </div>
          <ul className="list-none">
            {[...Array(6)].map((_, i) => (
              <li key={i} className="py-4 ">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div>
                      <span className="text-gray-500">{`2023-01-${
                        i + 1
                      }`}</span>
                      <span className="ml-4 mr-3">
                        {new Date().getTime() >
                        new Date(`2023-01-${i + 1}`).getTime() ? (
                          <ErrorRounded className="text-red-200" />
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="text-black ml-2">Task {i + 1}</span>
                    </div>
                  </div>
                </div>
              </li>
            ))}

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <h2 className="text-lg text-gray-500">Add new task</h2>
              <ChevronRight className="text-blue-700" />
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
