import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { signup, authenticate, isAutheticated } from "../../helper/auth/index";

import ImageLight from "../../assets/img/login-office.jpeg";
import ImageDark from "../../assets/img/login-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../../icons";
import { Label, Input, Button } from "@windmill/react-ui";

const AdminSignup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
    didRedirect: false,
  });

  const { name, email, password, error, success, didRedirect } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            success: false,
          });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
            didRedirect: true,
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      //need to change the link address
      return <Redirect to="/signin" />;
    }
  };

  const SignupForm = () => {
    return (
      <div className="flex items-center min-h-screen p-6 bg-gray-50 bg-gray-900 text-gray-200">
        <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-gray-900 border border-gray-700  rounded-lg shadow-xl dark:bg-gray-800">
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
                <Label className="mt-4">
                  <span>Name</span>
                  <Input
                    className="mt-1  bg-gray-900 border border-gray-700 p-2 rounded-md"
                    onChange={handleChange("name")}
                    type="text"
                    value={name}
                    placeholder="John Doe"
                  />
                </Label>
                <Label className="mt-4">
                  <span>Email</span>
                  <Input
                    className="mt-1  bg-gray-900 border border-gray-700 p-2 rounded-md"
                    onChange={handleChange("email")}
                    type="email"
                    value={email}
                    placeholder="john@doe.com"
                  />
                </Label>
                <Label className="mt-4">
                  <span>Password</span>
                  <Input
                    className="mt-1  bg-gray-900 border border-gray-700 p-2 rounded-md"
                    onChange={handleChange("password")}
                    type="password"
                    value={password}
                    placeholder="********"
                  />
                </Label>

                <Button className="mt-4 bg-green-300" block onClick={onSubmit}>
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
      {performRedirect()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </>
  );
};

export default AdminSignup;
