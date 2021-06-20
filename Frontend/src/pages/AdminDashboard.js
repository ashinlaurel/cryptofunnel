import React, { useState, useEffect } from "react";

import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import ChartCard from "../components/Chart/ChartCard";
import { Doughnut, Line } from "react-chartjs-2";
import ChartLegend from "../components/Chart/ChartLegend";
import PageTitle from "../components/Typography/PageTitle";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import response from "../utils/demo/tableData";
import UserProfile from "../helper/auth/UserProfile";

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

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../utils/demo/chartsData";
import { API } from "../backend";
import axios from "axios";

function Dashboard() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [tempcode, setTempCode] = useState("");
  const [refresh, setRefresh] = useState(true);

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
          <div className="bg-gray-200 my-4 flex font-bold p-2 text-lg mx-40 items-center justify-center rounded-lg">
            {/* <div>Code:</div> */}
            <div>{tempcode}</div>
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
            <Button>Accept</Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
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
  }, [page, refresh]);

  const handleCreateRefferal = async () => {
    let id = UserProfile.getId();
    // console.log(id);
    const payload = { creatorId: id };
    const response = await axios.post(`${API}/refferal/createnew`, payload);
    console.log(response.data);
    setTempCode(response.data);
    setIsModalOpen(true);
    setRefresh(!refresh);
  };

  return (
    <>
      {theModal()}
      <PageTitle>Admin Dashboard</PageTitle>

      {/* <CTA /> */}

      <div className="font-bold text-gray-700 text-xl">Refferals</div>

      <div className="mt-2 mb-4">
        <Button onClick={handleCreateRefferal} size="large">
          Get New Refferal Code +
        </Button>
      </div>

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              {/* <TableCell>Client</TableCell> */}
              <TableCell>Code</TableCell>
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

export default Dashboard;
