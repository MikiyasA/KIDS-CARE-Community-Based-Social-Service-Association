import Link from "next/link";
import React, { useState } from "react";

export default function As_Donation({ initialValues }) {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const toggleAccordion = (index) => {
    if (activeAccordion === index) {
      setActiveAccordion(null);
    } else {
      setActiveAccordion(index);
    }
  };

  const isAccordionActive = (index) => {
    return index === activeAccordion ? "active" : "";
  };

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="as-donation" key={index}>
          <div className="container p-0">
            <div className="row">
              <div className="col-12 p-0">
                <h2 data-aos="fade-up" data-aos-duration="1500">
                  {data.title}
                </h2>
                <div className="donation-content">
                  <div className="donation-p">
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
                  <div className="faq_wrapper">
                    {data.details &&
                      data.details.map((details_data, index) => {
                        return (
                          <div
                            className="faq_item"
                            data-aos="flip-up"
                            data-aos-duration="1500"
                            onClick={() => toggleAccordion(index)}
                            key={index}
                          >
                            <div
                              className={`faq_title ${isAccordionActive(
                                index
                              )}`}
                            >
                              {details_data.title}
                            </div>
                            <div
                              className="faq_details"
                              style={{
                                display:
                                  activeAccordion === index ? "block" : "none",
                              }}
                            >
                              <div className="accordion-content">
                                <p>{details_data.label}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
}
