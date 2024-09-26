import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Donation_Success } from "@/component/Section/Page-donation-Success";
import { Head_Meta, useFetchData } from "@/component/comman";

export default function Donation_Success_page() {
  const { data: Donation_Success_Data } = useFetchData(
    "/json/data/donation_success.json"
  );

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
        meta_data={data_seo_data.donation_sucess_meta}
        comman_meta={data_seo_data}
      />
      {/* <Header initialValues={Header_Data} /> */}
      <Donation_Success initialValues={Donation_Success_Data} />
      <Footer initialValues={Footer_Data} />
    </>
  );
}
