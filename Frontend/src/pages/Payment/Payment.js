import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { API } from "../../backend.js";
import UserProfile from "../../helper/auth/UserProfile.js";
import { Subheading } from "../../components/misc/Headings";
import DashBoardPlans from "../../components/pricing/PricingPlans";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { Label, Input, Button } from "@windmill/react-ui";

function Payment() {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-gray-100`;
  const HighlightedText = tw.span`text-green-300`;

  let initCust = {
    name: "sadf",
    email: "test@test.com",
    address: "sdf",
    city: "sdf",
    state: "sdf",
    country: "IN",
    zip: "43231",
  };
  const color = "blue";
  const [openTab, setOpenTab] = React.useState(1);
  const [loading, setLoading] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [modalmessage, setModalmessage] = useState("");

  const [discount, setDiscount] = useState(0);
  const [customer, setCustomer] = useState(initCust);
  const [thecode, setThecode] = useState("");
  const [codestatus, setCodeStatus] = useState(false);
  const [codeerror, setCodeError] = useState(false);

  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState("INR");
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  // o02m12

  // ----------------------------------------
  // useEffect(() => {
  //   setCodeStatus(false);
  //   return () => {
  //     setCodeStatus(false);
  //   };
  // }, []);

  // styles for the stripe card element
  const cardElementOptions = {
    style: {},
    hidePostalCode: true,
  };
  //   const handleCustomerChange = (e) => (field) => {
  //     setCustomer[{ ...customer, [field]: e.target.value }];
  //   };

  const plans = { 1: 50, 2: 80, 3: 100 };

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const handleRefferalCode = (e) => {
    setThecode(e.target.value);
  };
  const handleRefferalCheck = async () => {
    try {
      console.log(thecode);
      let response = await axios.post(
        `${API}/refferal/${UserProfile.getId()}/checkIfExists`,
        {
          thecode: thecode,
        }
      );
      if (
        !response.data ||
        !response.data.codeData ||
        !response.data.codeData.discount
      )
        throw "Error";
      console.log(response.data.codeData.discount);
      setDiscount(response.data.codeData.discount);
      let discount = response.data.codeData.discount;
      console.log(
        plans[openTab] - (plans[openTab] * parseFloat(discount)) / 100
      );
      setCodeStatus(response.data.thestatus);
      setCodeError(true);
    } catch (err) {
      setModalmessage("Sorry, code does not work");
      setMessageModal(true);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const billingDetails = {
      name: customer.name,
      email: customer.email,
      address: {
        city: customer.city,
        line1: customer.address,
        state: customer.state,
        postal_code: customer.zip,
        country: customer.country,
      },
    };
    const billtemp = {
      name: customer.name,
      address: {
        city: customer.city,
        line1: customer.address,
        state: customer.state,
        postal_code: customer.zip,
        country: customer.country,
      },
    };
    try {
      const { data: clientSecret } = await axios.post(
        `${API}/payment/${UserProfile.getId()}/payment_intents`,
        {
          plan: openTab,
          refCode: thecode,
          billingDetails: billtemp,
        }
      );

      const cardElement = elements.getElement(CardElement);

      const paymentMethodReq = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: billingDetails,
      });

      // console.log(paymentMethodReq);

      const confirmedCardPayment = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethodReq.paymentMethod.id,
        }
      );

      console.log(confirmedCardPayment);
      if (confirmedCardPayment.paymentIntent.status == "succeeded") {
        console.log("Payment Successful!");
        setModalmessage("Payment Successful");
        await handleRoleChange();
        setMessageModal(true);
      } else throw { message: "Stripe Failed" };

      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setLoading(false);
      if (err.message == "paymentMethodReq.paymentMethod is undefined") {
        setModalmessage("Please provide valid credit card number.");
        setMessageModal(true);
        return;
      }

      setModalmessage("Sorry, an error occured.");
      setMessageModal(true);
      return;
    }
  };

  const handleRoleChange = async () => {};

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

  return (
    // <AnimationRevealPage>
    <div className=" flex md:flex-row flex-col">
      {messageModalComponent()}
      <div className="w-full mx-4">
        <>
          <div className="flex flex-wrap">
            <div className="w-full">
              <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                role="tablist"
              >
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 1
                        ? "text-white bg-" + color + "-600"
                        : "text-" + color + "-600 bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    SILVER
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 2
                        ? "text-white bg-" + color + "-600"
                        : "text-" + color + "-600 bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    GOLD
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 3
                        ? "text-white bg-" + color + "-600"
                        : "text-" + color + "-600 bg-white")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(3);
                    }}
                    data-toggle="tab"
                    href="#link3"
                    role="tablist"
                  >
                    PLATINUM
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                <div className="">
                  <div className="flex-row flex items-center justify-center">
                    <div
                      className={openTab === 1 ? "block" : "hidden"}
                      id="link1"
                    >
                      <DashBoardPlans
                        subheading=""
                        heading=""
                        plans={[
                          {
                            name: "SILVER",
                            price: `$${plans[1]}`,
                            duration: "",
                            mainFeature: "Exclusive Newsletter",
                            features: [
                              "3 Lorem Ipsum",
                              "7 Lorem Ipsum",
                              "12 Lorem Ipsum",
                              "Basic Assistance",
                            ],
                            featured: true,
                          },
                        ]}
                      />
                    </div>
                    <div
                      className={openTab === 2 ? "block" : "hidden"}
                      id="link2"
                    >
                      <DashBoardPlans
                        subheading=""
                        heading=""
                        plans={[
                          {
                            name: "GOLD",
                            price: `$${plans[2]}`,
                            duration: "",
                            mainFeature: "Exclusive Lessons",
                            features: [
                              "60 Templates",
                              "8 Landing Pages",
                              "22 Internal Pages",
                              "Priority Assistance",
                            ],
                            featured: true,
                          },
                        ]}
                      />
                    </div>
                    <div
                      className={openTab === 3 ? "block" : "hidden"}
                      id="link3"
                    >
                      <DashBoardPlans
                        subheading=""
                        heading=""
                        plans={[
                          {
                            name: "PLATINUM",
                            price: `$${plans[3]}`,
                            duration: "",
                            mainFeature: "One On One Training",
                            features: [
                              "90 Templates",
                              "9 Landing Pages",
                              "37 Internal Pages",
                              "Personal Assistance",
                            ],
                            featured: true,
                          },
                        ]}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      <div className="w-full">
        <button
          onClick={async () => {
            try {
              let session = await axios.post(
                `${API}/payment/${UserProfile.getId()}/paymentRoute`
              );
              window.location.assign(session.data);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Buy
        </button>
      </div>
    </div>
    // </AnimationRevealPage>
  );
}

export default Payment;
