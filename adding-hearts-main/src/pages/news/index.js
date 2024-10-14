import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { Latest_News } from "@/component/Section/Page-Latest-News";
import { Head_Meta, useFetchData } from "@/component/comman";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Home() {
  // const { data: Raw_Latest_News_Data } = useFetchData(
  //   "/json/data/latest_news.json"
  // );
  const [Latest_News_Data, setLatestNewsData] = useState([]);

  const fetchNews = async () => {
    try {
      const response = await fetch("/api/news");
      const news = await response.json();

      // Prepare the fetched news in the format you need
      const newNewsDetails = news.map((newsItem) => ({
        slug: `/news-details/${newsItem.id}`,
        cover: newsItem.cover,
        title: newsItem.title,
        date: new Date(
          newsItem.updatedAt || newsItem.createdAt
        ).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
        title: newsItem.title,
        detail: newsItem.detail,
        id: newsItem.id,
      }));
      setLatestNewsData(newNewsDetails);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    }
  };
  console.log({ Latest_News_Data });
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
        meta_data={data_seo_data.news_meta}
        comman_meta={data_seo_data}
      />
      {/* <Header initialValues={Header_Data} /> */}
      <Latest_News initialValues={Latest_News_Data} />
      <Footer initialValues={Footer_Data} />
    </>
  );
}
