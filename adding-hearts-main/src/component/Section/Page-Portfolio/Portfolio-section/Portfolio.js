import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Portfolio({ initialValues }) {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="wc-portfolio" key={index}>
          <div className="container p-0">
            <div className="row">
              <div className="col-12 p-0">
                <div className="portfolio-title">
                  <h2 data-aos="fade-down" data-aos-duration="1500">
                    {data.title}
                  </h2>
                  <p data-aos="fade-up" data-aos-duration="1500">
                    {data.label}
                  </p>
                </div>
                <div className="portfolio-grid">
                  {data.detail &&
                    data.detail.map((detail_data, index) => {
                      return (
                        <div className="portfolio-content" key={index}>
                          <div className="potfolio-img">
                            <Link href={detail_data.slug}>
                              <Image
                                src={detail_data.image}
                                alt={detail_data.alt}
                                width={458}
                                height={398}
                              />
                            </Link>
                            <div className="portfolio-info">
                              <h2>
                                <Link href={detail_data.slug}>
                                  {detail_data.title}
                                </Link>
                              </h2>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                {/* <div className="wc-btn">
                  <Link href={data.btn_slug} className="btn btn-primary">
                    {data.btn_label} <span className="loader-01"></span>
                  </Link>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
}
