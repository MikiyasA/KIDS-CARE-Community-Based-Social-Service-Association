import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Contact } from "@/component/Section/Page-Contact";
import { Head_Meta, useFetchData } from "@/component/comman";

export default function Contact_Pahe() {
  const { data: Contact_Data } = useFetchData("/json/data/contact_page.json");

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
        meta_data={data_seo_data.contact_meta}
        comman_meta={data_seo_data}
      />
      {/* <Header initialValues={Header_Data} /> */}
      <Contact initialValues={Contact_Data} />
      <Footer initialValues={Footer_Data} />
    </>
  );
}
