import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Footer({ initialValues }) {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <footer className="footer" key={index}>
          <div className="container">
            <div className="row">
              <div className="col-12 p-0">
                <div className="footer-content">
                  <Link href={data.slug} className="logo">
                    <Image
                      src={data.logo}
                      alt={data.alt}
                      width={190}
                      height={61}
                      priority={true}

                      // loading="lazy"
                    />
                  </Link>
                  {/* <Link href={data.slug} className="logo">
                    <Image
                      src={data.logo}
                      alt={data.alt}
                      width={282}
                      height={66}
                      priority={false}
                    />
                  </Link> */}
                  <p>{data.label}</p>
                  <div className="footer-copyright">
                    {data.links &&
                      data.links.map((link_data, index) => {
                        return (
                          <React.Fragment key={index}>
                            {index !== 0 && "/"}
                            <Link
                              href={link_data.href}
                              style={{
                                marginRight: "10px",
                                marginLeft: index !== 0 ? "10px" : "0",
                              }}
                            >
                              {link_data.text}
                            </Link>
                          </React.Fragment>
                        );
                      })}
                  </div>
                  <div className="social-icon">
                    {data.socialIcons &&
                      data.socialIcons.map((icon_data, index) => {
                        return (
                          <a
                            key={index}
                            href={icon_data.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className={`fab ${icon_data.iconClass}`}></i>
                          </a>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      );
    })
  );
}
