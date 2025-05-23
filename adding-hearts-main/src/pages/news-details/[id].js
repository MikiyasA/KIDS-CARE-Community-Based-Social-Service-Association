import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Latest_News_Details } from "@/component/Section/Page-Latest-News-Details";
import { Head_Meta, useFetchData } from "@/component/comman";
import { Title } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function News_details_page() {
  // const { data: Latest_News_Details_Data } = useFetchData(
  //   "/json/data/latest_news_details.json"
  // );

  const route = useRouter();
  const { id } = route.query;

  const [Latest_News_Details_Data, setLatestNewsDetailsData] = useState();

  const fetchNews = async () => {
    try {
      const response = await fetch(`/api/news?id=${id}`);
      const news = await response.json();
      setLatestNewsDetailsData(news);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

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
      {Latest_News_Details_Data && (
        <Latest_News_Details initialValues={Latest_News_Details_Data} />
      )}
      <Footer initialValues={Footer_Data} />
    </>
  );
}
