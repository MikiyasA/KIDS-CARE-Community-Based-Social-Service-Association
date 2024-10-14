import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import {
  About_US,
  Chariti_Page_Wrapper,
  Hero,
  Help_Me,
  Latest,
  Our_Latest_News,
  Sponser,
  Timeline,
} from "@/component/Section/Page-one";
import { Head_Meta, useFetchData } from "@/component/comman";
import Contact from "@/component/comman/Contact-section/Contact";

export default function Home() {
  const { data: Hero_Data } = useFetchData("/json/data/hero.json");

  const { data: About_US_Data } = useFetchData("/json/data/about_us.json");

  const { data: Help_Me_Data } = useFetchData("/json/data/help_me.json");

  const { data: Timeline_Data } = useFetchData("/json/data/timeline.json");

  const { data: Sponser_Data } = useFetchData("/json/data/sponser.json");

  const { data: Latest_Data } = useFetchData("/json/data/latest.json");

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
        meta_data={data_seo_data.home_meta}
        comman_meta={data_seo_data}
      />
      <Header initialValues={Header_Data} />
      <Hero initialValues={Hero_Data} />
      <About_US initialValues={About_US_Data} />
      {/* <Help_Me initialValues={Help_Me_Data} />{" "} */}
      {/* title changed to Kids Care CBSSA */}
      {/* <Timeline initialValues={Timeline_Data} /> */}
      <Sponser initialValues={Sponser_Data} />
      {/* <Latest initialValues={Latest_Data} /> */}
      <Chariti_Page_Wrapper initialValues={Chariti_Page_Wrapper_Data} />
      {/* <Our_Latest_News initialValues={Our_Latest_News_Data} /> */}
      <Contact initialValues={Contact_Data} />
      <Footer initialValues={Footer_Data} />
    </>
  );
}
