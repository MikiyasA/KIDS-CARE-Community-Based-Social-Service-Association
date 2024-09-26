import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { About_US, Help_Me } from "@/component/Section/Page-help-me";
import { Head_Meta, useFetchData } from "@/component/comman";
import Contact from "@/component/comman/Contact-section/Contact";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Help() {
  const { data: Contact_Data } = useFetchData("/json/data/contact.json");

  const { data: About_US_Data } = useFetchData("/json/data/about_us2.json");

  const { data: Help_Me_Data } = useFetchData("/json/data/help_me2.json");

  // Fetch Seo data
  const { data: data_seo_data } = useFetchData(
    "/json/data/site_meta_link.json"
  ); // Fetch Seo data using the custom hook

  const { data: Header_Data } = useFetchData("/json/data/header.json");
  const { data: Footer_Data } = useFetchData("/json/data/footer.json");
  return (
    <>
      {/* Render the Seo component with SeoData */}
      <Head_Meta
        meta_data={data_seo_data.help_me_meta}
        comman_meta={data_seo_data}
      />
      {/* <Header initialValues={Header_Data} /> */}
      <Help_Me initialValues={Help_Me_Data} />
      <About_US initialValues={About_US_Data} />
      <Contact initialValues={Contact_Data} />
      <Footer initialValues={Footer_Data} />
    </>
  );
}
