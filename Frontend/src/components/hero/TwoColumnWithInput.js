import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";

import Header from "../headers/light.js";

import { ReactComponent as SvgDecoratorBlob1 } from "../../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../../images/design-illustration-2.svg";
import CustomersLogoStripImage from "../../images/customers-logo-strip.png";
import BitcoinMain from "../../images/Bitcoin1.png";
import { Link, useHistory } from "react-router-dom";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col lg:flex-row lg:items-center max-w-screen-xl mx-auto py-20 md:py-24`;
const LeftColumn = tw.div`relative lg:w-5/12 text-center max-w-lg mx-auto lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative mt-12 lg:mt-0 flex-1 flex flex-col justify-center lg:self-end`;

const Heading = tw.h1`font-bold text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-100 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base text-gray-100 xl:text-lg`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:-ml-1`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5  text-gray-300 rounded-full bg-cool-gray-900 border-2 w-full border-green-300 font-medium focus:outline-none transition duration-300  focus:border-green-500 hover:border-green-500`}
  }
  button {
    ${tw`w-full  sm:absolute right-0 top-0 bottom-0 bg-green-600 text-gray-100 font-bold mr-2 my-4 sm:my-2 rounded-full py-4 flex items-center justify-center sm:w-40 sm:leading-none focus:outline-none hover:bg-green-800 transition duration-300`}
  }
`;

const IllustrationContainer = tw.div`flex justify-center lg:justify-end items-center`;

// Random Decorator Blobs (shapes that you see in background)
const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none opacity-5 absolute left-0 bottom-0 h-64 w-64 transform -translate-x-2/3 -z-10`}
`;

const CustomersLogoStrip = styled.div`
  ${tw`mt-12 lg:mt-20`}
  p {
    ${tw`uppercase text-sm lg:text-xs tracking-wider font-bold text-gray-100`}
  }
  img {
    ${tw`mt-4 w-full lg:pr-16 xl:pr-32 opacity-100`}
  }
`;

export default ({ roundedHeaderButton }) => {
  const history = useHistory();
  return (
    <>
      <Header roundedHeaderButton={roundedHeaderButton} />
      <Container>
        <TwoColumn>
          <LeftColumn>
            <Heading>
              Trading <span tw="text-green-300">Can't </span>
              Be Taught!
            </Heading>
            <Paragraph>
              But it can be learnt. A few months from now you will look back and
              be glad you started learning with us!
            </Paragraph>
            <Actions>
              <input type="text" placeholder="Your E-mail Address" />

              <a href="mailto:support@thecfsquad.com">
                <button
                // onClick={() => {
                //   history.push("/signup");
                // }}
                >
                  Get Started
                </button>
              </a>
            </Actions>
            <CustomersLogoStrip>
              {/* <p>Our TRUSTED Customers</p> */}
              {/* <img src={CustomersLogoStripImage} alt="Our Customers" /> */}
            </CustomersLogoStrip>
          </LeftColumn>
          <RightColumn>
            <IllustrationContainer>
              <img
                tw="min-w-0 w-full max-w-lg xl:max-w-3xl"
                src={BitcoinMain}
                alt="Design Illustration"
              />
            </IllustrationContainer>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
    </>
  );
};
