import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { useParams } from "react-router-dom";
import { Button, Input, HelperText, Label } from "@windmill/react-ui";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";

import { API } from "../../backend";
import axios from "axios";
//  CHANGE EMIAL LINKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
const ForgotPasswordReset = () => {
  const { token } = useParams();
  const [newpass, setNewpass] = useState("");
  const [newpassconf, setNewpassconf] = useState("");
  const [passerror, setPasserror] = useState("");
  const [messageModal, setMessageModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [resetModal, setResetModal] = useState(false);
  const [issuccModal, setIssuccModal] = useState(false);
  // console.log("toekn", token);
  let history = useHistory();

  const resetPass = async () => {
    try {
      const payload = { pass: newpass };
      const response = await axios.post(
        `${API}/mail/resetpasswordbytoken`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("suss", response.data);
      // setModalMessage("Email verified successfully.");
      setIssuccModal(true);
    } catch (err) {
      console.log("VERIFY ERROR", err);
      setModalMessage("Sorry, an error occured.");
      setMessageModal(true);
    }
  };
  useEffect(() => {
    // VERIFY EMAIL
    // resetPass();
  }, []);
  const [message, setMessage] = useState("Loading...");

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

  const resetSuccessfullModal = () => {
    return (
      <>
        <Modal isOpen={issuccModal} onClose={() => setIssuccModal(false)}>
          <ModalHeader>Password Reset Successfully</ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <Button
              className="w-full sm:w-auto"
              onClick={() => {
                history.push("/signin");
              }}
            >
              Login to continue
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };

  const loginForm = () => {
    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 bg-gray-900">
        {messageModalComponent()}
        {resetSuccessfullModal()}
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-gray-900  shadow-xl dark:bg-gray-800">
          <div className=" overflow-y-auto md:flex-row  text-white  font-semibold">
            <div className="text-xl">Reset Password</div>
            <div>
              <div className="px-4 py-3 mb-8  rounded-lg shadow-md dark:bg-gray-800">
                <label>
                  <span>New Password</span>
                  <input
                    className="w-full px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded"
                    type="password"
                    value={newpass}
                    onChange={(e) => setNewpass(e.target.value)}
                    placeholder="New Password"
                  />
                </label>{" "}
                <label>
                  <span>Confirm Password</span>
                  <input
                    className="w-full px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded"
                    type="password"
                    placeholder="Confirm Password"
                    resetPasswordvalue={newpassconf}
                    onChange={(e) => {
                      setNewpassconf(e.target.value);
                      if (e.target.value != newpass)
                        setPasserror("Passwords do not match!");
                      else setPasserror("");
                    }}
                  />
                </label>
              </div>
            </div>
            <div>
              <Button
                className=" m-2 w-full sm:w-auto"
                onClick={() => {
                  if (newpass !== newpassconf) {
                    setModalMessage("Passwords do not match");
                    setMessageModal(true);
                    return;
                  }
                  resetPass();
                }}
              >
                Change Password
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <>{loginForm()}</>;
};

export default ForgotPasswordReset;
