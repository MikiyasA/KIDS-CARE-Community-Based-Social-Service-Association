import NewsForm from "@/component/Additional/Forms/NewsForm";
import { PrimaryColor } from "@/styles/color";
import { Group } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCirclePlus, IconEdit } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Latest_News({ initialValues }) {
  const { data: session } = useSession();

  return (
    <section className="wc-news">
      <div className="container p-0">
        <div className="row">
          <div className="col-12 p-0">
            <div className="news-title">
              <Group justify="center" gap="xl">
                <h2 data-aos="fade-down" data-aos-duration="1500">
                  Latest News
                </h2>
                {session && (
                  <IconCirclePlus
                    size={40}
                    color={PrimaryColor}
                    cursor="pointer"
                    onClick={() => {
                      modals.open({
                        // centered: true,
                        title: "Post News",
                        size: "90%",
                        children: <NewsForm action="add" />,
                      });
                    }}
                  />
                )}
              </Group>
              <p data-aos="fade-up" data-aos-duration="1500">
                Stay updated with the latest news from KCCBSSA, where we share
                impactful stories and recent developments in our ongoing efforts
                to support vulnerable communities across Ethiopia. From
                successful educational initiatives and sponsorship programs to
                emergency response efforts, our updates highlight the positive
                changes we are making in the lives of children, women, and
                families. Join us as we celebrate achievements, announce new
                projects, and engage with our community to foster a brighter
                future for all.
              </p>
            </div>
            <div className="news-wrapper">
              {initialValues &&
                initialValues.map((detail_data, index) => {
                  return (
                    <div
                      className="news-content"
                      data-aos="zoom-in"
                      data-aos-duration="1500"
                      key={index}
                    >
                      <Link href={detail_data.slug}>
                        <Image
                          src={detail_data.cover}
                          alt={detail_data.title}
                          width={472}
                          height={300}
                          priority={true}
                        />
                      </Link>
                      <div className="date">
                        <p>{detail_data.date}</p>

                        <Link href={detail_data.slug}>
                          <i className="fa fa-arrow-right"></i>
                        </Link>
                      </div>
                      <h2>
                        <Group>
                          <Link href={detail_data.slug}>
                            {detail_data.title}
                          </Link>
                          {session && (
                            <IconEdit
                              color={PrimaryColor}
                              cursor="pointer"
                              onClick={() => {
                                modals.open({
                                  // centered: true,
                                  title: "Post News",
                                  size: "90%",
                                  children: (
                                    <NewsForm
                                      action="update"
                                      data={detail_data}
                                    />
                                  ),
                                });
                              }}
                            />
                          )}
                        </Group>
                      </h2>
                    </div>
                  );
                })}
            </div>
            <div className="wc-btn" data-aos="fade-up" data-aos-duration="1500">
              <Link href="" className="btn btn-primary">
                Load More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  // })
  // );
}
