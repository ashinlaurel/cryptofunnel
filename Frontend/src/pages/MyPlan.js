import React, { useEffect, useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import { Card, CardBody, Button } from "@windmill/react-ui";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";

import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import Payment from "./Payment/Payment";
import UserProfile from "../helper/auth/UserProfile";
import Axios from "axios";
import { API } from "../backend";

function Cards() {
  const [plan, setPlan] = useState(0);
  const [deletePlanModal, setdeletePlanModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [modalmessage, setModalmessage] = useState("");

  const getCustomerInfo = async () => {
    // console.log(`getting customer info`, UserProfile.getId());
    let data = { id: UserProfile.getId() };
    // console.log(API);
    try {
      let res = await Axios({
        url: `${API}/userinfo`,
        method: "POST",
        data: data,
      });
      // calc age

      //   setValues({

      //   });

      console.log("Done", res.data[0].userId.plan);
      setPlan(res.data[0].userId.plan);
      // setValues(res.data[0]);
      //   console.log("Hello");
    } catch (error) {
      console.log(`error`, error);
    }
  };

  const handleDelete = async () => {
    try {
      let user = await Axios.post(
        `${API}/payment/${UserProfile.getId()}/deletePlan`,
        {
          id: UserProfile.getId(),
        }
      );
      setdeletePlanModal(false);
      setModalmessage("Successfully deleted your plan");
      setMessageModal(true);
      setPlan(0);
      UserProfile.setRole(2);
    } catch (error) {
      setModalmessage("Sorry and error occured");
      setMessageModal(true);
      console.log(error);
    }
  };

  const deletePlanModalComponent = () => {
    return (
      <>
        <Modal
          isOpen={deletePlanModal}
          onClose={() => setdeletePlanModal(false)}
        >
          <ModalHeader>You are perpemanently deleting your plan!</ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              className="w-full sm:w-auto"
              onClick={() => handleDelete(false)}
            >
              Okay!
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };
  const messageModalComponent = () => {
    return (
      <>
        <Modal isOpen={messageModal} onClose={() => setMessageModal(false)}>
          <ModalHeader>{modalmessage}</ModalHeader>
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
  useEffect(() => {
    getCustomerInfo();
  }, []);

  const GetSubURL = async () => {
    try {
      let session = await Axios.post(
        `${API}/payment/${UserProfile.getId()}/getMangeSubscriptionURL`,
        {
          id: UserProfile.getId(),
        }
      );
      console.log(session.data.url);
      window.location.assign(session.data.url);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {deletePlanModalComponent()}
      {messageModalComponent()}
      {UserProfile.getRole() == 2 ? (
        <div className="">
          {/* <PageTitle>You Haven't Purchased Any Plans</PageTitle> */}
          <Payment />
        </div>
      ) : (
        <>
          <PageTitle>Your Plan</PageTitle>
          <Card className="mb-5 text-gray-100  rounded-lg">
            <CardBody>
              <div className="flex items-center">
                <div>
                  {plan && plan > 0 ? (
                    <>
                      <p className="mb-4 font-semibold">Congratulations!</p>
                      <p>
                        You have purchased our{" "}
                        <span className="font-semibold">
                          {plan == 1 ? (
                            <>Crypto 101</>
                          ) : plan == 2 ? (
                            <>Crypto 201</>
                          ) : plan == 3 ? (
                            <>Signals and Analysis</>
                          ) : null}{" "}
                        </span>
                        plan. We will contact you with more details shortly.
                      </p>
                    </>
                  ) : null}
                  {plan == 3 ? (
                    <Button
                      className="my-4 "
                      layout="outline"
                      onClick={GetSubURL}
                    >
                      Manage Subscription
                    </Button>
                  ) : (
                    <Button
                      className="my-4 "
                      layout="outline"
                      onClick={() => setdeletePlanModal(true)}
                    >
                      Delete Plan
                    </Button>
                  )}
                  <div></div>
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
      )}
    </>
  );
}

export default Cards;
