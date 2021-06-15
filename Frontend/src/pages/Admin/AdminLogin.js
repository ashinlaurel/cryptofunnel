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

const AdminLogin = () => {
  let history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        localStorage.setItem("jwt", JSON.stringify(data));
        console.log("data", data.token);
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

  const loginForm = () => {
    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
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
                <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                  Login
                </h1>
                <Label className="mt-4">
                  <span>Email</span>
                  <Input
                    className="mt-1"
                    onChange={handleChange("email")}
                    type="email"
                    value={email}
                    placeholder="john@doe.com"
                  />
                </Label>
                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1"
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
                    to="/forgot-password"
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
