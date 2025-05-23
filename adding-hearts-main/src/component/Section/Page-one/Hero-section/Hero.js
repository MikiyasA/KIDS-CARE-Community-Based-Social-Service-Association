import { Group } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";

export default function Hero({ initialValues }) {
  const [isOpen, setOpen] = useState(false);

  const OpenPopUp = () => {
    setOpen(!isOpen);
    document.getElementById("open-popup").click();
  };

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <>
          <section
            id="hero"
            className="hero-section wc-one-page-hero d-flex"
            key={index}
          >
            <div className="hero-main">
              <svg
                width="204"
                height="417"
                viewBox="0 0 204 417"
                fill="none"
                className="Hero_svg_"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Extended_image wrap_1"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M187.511 230.298C184.887 277.513 204.676 329.622 174.658 366.154C143.169 404.475 88.2366 406.971 38.8285 411.245C-17.343 416.105 -76.8719 424.699 -122.721 391.88C-175.004 354.457 -227.653 293.128 -213.962 230.298C-200.562 168.801 -111.694 168.633 -64.9054 126.544C-23.3267 89.1412 -16.1282 13.2408 38.8285 2.89768C96.576 -7.97071 158.489 29.2587 190.65 78.4468C219.45 122.495 190.432 177.748 187.511 230.298Z"
                  stroke="#CFFF8D"
                  strokeOpacity="0.3"
                  strokeWidth="0.5"
                />
                <path
                  id="Extended_image wrap_2"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M168.991 228.194C166.617 270.852 184.517 317.932 157.365 350.938C128.884 385.561 79.1963 387.816 34.5062 391.677C-16.3014 396.068 -70.1458 403.833 -111.617 374.182C-158.907 340.37 -206.528 284.96 -194.145 228.194C-182.025 172.632 -101.643 172.481 -59.322 134.454C-21.7138 100.661 -15.2026 32.0862 34.5063 22.7414C86.7393 12.9219 142.74 46.5581 171.83 90.9989C197.88 130.796 171.633 180.716 168.991 228.194Z"
                  stroke="#CFFF8D"
                  strokeOpacity="0.3"
                  strokeWidth="0.5"
                />
                <path
                  id="Extended_image wrap_3"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M149.442 225.974C147.333 263.821 163.238 305.592 139.111 334.877C113.804 365.596 69.6538 367.596 29.9438 371.022C-15.202 374.918 -63.0461 381.807 -99.896 355.499C-141.916 325.5 -184.231 276.339 -173.227 225.974C-162.457 176.677 -91.0332 176.542 -53.4285 142.803C-20.0112 112.821 -14.2256 51.9786 29.9439 43.6874C76.3562 34.9752 126.116 64.8186 151.965 104.248C175.112 139.558 151.79 183.849 149.442 225.974Z"
                  stroke="#CFFF8D"
                  strokeOpacity="0.3"
                  strokeWidth="0.5"
                />
                <path
                  id="Extended_image wrap_4"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M128.864 223.636C127.033 256.42 140.839 292.603 119.897 317.97C97.9308 344.579 59.6089 346.312 25.1412 349.28C-14.0447 352.654 -55.5728 358.622 -87.5581 335.834C-124.031 309.848 -160.759 267.263 -151.209 223.636C-141.861 180.934 -79.8653 180.818 -47.2249 151.592C-18.2191 125.621 -13.1972 72.9179 25.1412 65.7359C65.4266 58.1892 108.618 84.0402 131.054 118.195C151.145 148.781 130.902 187.147 128.864 223.636Z"
                  stroke="#CFFF8D"
                  strokeOpacity="0.3"
                  strokeWidth="0.5"
                />
                <path
                  id="Extended_image wrap_5"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M111.373 221.649C109.779 250.13 121.799 281.563 103.565 303.6C84.4386 326.716 51.0709 328.221 21.0591 330.799C-13.061 333.731 -49.2205 338.915 -77.0707 319.118C-108.829 296.544 -140.809 259.549 -132.493 221.649C-124.353 184.553 -70.3724 184.452 -41.9517 159.063C-16.6957 136.501 -12.3231 90.7163 21.0591 84.4771C56.1364 77.9211 93.744 100.379 113.279 130.05C130.773 156.62 113.147 189.95 111.373 221.649Z"
                  stroke="#CFFF8D"
                  strokeOpacity="0.3"
                  strokeWidth="0.5"
                />
                <path
                  id="Extended_image wrap_6"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M94.9106 219.779C93.5392 244.209 103.88 271.172 88.194 290.075C71.74 309.903 43.035 311.194 17.217 313.406C-12.1352 315.92 -43.2418 320.367 -67.2003 303.386C-94.5204 284.022 -122.032 252.289 -114.878 219.779C-107.876 187.959 -61.438 187.872 -36.9887 166.094C-15.262 146.741 -11.5004 107.468 17.217 102.116C47.3927 96.4923 79.7451 115.756 96.5507 141.207C111.6 163.999 96.437 192.588 94.9106 219.779Z"
                  stroke="#CFFF8D"
                  strokeOpacity="0.3"
                  strokeWidth="0.5"
                />
                <path
                  id="Extended_image wrap_7"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M77.4194 217.792C76.2847 237.918 84.8409 260.131 71.862 275.704C58.2478 292.039 34.497 293.103 13.1349 294.925C-11.1515 296.996 -36.8894 300.66 -56.713 286.67C-79.3179 270.717 -102.081 244.575 -96.1618 217.792C-90.3681 191.577 -51.9452 191.506 -31.7156 173.564C-13.7386 157.62 -10.6262 125.266 13.1349 120.857C38.1026 116.224 64.8713 132.094 78.7764 153.062C91.2285 171.838 78.6823 195.391 77.4194 217.792Z"
                  stroke="#CFFF8D"
                  strokeOpacity="0.3"
                  strokeWidth="0.5"
                />
                <path
                  id="Extended_image wrap_8"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M58.8993 215.688C58.0153 231.258 64.6817 248.441 54.5693 260.488C43.962 273.125 25.4567 273.948 8.81261 275.357C-10.1099 276.959 -30.1634 279.794 -45.6087 268.971C-63.2212 256.63 -80.9568 236.407 -76.3449 215.688C-71.8308 195.409 -41.8939 195.354 -26.1322 181.474C-12.1256 169.14 -9.70064 144.112 8.81262 140.701C28.266 137.117 49.1226 149.394 59.9566 165.614C69.6586 180.139 59.8833 198.359 58.8993 215.688Z"
                  stroke="#CFFF8D"
                  strokeOpacity="0.3"
                  strokeWidth="0.5"
                />
                <path
                  id="Extended_image wrap_9"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.3503 213.584C38.7308 224.597 43.4025 236.751 36.3159 245.272C28.8824 254.21 15.9142 254.792 4.2502 255.789C-9.01045 256.923 -23.0637 258.927 -33.8876 251.272C-46.2302 242.543 -58.6591 228.239 -55.4271 213.584C-52.2637 199.24 -31.2843 199.201 -20.2387 189.384C-10.4231 180.66 -8.72366 162.957 4.2502 160.544C17.8829 158.009 32.4989 166.693 40.0913 178.166C46.8903 188.44 40.0399 201.327 39.3503 213.584Z"
                  stroke="#CFFF8D"
                  strokeOpacity="0.3"
                  strokeWidth="0.5"
                />
                <path
                  id="Extended_image wrap_10"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M22.8881 211.714C22.4913 218.676 25.4833 226.36 20.9447 231.747C16.1839 237.397 7.87838 237.765 0.408196 238.395C-8.08458 239.112 -17.085 240.379 -24.0171 235.54C-31.9219 230.022 -39.882 220.979 -37.8121 211.714C-35.7861 202.646 -22.3499 202.622 -15.2757 196.415C-8.98928 190.9 -7.9009 179.708 0.408198 178.183C9.13924 176.581 18.5001 182.07 23.3626 189.323C27.717 195.818 23.3297 203.966 22.8881 211.714Z"
                  stroke="#CFFF8D"
                  strokeOpacity="0.3"
                  strokeWidth="0.5"
                />
              </svg>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="wc-hero">
                    <h1 data-aos="fade-up" data-aos-duration="1500">
                      {data.title}
                    </h1>
                    <div
                      className="wc-btn"
                      data-aos="zoom-in"
                      data-aos-duration="1500"
                    >
                      <Link
                        href={data.donat_btn_slug}
                        className="btn btn-primary"
                      >
                        {data.donat_btn_label}
                      </Link>
                      {/* <Link
                        href={data.watch_btn_slug}
                        target="_blank"
                        onClick={e => {
                          e.preventDefault();
                          OpenPopUp();
                        }}>
                        <button className="btn btn-outline-primary lets-play btn-watch-video">
                          {data.watch_btn_label}
                        </button>
                      </Link> */}
                    </div>
                  </div>
                  <div
                    className="wc-img"
                    data-aos="zoom-in"
                    data-aos-duration="2000"
                  >
                    {/* <Link
                      href={data.watch_btn_slug}
                      target="_blank"
                      onClick={e => {
                        e.preventDefault();
                        OpenPopUp();
                      }}>
                      <button
                        className="mouse-scroll lets-play btn-watch-video"
                        data-aos="fade-down"
                        data-aos-duration="1500">
                        {" "}
                        <span className="mouse">
                          <i className="fa fa-play"></i>
                        </span>
                      </button>
                    </Link> */}
                    <Group justify="center" w={"100%"}>
                      <Image
                        src={data.image}
                        alt={data.alt}
                        width={700}
                        height={400}
                        style={{ maxWidth: 1000 }}
                        priority
                      />
                    </Group>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {isOpen ? (
            <div className={isOpen ? "active" : ""} id="video-wrap">
              <span
                className="video-overlay"
                onClick={(e) => {
                  e.preventDefault();
                  OpenPopUp();
                }}
              ></span>
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/kOISEM6L4xk?autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=kOISEM6L4xk"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen=""
                ></iframe>
              </div>
              <button
                className="close-video"
                onClick={(e) => {
                  e.preventDefault();
                  OpenPopUp();
                }}
              ></button>
            </div>
          ) : (
            ""
          )}

          {/* <ModalVideo
            channel="youtube"
            youtube={{ mute: 0, autoplay: 0 }}
            isOpen={isOpen}
            videoId="L61p2uyiMSo"
            onClose={() => setOpen(false)}
          />

          <button className="btn-primary" onClick={() => setOpen(true)}>
            VIEW DEMO
          </button> */}
        </>
      );
    })
  );
}
