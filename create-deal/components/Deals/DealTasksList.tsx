import React from "react";

function DealTasksList() {
  return (
    <ul className="flex flex-row" role="list" aria-label="Deal Tasks List">
      <li className="justify-center flex align-center items-center">
        <div
          className="h-6 w-6 rounded-full bg-blue-500 flex justify-center align-center items-center"
          role="listitem"
        >
          <div
            className="h-2 w-2 rounded-full bg-white m-auto"
            aria-hidden="true"
          ></div>
        </div>
      </li>
      <li className="pl-4" role="listitem">
        <div className="text-xs text-gray-500">2023-02-15</div>
        <div className="text-xl text-gray-900">Task 1</div>
      </li>
    </ul>
  );
}

export default DealTasksList;
