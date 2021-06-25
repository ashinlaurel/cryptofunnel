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
  Card,
  CardBody,
} from "@windmill/react-ui";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../../utils/demo/chartsData";
import { API } from "../../backend";
import axios from "axios";

function Dashboard() {
  // const [page, setPage] = useState(1);
  // const [data, setData] = useState([]);
  // const [tempcode, setTempCode] = useState("");
  // const [refresh, setRefresh] = useState(true);

  // // pagination setup
  // const resultsPerPage = 10;
  // const [totalResults, setTotalResults] = useState(20);

  // // pagination change control
  // function onPageChange(p) {
  //   setPage(p);
  // }

  // const [isModalOpen, setIsModalOpen] = useState(false);

  // function openModal() {
  //   setIsModalOpen(true);
  // }

  // function closeModal() {
  //   setIsModalOpen(false);
  // }

  // const theModal = () => {
  //   return (
  //     <Modal isOpen={isModalOpen} onClose={closeModal}>

  //       <ModalHeader>New Refferal Code</ModalHeader>
  //       <ModalBody>
  //         You can use the following refferal code to get a discount !!
  //         <div className="bg-gray-200 my-4 flex font-bold p-2 text-lg mx-40 items-center justify-center rounded-lg">
  //           {/* <div>Code:</div> */}
  //           <div>{tempcode}</div>
  //         </div>
  //       </ModalBody>
  //       <ModalFooter>
  //         {/* I don't like this approach. Consider passing a prop to ModalFooter
  //          * that if present, would duplicate the buttons in a way similar to this.
  //          * Or, maybe find some way to pass something like size="large md:regular"
  //          * to Button
  //          */}
  //         <div className="hidden sm:block">
  //           <Button layout="outline" onClick={closeModal}>
  //             Cancel
  //           </Button>
  //         </div>
  //         <div className="hidden sm:block">
  //           <Button>Accept</Button>
  //         </div>
  //         <div className="block w-full sm:hidden">
  //           <Button block size="large" layout="outline" onClick={closeModal}>
  //             Cancel
  //           </Button>
  //         </div>
  //         <div className="block w-full sm:hidden">
  //           <Button block size="large">
  //             Accept
  //           </Button>
  //         </div>
  //       </ModalFooter>
  //     </Modal>
  //   );
  // };

  // on page change, load new sliced data
  // here you would make another server request for new data

  // useEffect(() => {
  //   // Using an IIFE
  //   (async function thegetter() {
  //     console.log("getter called");
  //     let payload = {
  //       pages: {
  //         page: page,
  //         limit: resultsPerPage,
  //       },
  //       filters: {
  //         creatorId: UserProfile.getId(),
  //       },
  //     };

  //     try {
  //       let response = await axios({
  //         url: `${API}/refferal/${UserProfile.getId()}/getbyuser`,
  //         method: "POST",
  //         data: payload,
  //       });
  //       console.log(response.data.out);
  //       setTotalResults(response.data.total);

  //       setData(response.data.out);
  //     } catch (error) {
  //       throw error;
  //     }
  //   })();
  //   // setData(response.slice((page - 1) * resultsPerPage, page * resultsPerPage));
  // }, [page, refresh]);

  return (
    <>
      {/* {theModal()} */}
      <PageTitle>Dashboard</PageTitle>

      {/* <CTA /> */}

      {/* <!-- Cards --> */}

      <Card colored className="text-white bg-red-600">
        <CardBody>
          <p className="mb-4 font-semibold">Verify Your Email!</p>
          <p>Please your email id in order to continue with any purchases!</p>
        </CardBody>
      </Card>
    </>
  );
}

export default Dashboard;
