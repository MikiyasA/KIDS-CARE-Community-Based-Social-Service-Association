import NewsForm from "@/component/Additional/Forms/NewsForm";
import { PrimaryColor } from "@/styles/color";
import { Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCirclePlus, IconEdit, IconTrash } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export default function Latest_News({ initialValues }) {
  const { data: session } = useSession();
  // const nextUrl = process.env.NEXTAUTH_URL;

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
                        size: "100%",
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
                          src={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}${detail_data.cover}`}
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
                            <Group>
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
                              <IconTrash
                                color="red"
                                cursor="pointer"
                                onClick={() => {
                                  modals.openConfirmModal({
                                    title: `Are you sure you want to delete this news?`,
                                    children: (
                                      <Text size="sm">
                                        Please confirm that you want to delete
                                        &quot;
                                        {detail_data?.title}&quot;.
                                      </Text>
                                    ),
                                    labels: {
                                      confirm: "Delete",
                                      cancel: "Cancel",
                                    },
                                    onConfirm: async () => {
                                      try {
                                        const response = await fetch(
                                          `/api/news?id=${detail_data?.id}`,
                                          {
                                            method: "DELETE",
                                          }
                                        );

                                        if (response.ok) {
                                          notifications.show({
                                            color: "green",
                                            title: "Success",
                                            message:
                                              "News deleted successfully.",
                                          });
                                          setTimeout(() => {
                                            window.location.reload();
                                          }, 500);
                                        } else {
                                          notifications.show({
                                            color: "red",
                                            title: "Failure",
                                            message:
                                              "Failed to delete the news. Please try again.",
                                          });
                                        }
                                      } catch (error) {
                                        // Handle network or other errors
                                        console.error(
                                          "Error deleting news:",
                                          error
                                        );
                                        notifications.show({
                                          color: "red",
                                          title: "Failure",
                                          message:
                                            "An error occurred while deleting the news.",
                                        });
                                      }
                                    },
                                    confirmProps: { color: "red" },
                                  });
                                }}
                              />
                            </Group>
                          )}
                        </Group>
                      </h2>
                    </div>
                  );
                })}
            </div>
            {/* <div className="wc-btn" data-aos="fade-up" data-aos-duration="1500">
              <Link href="" className="btn btn-primary">
                Load More
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
  // })
  // );
}
