import React, { Component } from "react";
import Head from "next/head";
import Hero from "../components/Index/Hero";
import About from "./about";

class Home extends Component {
  componentDidMount() {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }

  render() {
    return (
      <div>
        <Head>
          <meta name="description" content="Actionable Amazon Associates link validation to increase your conversion rate and drive more affiliate sales." />
        </Head>
        <Hero />
        <About />
      </div>
    );
  }
}

export default Home;
