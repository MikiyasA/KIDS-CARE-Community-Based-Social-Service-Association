import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Timeline({ initialValues }) {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="wc-timeline" key={index}>
          <div className="container">
            <div className="row">
              <div className="col-12 p-0">
                <div className="timeline-title">
                  <h2 data-aos="fade-up" data-aos-duration="1500">
                    {data.title}
                  </h2>
                  <p data-aos="fade-up" data-aos-duration="1500">
                    {data.label}
                  </p>
                </div>
                <div className="main-timeline">
                  {data.details &&
                    data.details.map((details_data, index) => {
                      let width = "";
                      let height = "";
                      if (index === 1 || index === 4) {
                        width = 265;
                        height = 255;
                      } else {
                        width = 199;
                        height = 191;
                      }
                      return (
                        <div className="timeline" key={index}>
                          <div
                            className="timeline-content"
                            data-aos="zoom-in"
                            data-aos-duration="1500"
                          >
                            <Image
                              src={details_data.image}
                              alt={details_data.alt}
                              width={width}
                              height={height}
                            />
                            <div className="content-inner">
                              <h3 className="title">{details_data.title} </h3>
                              <Link
                                href={details_data.slug}
                                className="btn btn-primary"
                              >
                                Donate
                              </Link>
                            </div>
                          </div>
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
