import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Help_Me({ initialValues }) {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="wc-help-me" key={index}>
          <div className="container p-0">
            <div className="row">
              <div className="col-12">
                <div className="main-help-content">
                  <h2
                    className="title"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                  >
                    {data.title}
                  </h2>
                  <div className="help-me-wrapper">
                    <div className="help-me-image">
                      <Image
                        src={data.image}
                        alt={data.alt}
                        width={470}
                        height={519}
                        data-aos="flip-left"
                        data-aos-duration="1500"
                      />
                    </div>
                    <div className="help-me-p">
                      {data.passage &&
                        data.passage.map((passage_data, index) => {
                          return (
                            <p
                              data-aos="fade-up"
                              data-aos-duration="1500"
                              key={index}
                            >
                              {passage_data}
                            </p>
                          );
                        })}
                    </div>
                  </div>
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

                <div className="wc-story-info">
                  <h2 data-aos="fade-up" data-aos-duration="1500">
                    {data.story_title}
                  </h2>
                  <div className="story-wrapper">
                    <div
                      className="story-image"
                      data-aos="flip-left"
                      data-aos-duration="1500"
                    >
                      <Image
                        src={data.story_image}
                        alt={data.story_alt}
                        width={600}
                        height={496}
                      />
                    </div>
                    <div className="story-content">
                      {data.paragraphs &&
                        data.paragraphs.map((paragraph_data, index) => {
                          return (
                            <div
                              key={index}
                              dangerouslySetInnerHTML={{
                                __html: paragraph_data,
                              }}
                            ></div>
                          );
                        })}
                    </div>
                  </div>
                  <h3>{data.story_label}</h3>
                  {data.story_details &&
                    data.story_details.map((story_details_data, index) => {
                      return (
                        <p
                          className="last"
                          data-aos="fade-up"
                          data-aos-duration="1500"
                          key={index}
                        >
                          {story_details_data}
                        </p>
                      );
                    })}
                </div>

                <div
                  className="bredcum"
                  data-aos="fade-up"
                  data-aos-duration="1500"
                >
                  <div className="bredcum-content">
                    <h2>{data.support_title}</h2>
                    <p>{data.support_label}</p>
                  </div>
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
