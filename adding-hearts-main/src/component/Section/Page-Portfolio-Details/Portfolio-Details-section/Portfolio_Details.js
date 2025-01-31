import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Portfolio_Details({ initialValues }) {
  const [activeIndex, setactiveIndex] = useState(0);

  const toggleAccordion = (index) => {
    setactiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="portfolio-details" key={index}>
          <div className="container p-0">
            <div className="row">
              <div className="col-12 p-0">
                <div className="portfolio-content">
                  <Image
                    src={data.image}
                    alt={data.alt}
                    data-aos="flip-up"
                    data-aos-duration="1500"
                    width={1204}
                    height={510}
                  />
                  <h2 data-aos="fade-up" data-aos-duration="1500">
                    {data.title}
                  </h2>

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

                  <div className="portfolio-thumbnails">
                    {data.images &&
                      data.images.map((images_data, index) => {
                        return (
                          <Image
                            key={index}
                            src={images_data.image}
                            alt={images_data.alt}
                            width={592}
                            height={287}
                            // priority={false}
                            data-aos="zoom-in"
                            data-aos-duration="1500"
                          />
                        );
                      })}
                  </div>

                  <h3 data-aos="fade-up" data-aos-duration="1500">
                    {data.label}
                  </h3>

                  {data.two_detail &&
                    data.two_detail.map((two_detail_data, index) => {
                      return (
                        <p
                          data-aos="fade-up"
                          data-aos-duration="1500"
                          key={index}
                        >
                          {two_detail_data}
                        </p>
                      );
                    })}
                  <ul style={{ listStyleType: "square", padding: "0px 40px" }}>
                    {data.bullet_points &&
                      data.bullet_points.map((point, index) => {
                        return <li key={index}>{point}</li>;
                      })}
                  </ul>

                  <div className="portfolio-thumbnails">
                    {data.images1 &&
                      data.images1.map((images_data, index) => {
                        return (
                          <Image
                            key={index}
                            src={images_data.image}
                            alt={images_data.alt}
                            width={592}
                            height={287}
                            // priority={false}
                            data-aos="zoom-in"
                            data-aos-duration="1500"
                          />
                        );
                      })}
                  </div>

                  <div
                    className="potfolio-ul"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                  >
                    <div className="faq_wrapper">
                      {data.question &&
                        data.question.map((question_data, index) => {
                          return (
                            <div className="faq_item" key={index}>
                              <div
                                className={`faq_title ${
                                  index === activeIndex ? "active" : ""
                                }`}
                                onClick={() => toggleAccordion(index)}
                              >
                                {question_data.question}
                              </div>
                              <div
                                className="faq_details"
                                style={{
                                  display:
                                    index === activeIndex ? "block" : "none",
                                }}
                              >
                                <div className="accordion-content">
                                  <p>{question_data.answer}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  {data.two_more_detail &&
                    data.two_more_detail.map((two_more_detail_data, index) => {
                      return (
                        <p
                          data-aos="fade-up"
                          data-aos-duration="1500"
                          key={index}
                        >
                          {two_more_detail_data}
                        </p>
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
