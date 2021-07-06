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

export default function FailedPayment() {
  let history = useHistory();

  // console.log(id);

  return (
    <div>
      <PageTitle>Payment Failed. </PageTitle>

      {/* <SectionTitle> </SectionTitle> */}
      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="flex flex-row flex-wrap ">
            <div className="w-1/2">
              <p className="text-lg  text-gray-800 dark:text-gray-100">
                <span className="font-semibold">
                  {" "}
                  Sorry, Your Payment failed.
                </span>{" "}
              </p>
              <Button
                className="mt-5"
                layout="outline"
                onClick={() => {
                  // setIsDwnldModalOpen(true);
                  history.push("/app/myplan");
                }}
              >
                Try Again
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
