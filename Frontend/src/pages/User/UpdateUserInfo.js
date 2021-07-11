import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
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

export default function UpdateUserInfo() {
  let history = useHistory();
  const { id } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [PasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newpass, setNewpass] = useState("");
  const [newpassconf, setNewpassconf] = useState("");
  const [passerror, setPasserror] = useState("");

  // console.log(id);
  const [values, setValues] = useState({
    //both
    employeeID: "",
    username: "",
    email: "",
    // password: "",
    // confpassword: "",
    //customer
    customerName: "",
    // accountId: [],
    //account
    // accountName: "",
    // unitId: [],
    // //------> customerName from above
    address: "",
    district: "",
    state: "",
    locationType: "",
    pincode: "",
    GSTnumber: "",
    contactPerson: "",
    contactNo: "",
    altContact: "",
    WhatsappNo: "",
    role: 0,
    parentCustomerId: "",
    show_password: "",
  });
  const [err, setErr] = useState({
    email: "",
    name: "",
    // accountName: "",
    enc_password: "",
    confpassword: "",
  });

  const changePassword = async () => {
    let data = { id: UserProfile.getId(), pass: newpass };
    try {
      let user = await Axios({
        url: `${API}/${UserProfile.getId()}/resetpassword`,
        method: "POST",
        data: data,
      });
      setIsReviewModalOpen(true);
      setPasswordModalOpen(false);
      console.log("Done", user);
    } catch (error) {
      throw error;
    }
  };

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

      console.log("Done", res.data);
      setValues(res.data[0]);
      //   console.log("Hello");
    } catch (error) {
      console.log(`error`, error);
    }
  };

  useEffect(() => {
    getCustomerInfo();
  }, []);

  const ResetPassModal = () => {
    return (
      <>
        <Modal
          isOpen={PasswordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
        >
          <ModalHeader>Change Password for {values.username}!</ModalHeader>
          <ModalBody>
            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
              <Label>
                <span>New Password</span>
                <Input
                  className="mt-5"
                  type="password"
                  value={newpass}
                  onChange={(e) => setNewpass(e.target.value)}
                  placeholder="New Password"
                />
              </Label>{" "}
              <Label>
                <span>Confirm Password</span>
                <Input
                  className="my-5"
                  type="password"
                  placeholder="Confirm Password"
                  value={newpassconf}
                  onChange={(e) => {
                    setNewpassconf(e.target.value);
                    if (e.target.value != newpass)
                      setPasserror("Passwords do not match!");
                    else setPasserror("");
                  }}
                />
              </Label>
              <HelperText valid={false}>{passerror}</HelperText>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="w-full sm:w-auto"
              onClick={() => {
                if (newpass !== newpassconf) return;
                changePassword();
              }}
            >
              Change Password
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };

  const PassChangeModal = () => {
    return (
      <>
        <Modal
          isOpen={isReviewModalOpen}
          onClose={() => setIsReviewModalOpen(false)}
        >
          <ModalHeader>Password Updated Successfully!</ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              className="w-full sm:w-auto"
              onClick={() => setIsReviewModalOpen(false)}
            >
              Okay!
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };

  return (
    <div>
      <PageTitle>Profile Information {values.employeeName}</PageTitle>

      {/* <SectionTitle> </SectionTitle> */}
      <Card className="mb-8 shadow-md">
        <CardBody>
          <div className="flex flex-row flex-wrap ">
            <div className="w-1/2">
              <p className="text-lg  text-gray-800 dark:text-gray-100">
                <span className="font-semibold"> Personal Information</span>{" "}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-2">
                <span className="font-semibold"> Name:</span>{" "}
                {UserProfile.getName()}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-2">
                <span className="font-semibold"> Email:</span> {values.email}
              </p>

              <p className="text-md text-gray-700 dark:text-gray-100 py-2">
                <span className="font-semibold"> Phone:</span> {values.phone}
              </p>
            </div>
            <div className=" w-1/2">
              <p className="text-lg  text-gray-800 dark:text-gray-100">
                <span className="font-semibold"> Contact Information</span>{" "}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-2">
                <span className="font-semibold"> Address:</span>{" "}
                {values.address}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-2">
                <span className="font-semibold"> City:</span> {values.city}
              </p>

              <p className="text-md text-gray-700 dark:text-gray-100 py-2">
                <span className="font-semibold"> State:</span> {values.state}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-2">
                <span className="font-semibold"> Country:</span>{" "}
                {values.country}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-2">
                <span className="font-semibold"> Zip:</span> {values.zip}
              </p>
            </div>
          </div>
          <div className="my-10">
            <Link to={`/app/employee/${id}/update`}>
              <Button className="mr-3">Update Info</Button>
            </Link>

            {/* <Button className="mx-3">Delete Customer</Button> */}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
