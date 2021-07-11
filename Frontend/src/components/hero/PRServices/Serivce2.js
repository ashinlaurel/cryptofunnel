import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//eslint-disable-next-line
import { css } from "styled-components/macro";

import Header from "../../headers/light.js";

import { ReactComponent as SvgDecoratorBlob1 } from "../../../images/svg-decorator-blob-1.svg";
import DesignIllustration from "../../../images/design-illustration-2.svg";
import CustomersLogoStripImage from "../../../images/customers-logo-strip.png";
import BitcoinMain from "../../../images/Marketing/3.png";
import { Link, useHistory } from "react-router-dom";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col-reverse lg:flex-row lg:items-center  max-w-screen-xl mx-auto `;
const LeftColumn = tw.div`relative lg:w-6/12 text-center max-w-lg  lg:max-w-none lg:text-left`;
const RightColumn = tw.div`relative lg:w-6/12 mt-12 lg:ml-5 mx-auto  lg:mt-0 flex flex-1 flex-col justify-center text-center lg:text-left`;

const Heading = tw.h1`font-bold text-2xl md:text-2xl lg:text-2xl xl:text-3xl text-gray-100 leading-tight`;
const Paragraph = tw.p`my-5 lg:my-8 text-base text-gray-100 xl:text-lg`;

const Actions = styled.div`
  ${tw`relative max-w-md text-center mx-auto lg:-ml-1`}
  input {
    ${tw`sm:pr-48 pl-8 py-4 sm:py-5  text-gray-300 rounded-full bg-gray-900 border-2 w-full border-green-300 font-medium focus:outline-none transition duration-300  focus:border-green-500 hover:border-green-500`}
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
      {/* <Header roundedHeaderButton={roundedHeaderButton} /> */}
      <Container>
        <TwoColumn>
          <LeftColumn>
            <IllustrationContainer>
              <img
                tw="min-w-0 w-full max-w-lg xl:max-w-3xl"
                src={BitcoinMain}
                alt="Design Illustration"
              />
            </IllustrationContainer>
          </LeftColumn>
          <RightColumn>
            <Heading>Community Growth</Heading>
            <Paragraph>
              Community management is a primary goal for any successful
              blockchain project. We use the full power of social platforms to
              promote your project and search for potential investors. We also
              in build and manage a diverse set of communities, from those
              looking for love to those learning how to build decentralized
              applications.
            </Paragraph>
          </RightColumn>
        </TwoColumn>
        <DecoratorBlob1 />
      </Container>
    </>
  );
};
