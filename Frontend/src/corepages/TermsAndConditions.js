import React from "react";
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
import Header from "../components/headers/light";

export default () => {
  const Subheading = tw.span`uppercase tracking-widest font-bold text-gray-100`;
  const HighlightedText = tw.span`text-green-300 `;
  console.log(UserProfile.getRole());

  return (
    <AnimationRevealPage>
      <Header roundedHeaderButton={true} />
      <div className=" text-white mx-10 md:mx-32 lg:mx-64 my-48">
        <>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              pageBreakInside: "avoid",
              orphans: 2,
              widows: 2,
              pageBreakAfter: "avoid",
            }}
            align="left"
          >
            <span style={{ fontSize: "xx-large" }}>
              WEBSITE ACCEPTABLE USE POLICY
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              <strong>
                PLEASE READ THE TERMS OF THIS POLICY CAREFULLY BEFORE USING THE
                SITE
              </strong>
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>What's in these terms?</span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              This acceptable use policy sets out the content standards that
              apply when you upload content to our site, make contact with other
              users on our site, link to our site, or interact with our site in
              any other way,
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              Click on the links below to go straight to more information on
              each area.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              Who we are and how to contact us
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              https://www.thecfsquad.com is a site operated by{" "}
            </span>
            <span style={{ fontSize: "medium" }}>
              <strong>cfsquad</strong>
            </span>
            <span style={{ fontSize: "medium" }}>
              {" "}
              ("We") which is not yet a registered entity.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              To contact us, please email support@thecfsquad.com
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              By using our site you accept these terms.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              By using our site, you confirm that you accept the terms of this
              policy and that you agree to comply with them.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              If you do not agree to these terms, you must not use our site.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              We recommend that you print a copy of these terms for future
              reference.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              There are other terms that may apply to you
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              Our website{" "}
              <a href="https://cryptowzrd.com/pages/terms-conditions">
                terms and conditions
              </a>{" "}
              also apply to your use of our site.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              We may make changes to the terms of this policy.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              We amend these terms from time to time. Every time you wish to use
              our site, please check these terms to ensure you understand the
              terms that apply at that time. These terms were most recently
              updated on 28 March 2021.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>Prohibited uses</span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              You may use our site only for lawful purposes. You may not use our
              site:
            </span>
          </p>
          <ul>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  In any way that breaches any applicable local, national or
                  international law or regulation.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  In any way that is unlawful or fraudulent, or has any unlawful
                  or fraudulent purpose or effect.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  For the purpose of harming or attempting to harm minors in any
                  way.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  To bully, insult, intimidate or humiliate any person.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  To send, knowingly receive, upload, download, use or re-use
                  any material which does not comply with our content standards.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  To transmit, or procure the sending of, any unsolicited or
                  unauthorised advertising or promotional material or any other
                  form of similar solicitation (spam).
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0.92cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  To knowingly transmit any data, send or upload any material
                  that contains viruses,
                </span>
              </p>
            </li>
          </ul>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              Trojan horses, worms, time-bombs, keystroke loggers, spyware,
              adware or any other harmful programs or similar computer code
              designed to adversely affect the operation of any computer
              software or hardware.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>You also agree:</span>
          </p>
          <ul>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Not to reproduce, duplicate, copy or re-sell any part of our
                  site in contravention of the provisions of our website terms
                  and conditions.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Not to access without authority, interfere with, damage or
                  disrupt:
                </span>
              </p>
              <ul>
                <li>
                  <p
                    style={{
                      marginBottom: "0cm",
                      lineHeight: "100%",
                      orphans: 2,
                      widows: 2,
                    }}
                    align="left"
                  >
                    <span style={{ fontSize: "medium" }}>
                      any part of our site;
                    </span>
                  </p>
                </li>
                <li>
                  <p
                    style={{
                      marginBottom: "0cm",
                      lineHeight: "100%",
                      orphans: 2,
                      widows: 2,
                    }}
                    align="left"
                  >
                    <span style={{ fontSize: "medium" }}>
                      any equipment or network on which our site is stored;
                    </span>
                  </p>
                </li>
                <li>
                  <p
                    style={{
                      marginBottom: "0cm",
                      lineHeight: "100%",
                      orphans: 2,
                      widows: 2,
                    }}
                    align="left"
                  >
                    <span style={{ fontSize: "medium" }}>
                      any software used in the provision of our site; or
                    </span>
                  </p>
                </li>
                <li>
                  <p
                    style={{
                      marginBottom: "1.83cm",
                      lineHeight: "100%",
                      orphans: 2,
                      widows: 2,
                    }}
                    align="left"
                  >
                    <span style={{ fontSize: "medium" }}>
                      any equipment or network or software owned or used by any
                      third party.
                    </span>
                  </p>
                </li>
              </ul>
            </li>
          </ul>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>Interactive services</span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              We may from time to time provide interactive services on our site,
              including, without limitation:
            </span>
          </p>
          <ul>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>Chat rooms.</span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0.92cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>Bulletin boards.</span>
              </p>
            </li>
          </ul>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              Where we do provide any interactive service, we will provide clear
              information to you about the kind of service offered, if it is
              moderated and what form of moderation is used (including whether
              it is human or technical).
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              We will do our best to assess any possible risks for users (and in
              particular, for children) from third parties when they use any
              interactive service provided on our site, and we will decide in
              each case whether it is appropriate to use moderation of the
              relevant service (including what kind of moderation to use) in the
              light of those risks. However, we are under no obligation to
              oversee, monitor or moderate any interactive service we provide on
              our site, and we expressly exclude our liability for any loss or
              damage arising from the use of any interactive service by a user
              in contravention of our content standards, whether the service is
              moderated or not.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              The use of any of our interactive services by a minor is subject
              to the consent of their parent or guardian. We advise parents who
              permit their children to use an interactive service that it is
              important that they communicate with their children about their
              safety online, as moderation is not fool proof. Minors who are
              using any interactive service should be made aware of the
              potential risks to them.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              Where we do moderate an interactive service, we will normally
              provide you with a means of contacting the moderator, should a
              concern or difficulty arise.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <br />{" "}
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>Content standards</span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              These content standards apply to any and all material which you
              contribute to our site (Contribution), and to any interactive
              services associated with it.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              The Content Standards must be complied with in spirit as well as
              to the letter. The standards apply to each part of any
              Contribution as well as to its whole.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              <strong>cfsquad </strong>
            </span>
            <span style={{ fontSize: "medium" }}>
              will determine, in its discretion, whether a Contribution breaches
              the Content Standards.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>A Contribution must:</span>
          </p>
          <ul>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Be accurate (where it states facts).
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Be genuinely held (where it states opinions).
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0.92cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Comply with the law applicable in England and Wales and in any
                  country from which it is posted.
                </span>
              </p>
            </li>
          </ul>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>A Contribution must not:</span>
          </p>
          <ul>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Be defamatory of any person.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Be obscene, offensive, hateful or inflammatory.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Bully, insult, intimidate or humiliate.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Promote sexually explicit material.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Include child sexual abuse material.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>Promote violence.</span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Promote discrimination based on race, sex, religion,
                  nationality, disability, sexual orientation or age.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Infringe any copyright, database right or trade mark of any
                  other person.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Be likely to deceive any person.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Breach any legal duty owed to a third party, such as a
                  contractual duty or a duty of confidence.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Promote any illegal activity.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Be in contempt of court.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Be threatening, abuse or invade another's privacy, or cause
                  annoyance, inconvenience or needless anxiety.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Be likely to harass, upset, embarrass, alarm or annoy any
                  other person.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Impersonate any person, or misrepresent your identity or
                  affiliation with any person.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Give the impression that the Contribution emanates from{" "}
                </span>
                <span style={{ fontSize: "medium" }}>
                  <strong>cfsquad</strong>
                </span>
                <span style={{ fontSize: "medium" }}>
                  , if this is not the case.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Advocate, promote, incite any party to commit, or assist any
                  unlawful or criminal act such as (by way of example only)
                  copyright infringement or computer misuse.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Contain a statement which you know or believe, or have
                  reasonable grounds for believing, that members of the public
                  to whom the statement is, or is to be, published are likely to
                  understand as a direct or indirect encouragement or other
                  inducement to the commission, preparation or instigation of
                  acts of terrorism.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0.92cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Contain any advertising or promote any services or web links
                  to other sites.
                </span>
              </p>
            </li>
          </ul>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>Breach of this policy</span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              When we consider that a breach of this acceptable use policy has
              occurred, we may take such action as we deem appropriate.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              Failure to comply with this acceptable use policy constitutes a
              material breach of the website terms and conditions upon which you
              are permitted to use our site, and may result in our taking all or
              any of the following actions:
            </span>
          </p>
          <ul>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Immediate, temporary or permanent withdrawal of your right to
                  use our site.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Immediate, temporary or permanent removal of any Contribution
                  uploaded by you to our site.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Issue of a warning to you.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Legal proceedings against you for reimbursement of all costs
                  on an indemnity basis (including, but not limited to,
                  reasonable administrative and legal costs) resulting from the
                  breach.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Further legal action against you.
                </span>
              </p>
            </li>
            <li>
              <p
                style={{
                  marginBottom: "0.92cm",
                  lineHeight: "100%",
                  orphans: 2,
                  widows: 2,
                }}
                align="left"
              >
                <span style={{ fontSize: "medium" }}>
                  Disclosure of such information to law enforcement authorities
                  as we reasonably feel is necessary or as required by law.
                </span>
              </p>
            </li>
          </ul>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              We exclude our liability for all action we may take in response to
              breaches of this acceptable use policy. The actions we may take
              are not limited to those described above, and we may take any
              other action we reasonably deem appropriate.
            </span>
          </p>
          <p
            style={{
              marginBottom: "0.53cm",
              lineHeight: "100%",
              orphans: 2,
              widows: 2,
            }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              Which country's laws apply to any disputes?
            </span>
          </p>
          <p
            style={{ marginBottom: "0cm", orphans: 2, widows: 2 }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              If you are a consumer, please note that the terms of this policy,
              its subject matter and its formation are governed by Indian law.
              You and we both agree that the courts of India will have exclusive
              jurisdiction.
            </span>
          </p>
          <p
            style={{ marginBottom: "0cm", orphans: 2, widows: 2 }}
            align="left"
          >
            &nbsp;
          </p>
          <p
            style={{ marginBottom: "0cm", orphans: 2, widows: 2 }}
            align="left"
          >
            <span style={{ fontSize: "medium" }}>
              If you are a business, the terms of this policy, its subject
              matter and its formation (and any non-contractual disputes or
              claims) are governed by Indian law. We both agree to the exclusive
              jurisdiction of the courts of India.
            </span>
          </p>
          <p
            style={{ marginBottom: "0cm", orphans: 2, widows: 2 }}
            align="left"
          >
            &nbsp;
          </p>
          <p>&nbsp;</p>
        </>
      </div>
      <Footer />
    </AnimationRevealPage>
  );
};
