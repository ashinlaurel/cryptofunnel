import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAutheticated } from "../../helper/auth/index";

import ImageLight from "../../assets/img/login-office.jpeg";
import ImageDark from "../../assets/img/login-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../../icons";
import { Label, Input, Button } from "@windmill/react-ui";
import { useHistory } from "react-router-dom";
import UserProfile from "../../helper/auth/UserProfile";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { API } from "../../backend";
import axios from "axios";

const AdminLogin = () => {
  let history = useHistory();
  const [ispassmodal, setIspassmodal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const [messageModal, setMessageModal] = useState(false);
  const [modalmessage, setModalmessage] = useState("");
  const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        // console.log("DATA", data);
        if (data === undefined) {
          history.push("/app");
          return;
        }
        if (data.error) {
          setModalmessage(data.error);
          setMessageModal(true);
          return;
        }
        localStorage.setItem("jwt", JSON.stringify(data));
        // console.log("data", data.token);
        UserProfile.setToken(data.token);
        history.push("/app");
        // return <Redirect to="/app" />;
        // });
      })
      .catch((err) => {
        console.log("signin request failed", err);
      });
  };

  const performRedirect = () => {
    if (didRedirect) {
      //need to change the link address
      return <Redirect to="/app" />;
    }
  };

  const handleResetPassword = async () => {
    const payload = { email: resetEmail };
    try {
      const response = await axios.post(`${API}/mail/resetpassemail`, payload);
      console.log(response.data);
    } catch (err) {
      console.log("RESETPASS err", err);
    }
  };

  const RsestPassModal = () => {
    return (
      <>
        <Modal isOpen={ispassmodal} onClose={() => setIspassmodal(false)}>
          <ModalHeader>Recover Password</ModalHeader>
          <ModalBody>
            <div>
              Click Recover password to send email with password recovery email.
              <Label className="mt-4 ">
                <span className="text-gray-500">Email</span>
                <Input
                  className="mt-1 bg-gray-900 text-white border border-gray-700 p-2 rounded-md"
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                  }}
                  type="email"
                  value={resetEmail}
                  placeholder="john@doe.com"
                />
              </Label>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="w-full sm:w-auto"
              onClick={() => {
                handleResetPassword();
                setIspassmodal(false);
                // history.push("/signin");
              }}
            >
              Recover Password
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

  const loginForm = () => {
    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 bg-gray-900">
        {RsestPassModal()}
        {messageModalComponent()}
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-gray-900 border border-gray-700 rounded-lg shadow-xl dark:bg-gray-800">
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
            <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2 ">
              <div className="w-full">
                <h1 className="mb-4 text-xl font-semibold text-gray-200">
                  Login
                </h1>
                <Label className="mt-4 ">
                  <span className="text-gray-500">Email</span>
                  <Input
                    className="mt-1 bg-gray-900 text-white border border-gray-700 p-2 rounded-md"
                    onChange={handleChange("email")}
                    type="email"
                    value={email}
                    placeholder="john@doe.com"
                  />
                </Label>
                <Label className="mt-4 ">
                  <span className="text-gray-500">Password</span>
                  <Input
                    className="mt-1 bg-gray-900 border text-white border-gray-700 p-2 rounded-md"
                    onChange={handleChange("password")}
                    type="password"
                    value={password}
                    placeholder="********"
                  />
                </Label>

                <Button className="mt-4" block onClick={onSubmit}>
                  Log in
                </Button>

                <hr className="my-8" />

                <p className="mt-4">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    // to="/forgot-password"
                    onClick={() => setIspassmodal(true)}
                  >
                    Forgot your password?
                  </Link>
                </p>
                <p className="mt-1">
                  <Link
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                    to="/signup"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {loginForm()}
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </>
  );
};

export default AdminLogin;
