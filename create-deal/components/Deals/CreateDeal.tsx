import React, { useEffect, useState } from "react";
import Modal from "../Common/Modal";
import { Cancel } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { CREATE_DEAL } from "@/utils /queries/deals";
import { useAppContext } from "@/pages/_app";
import AllCustomer from "../Customer/AllCustomer";
import { Customer } from "@/utils /types";
import { toast } from "react-toastify";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

function CreateDealModal(props: Props) {
  const { isOpen, onClose } = props;

  const { customers } = useAppContext();

  const [changeCustomerModal, setChangeCustomerModal] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState({} as Customer);

  const [formState, setFormState] = useState({
    status: "NEW",
    customerId: "0",
    street: "",
    city: "",
    state: "",
    zip: "",
    images: [],
    roomAreaInMeters: 0,
    peopleRequired: 0,
  });
  const handleChange = (event: any) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (customers.length > 0) {
      setSelectedCustomer(customers[0]);
      setFormState({
        ...formState,
        customerId: customers[0].id,
      });
    }
  }, [customers]);

  const [createDeal] = useMutation(CREATE_DEAL, {
    variables: {
      ...formState,
      roomAreaInMeters: Number(formState.roomAreaInMeters),
      peopleRequired: Number(formState.peopleRequired),
    },
    onError(error) {
      toast.error(error.message, {
        theme: "colored",
        style: {
          backgroundColor: "red",
          color: "#FFFFFF",
        },
      });
    },
    onCompleted() {
      toast.success("Deal saved", {
        icon: (
          <img
            src="https://cdn-icons-png.flaticon.com/512/4213/4213475.png"
            alt="success"
            width={20}
            height={20}
          />
        ),
        theme: "colored",
        style: {
          backgroundColor: "#000000",
          color: "#FFFFFF",
        },
      });

      onClose();
    },
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className={"pb-4"}
        aria-labelledby="createDealModal"
        aria-describedby="createDealModalDescription"
      >
        <div className="flex flex-row items-center justify-between  p-4">
          <h2 id="createDealModal" className="font-bold text-md text-black">
            Create New Deal
          </h2>
          <Cancel
            className="text-gray-500 cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          />
        </div>

        <div className="flex flex-row justify-between p-4 bg-[#EEF6FB]">
          <div className="flex flex-row items-center">
            <div className="mr-4">
              <img
                className="w-10 rounded-full"
                src="https://picsum.photos/512"
                alt="profile picture"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="text-sm text-gray-500">Customer</p>
              <p className=" font-bold text-black">
                {selectedCustomer ? selectedCustomer?.name : "N/A"}
              </p>
            </div>
          </div>
          <button
            onClick={() => setChangeCustomerModal(true)}
            className="bg-white text-black font-thin py-2 px-4 rounded-full text-sm"
            aria-label="Change Customer"
          >
            Change Customer
          </button>
        </div>

        <>
          <div>
            <div className="p-4 pt-5">
              <div className="pb-2">
                <label
                  className="text-sm font-bold text-gray-500"
                  htmlFor="roomImages"
                >
                  Room Images
                </label>
              </div>
              <button className="bg-[#F6FAFD] border text-black font-thin py-2 px-4 rounded-md text-sm">
                Add
                <input
                  type="file"
                  id="roomImages"
                  accept="image/*"
                  className="hidden"
                  multiple
                  aria-label="Add room images"
                />
              </button>
            </div>
          </div>

          <div className="p-4 pt-2">
            <div className="pb-2">
              <label
                className="text-sm font-bold text-gray-500"
                htmlFor="address"
              >
                Address
              </label>
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id="address"
                className="bg-[#F6FAFD] border text-black font-thin py-2 px-4 rounded-md text-sm w-full"
                placeholder="Street"
                name="street"
                onChange={(e) => handleChange(e)}
                value={formState.street}
                aria-label="Street"
              />
              <div className="flex flex-row gap-2 mt-2">
                <input
                  type="text"
                  className="bg-[#F6FAFD] border text-black font-thin py-2 px-4 rounded-md text-sm flex-1 w-[40%]"
                  placeholder="City"
                  name="city"
                  onChange={(e) => handleChange(e)}
                  value={formState.city}
                  aria-label="City"
                />
                <input
                  type="text"
                  className="bg-[#F6FAFD] border text-black font-thin py-2 px-4 rounded-md text-sm flex-1 w-[30%]"
                  placeholder="State"
                  name="state"
                  onChange={(e) => handleChange(e)}
                  value={formState.state}
                  aria-label="State"
                />
                <input
                  type="text"
                  className="bg-[#F6FAFD] border text-black font-thin py-2 px-4 rounded-md text-sm flex-1 w-[20%]"
                  placeholder="Zip"
                  name="zip"
                  onChange={(e) => handleChange(e)}
                  value={formState.zip}
                  aria-label="Zip"
                />
              </div>
            </div>
          </div>

          <div className="p-4 pt-2">
            <div className="flex flex-row gap-2">
              <div className="pb-2 flex-1">
                <label
                  className="text-sm font-bold text-gray-500"
                  htmlFor="area"
                >
                  Room Area (m2)
                </label>
              </div>
              <div className="pb-2 flex-1">
                <label
                  className="text-sm font-bold text-gray-500"
                  htmlFor="people"
                >
                  People
                </label>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <input
                type="number"
                id="area"
                name="roomAreaInMeters"
                className="bg-[#F6FAFD] border text-black font-thin py-2 px-4 rounded-md text-sm flex-1"
                onChange={(e) => handleChange(e)}
                value={formState.roomAreaInMeters}
                aria-label="Room Area (m2)"
              />
              <input
                type="number"
                id="people"
                name="peopleRequired"
                className="bg-[#F6FAFD] border text-black font-thin py-2 px-4 rounded-md text-sm flex-1"
                onChange={(e) => handleChange(e)}
                value={formState.peopleRequired}
                aria-label="People"
              />
            </div>
          </div>

          <div className="p-4 pt-2 flex flex-row gap-2 justify-between">
            <div className="flex flex-row items-center gap-2">
              <label
                className="text-sm font-bold text-gray-500"
                htmlFor="progress"
              >
                Progress
              </label>
              <select
                id="progress"
                name="status"
                className="bg-[#F6FAFD] border text-black font-thin py-2 px-4 rounded-md text-sm"
                onChange={(e) => handleChange(e)}
                aria-label="Progress"
              >
                <option value="NEW">New</option>
                <option value="INPROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div className="flex flex-row gap-2">
              <button
                className=" text-black text-sm px-4 py-2 rounded-md"
                onClick={() => onClose()}
                aria-label="Cancel"
              >
                Cancel
              </button>
              <button
                className="bg-[#514EF3] text-sm text-white px-4 py-2 rounded-full"
                onClick={() => {
                  createDeal();
                }}
                aria-label="Save Deal"
              >
                Save Deal
              </button>
            </div>
          </div>
        </>
      </Modal>

      <Modal
        isOpen={changeCustomerModal}
        onClose={() => setChangeCustomerModal(false)}
        className={"p-4 w-[300px]"}
        aria-labelledby="changeCustomerModal"
      >
        <div className="flex flex-row items-center justify-between  p-4">
          <h2 className="font-bold text-md text-black">Customers</h2>
          <Cancel
            className="text-gray-500 cursor-pointer"
            onClick={() => setChangeCustomerModal(false)}
          />
        </div>
        <div style={{ height: "200px", overflowY: "scroll" }}>
          <AllCustomer
            onClick={(e) => {
              setFormState({
                ...formState,
                customerId: e.id,
              });
              setSelectedCustomer(e);
              setChangeCustomerModal(false);
            }}
            customers={customers}
            editButton={false}
          />
        </div>
      </Modal>
    </>
  );
}

export default CreateDealModal;
