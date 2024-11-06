import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { About_US, Hero, What_We } from "@/component/Section/Page-about-us";
import {
  Chariti_Page_Wrapper,
  Our_Latest_News,
} from "@/component/Section/Page-one";
import { Head_Meta, useFetchData } from "@/component/comman";
import Contact from "@/component/comman/Contact-section/Contact";

export default function About_us() {
  const { data: Hero_Data } = useFetchData("/json/data/about_hero.json");

  const { data: About_US_Data } = useFetchData("/json/data/about_us.json");
  const { data: What_We_Data } = useFetchData("/json/data/what_we.json");

  const { data: Chariti_Page_Wrapper_Data } = useFetchData(
    "/json/data/chariti_page_wrapper.json"
  );

  const { data: Our_Latest_News_Data } = useFetchData(
    "/json/data/our_latest_news.json"
  );

  const { data: Contact_Data } = useFetchData("/json/data/contact.json");

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
        meta_data={data_seo_data.about_us_meta}
        comman_meta={data_seo_data}
      />
      {/* <Header initialValues={Header_Data} /> */}
      <Hero initialValues={Hero_Data} />
      <About_US initialValues={About_US_Data} />
      {/* <What_We initialValues={What_We_Data} /> */}
      <Chariti_Page_Wrapper initialValues={Chariti_Page_Wrapper_Data} />
      {/* <Our_Latest_News initialValues={Our_Latest_News_Data} /> */}
      <Contact initialValues={Contact_Data} />
      <Footer initialValues={Footer_Data} />
    </>
  );
}
