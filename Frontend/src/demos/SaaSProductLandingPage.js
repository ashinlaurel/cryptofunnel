import { React, useState } from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "../helpers/AnimationRevealPage.js";
import Hero from "../components/hero/TwoColumnWithInput.js";
import Features from "../components/features/ThreeColWithSideImage.js";
import MainFeature from "../components/features/TwoColWithButton.js";
import MainFeature2 from "../components/features/TwoColWithTwoHorizontalFeaturesAndButton.js";
import FeatureWithSteps from "../components/features/TwoColWithSteps.js";
import Pricing from "../components/pricing/ThreePlans.js";
import Testimonial from "../components/testimonials/TwoColumnWithImageAndRating.js";
import FAQ from "../components/faqs/SingleCol.js";
import GetStarted from "../components/cta/GetStarted";
import Footer from "../components/footers/MiniCenteredFooter";
// import heroScreenshotImageSrc from "../images/hero-screenshot-1.png";
import macHeroScreenshotImageSrc from "../images/hero-screenshot-2.png";
import stepsPic from "../images/stepsPic.png";
import prototypeIllustrationImageSrc from "../images/prototype-illustration.svg";
import valuespic from "../images/valuespic.png";
import { ReactComponent as BriefcaseIcon } from "feather-icons/dist/icons/briefcase.svg";
import { ReactComponent as MoneyIcon } from "feather-icons/dist/icons/dollar-sign.svg";
import UserProfile from "../helper/auth/UserProfile.js";
import {
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
  Button,
} from "@windmill/react-ui";

export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-gray-100`;
  const HighlightedText = tw.span`text-green-300 `;
  console.log(UserProfile.getRole());

  const [contactstate, setContactState] = useState(true);

  const ContactUsModal = () => {
    return (
      <>
        <Modal
          className="bg-gray-900 px-10 py-10 rounded-lg "
          isOpen={contactstate}
          onClose={() => setContactState(false)}
        >
          <ModalHeader>Password Updated Successfully!</ModalHeader>
          <ModalBody></ModalBody>
          <ModalFooter>
            <button
              className="w-full sm:w-auto bg-green-300 px-2 py-1 text-gray-800 rounded-lg "
              onClick={() => setContactState(false)}
            >
              Okay!
            </button>
          </ModalFooter>
        </Modal>
      </>
    );
  };

  return (
    <AnimationRevealPage>
<<<<<<< HEAD
      {ContactUsModal()}
=======
      <div id="home"></div>
>>>>>>> c43b9f1fa6149d8df8f5033b724b2f4d794ca0a0
      <Hero roundedHeaderButton={true} />
      <div id="aboutus"></div>
      <Features
        subheading={<Subheading>Why choose us ?</Subheading>}
        heading={
          <>
            We have Amazing <HighlightedText>Service.</HighlightedText>
          </>
        }
        description="We have some of the best experts in the industry at your service."
      />
      <FeatureWithSteps
        subheading={<Subheading>STEPS</Subheading>}
        heading={
          <>
            Easy to <HighlightedText>Get Started.</HighlightedText>
          </>
        }
        textOnLeft={false}
        // imageSrc={macHeroScreenshotImageSrc}
        imageSrc={stepsPic}
        imageDecoratorBlob={true}
        decoratorBlobCss={tw`xl:w-40 xl:h-40 opacity-15 -translate-x-1/2 left-1/2`}
      />
      {/* <MainFeature
        subheading={<Subheading>Quality Work</Subheading>}
        imageSrc={heroScreenshotImageSrc}
        imageBorder={true}
        imageDecoratorBlob={true}
      /> */}

      <MainFeature2
        subheading={<Subheading>OUR VALUES</Subheading>}
        heading={
          <>
            We Always Abide by Our{" "}
            <HighlightedText>Principles.</HighlightedText>
          </>
        }
        // imageSrc={prototypeIllustrationImageSrc}
        imageSrc={valuespic}
        showDecoratorBlob={false}
        features={[
          {
            Icon: MoneyIcon,
            title: "Affordable",
            description:
              "We at CFsquad are committed to bringing you the best quality content at affordable pricing.",
            iconContainerCss: tw`bg-green-300 text-green-800`,
          },
          {
            Icon: BriefcaseIcon,
            title: "Professionalism",
            description:
              "All our reports/newsletters are prepared by professionals who have years of experience in the industry.",
            iconContainerCss: tw`bg-red-300 text-red-800`,
          },
        ]}
      />
      <div id="pricing"></div>
      <Pricing
        subheading={<Subheading>Pricing</Subheading>}
        heading={
          <>
            Reasonable & Flexible <HighlightedText>Plans.</HighlightedText>
          </>
        }
        plans={[
          {
            name: "Crypto 101",
            price: "$175",
            duration: "Lifetime",
            mainFeature: "The Right Place To Start!",
            features: [
              "Beginners TA -live classes",
              "Priority Support",
              "Live Doubt Clearence",
              "Trading Bots",
            ],
          },
          {
            name: "Crypto 201",
            price: "$250",
            duration: "Lifetime",
            mainFeature: "For The Crypto Nerds",
            features: [
              "Advanced TA -live classes",
              "Priority Support",
              "Live Doubt Clearence",
              "Trading Bots",
              "5 Live Trading Sessions",
            ],
          },
          {
            name: "Signals & Analysis",
            price: "$100",
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
      <Testimonial
        subheading={<Subheading>Testimonials</Subheading>}
        heading={
          <>
            Our Clients <HighlightedText>Love Us.</HighlightedText>
          </>
        }
        testimonials={[
          {
            stars: 5,
            profileImageSrc:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3.25&w=512&h=512&q=80",
            heading: "Amazing Experience",
            quote:
              "I want to thank Crypto Funnel for getting me setup to trade cryptocurrency. It’s an exciting time in the market and with only a week of hobby level trading I’ve been making $100+ a day! Now is the time to invest.",
            customerName: "Charlotte Hale",
            customerTitle: "",
          },
          {
            stars: 5,
            profileImageSrc:
              "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=512&h=512&q=80",
            heading: "Such an enjoyable learning experience!",
            quote:
              "Crypto Funnel teaches technical analysis that I haven’t seen in anyone else offering. I highly recommend this for anyone wanting to get a better understanding of the Cryptocurrency market, and how to buy and sell in this up and coming industry.",
            customerName: "Adam Cuppy",
            customerTitle: "",
          },
        ]}
      />
      <div id="contactus"></div>
      <FAQ
        subheading={<Subheading>FAQS</Subheading>}
        heading={
          <>
            You have <HighlightedText>Questions ?</HighlightedText>
          </>
        }
        faqs={[
          {
            question: "Do You Post Trading Signals? ?",
            answer:
              "Yes, cfsquad provides trading signals, research reports on altcoins and crypto newsletters depending on the plan you choose.",
          },
          {
            question: "What is 1-1 Mentoring?",
            answer:
              "We will teach you a range of topics over a Zoom or Discord call, ranging from DeFi to Fundamental Analysis Techniques.",
          },
          {
            question: "Is there an active community?",
            answer:
              "Members are invited to join our Pro telegram group after signing up. There is a very active community of crypto enthusiasts.",
          },
          {
            question: "Is it Beginner Friendly?",
            answer:
              "We built cfsquad to accommodate for all skill levels, for beginners its the easiest way to become crypto nerd. Yes! You can use your Crypto to join thecfsquad. Please check out using the crypto payments option during checkout. If you would like some assistance paying with crypto please mail us at support@thecfsquad.com",
          },
        ]}
      />
      <GetStarted />

      <Footer />
    </AnimationRevealPage>
  );
};
