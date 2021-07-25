import React, { useState } from "react";
import styled from "styled-components"; //eslint-disable-line
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-9.svg";
import { ContentWithPaddingXl, Container } from "../../components/misc/Layouts";
import axios from "axios";

import { Button, Input, HelperText, Label } from "@windmill/react-ui";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { API } from "../../backend";
import mailerBg from "../../images/mailerlite.png";

const ColumnContainer = tw.div`lg:w-1/2 max-w-lg`;

const LinksContainer = tw(
  ColumnContainer
)`flex justify-center lg:justify-end mt-6 lg:mt-0 flex-col sm:flex-row`;

const Link = tw.a`w-full sm:w-auto text-sm sm:text-base px-6 py-3 sm:px-8 sm:py-4 lg:px-10 lg:py-5 mt-4 first:mt-0 sm:mt-0 sm:mr-8 sm:last:mr-0 rounded-full font-bold border border-transparent tracking-wide transition duration-300 focus:outline-none focus:shadow-outline`;

export default ({
  text = "One last solid line here to seal the deal.",
  primaryLinkText = "Get Started",
  primaryLinkUrl = "http://turnbox.in",
  secondaryLinkText = "Contact Us",
  secondaryLinkUrl = "http://turnbox.in",
  pushDownFooter = true,
}) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const signUptoNewsLetter = async () => {
    if (name == "") {
      setModalMessage("Please provide a name.");
      setMessageModal(true);
      return;
    }
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      setModalMessage("Please provide valid email.");
      setMessageModal(true);
      return;
    }
    try {
      const payload = { email: email, name: name };
      const response = await axios({
        url: `${API}/mail/AddToMailerList`,
        method: "POST",
        data: payload,
      });
      console.log("suss", response.data);
      setModalMessage("You are added to our mailing list!");
      setMessageModal(true);
    } catch (err) {
      console.log("VERIFY ERROR", err);
      setModalMessage("Sorry, an error occured.");
      setMessageModal(true);
    }
  };

  const [messageModal, setMessageModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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

  return (
    <Container css={pushDownFooter && tw``}>
      {messageModalComponent()}
      <ContentWithPaddingXl>
        <div className="flex justify-center px-6 my-12">
          {/* <!-- Row --> */}
          <div className="w-full xl:w-3/4 lg:w-11/12 flex">
            {/* <!-- Col --> */}
            <div
              className="w-full h-auto bg-gray-800 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
              // style="background-image: url('https://source.unsplash.com/Mv9hjnEUHR4/600x800')"
            >
              <img src={mailerBg} alt="mailer Image" />
            </div>
            {/* <!-- Col --> */}
            <div className="w-full lg:w-7/12 bg-gray-800 p-5 rounded-lg lg:rounded-l-none">
              <h3 className="pt-4 text-2xl text-center text-green-300 font-semibold">
                Sign Up For Our Newsletter!
              </h3>
              <form className="px-8 pt-6 pb-8 mb-4 bg-gray-800 rounded">
                <div className="mb-4 md:flex md:justify-between">
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-100"
                      for="firstName"
                    >
                      Name
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm border-gray-800 bg-gray-700 leading-tight text-gray-100 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="mb-4 md:mr-2 md:mb-0">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-100"
                      for="firstName"
                    >
                      Email
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm border-gray-800 bg-gray-700 leading-tight text-gray-100 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="firstName"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                </div>

                <div className="mb-6 mt-8 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-gray-800 bg-green-300 rounded-full hover:bg-green-500 focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={signUptoNewsLetter}
                  >
                    Sign Up!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </ContentWithPaddingXl>
    </Container>
  );
};
