import React, { useState, useEffect } from "react";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";

import UserProfile from "../../helper/auth/UserProfile";

import { Button, Card, CardBody } from "@windmill/react-ui";

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../../utils/demo/chartsData";
import { API } from "../../backend";
import axios from "axios";

const handleVerifyEmail = async () => {
  let id = UserProfile.getId();
  let name = UserProfile.getName();
  let email = UserProfile.getEmail();

  const payload = { id: id, name: name, email: email };
  const response = await axios.post(
    `${API}/mail/${UserProfile.getId()}/verifyEmail`,
    payload
  );
  console.log(response.data);
};
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

      <Card colored className="mb-5 text-gray-900 border rounded-lg">
        <CardBody>
          <div className="flex items-center">
            <div>
              <p className="mb-4 font-semibold">Verify Your Email!</p>
              <p>
                Please your email id in order to continue with any purchases!
                <span
                  onClick={handleVerifyEmail}
                  className="ml-1 underline text-blue-600 cursor-pointer"
                >
                  Click Here{" "}
                </span>{" "}
                to verify your email.
              </p>
            </div>

            {/* <div className="ml-10">
              <Button layout="outline" onClick={handleVerifyEmail} className="">
                Verify
              </Button>
            </div> */}
          </div>
        </CardBody>
      </Card>

      {/* ------Plans Ad */}

      <SectionTitle>Buy Plans</SectionTitle>
    </>
  );
}

export default Dashboard;
