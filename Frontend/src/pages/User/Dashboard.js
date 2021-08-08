import React, { useState, useEffect } from "react";
import tw from "twin.macro";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import DashBoardPlans from "../../components/pricing/DashboardPlans";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import Axios from "axios";

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
import { Subheading } from "../../components/misc/Headings";

function Dashboard() {
  const HighlightedText = tw.span`text-green-300`;
  //   refferal code states
  const [codeDetails, setCodeDetails] = useState([]);
  const [messageModal, setMessageModal] = useState(false);
  const [isEmailModal, setIsEmailModal] = useState(false);
  const handleVerifyEmail = async () => {
    let id = UserProfile.getId();
    let name = UserProfile.getName();
    let email = UserProfile.getEmail();
    try {
      const payload = { id: id, name: name, email: email };
      const response = await axios.post(
        `${API}/mail/${UserProfile.getId()}/verifyEmail`,
        payload
      );
      console.log(response.data);
      setIsEmailModal(true);
    } catch (err) {
      console.log("ERROR", err);
    }
  };
  const resultsPerPage = 10;
  useEffect(() => {
    codeGetter();
  }, []);
  const codeGetter = async () => {
    // console.log(UserProfile.getRole(0));
    // if (UserProfile.getRole !== 4) return;
    // console.log("checker called");
    let payload = {
      pages: {
        page: 1,
        limit: resultsPerPage,
      },
      filters: {
        creatorId: UserProfile.getId(),
        fromDate: "",
        toDate: "",
      },
    };

    try {
      let response = await Axios({
        url: `${API}/refferal/${UserProfile.getId()}/getbyuser`,
        method: "POST",
        data: payload,
      });
      // console.log(response);
      // console.log("the code getting", response.data.out[0]);
      setCodeDetails(response.data.out[0]);

      //   setTotalResults(response.data.total);
      //   setData(response.data.out);
      //   if (response.data.out.length != 0) {
      //     setCodeExists(true);
      //   }
      // console.log(codeExists);
    } catch (error) {
      throw error;
    }
  };

  const messageModalComponent = () => {
    return (
      <>
        <Modal isOpen={messageModal} onClose={() => setMessageModal(false)}>
          <ModalHeader>
            Please verify your email in order to continue with any purchases!
          </ModalHeader>
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

  const EmailSentModal = () => {
    return (
      <>
        <Modal isOpen={isEmailModal} onClose={() => setIsEmailModal(false)}>
          <ModalHeader>
            Email sent to your account for verification!
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              className="w-full sm:w-auto"
              onClick={() => setIsEmailModal(false)}
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
      {/* {theModal()} */}
      <PageTitle>Dashboard</PageTitle>
      {messageModalComponent()}
      {EmailSentModal()}

      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      {UserProfile.getRole() == 0 ? (
        <>
          <Card className="mb-5 text-gray-100  rounded-lg">
            <CardBody>
              <div className="flex items-center ">
                <div>
                  <p className="mb-4 font-semibold">Verify Your Email!</p>
                  <p>
                    Please verify your email in order to continue with any
                    purchases! A verification email is already sent to your
                    email address. In case you missed it,
                    <span
                      onClick={handleVerifyEmail}
                      className="ml-1 underline text-blue-600 cursor-pointer"
                    >
                      Click Here{" "}
                    </span>{" "}
                    to resend verification email.
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
        </>
      ) : null}
      {/* ------Plans Ad */}
      {UserProfile.getRole() == 3 ? (
        <>
          <Card className="mb-5 text-gray-100  rounded-lg">
            <CardBody>
              <div className="flex items-center"></div>
              Go to MyPlan to see more details about your plan. For any queries
              contact us at support@thecfsquad.com
            </CardBody>
          </Card>
        </>
      ) : UserProfile.getRole() == 4 ? (
        <>
          <Card className="mb-5 text-gray-100  rounded-lg">
            <CardBody>
              <div className="flex items-center"></div>
              You have been acceptede as an influencer.
            </CardBody>
          </Card>
          <Card className="mb-8  shadow-md overflow-visible">
            <CardBody>
              <div className="">
                <p className="text-lg  text-gray-800 dark:text-gray-100">
                  <span className="font-semibold"> Assigned Refferal Code</span>{" "}
                </p>
                <p className="text-md text-gray-700 dark:text-gray-100 pt-2">
                  <span className="font-semibold"> Code:</span>{" "}
                  {codeDetails ? codeDetails.refCode : null}
                </p>
                <p className="text-md text-gray-700 dark:text-gray-100 ">
                  <span className="font-semibold"> Discount:</span>{" "}
                  {codeDetails ? codeDetails.discount : null}%
                </p>
                <p className="text-md text-gray-700 dark:text-gray-100 ">
                  <span className="font-semibold"> Referral Link:</span>{" "}
                  <span className="bg-purple-900 rounded-lg px-2 py-1">
                    {codeDetails
                      ? `https://thecfsquad.com/app/myplan/${codeDetails.refCode}`
                      : null}
                  </span>
                </p>
              </div>
            </CardBody>
          </Card>
        </>
      ) : (
        <>
          <div className="text-xl xl:text-2xl text-gray-100 font-semibold">
            Buy a Plan
          </div>
          <DashBoardPlans
            subheading={<Subheading>Pricing</Subheading>}
            setmodal={setMessageModal}
            heading={
              <>
                Reasonable & Flexible <HighlightedText>Plans.</HighlightedText>
              </>
            }
            plans={[
              {
                name: "Crypto 101",
                price: "$175",
                duration: "Lifetime",
                mainFeature: "The Right Place To Start!",
                features: [
                  "Beginners TA -live classes",
                  "Priority Support",
                  "Live Doubt Clearence",
                  "Trading Bots",
                ],
                featured: true,
              },
              {
                name: "Crypto 201",
                price: "$250",
                duration: "Lifetime",
                mainFeature: "For The Crypto Nerds",
                features: [
                  "Advanced TA -live classes",
                  "Priority Support",
                  "Live Doubt Clearence",
                  "Trading Bots",
                  "5 Live Trading Sessions",
                ],
                featured: true,
              },
              {
                name: "Signals & Analysis",
                price: "$100",
                duration: "Monthly",
                mainFeature: "We'll Work For You",
                features: [
                  "Daily 3 trading Signals",
                  "Spot/Margin/Future Based Calls",
                  "Report & Newsletter",
                  "weekly Live Trading Sessions",
                ],
                featured: true,
              },
            ]}
          />
        </>
      )}
    </>
  );
}

export default Dashboard;
