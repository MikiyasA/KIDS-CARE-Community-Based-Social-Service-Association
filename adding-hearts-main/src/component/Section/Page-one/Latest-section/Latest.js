import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Latest({ initialValues }) {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="wc-latest" key={index}>
          <div className="container">
            <div className="row">
              <div className="col-12 p-0">
                <div className="latest-title">
                  <h2 data-aos="fade-up" data-aos-duration="1500">
                    {data.title}
                  </h2>
                  <p data-aos="fade-up" data-aos-duration="1500">
                    {data.label}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 p-0">
                <div className="latest-image-content">
                  <Image
                    src={data.image}
                    alt={data.alt}
                    data-aos="zoom-in-up"
                    data-aos-duration="2000"
                    width={720}
                    height={481}
                  />
                  <p
                    className="date"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                  >
                    {data.date}
                  </p>
                  <h2 data-aos="fade-up" data-aos-duration="1500">
                    <Link href={data.slug}>{data.description}</Link>
                  </h2>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 p-0">
                <div className="single-cause-item">
                  {data.detail &&
                    data.detail.map((detail_data, index) => {
                      return (
                        <div
                          className="cause-content"
                          data-aos="fade-up"
                          data-aos-duration="1500"
                          key={index}
                        >
                          <div className="cause-meta">
                            <p className="date">{detail_data.date}</p>
                            <Link href={detail_data.slug}>
                              <i className="fas fa-arrow-right"></i>
                            </Link>
                          </div>
                          <h2>
                            <Link href={detail_data.slug}>
                              {detail_data.title}
                            </Link>
                          </h2>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
}
