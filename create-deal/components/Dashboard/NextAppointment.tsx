import React from "react";

function NextAppointment() {
  return (
    <div
      className="w-full flex flex-col gap-4 h-full"
      role="region"
      aria-label="Next Appointment"
    >
      <div className="flex items-center justify-between">
        <span className="text-white text-lg font-bold">Next Appointment</span>
        <div className="bg-white rounded-full w-4 h-4" aria-hidden="true"></div>
      </div>
      <div className="flex items-center">
        <div
          className="h-10 w-10 rounded-full overflow-hidden md:w-16 md:h-16 flex items-center justify-center"
          role="img"
          aria-label="Profile picture"
        >
          <img
            src="https://picsum.photos/512"
            alt="profile picture"
            className="object-cover w-full rounded-full max-h-16 "
          />
        </div>

        <div className="ml-4 w-[70%] md:ml-6">
          <span className="text-white text-lg font-bold" aria-label="Name">
            John Doe
          </span>
          <p className="block text-sm text-white truncate" aria-label="Address">
            123 Main St, Anytown USA 12345
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm text-white" aria-label="Appointment Date">
          Appointment Date:
        </p>
        <p className="text-white text-lg font-bold" aria-label="Date">
          Mar 12, 2023
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <div>
          <p className="text-sm text-white" aria-label="Room Area">
            Room Area:
          </p>
          <p className="text-white text-lg font-bold" aria-label="Room area">
            100 m2
          </p>
        </div>

        <div>
          <p className="text-sm text-white" aria-label="Number of People">
            People
          </p>
          <p className="text-white text-lg font-bold" aria-label="Number">
            10
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <div>
          <p className="text-sm text-white" aria-label="Price">
            Price
          </p>
          <p className="text-white text-lg font-bold" aria-label="Price amount">
            $6000
          </p>
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-white text-blue-500 py-1 px-2 rounded-full text-sm whitespace-nowrap"
            aria-label="See details"
          >
            See Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default NextAppointment;
