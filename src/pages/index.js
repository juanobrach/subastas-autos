import React from "react";

import Layout from "@common/Layout";
import Navbar from "@common/Navbar";

import Header from "@sections/Header";
import ComoVender from "@sections/ComoVender";
import QuienesSomos from "@sections/QuienesSomos";
import Faq from "@sections/Faq";
import Footer from "@sections/Footer";

const IndexPage = () => (
  <Layout>
    <Navbar />
    <Header />
    <ComoVender />
    <QuienesSomos />
    <Faq />
    <Footer />
  </Layout>
);

export default IndexPage
