import React from "react";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import { Card, CardBody } from "@windmill/react-ui";
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import Payment from "./Payment/Payment";
import UserProfile from "../helper/auth/UserProfile";

function Cards() {
  return (
    <>
      {UserProfile.getRole() == 2 ? (
        <>
          <PageTitle>You Haven't Purchased Any Plans</PageTitle>
          <Payment />
        </>
      ) : (
        <>
          <PageTitle>Your Plan</PageTitle>
          <Card className="mb-5 text-gray-900 border rounded-lg">
            <CardBody>
              <div className="flex items-center">
                <div>
                  <p className="mb-4 font-semibold">Congratulations!</p>
                  <p>
                    You have purchased our GOLD plan. We will contact you with
                    more details shortly.
                  </p>
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
