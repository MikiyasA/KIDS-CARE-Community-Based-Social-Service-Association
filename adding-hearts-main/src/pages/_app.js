import Footer from "@/Layout/Footer";
import Header from "@/Layout/Header";
import { useFetchData } from "@/component/comman";
import "@/styles/global.css";
import Aos from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Head from "next/head";

import { createTheme, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { Notifications } from "@mantine/notifications";
import { SessionProvider } from "next-auth/react";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "cyan",
});

// Initialize Font Awesome by adding icons to the library
library.add(fas, far, fab);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  // Get the current URL path using the router
  let router = useRouter();

  // Define a state variable to handle loading state
  const [loading, setLoading] = useState(true);
  const [classes, setclasses] = useState("");
  const [NotFooter, setNotFooter] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (isClient) {
      // Call `dom.watch()` to replace `<i>` tags with SVG icons
      dom.watch({ compat: true });
    }

    if (router.asPath === "/#" || router.asPath === "/") {
      document.body.classList.add("transperent");
    } else if (router.asPath === "/about-us") {
      document.body.classList.add("main-about-us");
    } else if (router.asPath !== "/" || router.asPath !== "/about-us") {
      document.body.classList.remove("main-about-us");
      document.body.classList.remove("transperent");
    }

    if (router.asPath === "/portfolio") {
      setclasses("portfolio-page");
    } else if (router.asPath === "/contact") {
      setclasses("contact-page");
    } else if (router.asPath === "/portfolio-details") {
      setclasses("portfolio-details-page");
    } else {
      setclasses(" ");
    }

    if (
      router.asPath === "/donation-form" ||
      router.asPath === "/donation-success"
    ) {
      setNotFooter(false);
    } else {
      setNotFooter(true);
    }

    Aos.init({
      once: false,
    });

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [router.asPath, isClient]);

  // Define a loading screen component
  const LoadingScreen = () => (
    <div className="preloader">
      <div className="preloader-inner">
        {/* <Image
          src="/images/loader-logo.png"
          alt="loader logo"
          width={128}
          height={19}
        /> */}
        <div className="preloader-icon">
          {"KSCBSSA Ethiopia".split(" ").map((char, index) => (
            <span key={index} style={{ "--i": index + 1 }}>
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const { data: Header_Data } = useFetchData("/json/data/header.json");
  const { data: Footer_Data } = useFetchData("/json/data/footer.json");

  // Determine if the page is still loading
  const isLoading = loading || !Header_Data || !Footer_Data;

  return isLoading ? (
    <LoadingScreen />
  ) : (
    <SessionProvider session={session}>
      <MantineProvider theme={theme}>
        <Head>
          <title>Donation</title>
          <link href="images/Site-logo.png" rel="icon" />
          <link
            rel="stylesheet"
            href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
          />
        </Head>

        <Header initialValues={Header_Data} />
        <div className="main-wrapper">
          {NotFooter === false ? (
            <>
              <div className={`page ${classes}`}>
                <ModalsProvider>
                  <Notifications />
                  <Component {...pageProps} />
                </ModalsProvider>
              </div>
            </>
          ) : (
            <>
              <div className={`page ${classes}`}>
                <ModalsProvider>
                  <Notifications />
                  <Component {...pageProps} />
                </ModalsProvider>
              </div>
            </>
          )}
        </div>
      </MantineProvider>
    </SessionProvider>
  );
}
