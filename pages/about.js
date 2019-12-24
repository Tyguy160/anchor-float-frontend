import React, { Component } from "react";
import styled from "styled-components";
import Router from "next/router";
import {
  PageSection,
  ComponentContainer,
  CTAButton,
  CTAButtonContainer,
  CenteredHeading,
  HeroHeadline,
  HeroSubtext
} from "../components/styles/styles";

const AboutSection = styled.div`
  /* min-height: 50vh; */
  /* width: 100%; */
  padding-top: 10px;
  /* max-width: 1200px; */
  padding-bottom: 10px;
`;

const AboutH1 = styled.h1`
  text-align: center;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const AboutH2 = styled.h2`
  text-align: center;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`;

const AboutContent = styled.div`
  padding-left: 40px;
  padding-right: 40px;
  max-width: 1000px;
`;

const ProductTypes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* padding-top: 20px;
  padding-bottom: 20px; */
`;

const ProductType = styled.div`
  max-width: 300px;
  display: grid;
  padding: 20px 50px 20px 50px;
`;

const ProductTypeImg = styled.img`
  max-width: 100%;
  /* background-color: gray; */
`;

const ProductTypeDescription = styled.div`
  max-width: 100%;
`;

const ReportTypes = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const ReportType = styled.div`
  display: grid;
  max-width: 500px;
  justify-items: center;
  padding: 20px 50px 20px 50px;
`;

const ReportTypeImg = styled.img`
  max-width: 100%;
  padding: 40px;
  /* background-color: gray; */
`;

const ReportTypeDescription = styled.div`
  max-width: 100%;
`;

class About extends Component {
  render(props) {
    return (
      <PageSection>
        <AboutSection>
          <AboutH1>Understanding Your Links</AboutH1>
          <AboutContent>
            Amazon affiliate links fall into three main categories: available
            products, third-party products, and unavailable products.
          </AboutContent>
        </AboutSection>
        <AboutSection>
          <AboutH2>Example Amazon Product Availability</AboutH2>
          <ProductTypes>
            <ProductType>
              <ProductTypeImg src="/availableProduct.png"></ProductTypeImg>
              <ProductTypeDescription>
                <h3>Available Products</h3>
                <p>
                  Available products are the Internet marketer’s dream. These
                  are the products that are shipped and sold by Amazon. They
                  also normally offer Prime shipping. We’ve found that these
                  products tend to convert the best for Amazon customers.
                </p>
              </ProductTypeDescription>
            </ProductType>
            <ProductType>
              <ProductTypeImg src="/thirdPartyProduct.png"></ProductTypeImg>
              <ProductTypeDescription>
                <h3>Third-Party Products</h3>
                <p>
                  Third-party products are anything that is sold by a
                  third-party company on Amazon. Often the orders are fulfilled
                  by the third-party company. These products tend not to convert
                  as well because they typically lack Prime shipping and have
                  extended delivery windows.
                </p>
              </ProductTypeDescription>
            </ProductType>
            <ProductType>
              <ProductTypeImg src="/unavailableProduct.png"></ProductTypeImg>
              <ProductTypeDescription>
                <h3>Unavailable Products</h3>
                <p>
                  Unavailable products are products that are no longer sold on
                  Amazon. When people land on these pages from your site, they
                  will seldom convert. This is because there’s no path to
                  ordering that product. Most of the time, this traffic will
                  bounce back to Google and click an available product link on
                  your competition’s site.
                </p>
              </ProductTypeDescription>
            </ProductType>
          </ProductTypes>
        </AboutSection>
        <AboutSection>
          <AboutH2>How does Anchor Float help?</AboutH2>
          <AboutContent>
            We parse your site and send you a report summary and a report
            spreadsheet that contain all the information you need to keep your
            Amazon affiliate links healthy.
          </AboutContent>
        </AboutSection>
        <AboutSection>
          <ReportTypes>
            <ReportType>
              <ReportTypeDescription>
                <h3>Report Summary</h3>
                <p>
                  We send you a one-page cover sheet outlining important KPIs
                  for your site. The summary highlights the number and
                  percentage of your affiliate links in each category:
                  available, third-party, and unavailable. We also include
                  useful information like word count per page, affiliate link
                  ratio, and total number of links.
                </p>
              </ReportTypeDescription>
              <ReportTypeImg src="/reportSummary.png"></ReportTypeImg>
            </ReportType>
            <ReportType>
              <ReportTypeDescription>
                <h3>Report Spreadsheet</h3>
                <p>
                  In addition to the report summary, we send you an
                  ultra-detailed spreadsheet that tells you exactly what pages
                  your unavailable links are on. This information can help you
                  easily locate and update links. It's also easy to import into
                  Google Sheets or Excel, making it perfect for piping to a VA.
                </p>
              </ReportTypeDescription>
              <ReportTypeImg src="/reportSpreadsheet.png"></ReportTypeImg>
            </ReportType>
          </ReportTypes>
        </AboutSection>
        <AboutSection>
          <AboutH2>Ready to learn about your links?</AboutH2>
          <CTAButtonContainer>
            <CTAButton onClick={() => Router.push("/signup")}>
              Sign Up
            </CTAButton>
          </CTAButtonContainer>
        </AboutSection>
        {/* <AboutContent>
          <AboutHeading>How It Works</AboutHeading>
          When you purchase an Anchor Float report, we take your sitemap(s) and
          inspect every link on your domain. The summary and spreadsheet are
          then populated with the findings. Once that's done, we send the files
          to you so you can begin fixing problematic affiliate links on your
          site.
        </AboutContent>
        {/* <AboutHeading>Why We Started Associate Shield</AboutHeading>
        <AboutContent>
          <p>
            In 2017, two friends started a niche content marketing site
            together. Soon after getting into the process of writing, guest
            posting, and acquiring backlinks, we began setting up our site for
            Amazon Associates.
          </p>

          <p>
            It's no secret that affiliate sites take tremendous amounts of work
            and patience. What we didn't anticipate, however, was how easy it
            was for things to go wrong on previously written pieces of content.
          </p>
          <p>Things constantly change in the world of an affilate site...</p>
          <div style={{ display: `grid`, justifyContent: `center` }}>
            <p>Backlinks are lost.</p>
            <p>Keywords are gained.</p>
            <p>Amazon products become unavailable.</p>
          </div>
          <p>
            These ever changing aspects are what led us to creating Associate
            Shield. Our goal with this service is to make running an Amazon
            affiliate site easier on you.
          </p>
          <p>We hope Associate Shield brings you value.</p>
          <p style={{ textAlign: `right`, paddingRight: `200px` }}>
            Cordially,
          </p>
          <p style={{ textAlign: `right` }}>The Associate Shield Team</p>
        </AboutContent> */}
      </PageSection>
    );
  }
}

export default About;
