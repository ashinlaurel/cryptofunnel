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

const VerifyEmail = () => {
  let history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    didRedirect: false,
  });

  const loginForm = () => {
    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-gray-900 border border-gray-700 rounded-lg shadow-xl dark:bg-gray-800">
          <div className="flex flex-col overflow-y-auto md:flex-row text-5xl text-white text-center font-semibold">
            Verifying Email
          </div>
        </div>
      </div>
    );
  };

  return <>{loginForm()}</>;
};

export default VerifyEmail;
