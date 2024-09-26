import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Donation_Form } from "@/component/Section/Page-donation-Form";
import { Head_Meta, useFetchData } from "@/component/comman";

export default function Donation_Form_page() {
  const { data: Donation_Form_Data } = useFetchData(
    "/json/data/donation_form.json"
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
        meta_data={data_seo_data.donation_form_meta}
        comman_meta={data_seo_data}
      />

      {/* <Header initialValues={Header_Data} /> */}
      <Donation_Form initialValues={Donation_Form_Data} />
      <Footer initialValues={Footer_Data} />
    </>
  );
}
