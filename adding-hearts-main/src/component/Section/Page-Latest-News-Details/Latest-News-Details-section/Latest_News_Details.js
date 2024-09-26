import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Latest_News({ initialValues }) {
  return (
    initialValues &&
    initialValues.map((data, wc_news_index) => {
      return (
        <section className="wc-news-details" key={wc_news_index}>
          <div className="container p-0">
            <div className="row">
              <div className="col-12 p-0">
                <div className="news-details-content">
                  <h2 data-aos="fade-up" data-aos-duration="1500">
                    {data.title}
                  </h2>
                  <p
                    className="date"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                  >
                    {data.date}
                  </p>
                  <div className="news-details-wrapper">
                    <div
                      className="news-details-image"
                      style={{ width: "100%", maxWidth: "173px" }}
                    >
                      <Image
                        src={data.image}
                        alt={data.alt}
                        data-aos="flip-right"
                        data-aos-duration="1500"
                        width={173}
                        height={183}
                      />
                    </div>
                    <div className="news-details-p">
                      {data.details &&
                        data.details.map((details_data, indexindex) => {
                          return (
                            <p
                              data-aos="fade-up"
                              data-aos-duration="1500"
                              key={indexindex}
                            >
                              {details_data}
                            </p>
                          );
                        })}
                    </div>
                  </div>
                  {data.more_detail &&
                    data.more_detail.map(
                      (more_detail_data, more_detailindex) => {
                        return (
                          <React.Fragment key={more_detailindex}>
                            <p data-aos="fade-up" data-aos-duration="1500">
                              {more_detail_data}
                            </p>
                            <br />
                          </React.Fragment>
                        );
                      }
                    )}
                  <div
                    className="bredcrum"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                  >
                    {data.slogan &&
                      data.slogan.map((slogan_data, index) => {
                        return (
                          <React.Fragment key={index}>
                            <div className="bredcrum-content">
                              <Image
                                src={slogan_data.image}
                                alt={slogan_data.alt}
                                width={36}
                                height={26}
                              />
                              <h3>{slogan_data.title}</h3>
                            </div>
                            <p>- {slogan_data.author}</p>
                          </React.Fragment>
                        );
                      })}
                  </div>
                  <div className="news-details-thumbnails">
                    {data.images &&
                      data.images.map((images_data, index) => {
                        return (
                          <Image
                            key={index}
                            src={images_data.image}
                            alt={images_data.alt}
                            data-aos="zoom-in"
                            data-aos-duration="1500"
                            width={384}
                            height={368}
                          />
                        );
                      })}
                  </div>

                  {data.three_details &&
                    data.three_details.map((three_details_data, index) => {
                      return (
                        <p
                          className="last-p"
                          data-aos="fade-up"
                          data-aos-duration="1500"
                          key={index}
                        >
                          {three_details_data}
                        </p>
                      );
                    })}

                  <div className="social-icon">
                    {data.social_icon &&
                      data.social_icon.map((social_icon_data, index) => {
                        return (
                          <Link href={social_icon_data.slug} key={index}>
                            <i className={social_icon_data.icon}></i>
                          </Link>
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
