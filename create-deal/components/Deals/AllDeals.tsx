import { EditOutlined, LandscapeRounded } from "@mui/icons-material";
import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

export default function AllDeals() {
  return (
    <Table className="mt-4">
      <Thead>
        <Tr className="border-b">
          <Th className="text-center p-2 ">
            <LandscapeRounded className="text-gray-500 text-left ml-auto" />
          </Th>
          <Th className="p-2">
            <p className="text-gray-500 text-left text-md font-thin">Name</p>
          </Th>
          <Th className="p-2">
            <p className="text-gray-500 text-left text-md font-thin">Area</p>
          </Th>
          <Th className="p-2">
            <p className="text-gray-500 text-left text-md font-thin">
              Appointment Date
            </p>
          </Th>
          <Th className="p-2">
            <p className="text-gray-500 text-left text-md font-thin">Price</p>
          </Th>
          <Th className="p-2">
            <p className="text-gray-500 text-left text-md font-thin">Status</p>
          </Th>
          <Th className="p-2">
            <p className="text-gray-500 text-left text-md font-thin">Edit</p>
          </Th>
        </Tr>
      </Thead>
      <Tbody className="mt-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Tr key={i} className="border-b">
            <Td className="text-center p-2 py-4 ">
              <img
                src={`https://picsum.photos/id/${i + 1}/512`}
                alt="profile picture"
                className="w-[25px] rounded-full mx-auto"
              />
            </Td>
            <Td className="p-2 py-4">
              <p className="text-gray-900 text-left text-md font-medium">
                John Doe {i + 1}
              </p>
            </Td>
            <Td className="p-2 py-4">
              <p className="text-gray-900 text-left text-md font-medium">
                123 Main St, Anytown USA 12345
              </p>
            </Td>
            <Td className="p-2 py-4">
              <p className="text-gray-900 text-left text-md font-medium">
                Mar 12, 2023
              </p>
            </Td>
            <Td className="p-2 py-4">
              <p className="text-gray-900 text-left text-md font-medium">
                ${i * 1000 + 1000}
              </p>
            </Td>
            <Td className="p-2 py-4">
              <p
                className={`text-${
                  i % 2 === 0 ? "green" : "red"
                }-700 p-2 text-left text-md font-medium text-center bg-${
                  i % 2 === 0 ? "green" : "red"
                }-200 rounded-full w-[80px]`}
              >
                {i % 2 === 0 ? "Sold" : "Available"}
              </p>
            </Td>
            <Td className="p-2 py-4">
              <p className="text-gray-900 text-left text-md font-medium">
                <button aria-label="Edit">
                  <EditOutlined />
                </button>
                {/* <a href="#" className="text-blue-500 hover:underline">
                  Edit
                </a> */}
              </p>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
