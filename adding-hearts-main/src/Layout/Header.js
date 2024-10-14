import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Group } from "@mantine/core";

import UserAction from "@/component/Additional/Section/UserAction";

export default function Header({ initialValues }) {
  // console.log(initialValues);
  const [isScrolled, setIsScrolled] = useState(false);
  const [OpenMenu, setOpenMenu] = useState(false);

  const router = useRouter();

  const acitive_class_slug = (slug) => {
    if (router.asPath === slug) {
      return router.asPath === slug ? { fontWeight: "600" } : "";
    } else if (router.asPath === "/404") {
      return slug === "/page" ? "active" : "";
    }
  };

  const handelOpenMenu = (e) => {
    e.preventDefault();
    setOpenMenu((prevClass) => !prevClass);
  };

  useEffect(() => {
    // Function to handle the scroll event
    let handleScroll = {};
    if (router.asPath === "/about-us") {
      handleScroll = () => {
        if (window.scrollY > 100) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
    } else {
      handleScroll = () => {
        if (window.scrollY > 0) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
    }

    // Attach the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [router.asPath]); // Empty dependency array means this effect runs once after initial render

  const headerClasses = isScrolled ? "header-scrolled" : "";

  const [VideoPopup, setVideoPopup] = useState(false);

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <header
          id="header"
          className={`d-flex align-items-center ${headerClasses}`}
          style={{ zIndex: VideoPopup ? 0 : 150 }}
          key={index}
        >
          <span
            className="d-none"
            id="open-popup"
            onClick={(e) => {
              setVideoPopup(!VideoPopup);
            }}
          />
          <div className="container p-0">
            <div className="row align-items-center">
              <div className="col-md-12 col-lg-12 col-xl-12 col-6 no-caret-1 ">
                <nav
                  id="navbar"
                  className={`navbar order-last order-lg-0 ${
                    OpenMenu === true ? "nav-menu-active navbar-mobile" : " "
                  }`}
                >
                  <div className="logo no-caret">
                    <Link href="/">
                      <Image
                        src={
                          router.asPath === "/" || router.asPath === "/#"
                            ? data.logo
                            : data.dark_logo
                        }
                        alt="../"
                        width={188}
                        height={49}
                        priority={true}
                      />
                    </Link>
                  </div>
                  <div className="menu-svg-2">
                    <svg
                      width="379"
                      height="375"
                      viewBox="0 0 379 375"
                      className="menu-svg"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="Extended_image wrap_1"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M363.658 207.092C361.299 249.528 379.085 296.364 352.105 329.199C323.804 363.642 274.43 365.885 230.022 369.727C179.536 374.094 126.031 381.819 84.8221 352.321C37.8307 318.685 -9.48942 263.563 2.81549 207.092C14.8594 151.819 94.7334 151.668 136.787 113.838C174.158 80.2208 180.628 12.002 230.022 2.7056C281.926 -7.06285 337.573 26.3987 366.479 70.6088C392.364 110.199 366.283 159.861 363.658 207.092Z"
                        stroke="#fff"
                        strokeOpacity="0.17"
                        strokeWidth="0.5"
                      />
                      <path
                        id="Extended_image wrap_2"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M347.012 205.201C344.878 243.542 360.966 285.857 336.562 315.523C310.964 346.642 266.305 348.668 226.138 352.139C180.472 356.085 132.077 363.064 94.8025 336.414C52.2984 306.024 9.49688 256.222 20.6268 205.201C31.5207 155.262 103.767 155.126 141.805 120.948C175.607 90.5748 181.46 28.9401 226.138 20.541C273.084 11.7153 323.418 41.9474 349.563 81.8905C372.977 117.66 349.387 162.528 347.012 205.201Z"
                        stroke="#fff"
                        strokeOpacity="0.17"
                        strokeWidth="0.5"
                      />
                      <path
                        id="Extended_image wrap_3"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M329.441 203.205C327.546 237.222 341.841 274.766 320.156 301.087C297.41 328.697 257.728 330.495 222.037 333.574C181.46 337.075 138.458 343.268 105.337 319.622C67.5698 292.659 29.538 248.473 39.4276 203.205C49.1075 158.897 113.303 158.777 147.102 128.452C177.138 101.504 182.338 46.8193 222.037 39.3672C263.752 31.5367 308.476 58.3598 331.709 93.799C352.513 125.535 331.551 165.344 329.441 203.205Z"
                        stroke="#fff"
                        strokeOpacity="0.17"
                        strokeWidth="0.5"
                      />
                      <path
                        id="Extended_image wrap_4"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M310.946 201.104C309.301 230.571 321.709 263.092 302.887 285.892C283.143 309.808 248.7 311.365 217.72 314.033C182.5 317.065 145.175 322.429 116.427 301.947C83.645 278.591 50.6339 240.316 59.2179 201.104C67.6199 162.724 123.341 162.619 152.678 136.351C178.748 113.009 183.262 65.6394 217.72 59.1843C253.929 52.4014 292.749 75.6361 312.914 106.334C330.972 133.825 312.778 168.308 310.946 201.104Z"
                        stroke="#fff"
                        strokeOpacity="0.17"
                        strokeWidth="0.5"
                      />
                      <path
                        id="Extended_image wrap_5"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M295.225 199.318C293.792 224.917 304.596 253.168 288.208 272.975C271.017 293.752 241.026 295.105 214.051 297.422C183.384 300.057 150.884 304.717 125.853 286.923C97.3089 266.633 68.5654 233.383 76.0397 199.318C83.3556 165.976 131.873 165.885 157.418 143.066C180.118 122.787 184.048 81.6366 214.051 76.0288C245.579 70.1363 279.38 90.3209 296.939 116.989C312.662 140.871 296.82 170.827 295.225 199.318Z"
                        stroke="#fff"
                        strokeOpacity="0.17"
                        strokeWidth="0.5"
                      />
                      <path
                        id="Extended_image wrap_6"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M280.429 197.638C279.196 219.595 288.491 243.829 274.392 260.819C259.603 278.64 233.803 279.801 210.598 281.789C184.217 284.049 156.258 288.046 134.724 272.783C110.169 255.379 85.4421 226.857 91.872 197.638C98.1655 169.038 139.903 168.959 161.878 149.385C181.406 131.991 184.787 96.6927 210.598 91.8825C237.72 86.8281 266.798 104.142 281.903 127.017C295.429 147.503 281.801 173.199 280.429 197.638Z"
                        stroke="#fff"
                        strokeOpacity="0.17"
                        strokeWidth="0.5"
                      />
                      <path
                        id="Extended_image wrap_7"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M264.708 195.852C263.688 213.941 271.378 233.906 259.713 247.903C247.476 262.585 226.129 263.541 206.929 265.178C185.101 267.04 161.968 270.333 144.15 257.759C123.833 243.421 103.374 219.924 108.694 195.852C113.901 172.29 148.435 172.226 166.618 156.1C182.775 141.77 185.573 112.69 206.929 108.727C229.37 104.563 253.43 118.827 265.927 137.672C277.119 154.549 265.843 175.718 264.708 195.852Z"
                        stroke="#fff"
                        strokeOpacity="0.17"
                        strokeWidth="0.5"
                      />
                      <path
                        id="Extended_image wrap_8"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M248.062 193.961C247.267 207.954 253.259 223.399 244.17 234.226C234.636 245.584 218.004 246.324 203.044 247.591C186.037 249.031 168.013 251.578 154.131 241.851C138.301 230.759 122.36 212.583 126.505 193.961C130.562 175.734 157.469 175.684 171.636 163.209C184.225 152.124 186.405 129.628 203.044 126.562C220.529 123.341 239.275 134.375 249.012 148.954C257.732 162.009 248.946 178.386 248.062 193.961Z"
                        stroke="#fff"
                        strokeOpacity="0.17"
                        strokeWidth="0.5"
                      />
                      <path
                        id="Extended_image wrap_9"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M230.491 192.07C229.935 201.968 234.134 212.892 227.764 220.55C221.083 228.584 209.427 229.107 198.944 230.003C187.025 231.022 174.394 232.824 164.666 225.944C153.572 218.098 142.401 205.241 145.306 192.07C148.149 179.178 167.005 179.142 176.933 170.319C185.755 162.478 187.283 146.566 198.944 144.398C211.197 142.119 224.333 149.924 231.157 160.236C237.268 169.47 231.111 181.053 230.491 192.07Z"
                        stroke="#fff"
                        strokeOpacity="0.17"
                        strokeWidth="0.5"
                      />
                      <path
                        id="Extended_image wrap_10"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M215.695 190.389C215.339 196.646 218.028 203.552 213.948 208.394C209.669 213.473 202.205 213.803 195.49 214.37C187.857 215.014 179.768 216.153 173.537 211.803C166.432 206.844 159.278 198.716 161.138 190.389C162.959 182.239 175.036 182.216 181.394 176.638C187.044 171.681 188.022 161.622 195.49 160.251C203.338 158.811 211.751 163.745 216.122 170.264C220.035 176.102 216.092 183.424 215.695 190.389Z"
                        stroke="#fff"
                        strokeOpacity="0.17"
                        strokeWidth="0.5"
                      />
                    </svg>
                  </div>
                  <ul>
                    {data.menu &&
                      data.menu.map((menu_data, index) => {
                        let subMenu = "";
                        if (menu_data.sub_menu) {
                          subMenu = (
                            <li className="dropdown" key={index}>
                              <Link href={menu_data.slug}>
                                <span>{menu_data.title}</span>{" "}
                                <i className="fa fa-chevron-down"></i>
                              </Link>
                              <ul>
                                {menu_data.sub_menu &&
                                  menu_data.sub_menu.map(
                                    (sub_menu_data, index) => {
                                      return (
                                        <li key={index}>
                                          <Link href={sub_menu_data.slug}>
                                            {sub_menu_data.title}
                                          </Link>
                                        </li>
                                      );
                                    }
                                  )}
                              </ul>
                            </li>
                          );
                        } else {
                          subMenu = (
                            <li key={index}>
                              <Link
                                className="nav-link scrollto"
                                href={menu_data.slug}
                                style={acitive_class_slug(menu_data.slug)}
                              >
                                {menu_data.title}{" "}
                              </Link>
                              {subMenu}
                            </li>
                          );
                        }
                        return subMenu;
                      })}
                  </ul>
                  <div className="wc-btn">
                    <Group>
                      <Link href={data.btn_slug} className="btn btn-primary">
                        {data.btn_label}
                      </Link>
                      <UserAction />
                    </Group>
                  </div>
                </nav>
              </div>
              <div className="col-md-6 col-lg-3 col-xl-3 no-caret col-6">
                <div className="logo no-caret-5">
                  <Link href="/">
                    <Image
                      src={
                        router.asPath === "/" || router.asPath === "/#"
                          ? data.logo
                          : data.dark_logo
                      }
                      alt="../"
                      width={146}
                      height={38}
                      priority={true}
                    />
                  </Link>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 col-xl-2 no-caret-2 col-6">
                <div className="owl-toggle order-2">
                  <Link
                    href="/#"
                    className={`mobile-nav-toggle ${
                      OpenMenu === true ? "nav-toggle-active bi-list bi-x" : " "
                    }`}
                    onClick={(e) => {
                      handelOpenMenu(e);
                    }}
                  >
                    {/* {" "}
                    {OpenMenu === false ? (
                      <i
                        className="fa-solid fa-bars"
                        style={{
                          color: router.asPath === "/" ? "" : "#425F57",
                        }}
                      ></i>
                    ) : (
                      <></>
                    )} */}

                    <i className="fa-solid fa-bars"></i>
                  </Link>
                </div>
                <div className="col-md-3 col-sm-5 d-block d-lg-none wc-btn outer-box">
                  <Group gap={5}>
                    <Link href={data.btn_slug} className="btn btn-primary">
                      {data.btn_label}
                    </Link>
                    <UserAction />
                  </Group>
                </div>
              </div>
            </div>
          </div>
        </header>
      );
    })
  );
}
