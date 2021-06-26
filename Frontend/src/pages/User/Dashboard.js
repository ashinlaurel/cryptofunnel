import React, { useState, useEffect } from "react";
import tw from "twin.macro";

import PageTitle from "../../components/Typography/PageTitle";
import SectionTitle from "../../components/Typography/SectionTitle";
import DashBoardPlans from "../../components/pricing/DashboardPlans";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";

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
          <Card className="mb-5 text-gray-900 border rounded-lg">
            <CardBody>
              <div className="flex items-center">
                <div>
                  <p className="mb-4 font-semibold">Verify Your Email!</p>
                  <p>
                    Please verify your email in order to continue with any
                    purchases!
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
        </>
      ) : null}
      {/* ------Plans Ad */}

      <div className="text-xl xl:text-2xl text-gray-700 font-semibold">
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
            name: "Personal",
            price: "$17.99",
            duration: "Monthly",
            mainFeature: "For Individuals",
            features: [
              "3 Lorem Ipsum",
              "7 Lorem Ipsum",
              "12 Lorem Ipsum",
              "Basic Assistance",
            ],
          },
          {
            name: "Teams",
            price: "$37.99",
            duration: "Monthly",
            mainFeature: "For Small Businesses",
            features: [
              "3 Lorem Ipsum",
              "15 Lorem Ipsum",
              "22 Lorem Ipsum",
              "Priority Assistance",
            ],
          },
          {
            name: "Pro",
            price: "$57.99",
            duration: "Monthly",
            mainFeature: "For Large Companies",
            features: [
              "3 Lorem Ipsum",
              "27 Lorem Ipsum",
              "37 Lorem Ipsum",
              "Personal Assistance",
            ],
            featured: true,
          },
        ]}
      />
    </>
  );
}

export default Dashboard;
