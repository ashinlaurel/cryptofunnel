import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-gray-100`;
  const HighlightedText = tw.span`text-green-300`;

  let initCust = {
    name: "",
    email: "",
    address: "",
    city: "",
    country: "",
    zip: "",
  };
  const [customer, setCustomer] = useState(initCust);

  const [amount, setAmount] = useState(100);
  const [currency, setCurrency] = useState("INR");
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  //   const handleCustomerChange = (e) => (field) => {
  //     setCustomer[{ ...customer, [field]: e.target.value }];
  //   };
  const handleCustomerChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  return (
    <AnimationRevealPage>
      <div className="  bg-primary-100 mx-auto">
        <div class="leading-loose">
          <form class="max-w-xl m-4 p-10 bg-white rounded shadow-xl">
            <p class="text-gray-800 font-medium">Customer information</p>
            <div class="">
              <label class="block text-sm text-gray-00" for="cus_name">
                Name
              </label>
              <input
                class="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                value={customer.name}
                onChange={handleCustomerChange}
                name="name"
                required=""
                placeholder="Your Name"
              />
            </div>
            <div class="mt-2">
              <label class="block text-sm text-gray-600" for="cus_email">
                Email
              </label>
              <input
                class="w-full px-5  py-4 text-gray-700 bg-gray-200 rounded"
                value={customer.email}
                onChange={handleCustomerChange}
                name="email"
                type="text"
                placeholder="Your Email"
                aria-label="Email"
              />
            </div>
            <div class="mt-2">
              <label class=" block text-sm text-gray-600" for="cus_email">
                Address
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                value={customer.address}
                onChange={handleCustomerChange}
                name="address"
                type="text"
                required=""
                placeholder="Street"
                aria-label="Email"
              />
            </div>
            <div class="mt-2">
              <label class="hidden text-sm block text-gray-600" for="cus_email">
                City
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                value={customer.city}
                onChange={handleCustomerChange}
                name="city"
                type="text"
                required=""
                placeholder="City"
                aria-label="Email"
              />
            </div>
            <div class="inline-block mt-2 w-1/2 pr-1">
              <label class="hidden block text-sm text-gray-600" for="cus_email">
                Country
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                value={customer.country}
                onChange={handleCustomerChange}
                name="country"
                type="text"
                required=""
                placeholder="Country"
                aria-label="Email"
              />
            </div>
            <div class="inline-block mt-2 -mx-1 pl-1 w-1/2">
              <label class="hidden block text-sm text-gray-600" for="cus_email">
                Zip
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                value={customer.zip}
                onChange={handleCustomerChange}
                name="zip"
                type="text"
                required=""
                placeholder="Zip"
                aria-label="Email"
              />
            </div>
            <p class="mt-4 text-gray-800 font-medium">Payment information</p>
            <div class="">
              <label class="block text-sm text-gray-600" for="cus_name">
                Card
              </label>
              <input
                class="w-full px-2 py-2 text-gray-700 bg-gray-200 rounded"
                id="cus_name"
                name="cus_name"
                type="text"
                required=""
                placeholder="Card Number MM/YY CVC"
                aria-label="Name"
              />
            </div>
            <div class="mt-4">
              <button
                class="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded"
                type="submit"
              >
                $3.00
              </button>
            </div>
          </form>
        </div>
      </div>
    </AnimationRevealPage>
  );
};
