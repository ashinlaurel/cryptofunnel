import React from "react";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import CTA from "../components/CTA";
import InfoCard from "../components/Cards/InfoCard";
import { Card, CardBody } from "@windmill/react-ui";
import { CartIcon, ChatIcon, MoneyIcon, PeopleIcon } from "../icons";
import RoundIcon from "../components/RoundIcon";
import Payment from "./Payment/Payment";

function Cards() {
  return (
    <>
      <PageTitle>You Haven't Purchased Any Plans</PageTitle>
      <Payment />
    </>
  );
}

export default Cards;
