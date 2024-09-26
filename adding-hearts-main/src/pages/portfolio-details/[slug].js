import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Portfolio_Details } from "@/component/Section/Page-Portfolio-Details";
import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Portfolio_Details_Page() {
  const router = useRouter();
  const {slug} = router.query;

  const { data: Portfolio_Details_Data } = useFetchData(
    slug ? `/json/data/${slug}.json` : null
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
        meta_data={data_seo_data.portfolio_detail_meta}
        comman_meta={data_seo_data}
      />
      {/* <Header initialValues={Header_Data} /> */}
      <Portfolio_Details initialValues={Portfolio_Details_Data} />
      <Footer initialValues={Footer_Data} />
    </>
  );
}
