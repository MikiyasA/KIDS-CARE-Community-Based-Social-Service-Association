import Image from "next/image";
import React from "react";

export default function Sponser({ initialValues }) {
  // console.log(initialValues);

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="wc-sponser" key={index}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="sponser-title">
                  <h2 data-aos="fade-up" data-aos-duration="1500">
                    {data.title}
                  </h2>
                  <p data-aos="fade-up" data-aos-duration="1500">
                    {data.label}
                  </p>
                </div>
                <div className="sponser-img">
                  {data.sponsor &&
                    data.sponsor.map((sponsor_data, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            width: `${sponsor_data.width}px`,
                            // height: `${sponsor_data.height}px`,
                          }}
                        >
                          <a
                            href={sponsor_data.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Image
                              src={sponsor_data.src}
                              alt={`sponsor-${index}`}
                              width={sponsor_data.width}
                              height={sponsor_data.height}
                            />
                          </a>
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
