import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Help_Me({ initialValues }) {
  // console.log(initialValues);

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="wc-help" key={index}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="wc-help-title">
                  <h2 data-aos="fade-up" data-aos-duration="1500">
                    {data.title}
                  </h2>
                  <p data-aos="fade-up" data-aos-duration="1500">
                    {data.label}{" "}
                  </p>
                </div>
              </div>
            </div>
            {data.detail &&
              data.detail.map((detail_data, index) => {
                let order1 = "";
                let order2 = "";
                let story2 = "";
                if (index % 2) {
                  order1 = "order-1";
                  order2 = "order-2";
                  story2 = "story-2";
                }
                return (
                  <div className="row help-event" key={index}>
                    <div className={`col-lg-6 p-0 ${order2}`}>
                      {/* order-2 */}
                      <div
                        className="wc-help-img"
                        data-aos="zoom-in-right"
                        data-aos-duration="1500"
                      >
                        <Image src={detail_data.image} alt={detail_data.alt} width={710} height={563}/>
                        <div className={`wc-story ${story2}`}>
                          {" "}
                          {/* story-2 */}
                          <p>
                            {detail_data.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className={`col-lg-6 p-0 ${order1}`} style={{ alignContent: 'center' }}>
                      {/* order-1 */}
                      <div className="wc-help-content">
                        {detail_data.paragraphs &&
                          detail_data.paragraphs.map(
                            (paragraph_data, index) => {
                              return (
                                <div
                                  key={index}
                                  dangerouslySetInnerHTML={{
                                    __html: paragraph_data,
                                  }}
                                ></div>
                              );
                            }
                          )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </section>
      );
    })
  );
}
