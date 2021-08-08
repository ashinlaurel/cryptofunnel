import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { API } from "../../backend";
import UserPng from "../../images/user.png";
import moment from "moment";

import {
  Card,
  CardBody,
  Input,
  HelperText,
  Label,
  Button,
  Badge,
  Select,
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Pagination,
} from "@windmill/react-ui";

import PageTitle from "../../components/Typography/PageTitle";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import Axios from "axios";
import UserProfile from "../../helper/auth/UserProfile";

export default function InfluencerPage() {
  let history = useHistory();
  const { id } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [PasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newpass, setNewpass] = useState("");
  const [newpassconf, setNewpassconf] = useState("");
  const [passerror, setPasserror] = useState("");

  //   refferal code states
  const [codeDetails, setCodeDetails] = useState([]);

  //   paymenthistory states
  const [refresh, setRefresh] = useState(true);
  const [searchquery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  // pagination setup
  const resultsPerPage = 10;
  const [totalResults, setTotalResults] = useState(20);
  //modal
  const [messageModal, setMessageModal] = useState(false);

  // pagination change control
  function onPageChange(p) {
    setPage(p);
  }

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
    let data = { id: id, pass: newpass };
    try {
      let user = await Axios({
        url: `${API}/${id}/resetpassword`,
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
    // console.log(`getting customer info`, id);
    let data = { id: id };
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
  const codeGetter = async () => {
    // console.log("checker called");
    let payload = {
      pages: {
        page: 1,
        limit: resultsPerPage,
      },
      filters: {
        creatorId: id,
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

  useEffect(async () => {
    await getCustomerInfo();
    await codeGetter();
  }, [refresh]);

  const messageModalComponent = () => {
    return (
      <>
        <Modal isOpen={messageModal} onClose={() => setMessageModal(false)}>
          <ModalHeader>
            Click "Paid" to reset amount and mark as paid.
          </ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              className="w-full sm:w-auto"
              onClick={async () => {
                try {
                  let session = await Axios.post(
                    `${API}/user/${UserProfile.getId()}/markInfluencerPaid`,
                    { id: id }
                  );
                  setMessageModal(false);
                  setRefresh(!refresh);
                  console.log("success");
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              Paid!
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };

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
      {ResetPassModal()}
      {PassChangeModal()}
      {messageModalComponent()}
      <PageTitle>Profile Information {values.name}</PageTitle>

      {/* <SectionTitle> </SectionTitle> */}
      <Card className="mb-2 mt-24 shadow-md overflow-visible">
        <CardBody>
          <div className="w-full -mt-20 z-30 flex items-center justify-center ">
            <div className="flex flex-col items-center justify-center">
              <img className="h-32 w-32 " src={UserPng}></img>
              <div className="mt-2 text-2xl font-sans font-semibold text-white">
                {values.userId ? values.userId.name : ""}
              </div>
              <div className=" text-lg text-white">Influencer</div>
            </div>
          </div>
        </CardBody>
      </Card>

      <div className="flex flex-row flex-wrap xl:flex-nowrap xl:space-x-3  justify-left">
        <Card className="mb-4 w-full xl:w-1/3   shadow-md overflow-visible">
          <CardBody>
            <div className="">
              <p className="text-lg  text-gray-800 dark:text-gray-100">
                <span className="font-semibold"> Personal Information</span>{" "}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-1">
                <span className="font-semibold"> Name:</span>{" "}
                {values.userId ? values.userId.name : ""}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-1">
                <span className="font-semibold"> Email:</span> {values.email}
              </p>

              <p className="text-md text-gray-700 dark:text-gray-100 py-1">
                <span className="font-semibold"> Phone:</span> {values.phone}
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="mb-4 w-full xl:w-1/3  shadow-md overflow-visible">
          <CardBody>
            <div className=" ">
              <p className="text-lg  text-gray-800 dark:text-gray-100">
                <span className="font-semibold"> Contact Information</span>{" "}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-1">
                <span className="font-semibold"> Address:</span>{" "}
                {values.address}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-1">
                <span className="font-semibold"> City:</span> {values.city}
              </p>

              <p className="text-md text-gray-700 dark:text-gray-100 py-1">
                <span className="font-semibold"> State:</span> {values.state}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-1">
                <span className="font-semibold"> Country:</span>{" "}
                {values.country}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-1">
                <span className="font-semibold"> Zip:</span> {values.zip}
              </p>
            </div>
          </CardBody>
        </Card>
        <Card className="mb-4 w-full xl:w-1/3   shadow-md overflow-visible">
          <CardBody>
            <div className="">
              <p className="text-lg  text-gray-800 dark:text-gray-100">
                <span className="font-semibold"> Amount Payable</span>{" "}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-1">
                <span className="font-semibold"> Amount:</span>
                {" $ "}
                {values.userId ? values.userId.payable : ""}
              </p>
              <p className="text-md text-gray-700 dark:text-gray-100 py-1">
                <span className="font-semibold"> Last Paid:</span>{" "}
                {values.userId
                  ? moment(values.userId.lastpaid).format("DD-MM-YYYY")
                  : ""}
              </p>
              {UserProfile.getRole() == 1 ? (
                <div className="flex  items-center justify-center mt-10  ">
                  <Button
                    layout="outline"
                    className="w-3/4"
                    onClick={() => setMessageModal(true)}
                  >
                    Mark as Paid
                  </Button>
                </div>
              ) : null}
            </div>
          </CardBody>
        </Card>
      </div>

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

      {/* ------------------Payment History ----------------------------- */}
      <Card className="mb-8  shadow-md overflow-visible">
        <CardBody>
          <div className="text-lg  text-gray-800 dark:text-gray-100 mb-6">
            <span className="font-semibold">Refferal Usage History</span>{" "}
          </div>
          <div className="mb-4">
            {/* -------------------------------------Row 1 ------------------------------------------------------------------------------- */}
            <div class="my-2 flex sm:flex-row flex-col items-start sm:items-center sm:justify-left h-full xl:space-x-2 ">
              {/* ---------------------------Condition Drop Down-------------------------------------- */}
              <div class="relative mx-1 ">
                <select
                  class=" shadow-md h-full rounded border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-1 xl:py-2  xl: px-4  leading-tight focus:outline-none   focus:bg-white focus:border-gray-500"
                  // value={condition}
                  onChange={(e) => {
                    // setCondition(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Plan
                  </option>
                  <option value="">All</option>
                  <option value="">No Plan</option>
                  <option value="Good">Gold</option>
                  <option value="Bad">Silver</option>
                  <option value="Used">Bronze</option>
                </select>

                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  {/* <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg> */}
                </div>
              </div>

              {/* -----------------Search Bar------------------------------------ */}
              <div class="block relative xl:ml-64 mt-2 xl:mt-0 ml-1">
                <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                  <svg
                    viewBox="0 0 24 24"
                    class="h-4 w-4 fill-current text-gray-500"
                  >
                    <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
                  </svg>
                </span>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setRefresh(!refresh);
                  }}
                >
                  <input
                    value={searchquery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    class="shadow-md z-20 appearance-none rounded border border-gray-400 border-b block py-1 px-8  xl:pl-8 xl:pr-6 xl:py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
                  />
                </form>
              </div>

              {/* <div class="block relative xl:ml-64">
            <Button
              layout="outline"
              onClick={() => {
                // setIsDwnldModalOpen(true);
              }}
            >
              Download Database
            </Button>
          </div> */}
            </div>
          </div>

          <TableContainer>
            <Table>
              <TableHeader>
                <tr>
                  <TableCell>User</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Plan</TableCell>
                </tr>
              </TableHeader>
              <TableBody>
                {data.map((user, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Avatar
                          className="hidden mr-3 md:block"
                          src={UserPng}
                          alt="User image"
                        />
                        <div>
                          <p className="font-semibold">
                            {user.customerId.name}
                          </p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {user.customerId.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="font-semibold text-sm">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </TableCell>

                    <TableCell>
                      <Badge className="text-sm ">{user.paymentStatus}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-bold">
                        {parseInt(user.amountTotal) / 100}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm   ">{user.planName}</span>
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
        </CardBody>
      </Card>
      {/* <Card className="mb-8  shadow-md overflow-visible">
        <CardBody>
          <div className="flex flex-wrap flex-col md:flex-row space-y-2   ">
            <Link className="w-full" to={`/app/employee/${id}/update`}>
              <Button className=" w-full ">Update Info</Button>
            </Link>
            <Link className="w-full" to={`/app/employee/${id}/viewsalary`}>
              <Button className=" w-full">Payment History</Button>
            </Link>
            <Button
              className="w-full"
              onClick={() => setPasswordModalOpen(true)}
            >
              Reset Password
            </Button>

            <Button className="mx-3">Delete Customer</Button>
          </div>
        </CardBody>
      </Card> */}
    </div>
  );
}
