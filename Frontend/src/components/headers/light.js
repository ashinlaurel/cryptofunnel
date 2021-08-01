import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { Link, useLocation } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

import logo from "../../images/crypto_logo.png";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import UserProfile from "../../helper/auth/UserProfile.js";

import ImageLight from "../../assets/img/login-office.jpeg";
import ImageDark from "../../assets/img/login-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../../icons";
import { Label, Input, Button } from "@windmill/react-ui";
import { useHistory } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { API } from "../../backend";
import axios from "axios";
import {
  signin,
  signup,
  authenticate,
  isAutheticated,
} from "../../helper/auth/index";

const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
 
  z-50
`;

export const NavLinks = tw.div`inline-block`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0 text-gray-100
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-green-500 hocus:text-green-500
`;

export const PrimaryLink = tw(NavLink)`
  lg:mx-0
  px-8 py-3 rounded bg-green-500 text-gray-100
  hocus:bg-green-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavLink)`
  ${tw`flex items-center font-black text-gray-100 border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between `;
export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-gray-500 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg bg-cool-gray-900  text-gray-900 `}
  ${NavLinks} {
    ${tw`flex flex-col items-center `}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center
`;

export default ({
  roundedHeaderButton = false,
  logoLink,
  links,
  className,
  collapseBreakpointClass = "lg",
}) => {
  /*
   * This header component accepts an optionals "links" prop that specifies the links to render in the navbar.
   * This links props should be an array of "NavLinks" components which is exported from this file.
   * Each "NavLinks" component can contain any amount of "NavLink" component, also exported from this file.
   * This allows this Header to be multi column.
   * So If you pass only a single item in the array with only one NavLinks component as root, you will get 2 column header.
   * Left part will be LogoLink, and the right part will be the the NavLinks component you
   * supplied.
   * Similarly if you pass 2 items in the links array, then you will get 3 columns, the left will be "LogoLink", the center will be the first "NavLinks" component in the array and the right will be the second "NavLinks" component in the links array.
   * You can also choose to directly modify the links here by not passing any links from the parent component and
   * changing the defaultLinks variable below below.
   * If you manipulate links here, all the styling on the links is already done for you. If you pass links yourself though, you are responsible for styling the links or use the helper styled components that are defined here (NavLink)
   */

  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss =
    collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <Link to="/">
      <LogoLink>
        <img src={logo} alt="logo" />
        CryptoFunnel
      </LogoLink>
    </Link>
  );
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // NAV LINKS HANDLE

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      let elem = document.getElementById(location.hash.slice(1));
      console.log(location.hash.slice(1));
      if (location.hash.slice(1) == "signup") setIsSignUpModal(true);
      else if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
  }, [location]);
  //LOGIN <-----------------------------------------------------------------------------------
  let history = useHistory();
  const [ispassmodal, setIspassmodal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    phone: "",
    didRedirect: false,
  });

  const {
    name,
    email,
    password,
    error,
    loading,
    didRedirect,
    confirmpassword,
    phone,
  } = values;
  const [messageModal, setMessageModal] = useState(false);
  const [modalmessage, setModalmessage] = useState("");
  // const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isSignUpModal, setIsSignUpModal] = useState(false);

  const handleKeyPress = (event) => {
    // look for the `Enter` keyCode
    if (event.keyCode === 13 || event.which === 13) {
      LoginHandle();
    }
  };
  const LogInModal = () => {
    return (
      <>
        <Modal
          className="bg-cool-gray-900 px-12 py-10 rounded-lg  "
          isOpen={isLoginModal}
          onClose={() => setIsLoginModal(false)}
        >
          <ModalHeader className="md:mx-32 mx-5 text-white">
            <h1 className="mb-4 text-xl font-semibold text-gray-200">
              {" "}
              Login To Your Account{" "}
            </h1>
          </ModalHeader>
          <ModalBody>
            <div className="w-full">
              <Label className="mt-4 ">
                <span className="text-gray-500">Email</span>
                <Input
                  className="mt-1 placeholder-gray-700 bg-cool-gray-900 text-white border border-gray-700 p-2 rounded-md"
                  onChange={handleChange("email")}
                  type="email"
                  value={email}
                  onKeyPress={handleKeyPress}
                  placeholder="john@doe.com"
                />
              </Label>
              {email != "" && !re.test(email) ? (
                <span className="text-red-500">Please enter valid email</span>
              ) : null}

              <Label className=" mt-4 mb-6 ">
                <span className="text-gray-500">Password</span>
                <Input
                  className="mt-1 placeholder-gray-700 bg-cool-gray-900 border text-white border-gray-700 p-2 rounded-md"
                  onChange={handleChange("password")}
                  type="password"
                  value={password}
                  onKeyPress={handleKeyPress}
                  placeholder="********"
                />
              </Label>

              <span
                className=" bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded cursor-pointer"
                block
                onClick={() => {
                  LoginHandle();
                }}
              >
                Log in
              </span>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
                  // to="/forgot-password"
                  onClick={() => setIspassmodal(true)}
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <div
                  className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
                  onClick={() => {
                    setIsLoginModal(false);
                    setIsSignUpModal(true);
                  }}
                >
                  Create account
                </div>
              </p>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </>
    );
  };

  const LoginHandle = () => {
    setValues({ ...values, error: false, loading: true });

    if (!re.test(email)) {
      setModalmessage("Please provide valid email.");
      setMessageModal(true);
      return;
    }
    if (password == "") {
      setModalmessage("Please provide a password.");
      setMessageModal(true);
      return;
    }

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

  const messageModalComponent = () => {
    return (
      <>
        <Modal
          isOpen={messageModal}
          className="bg-cool-gray-900 px-20 py-5 rounded-lg "
          onClose={() => setMessageModal(false)}
        >
          <ModalHeader></ModalHeader>
          <ModalBody className=" text-lg text-white">
            <span className="text-white">{modalmessage}</span>
          </ModalBody>
          <ModalFooter>
            <span
              className=" bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded cursor-pointer"
              onClick={() => setMessageModal(false)}
            >
              Okay!
            </span>
          </ModalFooter>
        </Modal>
      </>
    );
  };
  // SIGNUp <-------------------------------------------------------------------------------------------------------

  const AddToMailerList = async () => {
    const payload = { email: values.email, name: values.name };
    const response = await axios({
      url: `${API}/mail/AddToMailerList`,
      method: "POST",
      data: payload,
    });
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

  const signUpHandle = () => {
    setValues({ ...values, error: false });
    if (
      values.name == "" ||
      values.email == "" ||
      values.password == "" ||
      values.confirmpassword == ""
      // values.phone == ""
    ) {
      setModalmessage("Please fill all the details");
      setMessageModal(true);
      return;
    }
    if (values.password !== values.confirmpassword) {
      setModalmessage("Confirm password does not match password");
      setMessageModal(true);
      return;
    }

    if (!re.test(values.email)) {
      setModalmessage("Email format is incorrect");
      setMessageModal(true);
      return;
    }
    if (!/[0-9]+/.test(values.phone)) {
      setModalmessage("Phone Number format is incorrect");
      setMessageModal(true);
      return;
    }

    // console.log(values);
    // return;
    signup(values)
      .then((data) => {
        console.log("data", data);
        sendmail(data);
        if (data.err) {
          setModalmessage(data.err);
          setMessageModal(true);
          return;
        } else {
          setIsLoginModal(true);
          setModalmessage("Account Created, Please sign in to continue");
          AddToMailerList();
          setMessageModal(true);
        }
      })
      .catch((err) => {
        setModalmessage("Sorry, An error occured");
        setMessageModal(true);
        console.log("Error in signup", JSON.parse(err));
      });
  };
  const SignUpModal = () => {
    return (
      <>
        <Modal
          className="bg-cool-gray-900 px-12 py-10 rounded-lg "
          isOpen={isSignUpModal}
          onClose={() => setIsSignUpModal(false)}
        >
          <ModalHeader className="md:mx-32 mx-24 text-white">
            <h1 className="mb-4 text-xl font-semibold text-gray-200">
              {" "}
              Create Your New Account{" "}
            </h1>
          </ModalHeader>
          <ModalBody>
            <div className="w-full">
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
                  {email != "" && !re.test(email) ? (
                    <span className="text-red-500">
                      Please enter valid email
                    </span>
                  ) : null}
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
                  {password != confirmpassword ? (
                    <span className="text-red-500">
                      Passwords do not match!
                    </span>
                  ) : null}
                </Label>
              </div>
              <Label className="mt-4 mb-10 w-full">
                <span className="text-gray-100 ">Phone</span>
                <Input
                  className="mt-1 bg-cool-gray-900 text-white border border-gray-700 placeholder-gray-700 p-2 rounded-md"
                  onChange={handleChange("phone")}
                  type="text"
                  value={phone}
                />
              </Label>

              <span
                className=" bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded cursor-pointer"
                block
                onClick={() => {
                  signUpHandle();
                }}
              >
                Sign Up
              </span>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
                  // to="/forgot-password"
                  onClick={() => setIspassmodal(true)}
                >
                  Forgot your password?
                </Link>
              </p>
            </div>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
      </>
    );
  };
  // <--------------------------------------------------------------------------------------------------------------

  const handleResetPassword = async () => {
    const payload = { email: resetEmail };
    try {
      const response = await axios.post(`${API}/mail/resetpassemail`, payload);
      // console.log(response.data);
      setModalmessage(
        "Link to reset your password has been sent to your email address."
      );
      setMessageModal(true);
    } catch (err) {
      console.log("RESETPASS err", err.response.data.error);
      if (err.response.data.error == "USER email does not exists") {
        setModalmessage("Sorry, a user with this email does not exist.");
        setMessageModal(true);
        return;
      }
      setModalmessage("Sorry, an error occured");
      setMessageModal(true);
    }
  };

  const RsestPassModal = () => {
    return (
      <>
        <Modal
          className="bg-cool-gray-900 px-12 py-10 rounded-lg"
          isOpen={ispassmodal}
          onClose={() => setIspassmodal(false)}
        >
          <ModalHeader>
            <span className="text-white">Recover Password</span>
          </ModalHeader>
          <ModalBody>
            <div className="text-white">
              Click Recover password to send email with password recovery email.
              <Label className="mt-4 ">
                <span className="text-gray-500">Email</span>
                <Input
                  className="mt-1 bg-cool-gray-900 text-white border border-gray-700 p-2 rounded-md"
                  onChange={(e) => {
                    setResetEmail(e.target.value);
                  }}
                  type="email"
                  value={resetEmail}
                />
              </Label>
            </div>
          </ModalBody>
          <ModalFooter>
            <span
              className=" bg-green-500 hover:bg-green-700 text-white font-bold  py-2 px-4 rounded cursor-pointer"
              block
              onClick={() => {
                handleResetPassword();
                setIspassmodal(false);
                // history.push("/signin");
              }}
            >
              Recover Password
            </span>
          </ModalFooter>
        </Modal>
      </>
    );
  };

  const defaultLinks = [
    <NavLinks key={1}>
      <Link to="/">
        <span className="text-white font-semibold mx-5 cursor-pointer">
          Home
        </span>
      </Link>
      <Link to="/#aboutus">
        {/* <ScrollLink activeClass="active" to="aboutus" spy={true} smooth={true}> */}
        <span className="text-white font-semibold mx-5 cursor-pointer">
          About
        </span>
        {/* </ScrollLink> */}
      </Link>
      {/* <NavLink href="/#">Blog</NavLink> */}
      <Link to="/#pricing">
        <span className="text-white font-semibold mx-5 cursor-pointer">
          Pricing
        </span>
      </Link>
      <Link to="/#contactus">
        <span className="text-white font-semibold mx-5 cursor-pointer">
          Contact Us
        </span>
      </Link>
      {/* <Link to="/marketing">
        <span className="text-white font-semibold mx-5 cursor-pointer">
          Marketing
        </span>
      </Link> */}
      {UserProfile.getRole() == 99 ? (
        <>
          {/* <Link to="/signin">
            <NavLink tw="lg:ml-12!">Login</NavLink>
          </Link> */}

          <span onClick={() => setIsLoginModal(true)}>
            <span className="text-white font-semibold mx-5 cursor-pointer">
              Login{" "}
            </span>
          </span>

          {/* <Link to="/signup">
            <PrimaryLink css={roundedHeaderButton && tw`rounded-full`}>
              Sign Up
            </PrimaryLink>
          </Link> */}
          <span onClick={() => setIsSignUpModal(true)}>
            <span className="text-white font-semibold mx-5 cursor-pointer">
              <PrimaryLink css={roundedHeaderButton && tw`rounded-full`}>
                SignUp{" "}
              </PrimaryLink>
            </span>
          </span>
        </>
      ) : (
        <>
          <Link to="/app/dashboard">
            <PrimaryLink css={roundedHeaderButton && tw`rounded-full`}>
              Dashboard
            </PrimaryLink>
          </Link>
        </>
      )}
    </NavLinks>,
  ];

  const MobiledefaultLinks = [
    <NavLinks key={1}>
      <Link to="/">
        <span className="text-white font-semibold mx-5 cursor-pointer">
          Home
        </span>
      </Link>
      <Link to="/#aboutus">
        <div
          onClick={toggleNavbar}
          className="text-white font-semibold hover:cursor-pointer my-4 mx-6 cursor-pointer"
        >
          About
        </div>
      </Link>
      {/* <NavLink href="/#">Blog</NavLink> */}
      <Link to="/#pricing">
        <div
          onClick={toggleNavbar}
          className="text-white font-semibold hover:cursor-pointer my-4 mx-8 cursor-pointer"
        >
          Pricing
        </div>
      </Link>
      <Link to="/#contactus">
        <div
          onClick={toggleNavbar}
          className="text-white font-semibold hover:cursor-pointer my-4 mx-8 cursor-pointer"
        >
          Contact Us
        </div>
      </Link>
      {/* <Link to="/marketing">
        <span className="text-white font-semibold mx-5 pb-10 cursor-pointer">
          Marketing
        </span>
      </Link> */}

      <div>
        <div
          onClick={() => setIsLoginModal(true)}
          className="text-white font-semibold hover:cursor-pointer my-4 mx-8 cursor-pointer"
        >
          Login
        </div>
      </div>

      <div>
        <div
          onClick={() => setIsLoginModal(true)}
          className="text-white font-semibold hover:cursor-pointer my-4 mx-8 cursor-pointer"
        >
          <PrimaryLink css={roundedHeaderButton && tw`rounded-full`}>
            Sign Up
          </PrimaryLink>
        </div>
      </div>
    </NavLinks>,
  ];

  logoLink = logoLink || defaultLogoLink;
  links = defaultLinks;
  let mobilelinks = MobiledefaultLinks;

  return (
    <Header className={className || "header-light"}>
      {LogInModal()}
      {messageModalComponent()}
      {RsestPassModal()}
      {SignUpModal()}
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer
        css={collapseBreakpointCss.mobileNavLinksContainer}
      >
        {logoLink}
        <MobileNavLinks
          initial={{ x: "150%", display: "none" }}
          animate={animation}
          css={collapseBreakpointCss.mobileNavLinks}
        >
          {mobilelinks}
        </MobileNavLinks>
        <NavToggle
          onClick={toggleNavbar}
          className={showNavLinks ? "open" : "closed"}
        >
          {showNavLinks ? (
            <CloseIcon tw="w-6 h-6" />
          ) : (
            <MenuIcon tw="w-6 h-6" />
          )}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:hidden`,
    desktopNavLinks: tw`sm:flex`,
    mobileNavLinksContainer: tw`sm:hidden`,
  },
  md: {
    mobileNavLinks: tw`md:hidden`,
    desktopNavLinks: tw`md:flex`,
    mobileNavLinksContainer: tw`md:hidden`,
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
  xl: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
};
