import React, { useEffect } from "react";
import { useAppContext } from "./_app";
import AllDeals from "@/components/Deals/AllDeals";

function Deals() {
  const { setTitle } = useAppContext();

  useEffect(() => {
    setTitle("Deals");
  }, []);

  return (
    <>
      <div className="p-4">
        <div
          role="region"
          aria-label="Deals List"
          className="flex justify-between"
        >
          <div className="text-lg text-black font-bold" aria-live="polite">
            Total: 100 deals
          </div>
          <div className="flex gap-4">
            <select
              aria-label="Sort By"
              className="bg-white w-[250px] text-black font-thin border text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Sort By:</option>
              <option value="residential">Sort by: Residential</option>
              <option value="commercial">Sort by: Commercial</option>
            </select>
            <select
              aria-label="Filter"
              className="bg-white border  text-black font-thin text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Filter</option>
              <option value="date">Date</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
        <AllDeals />
      </div>
    </>
  );
}

export default Deals;
