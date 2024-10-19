import NewsForm from "@/component/Additional/Forms/NewsForm";
import { PrimaryColor } from "@/styles/color";
import { Group, Text, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function Latest_News({ initialValues }) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <section className="wc-news-details">
      {initialValues.error && (
        <Title order={5} align="center">
          {initialValues.error}
        </Title>
      )}
      <div className="container p-0">
        <div className="row">
          <div className="col-12 p-0">
            <div className="news-details-content">
              <Group>
                <h2 data-aos="fade-up" data-aos-duration="1500">
                  {initialValues.title}
                </h2>
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
                            <NewsForm action="update" data={initialValues} />
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
                              Please confirm that you want to delete "
                              {initialValues?.title}".
                            </Text>
                          ),
                          labels: {
                            confirm: "Delete",
                            cancel: "Cancel",
                          },
                          onConfirm: async () => {
                            try {
                              const response = await fetch(
                                `/api/news?id=${initialValues?.id}`,
                                {
                                  method: "DELETE",
                                }
                              );

                              if (response.ok) {
                                notifications.show({
                                  color: "green",
                                  title: "Success",
                                  message:
                                    response.message ||
                                    "News deleted successfully.",
                                });
                                router.push("/news");
                              } else {
                                notifications.show({
                                  color: "red",
                                  title: "Failure",
                                  message:
                                    response.error ||
                                    "Failed to delete the news. Please try again.",
                                });
                              }
                            } catch (error) {
                              // Handle network or other errors
                              console.error("Error deleting news:", error);
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
              <p className="date" data-aos="fade-up" data-aos-duration="1500">
                {new Date(
                  initialValues.updatedAt || initialValues.createdAt
                ).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <div className="news-details-wrapper">
                <div
                  className="news-details-image"
                  style={{ width: "100%", maxWidth: "173px" }}
                >
                  <Image
                    src={initialValues.cover}
                    alt={initialValues.title}
                    data-aos="flip-right"
                    data-aos-duration="1500"
                    width={173}
                    height={183}
                  />
                </div>
                <div className="news-details-p">
                  <p data-aos="fade-up" data-aos-duration="1500">
                    {/* {details_data} */}
                  </p>
                  <div
                    style={{
                      borderRadius: "10px",
                      padding: "20px",
                      width: "100%",
                    }}
                    dangerouslySetInnerHTML={{ __html: initialValues.detail }}
                  ></div>
                </div>
              </div>
              {/* {data.more_detail &&
                data.more_detail.map((more_detail_data, more_detailindex) => {
                  return (
                    <React.Fragment key={more_detailindex}>
                      <p data-aos="fade-up" data-aos-duration="1500">
                        {more_detail_data}
                      </p>
                      <br />
                    </React.Fragment>
                  );
                })} */}
              <div
                className="bredcrum"
                data-aos="fade-up"
                data-aos-duration="1500"
              >
                {/* {data.slogan &&
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
                  })} */}
              </div>
              {/* <div className="news-details-thumbnails">
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
              </div> */}

              {/* {data.three_details &&
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
                })} */}

              {/* <div className="social-icon">
                {data.social_icon &&
                  data.social_icon.map((social_icon_data, index) => {
                    return (
                      <Link href={social_icon_data.slug} key={index}>
                        <i className={social_icon_data.icon}></i>
                      </Link>
                    );
                  })}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
  //   })
  // );
}
