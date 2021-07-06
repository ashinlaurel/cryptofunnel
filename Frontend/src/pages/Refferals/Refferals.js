import React, { useState, useEffect } from "react";

import PageTitle from "../../components/Typography/PageTitle";

import UserProfile from "../../helper/auth/UserProfile";

import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "@windmill/react-ui";

import axios from "axios";
import { API } from "../../backend";

function Refferals() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [tempcode, setTempCode] = useState("");
  const [discount, setDiscount] = useState("0");
  const [refresh, setRefresh] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // pagination setup
  const resultsPerPage = 10;
  const [totalResults, setTotalResults] = useState(20);

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  const theModal = () => {
    return (
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>New Refferal Code</ModalHeader>
        <ModalBody>
          You can use the following refferal code to get a discount !!
          <div className="flex items-center justify-left my-2">
            <label>
              Code:
              <div className="bg-gray-200 my-2 flex font-bold py-2 px-32 text-lg  items-center justify-center rounded-lg">
                {/* <div>Code:</div> */}
                <div>{tempcode}</div>
              </div>
            </label>

            <div class=" relative ml-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label>
                  Discount(%)
                  <input
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Enter the discount %"
                    class="shadow-md z-20 my-2 appearance-none rounded border border-gray-400 border-b block pl-2 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  />
                </label>
              </form>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={handleCreateRefferal}>Accept</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button onClick={handleCreateRefferal} block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    );
  };

  // on page change, load new sliced data
  // here you would make another server request for new data

  useEffect(() => {
    // Using an IIFE
    (async function thegetter() {
      console.log("getter called");
      let payload = {
        pages: {
          page: page,
          limit: resultsPerPage,
        },
        filters: {
          creatorId: UserProfile.getId(),
          fromDate: fromDate,
          toDate: toDate,
        },
      };

      try {
        let response = await axios({
          url: `${API}/refferal/${UserProfile.getId()}/getbyuser`,
          method: "POST",
          data: payload,
        });
        console.log(response.data.out);
        setTotalResults(response.data.total);

        setData(response.data.out);
      } catch (error) {
        throw error;
      }
    })();
    // setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [page, refresh, fromDate, toDate]);

  const getNewCode = async () => {
    let id = UserProfile.getId();
    // console.log(id);
    const payload = { creatorId: id };
    const response = await axios.post(
      `${API}/refferal/${UserProfile.getId()}/getNewCode`,
      payload
    );
    console.log(response.data);
    setTempCode(response.data);
    setIsModalOpen(true);
  };

  const handleCreateRefferal = async () => {
    let id = UserProfile.getId();
    let name = UserProfile.getName();
    console.log(id);
    const payload = {
      creatorName: name,
      creatorId: id,
      refCode: tempcode,
      discount: discount,
    };
    const response = await axios.post(
      `${API}/refferal/${UserProfile.getId()}/createnew`,
      payload
    );
    console.log(response.data);
    setTempCode("");
    setDiscount("");
    setRefresh(!refresh);
    setIsModalOpen(false);
  };

  return (
    <>
      {theModal()}
      <PageTitle>Refferals </PageTitle>

      {/* <CTA /> */}

      <div className="mt-2 mb-4">
        <Button onClick={getNewCode} size="large">
          Get New Refferal Code +
        </Button>
      </div>

      <div className="mb-4">
        {/* -------------------------------------Row 1 ------------------------------------------------------------------------------- */}
        <div class="my-2 flex sm:flex-row flex-col items-start sm:items-center sm:justify-left h-full space-x-2 ">
          {/* ---------------------------Condition Drop Down-------------------------------------- */}
          <label className="text-gray-700 mb-1 text-sm">
            Created By:
            <div class="relative  ">
              <select
                class=" shadow-md h-full rounded border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none   focus:bg-white focus:border-gray-500"
                // value={condition}
                onChange={(e) => {
                  // setCondition(e.target.value);
                }}
              >
                {/* <option value="" disabled selected>
                  Created By
                </option> */}
                <option value="">All</option>
                <option selected value="">
                  Admin
                </option>
              </select>

              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </label>

          {/* -----------------Search Bar------------------------------------ */}
          <label className="text-gray-700 mb-1 text-sm">
            Search:
            <div class="block relative ">
              <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  viewBox="0 0 24 24"
                  class="h-4 w-4 fill-current text-gray-500"
                >
                  <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                </svg>
              </span>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setRefresh(!refresh);
                }}
              >
                <input
                  // value={searchquery}
                  // onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  class="shadow-md z-20 appearance-none rounded border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                />
              </form>
            </div>
          </label>

          <label className="text-gray-700 mb-1 text-sm">
            <span>From Date</span>
            <input
              class="shadow-md z-20 appearance-none rounded border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label className="text-gray-700 mb-1 text-sm">
            <span>To Date</span>
            <input
              class="shadow-md z-20 appearance-none rounded border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </label>

          {/* <div class="block relative xl:ml-64">
            <Button
              layout="outline"
              onClick={() => {
                // setIsDwnldModalOpen(true);
              }}
            >
              Download Database
            </Button>
          </div> */}
        </div>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              {/* <TableCell>Client</TableCell> */}
              <TableCell>Code</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created At</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                {/* <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={user.avatar}
                      alt="User image"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.job}
                      </p>
                    </div>
                  </div>
                </TableCell> */}
                <TableCell>
                  <span className="text-sm bg-gray-200 py-1 px-2 font-bold rounded-lg">
                    {user.refCode}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm ">{user.discount}%</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>Active</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </>
  );
}

export default Refferals;
