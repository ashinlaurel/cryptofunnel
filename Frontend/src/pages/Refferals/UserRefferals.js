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
} from "@windmill/react-ui";

import axios from "axios";
import { API } from "../../backend";

function UserRefferals() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [tempcode, setTempCode] = useState("");
  const [discount, setDiscount] = useState("10");
  const [refresh, setRefresh] = useState(true);
  const [codeExists, setCodeExists] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  console.log("ROLE", UserProfile.getRole());

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
          <div className="flex items-center justify-center my-2">
            <div className="bg-gray-200 my-2 flex font-bold py-2 px-32 text-lg  items-center justify-center rounded-lg">
              {/* <div>Code:</div> */}
              <div>{tempcode}</div>
            </div>
            {/* <div class=" relative ml-2">
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
            </div> */}
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
    // (async function thegetter() {
    //   console.log("getter called");
    //   let payload = {
    //     pages: {
    //       page: page,
    //       limit: resultsPerPage,
    //     },
    //     filters: {
    //       creatorId: UserProfile.getId(),
    //     },
    //   };

    //   try {
    //     let response = await axios({
    //       url: `${API}/refferal/${UserProfile.getId()}/getbyuser`,
    //       method: "POST",
    //       data: payload,
    //     });
    //     console.log(response.data.out);
    //     setTotalResults(response.data.total);

    //     setData(response.data.out);
    //   } catch (error) {
    //     throw error;
    //   }
    // })();
    (async function thedocchecker() {
      console.log("checker called");
      let payload = {
        pages: {
          page: 1,
          limit: resultsPerPage,
        },
        filters: {
          creatorId: UserProfile.getId(),
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
        if (response.data.out.length != 0) {
          setCodeExists(true);
        }
        // console.log(codeExists);
      } catch (error) {
        throw error;
      }
    })();
    // setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  }, [refresh]);

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

  const applyInfluencer = async () => {
    let id = UserProfile.getId();
    // console.log(id);
    try {
      const response = await axios.post(
        `${API}/user/${UserProfile.getId()}/requestInfluencer`
      );
      console.log(response.data);
      setModalMessage("Request Send!");
      setMessageModal(true);
    } catch (err) {
      setModalMessage("Sorry, an error occured!");
      setMessageModal(true);
    }
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

  return (
    <>
      {theModal()}
      {messageModalComponent()}
      <PageTitle>Refferals</PageTitle>

      {/* <CTA /> */}

      {
        codeExists ? (
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
            {/* <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter> */}
          </TableContainer>
        ) : null
        // <div className="mt-2 mb-4">
        //   <Button onClick={getNewCode} size="large">
        //     Get New Refferal Code +
        //   </Button>
        // </div>
      }
      <div className=" w-1/2 mt-6 mb-4 text-gray-900">
        <p>
          You can get your own referal codes only with an Influencer account.
          Click the button to apply and reach out to us at
          support@thecfsquad.com with your resume to get your Influencer
          account.
        </p>
        <Button onClick={applyInfluencer} size="small" className="mt-5">
          Apply for Influencer
        </Button>
      </div>
    </>
  );
}

export default UserRefferals;
