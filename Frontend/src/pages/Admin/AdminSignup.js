import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { signup, authenticate, isAutheticated } from "../../helper/auth/index";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";

import ImageLight from "../../assets/img/login-office.jpeg";
import ImageDark from "../../assets/img/login-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../../icons";
import { Label, Input, Button } from "@windmill/react-ui";
import { API } from "../../backend";
import axios from "axios";
import UserProfile from "../../helper/auth/UserProfile";

const AdminSignup = () => {
  const history = useHistory();
  //modal
  const [messageModal, setMessageModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    error: "",
    success: false,
    didRedirect: false,
  });

  const {
    name,
    email,
    password,
    confirmpassword,
    phone,
    address,
    city,
    state,
    country,
    zip,
    error,
    success,
    didRedirect,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const sendmail = async (data) => {
    const payload = { id: data.id, name: data.name, email: data.email };
    try {
      const response = await axios.post(`${API}/mail/verifyEmail`, payload);
      console.log("MAIL SEND", response.data);
    } catch (err) {
      console.log("verification mail error", err);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    if (
      values.name == "" ||
      values.email == "" ||
      values.password == "" ||
      values.confirmpassword == "" ||
      values.phone == ""
    ) {
      setModalMessage("Please fill all the details");
      setMessageModal(true);
      return;
    }
    if (values.password !== values.confirmpassword) {
      setModalMessage("Confirm password does not match password");
      setMessageModal(true);
      return;
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(values.email)) {
      setModalMessage("Email format is incorrect");
      setMessageModal(true);
      return;
    }
    if (!/[0-9]+/.test(values.phone)) {
      setModalMessage("Phone Number format is incorrect");
      setMessageModal(true);
      return;
    }

    console.log(values);
    // return;
    signup(values)
      .then((data) => {
        console.log("data", data);
        sendmail(data);
        if (data.err) {
          setModalMessage(data.err);
          setMessageModal(true);
          return;
        } else {
          setModalMessage("Account Created");
          AddToMailerList();
          setMessageModal(true);
          history.push("/signin");
          return;
          // setValues({
          //   ...values,
          //   name: "",
          //   email: "",
          //   password: "",
          //   phone: "",
          //   address: "",
          //   city: "",
          //   state: "",
          //   country: "",
          //   zip: "",
          //   error: "",
          //   success: true,
          //   didRedirect: true,
          // });
        }
      })
      .catch((err) => {
        console.log("Error in signup", JSON.parse(err));
      });
  };

  // const performRedirect = () => {
  //   if (didRedirect) {
  //     //need to change the link address
  //     return <Redirect to="/signin" />;
  //   }
  // };

  const AddToMailerList = async () => {
    const payload = { email: values.email, name: values.name };
    const response = await axios({
      url: `${API}/mail/AddToMailerList`,
      method: "POST",
      data: payload,
    });
  };

  const messageModalComponent = () => {
    return (
      <>
        <Modal isOpen={messageModal} onClose={() => setMessageModal(false)}>
          <ModalHeader>{modalMessage}</ModalHeader>
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

  const SignupForm = () => {
    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 bg-cool-gray-900 text-gray-200">
        {messageModalComponent()}
        <div className="flex-1 h-full max-w-6xl mx-auto overflow-hidden bg-cool-gray-900 border border-gray-700  rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row">
            <div className="h-32 md:h-auto md:w-1/2">
              <img
                aria-hidden="true"
                className="object-cover w-full h-full dark:hidden"
                src={ImageLight}
                alt="Office"
              />
              <img
                aria-hidden="true"
                className="hidden object-cover w-full h-full dark:block"
                src={ImageDark}
                alt="Office"
              />
            </div>
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-200 dark:text-gray-200">
                  Sign Up
                </h1>
                <div className="flex flex-row ">
                  <Label className="mt-4 mr-2 w-full">
                    <span className="text-gray-100 ">Name</span>
                    <Input
                      className="mt-1 bg-cool-gray-900 text-white border border-gray-700 placeholder-gray-700 p-2 rounded-md"
                      onChange={handleChange("name")}
                      type="text"
                      value={name}
                      placeholder="John Doe"
                    />
                  </Label>
                  <Label className="mt-4 w-full">
                    <span className="text-gray-100 ">Email</span>
                    <Input
                      className="mt-1 bg-cool-gray-900 text-white border border-gray-700 placeholder-gray-700 p-2 rounded-md"
                      onChange={handleChange("email")}
                      type="email"
                      value={email}
                      placeholder="john@doe.com"
                    />
                  </Label>
                </div>
                <div className="flex flex-row">
                  <Label className="mt-4 w-full mr-2">
                    <span className="text-gray-100 ">Password</span>
                    <Input
                      className="mt-1 bg-cool-gray-900 text-white border border-gray-700 placeholder-gray-700 p-2 rounded-md"
                      onChange={handleChange("password")}
                      type="password"
                      value={password}
                      placeholder="********"
                    />
                  </Label>
                  <Label className="mt-4 w-full">
                    <span className="text-gray-100 "> Confirm Password</span>
                    <Input
                      className="mt-1 bg-cool-gray-900 text-white border border-gray-700 placeholder-gray-700 p-2 rounded-md"
                      onChange={handleChange("confirmpassword")}
                      type="password"
                      value={confirmpassword}
                      placeholder="********"
                    />
                  </Label>
                </div>
                <Label className="mt-4 w-full">
                  <span className="text-gray-100 ">Phone</span>
                  <Input
                    className="mt-1 bg-cool-gray-900 text-white border border-gray-700 placeholder-gray-700 p-2 rounded-md"
                    onChange={handleChange("phone")}
                    type="text"
                    value={phone}
                  />
                </Label>
                <Label className="mt-4 w-full">
                  <span className="text-gray-100 ">Address</span>
                  <Input
                    className="mt-1 bg-cool-gray-900 text-white border border-gray-700 placeholder-gray-700 p-2 rounded-md"
                    onChange={handleChange("address")}
                    type="text"
                    value={address}
                  />
                </Label>
                <div className="flex flex-row">
                  <Label className="mt-4 w-full mr-2">
                    <span className="text-gray-100 ">City</span>
                    <Input
                      className="mt-1 bg-cool-gray-900 text-white border border-gray-700 placeholder-gray-700 p-2 rounded-md"
                      onChange={handleChange("city")}
                      type="text"
                      value={city}
                    />
                  </Label>
                  <Label className="mt-4 w-full">
                    <span className="text-gray-100 ">Zip</span>
                    <Input
                      className="mt-1 bg-cool-gray-900 text-white border border-gray-700 placeholder-gray-700 p-2 rounded-md"
                      onChange={handleChange("zip")}
                      type="text"
                      value={zip}
                    />
                  </Label>
                </div>
                <div className="flex flex-row">
                  <Label className="mt-4 w-full mr-2">
                    <span className="text-gray-100 ">State</span>
                    <Input
                      className="mt-1 bg-cool-gray-900 text-white border border-gray-700 placeholder-gray-700 p-2 rounded-md"
                      onChange={handleChange("state")}
                      type="text"
                      value={state}
                    />
                  </Label>
                  <Label className="mt-4 w-full">
                    <span className="text-gray-100 ">Country</span>
                    <Input
                      className="mt-1 bg-cool-gray-900 text-white border border-gray-700 placeholder-gray-700 p-2 rounded-md"
                      onChange={handleChange("country")}
                      type="text"
                      value={country}
                    />
                  </Label>
                </div>

                <Button className="mt-4  bg-green-300" block onClick={onSubmit}>
                  Sign up
                </Button>

                <hr className="my-8" />

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/signin"
                  >
                    Already have an account?
                  </Link>
                </p>
                {/* <p className="">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/forgot-password"
                  >
                    Forgot your password?
                  </Link>
                </p> */}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {SignupForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </>
  );
};

export default AdminSignup;
