import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { useParams } from "react-router-dom";
import { Button } from "@windmill/react-ui";

import { API } from "../../backend";
import axios from "axios";
//  CHANGE EMIAL LINKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK
const VerifyEmail = () => {
  const { token } = useParams();
  // console.log("toekn", token);
  let history = useHistory();

  const verify = async () => {
    try {
      const payload = { token: token };
      const response = await axios.post(`${API}/mail/verifyUser`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(response.data);
      setMessage("Email verified successfully.");
    } catch (err) {
      console.log("VERIFY ERROR", err);
      setMessage("Sorry, an error occured.");
    }
  };
  useEffect(() => {
    // VERIFY EMAIL
    verify();
  }, []);
  const [message, setMessage] = useState("Loading...");

  const loginForm = () => {
    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 bg-cool-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-cool-gray-900  shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row text-4xl text-white text-center font-semibold">
            {message}
          </div>
          <Button
            className="w-full sm:w-auto m-5"
            onClick={() => {
              history.push("/signin");
            }}
          >
            Login
          </Button>
        </div>
      </div>
    );
  };

  return <>{loginForm()}</>;
};

export default VerifyEmail;
