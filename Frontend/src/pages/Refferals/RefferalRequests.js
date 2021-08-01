import React, { useState, useEffect } from "react";

import PageTitle from "../../components/Typography/PageTitle";
import UserProfile from "../../helper/auth/UserProfile";
import UserPng from "../../images/user.png";

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
  Button,
  Pagination,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@windmill/react-ui";

import axios from "axios";
import { API } from "../../backend";

function RefferalRequests() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [tempcode, setTempCode] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [searchquery, setSearchQuery] = useState("");
  const [messageModal, setMessageModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  //referal modal
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [isRefferalModalOpen, setIsRefferalModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);

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

  const AcceptInfluencer = async (id) => {
    try {
      const payload = { id: id };
      const response = await axios.post(
        `${API}/user/${UserProfile.getId()}/acceptInfluencer`,
        payload
      );
      console.log(response.data);

      setModalMessage("Influencer Status Accepted");
      setMessageModal(true);
      setRefresh(!refresh);
    } catch (err) {
      setModalMessage("Sorry, an error occured");
      setMessageModal(true);
    }
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
          searchquery: searchquery,
          plan: "",
          InfulencerRequest: true,
          role: "",
          fromDate: fromDate,
          toDate: toDate,
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
  }, [page, searchquery, refresh, fromDate, toDate]);

  const messageModalComponent = () => {
    return (
      <>
        <Modal isOpen={messageModal} onClose={() => setMessageModal(false)}>
          <ModalHeader>{modalMessage}</ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              className="w-full sm:w-auto"
              onClick={() => setMessageModal(false)}
            >
              Okay!
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };

  const handleCreateRefferal = async () => {
    try {
      let id = selectedId;
      let name = selectedName;
      console.log(id);
      const payload = {
        creatorName: name,
        creatorId: id,
        refCode: code,
        discount: discount,
      };
      const response = await axios.post(
        `${API}/refferal/${UserProfile.getId()}/createnew`,
        payload
      );
      console.log(response.data);
      setTempCode("");
      setDiscount("");
      setSelectedName("");
      setSelectedId("");
      setRefresh(!refresh);
      setIsModalOpen(false);
      setModalMessage("Referal Code Added");
      setMessageModal(true);
    } catch (err) {
      setModalMessage("Sorry,Error Occured");
      setMessageModal(true);
    }
  };

  const setReferalModal = () => {
    return (
      <Modal
        isOpen={isRefferalModalOpen}
        onClose={() => setIsRefferalModalOpen(false)}
      >
        <ModalHeader>New Refferal Code</ModalHeader>
        <ModalBody>
          You can use the following refferal code to get a discount !!
          <div className="flex items-center justify-left my-2">
            <div class=" relative ml-2">
              <label>
                Code
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter the discount %"
                  class="shadow-md z-20 appearance-none rounded border border-gray-600 border-b block pl-8 pr-6 py-2 placeholder-gray-100 w-full bg-cool-gray-900 text-sm  text-gray-100  fne-none"
                />
              </label>
            </div>

            <div class=" relative ml-2">
              <label>
                Discount(%)
                <input
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  placeholder="Enter the discount %"
                  class="shadow-md z-20 appearance-none rounded border border-gray-600 border-b block pl-8 pr-6 py-2 placeholder-gray-100 w-full bg-cool-gray-900 text-sm  text-gray-100  fne-none"
                />
              </label>
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
            <Button
              layout="outline"
              onClick={() => setIsRefferalModalOpen(false)}
            >
              Cancel
            </Button>
          </div>
          <div className="hidden sm:block">
            <Button onClick={handleCreateRefferal}>Accept</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button
              block
              size="large"
              layout="outline"
              onClick={() => setIsRefferalModalOpen(false)}
            >
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

  return (
    <>
      <PageTitle>Influencer Requests</PageTitle>
      {messageModalComponent()}
      {setReferalModal()}

      {/* <CTA /> */}

      <div className="font-bold text-gray-700 text-xl">Users</div>

      <div className="mb-4">
        {/* -------------------------------------Row 1 ------------------------------------------------------------------------------- */}
        <div class="my-2 flex sm:flex-row flex-col items-start sm:items-center sm:justify-left h-full xl:space-x-2  ">
          {/* ---------------------------Condition Drop Down-------------------------------------- */}
          <div class="block relative  mt-2 xl:mt-0 ml-1 ">
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
                class="shadow-md z-20 appearance-none rounded border border-gray-600 border-b block pl-8 pr-6 py-2 placeholder-gray-100 w-full bg-cool-gray-900 text-sm  text-gray-100  fne-none"
              />
            </form>
          </div>

          {/* <div class="relative mx-1 ">
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
          </div> */}

          {/* -----------------Search Bar------------------------------------ */}

          <label className="text-gray-700 -mt-3 mb-2 text-sm">
            <span>From Date</span>
            <input
              class="shadow-md z-20 appearance-none rounded border border-gray-600 border-b block pl-8 pr-6 py-2 placeholder-gray-100 w-full bg-cool-gray-900 text-sm  text-gray-100  fne-none"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </label>
          <label className="text-gray-700 -mt-3  mb-1 text-sm">
            <span>To Date</span>
            <input
              class="shadow-md z-20 appearance-none rounded border border-gray-600 border-b block pl-8 pr-6 py-2 placeholder-gray-100 w-full bg-cool-gray-900 text-sm  text-gray-100  fne-none"
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
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assign Referal</TableCell>
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
                  {user.role == 4 ? (
                    <span className="text-sm font-semibold text-primary-800 ">
                      Accepted
                    </span>
                  ) : (
                    <Button
                      className="w-full sm:w-auto"
                      onClick={() => {
                        AcceptInfluencer(user._id);
                      }}
                    >
                      Accept
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    className="w-full sm:w-auto"
                    onClick={() => {
                      setSelectedId(user._id);
                      setSelectedName(user.name);
                      setIsRefferalModalOpen(true);
                    }}
                  >
                    Assign Code
                  </Button>
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

export default RefferalRequests;
