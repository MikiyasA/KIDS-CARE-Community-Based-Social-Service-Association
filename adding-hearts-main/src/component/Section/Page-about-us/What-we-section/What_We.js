import Image from "next/image";
import React from "react";

export default function What_We({ initialValues }) {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <React.Fragment key={index}>
          <section className="what-we">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="wc-what-we">
                    <h2 data-aos="fade-up" data-aos-duration="1500">
                      {data.title}
                    </h2>
                    {data.label &&
                      data.label.map((label_data, index) => {
                        return (
                          <p
                            data-aos="fade-up"
                            data-aos-duration="1500"
                            key={index}
                          >
                            {label_data}
                          </p>
                        );
                      })}
                  </div>
                  <div className="main-wc-what">
                    <div className="container p-0">
                      <div className="row">
                        <div className="col-12 p-0">
                          <div className="wc-what-inner">
                            <Image
                              src={data.image}
                              alt={data.alt}
                              width={470}
                              height={459}
                              data-aos="zoom-in-up"
                              data-aos-duration="1500"
                            />
                            <div className="what-we-p">
                              {data.details &&
                                data.details.map((details_data, index) => {
                                  return (
                                    <p
                                      data-aos="fade-up"
                                      data-aos-duration="1500"
                                      key={index}
                                    >
                                      {details_data}
                                    </p>
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </React.Fragment>
      );
    })
  );
}
