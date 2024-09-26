import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Donation } from "@/component/Section/Page-donation";
import { Head_Meta, useFetchData } from "@/component/comman";
import Contact from "@/component/comman/Contact-section/Contact";

export default function Donation_page() {
  const { data: Contact_Data } = useFetchData("/json/data/contact.json");

  const { data: Donation_Data } = useFetchData("/json/data/donation.json");

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
        meta_data={data_seo_data.donation_meta}
        comman_meta={data_seo_data}
      />
      {/* <Header initialValues={Header_Data} /> */}
      <Donation initialValues={Donation_Data} />
      <Contact initialValues={Contact_Data} />
      <Footer initialValues={Footer_Data} />
    </>
  );
}
