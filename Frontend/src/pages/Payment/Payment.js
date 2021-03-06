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
import { Link, useLocation, useParams } from "react-router-dom";

function Payment() {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-gray-100`;
  const HighlightedText = tw.span`text-green-300`;
  const { ref } = useParams();
  console.log(ref);

  let initCust = {
    name: "sadf",
    email: "test@test.com",
    address: "sdf",
    city: "sdf",
    state: "sdf",
    country: "IN",
    zip: "43231",
  };
  const color = "primary";
  const [openTab, setOpenTab] = React.useState(1);
  const [loading, setLoading] = useState(false);
  const [messageModal, setMessageModal] = useState(false);
  const [modalmessage, setModalmessage] = useState("");

  const [discount, setDiscount] = useState(0);
  const [customer, setCustomer] = useState(initCust);
  const [thecode, setThecode] = useState("");
  const [codestatus, setCodeStatus] = useState(false);
  const [codeerror, setCodeError] = useState(false);

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

  //get referrla from url
  useEffect(async () => {
    if (!ref) return;
    setThecode(ref);
    try {
      console.log(thecode);
      let response = await axios.post(
        `${API}/refferal/${UserProfile.getId()}/checkIfExists`,
        {
          thecode: ref,
        }
      );
      if (response.data.thestatus == false) throw "Error";
      // console.log(response.data);
      // console.log(response.data.codeData.discount);
      // console.log(response.data.thestatus);
      setDiscount(response.data.codeData.discount);
      let discount = response.data.codeData.discount;
      console.log(
        plans[openTab] - (plans[openTab] * parseFloat(discount)) / 100
      );
      setCodeStatus(response.data.thestatus);
      setCodeError(true);
    } catch (err) {
      setDiscount(0);
      setCodeError(true);
      setCodeStatus(false);
      // setModalmessage("Sorry, code does not work");
      // setMessageModal(true);
    }
  }, []);

  // styles for the stripe card element
  const cardElementOptions = {
    style: {},
    hidePostalCode: true,
  };
  //   const handleCustomerChange = (e) => (field) => {
  //     setCustomer[{ ...customer, [field]: e.target.value }];
  //   };

  const [country, setcountry] = useState("notIN");

  const globalPlans = { 1: 175, 2: 250, 3: 100 };
  const indPlans = { 1: 13000, 2: 18500, 3: 7500 };
  const [plans, setPlans] = useState(globalPlans);
  const [currency, setCurrency] = useState("$");

  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const handleRefferalCode = (e) => {
    setThecode(e.target.value);
  };
  const handleRefferalCheck = async () => {
    if (openTab == 3) {
      setModalmessage(
        "You cannot avail a discount on this plan using this referral code. This code is appliable only for 'Crypto 101' and 'Crypto 201'."
      );
      setMessageModal(true);
      setDiscount(0);
      return;
    }
    try {
      console.log(thecode);
      let response = await axios.post(
        `${API}/refferal/${UserProfile.getId()}/checkIfExists`,
        {
          thecode: thecode,
        }
      );
      if (response.data.thestatus == false) throw "Error";
      console.log(response.data);
      console.log(response.data.codeData.discount);
      console.log(response.data.thestatus);
      setDiscount(response.data.codeData.discount);
      let discount = response.data.codeData.discount;
      console.log(
        plans[openTab] - (plans[openTab] * parseFloat(discount)) / 100
      );
      setCodeStatus(response.data.thestatus);
      setCodeError(true);
    } catch (err) {
      setDiscount(0);
      setCodeError(true);
      setCodeStatus(false);
      // setModalmessage("Sorry, code does not work");
      // setMessageModal(true);
    }
  };

  const handleSubmit = async () => {
    try {
      let session = await axios.post(
        `${API}/payment/${UserProfile.getId()}/paymentRoute`,
        {
          plannumber: openTab,
          codeStatus: codestatus,
          thecode: thecode,
          country: country,
        }
      );
      window.location.assign(session.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleBitSubmit = async () => {
    if (openTab == 3) {
      setModalmessage(
        "This plan can only be purchased with card as it is on a subscription basis. Please select Pay with crypto to continue"
      );
      setMessageModal(true);
      return;
    }
    const userid = UserProfile.getId();
    try {
      // console.log("bitcoin ");
      console.log(userid);
      let session = await axios.post(
        `${API}/payment/${UserProfile.getId()}/paymentBitRoute`,
        {
          plannumber: openTab,
          codeStatus: codestatus,
          thecode: thecode,
          country: country,
          userid: userid,
        }
      );
      console.log(session.data);
      window.location.assign(session.data.hosted_url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (country == "IN") {
      setPlans(indPlans);
      setCurrency("??? ");
    } else {
      setPlans(globalPlans);
      setCurrency("$");
    }
  }, [country]);

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
    <div className=" flex md:flex-row flex-col  items-center lg:items-start lg:mt-3 ">
      {messageModalComponent()}
      <div className="w-full mx-4  ">
        <>
          <div className="flex flex-wrap  ">
            <div className="w-full">
              <ul
                className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
                role="tablist"
              >
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center my-2">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 1
                        ? "text-white bg-" + color + "-600"
                        : "text-purple-200 bg-gray-800 border border-gray-800")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(1);
                    }}
                    data-toggle="tab"
                    href="#link1"
                    role="tablist"
                  >
                    Crypto 101
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center my-2">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 2
                        ? "text-white bg-" + color + "-600"
                        : "text-purple-200 bg-gray-800 border border-gray-800")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(2);
                    }}
                    data-toggle="tab"
                    href="#link2"
                    role="tablist"
                  >
                    Crypto 201
                  </a>
                </li>
                <li className="-mb-px mr-2 last:mr-0 flex-auto text-center my-2">
                  <a
                    className={
                      "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                      (openTab === 3
                        ? "text-white bg-" + color + "-600"
                        : "text-purple-200 bg-gray-800 border border-gray-800")
                    }
                    onClick={(e) => {
                      e.preventDefault();
                      setOpenTab(3);
                      if (discount !== 0) {
                        setModalmessage(
                          "Referral code not compatible with this plan."
                        );
                        setMessageModal(true);
                        setDiscount(0);
                      }
                    }}
                    data-toggle="tab"
                    href="#link3"
                    role="tablist"
                  >
                    Signals & Analysis
                  </a>
                </li>
              </ul>
              <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded ">
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
                            name: "Crypto 101",
                            price: ` ${currency}${plans[1]}`,
                            duration: "Lifetime",
                            mainFeature: "The Right Place To Start!",
                            features: [
                              "Beginners TA -live classes",
                              "Priority Support",
                              "Live Doubt Clearence",
                              "Trading Bots",
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
                            name: "Crypto 201",
                            price: `${currency}${plans[2]}`,
                            duration: "Lifetime",
                            mainFeature: "For The Crypto Nerds",
                            features: [
                              "Advanced TA -live classes",
                              "Priority Support",
                              "Live Doubt Clearence",
                              "Trading Bots",
                              "5 Live Trading Sessions",
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
                            name: "Signals & Analysis",
                            price: `${currency}${plans[3]}`,
                            duration: "Monthly",
                            mainFeature: "We'll Work For You",
                            features: [
                              "Daily 3 trading Signals",
                              "Spot/Margin/Future Based Calls",
                              "Report & Newsletter",
                              "weekly Live Trading Sessions",
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

      {/* -------- payment card */}

      <div className="w-full lg:mt-12 ">
        <div class="leading-loose ">
          <div class="max-w-xl my-4 p-10 bg-cool-gray-900 border border-gray-800 rounded-lg shadow-xl">
            <p class="text-gray-100 font-lg font-semibold">
              Selected Plan{" "}
              {openTab == 1
                ? "Crypto 101"
                : openTab == 2
                ? "Crypto 201"
                : openTab == 3
                ? "Signals & Analysis"
                : ""}{" "}
              :
              <span className="text-green-300 font-bold">
                {" "}
                {currency}
                {plans[openTab] - (plans[openTab] * parseFloat(discount)) / 100}
              </span>
            </p>
            <p class="text-gray-100 font-medium">Customer information</p>

            <div class="inline-block mt-2 w-full pr-1">
              <label class=" block text-sm text-gray-100" for="cus_email">
                Country
              </label>
              {/* <input
                class="w-full px-2 py-1 text-sm text-gray-100 bg-cool-gray-900 border shadow rounded "
                value={customer.country}
                onChange={handleCustomerChange}
                name="country"
                type="text"
                required=""
                placeholder="Country"
                aria-label="Email"
              /> */}
              <select
                name="country"
                value={country}
                onChange={(e) => {
                  setcountry(e.target.value);
                }}
                class="w-full px-2 py-2 text-sm text-gray-100 bg-cool-gray-900 border border-gray-500 shadow rounded "
              >
                <option selected value="IN">
                  India
                </option>
                <option value="notIN">Outside India</option>
              </select>
            </div>

            {/* --------------Refferal Code ---------------*/}

            <div>
              <div class="mt-2 flex items-end justify-center space-x-1">
                <div className="w-full">
                  <label class=" text-sm block text-gray-100" for="cus_email">
                    Refferal Code
                  </label>
                  <input
                    class="w-full px-2 py-1 text-sm text-gray-100 bg-cool-gray-900 border border-gray-500 shadow rounded "
                    value={thecode}
                    onChange={handleRefferalCode}
                    name="thecode"
                    type="text"
                    required=""
                    placeholder="Have a refferal code ?"
                    aria-label="text"
                  />
                </div>
                <button
                  class="px-4 py-1  text-white text-sm font-light tracking-wider bg-primary-500 hover:bg-primary-600 rounded"
                  onClick={() => {
                    handleRefferalCheck();
                  }}
                >
                  Enter
                </button>
              </div>
              {codestatus == false && codeerror ? (
                <div className="text-xs text-red-600">
                  Invalid Refferal Code. Please Try Again!
                </div>
              ) : null}
            </div>
            {codestatus == false ? null : (
              <div class="mt-2  text-sm text-gray-100">
                <div className="w-full">
                  Refferal Successful! Discount of{" "}
                  <span className="font-semibold">
                    ${(plans[openTab] * parseFloat(discount)) / 100}{" "}
                  </span>
                  applied.
                </div>
              </div>
            )}

            <div class="mt-4 flex flex-col">
              <button
                className={`px-4 py-1 text-white font-light  my-4 tracking-wider ${
                  loading
                    ? `bg-primary-700`
                    : `bg-gradient-to-r from-green-600 to-green-400 `
                }  rounded hover:bg-gradient-to-r hover:from-green-500 hover:to-green-600 transition-all duration-500`}
                disabled={loading ? "true" : ""}
                // disabled="true"
                onClick={() => {
                  handleSubmit();
                }}
              >
                {loading ? <>Loading...</> : <>PURCHASE WITH CARD (FIAT)</>}
              </button>
              <button
                className={`px-4 py-1 text-white font-light tracking-wider ${
                  loading
                    ? `bg-primary-700`
                    : `bg-gradient-to-r from-orange-600 to-orange-400 `
                }  rounded hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 transition-all duration-500`}
                // disabled="true"
                onClick={() => {
                  handleBitSubmit();
                }}
              >
                PURCHASE WITH CRYPTO
              </button>
              <p className=" mt-4 font-light text-sm text-gray-300 leading-4">
                By clicking purchase options, you are agreeing to our{" "}
                <Link to="/TermsAndConditions" className="font-semibold">
                  Terms and Conditions
                </Link>
              </p>
              <p className=" my-2 font-light text-sm text-gray-400 leading-4">
                *Please not that refferal discounts are not applicable with
                Signals & Analysis plan.
              </p>
              <p className="font-light text-sm text-gray-400 leading-4">
                *Subscibtion based plan "Signals & Analysis" can only be
                purchased with card, not via crypto.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-full">
        <button
          onClick={async () => {
            try {
              let session = await axios.post(
                `${API}/payment/${UserProfile.getId()}/paymentRoute`,
                { plannumber: openTab }
              );
              window.location.assign(session.data);
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Buy
        </button>
      </div> */}
    </div>
    // </AnimationRevealPage>
  );
}

export default Payment;
