import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { Container as ContainerBase } from "../../components/misc/Layouts.js";
import { Link } from "react-router-dom";

// import logo from "../../images/logo.svg";
import logo from "../../images/crypto_logo.png";
import { Link as ScrollLink } from "react-scroll";

import { ReactComponent as FacebookIcon } from "../../images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "../../images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "../../images/youtube-icon.svg";

const Container = tw(ContainerBase)`bg-cool-gray-900 text-gray-100 -mx-8 -mb-8`;
const Content = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;

const Row = tw.div`flex items-center justify-center flex-col px-8`;

const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-8`;
const LogoText = tw.h5`ml-2 text-2xl font-black tracking-wider`;

const LinksContainer = tw.div`mt-8 font-medium flex flex-wrap justify-center items-center flex-col sm:flex-row`;
const TLink = tw.a`border-b-2 border-transparent hocus:text-gray-300 hocus:border-gray-300 pb-1 transition duration-300 mt-2 mx-4`;

const SocialLinksContainer = tw.div`mt-10`;
const SocialLink = styled.a`
  ${tw`cursor-pointer inline-block text-gray-100 hover:text-gray-500 transition duration-300 mx-4`}
  svg {
    ${tw`w-5 h-5`}
  }
`;

const CopyrightText = tw.p`text-center mt-10 font-medium tracking-wide text-sm text-gray-600`;
export default () => {
  return (
    <Container>
      <Content>
        <Row>
          <LogoContainer>
            <LogoImg src={logo} />
            <LogoText>CryptoFunnel</LogoText>
          </LogoContainer>
          <LinksContainer>
            <Link to="/">
              <span className="text-white font-semibold mx-5 cursor-pointer">
                Home
              </span>
            </Link>
            <Link to="/#aboutus">
              <span className="text-white font-semibold mx-5 cursor-pointer">
                About
              </span>
            </Link>
            <Link to="/#contactus">
              <span className="text-white font-semibold mx-5 cursor-pointer">
                Contact Us
              </span>
            </Link>
            <ScrollLink activeClass="active" to="home" spy={true}>
              <Link to="/TermsAndConditions">
                <span className="text-white font-semibold mx-5 cursor-pointer">
                  Terms of Service
                </span>
              </Link>
            </ScrollLink>

            <ScrollLink activeClass="active" to="home" spy={true}>
              {" "}
              <Link to="/privacypolicy">
                <span className="text-white font-semibold mx-5 cursor-pointer">
                  Privacy Policy
                </span>
              </Link>
            </ScrollLink>
          </LinksContainer>
          <SocialLinksContainer>
            <SocialLink href="https://facebook.com">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href="https://twitter.com">
              <TwitterIcon />
            </SocialLink>
            <SocialLink href="https://youtube.com">
              <YoutubeIcon />
            </SocialLink>
          </SocialLinksContainer>
          <CopyrightText>
            &copy; Copyright 2020, CryptoFunnel. All Rights Reserved.
          </CopyrightText>
        </Row>
      </Content>
    </Container>
  );
};
