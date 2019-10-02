import React, { Component } from 'react';
import styled from 'styled-components';
import {
  PageSection,
  CenteredHeading,
  HeroHeadline,
  HeroSubtext,
} from '../components/styles/styles';

const AboutSection = styled.div`
  /* background-color: whitesmoke; */
`;

const AboutHeading = styled.h2`
  /* padding: 20px; */
  /* text-align: center; */
`;

const AboutContent = styled.div`
  /* padding: 0px 40px 0px 40px;
  font-size: 1.25em;
  line-height: 1.5em; */
`;

const ProductTypes = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ProductType = styled.div`
  max-width: 300px;
  padding: 0 50px 0 50px;
`;

const ReportTypes = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ReportType = styled.div`
  max-width: 500px;
  padding: 0 50px 0 50px;
`;

class About extends Component {
  render() {
    return (
      <PageSection>
        <HeroHeadline>Own your affiliate links</HeroHeadline>
        <HeroSubtext>
          Find out which of your Amazon affiliate links are no longer
          up-to-date.
        </HeroSubtext>
        <AboutHeading>Understanding your links</AboutHeading>
        Amazon affiliate links fall into three main categories: available
        products, third-party products, and unavailable products.
        <AboutHeading>Example Amazon Product Availability</AboutHeading>
        <ProductTypes>
          <ProductType>
            <AboutHeading>Available Products</AboutHeading>
            <p>
              Available products are the Internet marketer’s dream. These are
              the products that are shipped and sold by Amazon. They also
              normally offer Prime shipping. We’ve found that these products
              tend to convert the best for Amazon customers.
            </p>
          </ProductType>
          <ProductType>
            <AboutHeading>Third-Party Products</AboutHeading>
            <p>
              Third-party products are anything that is sold by a third-party
              company on Amazon. Often the orders are fulfilled by the
              third-party company. These products tend not to convert as well
              because they typically lack Prime shipping and have extended
              delivery windows.
            </p>
          </ProductType>
          <ProductType>
            <AboutHeading>Unavailable Products</AboutHeading>
            <p>
              Unavailable products are products that are no longer sold on
              Amazon. When people land on these pages from your site, they will
              seldom convert. This is because there’s no path to ordering that
              product. Most of the time, this traffic will bounce back to Google
              and click an available product link on your competition’s site.
            </p>
          </ProductType>
        </ProductTypes>
        <AboutHeading>How does Anchor Float help?</AboutHeading>
        <p>
          We parse your site and send you a report summary and a report
          spreadsheet that contain all the information you need to keep your
          Amazon affiliate links healthy.
        </p>
        <ReportTypes>
          <ReportType>
            <AboutHeading>Report Summary</AboutHeading>
            <p>
              We send you a one-page cover sheet outlining important KPIs for
              your site. The summary highlights the number and percentage of
              your affiliate links in each category: available, third-party, and
              unavailable. We also include useful information like word count
              per page, affiliate link ratio, and total number of links.
            </p>
          </ReportType>
          <ReportType>
            <AboutHeading>Report Spreadsheet</AboutHeading>
            <p>
              In addition to the report summary, we send you an ultra-detailed
              spreadsheet that tells you exactly what pages your unavailable
              links are on. This information can help you easily locate and
              update links. It's also easy to import into Google Sheets or
              Excel, making it perfect for piping to a VA.
            </p>
          </ReportType>
        </ReportTypes>
        <AboutContent>
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
