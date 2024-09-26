import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Chariti_Page_Wrapper({ initialValues }) {
  // console.log(initialValues);

  return (
    <div className="wc-chariti">
      <div className="container-fluid !p-0">
        <div className="row">
          <div className="col-12 p-0">
            <div className="project-img">
              {initialValues &&
                initialValues.map((imageSrc, index) => {
                  return (
                    <div className="charities-img" key={index}>
                      <Image
                        src={imageSrc.image}
                        alt={`gallery-${index + 1}`}
                        width={612}
                        height={560}
                      />
                      <div className="icon">
                        <Link href={imageSrc.slug}>
                          <i className="fab fa-instagram"></i>
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
