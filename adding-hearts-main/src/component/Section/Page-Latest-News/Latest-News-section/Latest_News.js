import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Latest_News({ initialValues }) {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="wc-news" key={index}>
          <div className="container p-0">
            <div className="row">
              <div className="col-12 p-0">
                <div className="news-title">
                  <h2 data-aos="fade-down" data-aos-duration="1500">
                    {data.title}
                  </h2>
                  <p data-aos="fade-up" data-aos-duration="1500">
                    {data.label}
                  </p>
                </div>
                <div className="news-wrapper">
                  {data.detail &&
                    data.detail.map((detail_data, index) => {
                      return (
                        <div
                          className="news-content"
                          data-aos="zoom-in"
                          data-aos-duration="1500"
                          key={index}
                        >
                          <Link href={detail_data.slug}>
                            <Image
                              src={detail_data.image}
                              alt={detail_data.alt}
                              width={472}
                              height={300}
                              priority={true}
                            />
                          </Link>
                          <div className="date">
                            <p>{detail_data.date}</p>
                            <Link href={detail_data.slug}>
                              <i className="fa fa-arrow-right"></i>
                            </Link>
                          </div>
                          <h2>
                            <Link href={detail_data.slug}>
                              {detail_data.label}
                            </Link>
                          </h2>
                        </div>
                      );
                    })}
                </div>
                <div
                  className="wc-btn"
                  data-aos="fade-up"
                  data-aos-duration="1500"
                >
                  <Link href={data.btn_slug} className="btn btn-primary">
                    {data.btn_label}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
}
