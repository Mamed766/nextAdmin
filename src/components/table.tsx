"use client";
import { imageData } from "@/static/mockdb";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

export default function Table() {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="max-w-[1440px]  mx-auto h-screen">
      <div className=" flex flex-col gap-5 ">
        <div className="flex bg-white rounded  p-2 justify-between mt-5">
          <div className="flex gap-2">
            <button className="bg-[#5C67F7] hover:opacity-80 duration-300 w-[7rem] p-2 rounded cursor-pointer text-[12px] text-white">
              + New Project
            </button>
            <select className="border w-[7rem] outline-none text-gray-400 border-gray-300 rounded">
              <option value="">A-Z</option>
              <option value="">Newest</option>
            </select>
          </div>
          <div className="flex">
            {imageData &&
              imageData.map((data, index) => {
                return (
                  <img
                    className="w-7 h-7 rounded-full border-2 border-white -ml-2 hover:scale-110 duration-300"
                    key={index}
                    src={data.image}
                  />
                );
              })}
          </div>
          <div className="flex gap-2">
            <input
              className="border w-[10rem] rounded text-[12px] border-gray-400 p-1 outline-none"
              placeholder="Search Project"
              type="text"
            />
            <button className="bg-gray-100 rounded p-1 text-[12px]">
              Search
            </button>
          </div>
        </div>
        <div className="bg-white rounded p-2">
          <table className="table-auto w-full">
            <thead className=" ">
              <tr className="text-[13px] ">
                <th className="text-left w-1/4">Project Name</th>
                <th className="text-left w-1/4">Description</th>
                <th className="text-left w-1/8">Team</th>
                <th className="text-left w-1/8">Asigned Date</th>
                <th className="text-left w-1/8">Due Date</th>
                <th className="text-left w-1/8">Status</th>
                <th className="text-left w-1/8">Priority</th>
                <th className="text-left w-1/8">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              <tr>
                <td className="flex items-center gap-1">
                  <img
                    src="https://spruko.com/demo/xintra/dist/assets/images/company-logos/1.png"
                    className="w-8 h-8"
                    alt=""
                  />
                  <div>
                    <h3 className="text-[14px]">Development of Enhanced</h3>
                    <p className="text-[11px] text-gray-500">
                      Total <span className=" text-black font-bold">18</span>{" "}
                      tasks completed
                    </p>
                  </div>
                </td>
                <td>
                  <p className="text-[12px] text-gray-400 w-[300px]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Culpa, quaerat?
                  </p>
                </td>
                <td className="flex">
                  <img
                    src="https://spruko.com/demo/xintra/dist/assets/images/faces/1.jpg"
                    className="w-7 h-7 rounded-full border-2 border-white -ml-2 hover:scale-110 duration-300"
                    alt=""
                  />
                  <img
                    src="https://spruko.com/demo/xintra/dist/assets/images/faces/1.jpg"
                    className="w-7 h-7 rounded-full border-2 border-white -ml-2 hover:scale-110 duration-300"
                    alt=""
                  />
                </td>
                <td className="text-[12px]">15,Jun 2024</td>
                <td className="text-[12px]">30,Aug 2024,Jun 2024</td>
                <td className="pr-2">
                  <div className="w-full h-1 rounded-full bg-[#5C67F7]"></div>
                  <h2 className="text-[12px]">
                    <span className="text-[#5C67F7]">65%</span> Completed
                  </h2>
                </td>
                <td>
                  <button className="text-[12px] bg-yellow-400 text-yellow-200 rounded  p-1">
                    Medium
                  </button>
                </td>

                <td className="relative">
                  <button
                    onClick={handleIsOpen}
                    className="bg-[#F2F2F3] rounded p-1"
                  >
                    <BsThreeDotsVertical />
                  </button>
                  {isOpen && (
                    <div className="border absolute w-[10rem] right-[4rem] bg-white ">
                      <div className="flex gap-2 p-2 items-center cursor-pointer text-blue-600 hover:bg-gray-300">
                        <FaEye /> <p>View</p>
                      </div>
                      <div className="flex gap-2 p-2 items-center cursor-pointer hover:bg-gray-300 text-orange-400">
                        <FaEdit /> <p>Edit</p>
                      </div>
                      <div className="flex gap-2 p-2 items-center text-red-600 cursor-pointer hover:bg-gray-300">
                        <FaTrash /> <p>Delete</p>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
