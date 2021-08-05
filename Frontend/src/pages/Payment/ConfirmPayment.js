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
  const [values, setValues] = useState({});
  const [paystatus, setpayStatus] = useState("loading");
  // console.log(id);

  const getCustomerInfo = async () => {
    // console.log(`getting customer info`, UserProfile.getId());
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

      console.log("Done", res.data.product);
      setValues(res.data.product);
      console.log(res.data.product.description);
      UserProfile.setRole(3);
      //   console.log("Hello");
      setpayStatus("success");
    } catch (error) {
      console.log(`error`, error);
      setpayStatus("error");
    }
  };

  useEffect(() => {
    getCustomerInfo();
  }, []);

  return (
    <div>
      {paystatus == "success" ? (
        <>
          <PageTitle>Payment Successful. </PageTitle>

          {/* <SectionTitle> </SectionTitle> */}
          <Card className="mb-8 shadow-md">
            <CardBody>
              <div className="flex flex-row flex-wrap ">
                <div className="w-1/2">
                  <p className="text-lg  text-gray-800 dark:text-gray-100">
                    <span className="font-semibold"> Payment Information</span>{" "}
                  </p>
                  <p className="text-md text-gray-700 dark:text-gray-100 py-2">
                    <span className="font-semibold">
                      {" "}
                      Product Name:
                      <span className="text-xl text-purple-400 mx-3">
                        {values.description}{" "}
                      </span>
                    </span>{" "}
                  </p>
                  <p className="text-md text-gray-700 dark:text-gray-100 py-2">
                    <span className="font-semibold">
                      {" "}
                      Price:
                      <span className="text-xl text-purple-400 mx-3">
                        {values.currency == "inr" ? <>₹</> : <>$</>}
                        {values.amount_subtotal / 100}
                      </span>
                    </span>
                  </p>
                  <p className="text-gray-100">
                    {" "}
                    We will contant you with you shortly with more information
                    regarding the amazing plan you just bought! For any queries
                    mail us at support@thecfsquad.com.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      ) : paystatus == "error" ? (
        <>
          <PageTitle>Sorry An Error Occured </PageTitle>

          {/* <SectionTitle> </SectionTitle> */}
          <Card className="mb-8 shadow-md">
            <CardBody>
              <div className="flex flex-row flex-wrap ">
                <div className="w-1/2">
                  <p className="text-lg  text-gray-800 dark:text-gray-100">
                    <span className="font-semibold"> Payment Information</span>{" "}
                  </p>

                  <p className="text-gray-100">
                    {" "}
                    Sorry an error occured with your payment confirmation!
                    Please contact support at support@thecfsquad.com.
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </>
      ) : (
        <>
          <PageTitle>Confirming Payment ... </PageTitle>

          {/* <SectionTitle> </SectionTitle> */}
        </>
      )}
    </div>
  );
}
