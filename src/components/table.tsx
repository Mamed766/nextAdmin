"use client";
import { useRequest, useRequestMutation } from "@/services/http/axiosFetcher";
import { imageData } from "@/static/mockdb";
import React, { useEffect, useState } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Modal from "./Modal";
import EditModal from "./EditModal";
import PostModal from "./PostModal";
import { mutate } from "swr";
import { CardData } from "@/types/type";
export default function Table() {
  const [openRowIndex, setOpenRowIndex] = useState<number | null | boolean>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filterOption, setFilterOption] = useState("A-Z");
  const [searchTerm, setSearchTerm] = useState("");

  const handleIsOpen = (index: number) => {
    setOpenRowIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleEdit = (card: any) => {
    setSelectedCard(card);
    setIsEditModalOpen(true);
    setOpenRowIndex(false);
  };

  const handleView = (card: any) => {
    setSelectedCard(card);
    setIsModalOpen(true);
    setOpenRowIndex(false);
  };

  const { data, isLoading, error } = useRequest<CardData[]>("data", {
    method: "GET",
    module: "imageApi",
  });

  const { trigger: deleteProject } = useRequestMutation("dataWithId", {
    method: "DELETE",
    module: "imageApi",
  });

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleDelete = async (card: any) => {
    try {
      await deleteProject({
        dynamicValue: card.id,
      });
      mutate("data");
      setOpenRowIndex(false);
    } catch (error) {
      console.error("error", error);
    }
  };

  const filteredData = React.useMemo(() => {
    if (!data) return [];
    let sortedData = [...data];

    if (searchTerm) {
      sortedData = sortedData.filter((card) =>
        card.projectName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterOption === "A-Z") {
      sortedData = sortedData.sort((a, b) =>
        (a?.projectName ?? "").localeCompare(b?.projectName ?? "")
      );
    } else if (filterOption === "Newest") {
      sortedData = sortedData.sort(
        (a, b) =>
          new Date(b?.assignedDate ?? "").getTime() -
          new Date(a?.assignedDate ?? "").getTime()
      );
    }

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return sortedData.slice(startIndex, endIndex);
  }, [data, searchTerm, filterOption, currentPage, perPage]);

  useEffect(() => {
    if (data) {
      setTotalPages(Math.ceil(data.length / perPage));
    }
  }, [data, perPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterOption]);

  return (
    <div className="max-w-[1440px]  mx-auto h-screen">
      <div className=" flex flex-col gap-5 ">
        <div className="flex bg-white rounded  p-2 justify-between mt-5">
          <div className="flex gap-2">
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="bg-[#5C67F7] hover:opacity-80 duration-300 w-[7rem] p-2 rounded cursor-pointer text-[12px] text-white"
            >
              + New Project
            </button>
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="border w-[7rem] outline-none text-gray-400 border-gray-300 rounded"
            >
              <option value="A-Z">A-Z</option>
              <option value="Newest">Newest</option>
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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
          <table className="table-auto border-separate border-spacing-4 w-full">
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
              {filteredData &&
                filteredData.map((card: any, index: number) => {
                  return (
                    <tr key={index} className="">
                      <td className="flex items-center gap-1">
                        <img
                          src={card.projectImage}
                          className="w-8 h-8 rounded-full object-cover"
                          alt=""
                        />
                        <div>
                          <h3 className="text-[14px]">{card.projectName}</h3>
                          <p className="text-[11px] text-gray-500">
                            Total{" "}
                            <span className=" text-black font-bold">18</span>{" "}
                            tasks completed
                          </p>
                        </div>
                      </td>
                      <td>
                        <p className="text-[12px] text-gray-400 w-[300px]">
                          {card.projectDesc}
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
                      <td className="text-[12px]">{card.assignedDate}</td>
                      <td className="text-[12px]">{card.dueDate}</td>
                      <td className="pr-2">
                        <div
                          className={`h-1 max-w-[100%] rounded-full bg-[#5C67F7]`}
                          style={{ width: `${card.status}%` }}
                        ></div>
                        <h2 className="text-[12px]">
                          <span className="text-[#5C67F7]">{card.status}%</span>{" "}
                          Completed
                        </h2>
                      </td>
                      <td>
                        <button
                          className={`text-[12px]
                            ${
                              card.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-400"
                                : card.priority === "High"
                                ? "bg-blue-100 text-blue-400"
                                : card.priority === "Low"
                                ? "bg-red-100 text-red-500"
                                : "bg-gray-500"
                            } 
                             rounded  p-1`}
                        >
                          {card.priority}
                        </button>
                      </td>

                      <td className="relative">
                        <button
                          onClick={() => handleIsOpen(index)}
                          className="bg-[#F2F2F3] rounded p-1"
                        >
                          <BsThreeDotsVertical />
                        </button>
                        {openRowIndex === index && (
                          <div className="border z-40 absolute w-[10rem] right-[4rem] bg-white ">
                            <div
                              onClick={() => handleView(card)}
                              className="flex gap-2 p-2 items-center cursor-pointer text-blue-600 hover:bg-gray-300"
                            >
                              <FaEye /> <p>View</p>
                            </div>
                            <div
                              onClick={() => handleEdit(card)}
                              className="flex gap-2 p-2 items-center cursor-pointer hover:bg-gray-300 text-orange-400"
                            >
                              <FaEdit /> <p>Edit</p>
                            </div>
                            <div
                              onClick={() => handleDelete(card)}
                              className="flex gap-2 p-2 items-center text-red-600 cursor-pointer hover:bg-gray-300"
                            >
                              <FaTrash /> <p>Delete</p>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <div className="flex  justify-end gap-2 items-center mt-4">
          <button
            onClick={handlePreviousPage}
            className={`${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            } bg-gray-300 p-2 rounded`}
            disabled={currentPage === 1}
          >
            <BsChevronLeft />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className={`${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
            } bg-gray-300 p-2 rounded`}
            disabled={currentPage === totalPages}
          >
            <BsChevronRight />
          </button>
        </div>
      </div>
      {isModalOpen && (
        <Modal card={selectedCard} onClose={() => setIsModalOpen(false)} />
      )}

      {isEditModalOpen && (
        <EditModal
          card={selectedCard}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}

      {isPostModalOpen && (
        <PostModal onClose={() => setIsPostModalOpen(false)} />
      )}
    </div>
  );
}
