import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Hero({ initialValues }) {
  // console.log(initialValues);

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="wc-about-us" key={index}>
          <div className="container p-0">
            <div className="row">
              <div className="col-12 p-0">
                <div
                  className="wc-about-bg"
                  style={{
                    backgroundImage: `url(${data.image})`,
                  }}
                >
                  <h2 dta-aosa="fade-up" data-aos-duration="1500"  style={{ color: "#ffffff"}}>
                    {data.title}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
}
