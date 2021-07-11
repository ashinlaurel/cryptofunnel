import React, { useEffect, useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import { Card, CardBody } from "@windmill/react-ui";
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import Payment from "./Payment/Payment";
import UserProfile from "../helper/auth/UserProfile";
import Axios from "axios";
import { API } from "../backend";

function Cards() {
  const [plan, setPlan] = useState(0);

  const getCustomerInfo = async () => {
    // console.log(`getting customer info`, UserProfile.getId());
    let data = { id: UserProfile.getId() };
    // console.log(API);
    try {
      let res = await Axios({
        url: `${API}/userinfo`,
        method: "POST",
        data: data,
      });
      // calc age

      //   setValues({

      //   });

      console.log("Done", res.data[0].userId.plan);
      setPlan(res.data[0].userId.plan);
      // setValues(res.data[0]);
      //   console.log("Hello");
    } catch (error) {
      console.log(`error`, error);
    }
  };

  useEffect(() => {
    getCustomerInfo();
  }, []);
  return (
    <>
      {UserProfile.getRole() == 2 ? (
        <div className="">
          <PageTitle>You Haven't Purchased Any Plans</PageTitle>
          <Payment />
        </div>
      ) : (
        <>
          <PageTitle>Your Plan</PageTitle>
          <Card className="mb-5 text-gray-900 border rounded-lg">
            <CardBody>
              <div className="flex items-center">
                <div>
                  {plan ? (
                    <>
                      <p className="mb-4 font-semibold">Congratulations!</p>
                      <p>
                        You have purchased our{" "}
                        <span className="font-semibold">
                          {plan == 1 ? (
                            <>Crypto 101</>
                          ) : plan == 2 ? (
                            <>Crypto 201</>
                          ) : plan == 3 ? (
                            <>Signals and Analysis</>
                          ) : null}{" "}
                        </span>
                        plan. We will contact you with more details shortly.
                      </p>
                    </>
                  ) : null}
                </div>

                {/* <div className="ml-10">
              <Button layout="outline" onClick={handleVerifyEmail} className="">
                Verify
              </Button>
            </div> */}
              </div>
            </CardBody>
          </Card>
        </>
      )}
    </>
  );
}

export default Cards;
