import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { Button } from "@mantine/core";

export default function Contact({ initialValues }) {
  // console.log(initialValues);

  const [address_save_errors, setaddress_save_errors] = useState({});
  const [loading, setLoading] = useState();

  const save_account_details = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formElement = document.querySelector("#account_details_form");
    const formData = new FormData(formElement);

    let fullName = formData.get("fullName");
    let email = formData.get("email");
    let subject = formData.get("subject");
    let phone = formData.get("phone");
    let messages = formData.get("messages");
    console.log(fullName);
    const error = {};

    if (!fullName || fullName.trim() === "") {
      error.fullName = "Name is required";
    }

    if (!email || email.trim() === "") {
      error.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error.email = "Invalid email address";
    }

    if (!subject || subject.trim() === "") {
      error.subject = "subject is required";
    }

    if (!phone || phone.trim() === "") {
      error.phone = "phone is required";
    } else if (phone.length < 10) {
      error.phone = "enter valid phone";
    }

    if (!messages || messages.trim() === "") {
      error.messages = "Messages is required";
    }

    if (Object.keys(error).length > 0) {
      setaddress_save_errors(error);
    } else {
      setaddress_save_errors({});
    }

    let data = {
      fullName: fullName,
      email: email,
      phone: phone,
      subject: subject,
      message: messages,
    };
    // console.log(data)
    setLoading(false);
    if (!Object.keys(error).length > 0) {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (result.result === "success") {
        formElement.reset();
        notifications.show({
          color: "green",
          title: "Success",
          message:
            "Your details have been received successfully! 🌟 We'll reach out if we need anything further.",
        });
      } else {
        notifications.show({
          color: "red",
          title: "Failure",
          message:
            "Oops! There was an error submitting the form. Please try again.",
        });
      }
    }
  };

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <div className="wc-contactus" key={index}>
          <section className="wc-contact">
            <div className="container p-0">
              <div className="row">
                <div className="col-12">
                  <div className="contact-title">
                    <h2 data-aos="fade-up" data-aos-duration="1500">
                      {data.title}
                    </h2>
                    <p data-aos="fade-up" data-aos-duration="1500">
                      {data.label}
                    </p>
                  </div>
                  <form
                    className="contact-form"
                    data-aos="fade-up"
                    data-aos-duration="1500"
                    id="account_details_form"
                    onSubmit={save_account_details}
                  >
                    <div className="nema-and-number">
                      <div className="pb-4 w-100">
                        <input
                          type="text"
                          className="form-control"
                          name="fullName"
                          placeholder="Full name*"
                        />
                        {address_save_errors.name && (
                          <span className="text-danger">
                            {address_save_errors.name}
                          </span>
                        )}
                      </div>

                      <div className="pb-4 w-100">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Email*"
                        />
                        {address_save_errors.email && (
                          <span className="text-danger">
                            {address_save_errors.email}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className="email-and-submit"
                      data-aos="fade-up"
                      data-aos-duration="1500"
                    >
                      <div className="pb-4 w-100">
                        <input
                          type="text"
                          className="form-control"
                          name="phone"
                          placeholder="Phone*"
                        />
                        {address_save_errors.number && (
                          <span className="text-danger">
                            {address_save_errors.number}
                          </span>
                        )}
                      </div>

                      <div className="pb-4 w-100">
                        <input
                          type="text"
                          className="form-control"
                          name="subject"
                          placeholder="Subject*"
                        />
                        {address_save_errors.subject && (
                          <span className="text-danger">
                            {address_save_errors.subject}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className="wc-message"
                      data-aos="fade-up"
                      data-aos-duration="1500"
                    >
                      <textarea
                        className="form-control d-flex"
                        placeholder="Message*"
                        name="messages"
                        data-aos="fade-up"
                        data-aos-duration="1500"
                      />
                      {address_save_errors.messages && (
                        <span className="text-danger">
                          {address_save_errors.messages}
                        </span>
                      )}
                    </div>
                    <div
                      className="contact-form-button"
                      data-aos="zoom-in"
                      data-aos-duration="1500"
                    >
                      <Button
                        type="submit"
                        className="btn btn-primary"
                        loading={loading}
                        color="#488f4d"
                      >
                        {loading ? "Sending..." : "Send"}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    })
  );
}
