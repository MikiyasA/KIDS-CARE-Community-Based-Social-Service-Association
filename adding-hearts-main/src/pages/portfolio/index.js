import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Portfolio } from "@/component/Section/Page-Portfolio";
import { Head_Meta, useFetchData } from "@/component/comman";

export default function Portfolio_Page() {
  const { data: Portfolio_Data } = useFetchData("/json/data/portfolio.json");

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
        meta_data={data_seo_data.news_details_meta}
        comman_meta={data_seo_data}
      />
      {/* <Header initialValues={Header_Data} /> */}
      <Portfolio initialValues={Portfolio_Data} />
      <Footer initialValues={Footer_Data} />
    </>
  );
}
