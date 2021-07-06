import React, { useState, useEffect } from "react";

import PageTitle from "../components/Typography/PageTitle";
import UserProfile from "../helper/auth/UserProfile";
import UserPng from "../images/user.png";

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
} from "@windmill/react-ui";

import axios from "axios";
import { API } from "../backend";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [tempcode, setTempCode] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [searchquery, setSearchQuery] = useState("");

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
          searchquery: searchquery,
          plan: "",
          role: "",
        },
      };

      try {
        let response = await axios({
          url: `${API}/user/${UserProfile.getId()}/getAllUsers`,
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
  }, [page, searchquery, refresh]);

  return (
    <>
      <PageTitle>Admin Dashboard</PageTitle>

      {/* <CTA /> */}

      <div className="font-bold text-gray-700 text-xl">Users</div>

      <div className="mb-4">
        {/* -------------------------------------Row 1 ------------------------------------------------------------------------------- */}
        <div class="my-2 flex sm:flex-row flex-col items-start sm:items-center sm:justify-left h-full xl:space-x-2 ">
          {/* ---------------------------Condition Drop Down-------------------------------------- */}
          <div class="relative mx-1 ">
            <select
              class=" shadow-md h-full rounded border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-1 xl:py-2  xl: px-4  leading-tight focus:outline-none   focus:bg-white focus:border-gray-500"
              // value={condition}
              onChange={(e) => {
                // setCondition(e.target.value);
              }}
            >
              <option value="" disabled selected>
                Plan
              </option>
              <option value="">All</option>
              <option value="">No Plan</option>
              <option value="Good">Gold</option>
              <option value="Bad">Silver</option>
              <option value="Used">Bronze</option>
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

          {/* -----------------Search Bar------------------------------------ */}
          <div class="block relative xl:ml-64 mt-2 xl:mt-0 ml-1">
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
                value={searchquery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                class="shadow-md z-20 appearance-none rounded border border-gray-400 border-b block py-1 px-8  xl:pl-8 xl:pr-6 xl:py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
              />
            </form>
          </div>

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
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Plan</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {data.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={UserPng}
                      alt="User image"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.job}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <span className="text-sm ">{user.email}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm  font-bold ">Gold</span>
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

export default Dashboard;
