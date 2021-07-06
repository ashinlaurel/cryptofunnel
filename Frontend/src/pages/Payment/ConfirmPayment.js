import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory, useLocation } from "react-router-dom";
import { API } from "../../backend";
import {
  Card,
  CardBody,
  Input,
  HelperText,
  Label,
  Button,
  Badge,
  Select,
} from "@windmill/react-ui";
import PageTitle from "../../components/Typography/PageTitle";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import Axios from "axios";
import UserProfile from "../../helper/auth/UserProfile";

export default function ConfirmPayment() {
  let history = useHistory();
  const { status, sessionId, refCode, refStatus } = useParams();

  // console.log(id);

  const getCustomerInfo = async () => {
    console.log(`getting customer info`, UserProfile.getId());
    console.log("PROPS", status, sessionId, refCode, refStatus);
    let payload = {
      id: UserProfile.getId(),
      sessionId: sessionId,
      refCode: refCode,
      refStatus: refStatus,
    };
    // console.log(API);
    try {
      let res = await Axios({
        url: `${API}/payment/${UserProfile.getId()}/confirmpayment`,
        method: "POST",
        data: payload,
      });

      console.log("Done", res.data);
      //   console.log("Hello");
    } catch (error) {
      console.log(`error`, error);
    }
  };

  useEffect(() => {
    getCustomerInfo();
  }, []);

  return (
    <div>
      <PageTitle>Confirm Payment </PageTitle>

      {/* <SectionTitle> </SectionTitle> */}
      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="flex flex-row flex-wrap ">
            <div className="w-1/2">
              <p className="text-lg  text-gray-800 dark:text-gray-100">
                <span className="font-semibold"> Personal Information</span>{" "}
              </p>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
