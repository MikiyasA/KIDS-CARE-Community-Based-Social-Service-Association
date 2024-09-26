import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Contact({ initialValues }) {
  // console.log(initialValues);

  const [address_save_errors, setaddress_save_errors] = useState({});

  const save_account_details = event => {
    event.preventDefault();
    const formElement = document.querySelector("#account_details_form");
    const formData = new FormData(formElement);

    let name = formData.get("Fullname");
    let email = formData.get("email");
    let subject = formData.get("subject");
    let number = formData.get("number");
    let messages = formData.get("messages");

    const error = {};

    if (!name || name.trim() === "") {
      error.name = "Name is required";
    }

    if (!email || email.trim() === "") {
      error.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error.email = "Invalid email address";
    }

    if (!subject || subject.trim() === "") {
      error.subject = "subject is required";
    }

    if (!number || number.trim() === "") {
      error.number = "number is required";
    } else if (number.length < 10) {
      error.number = "enter valid number";
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
      name: name,
      email: email,
      number: number,
      subject: subject,
      messages: messages,
    };
    // console.log(data)
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
                    onSubmit={save_account_details}>
                    <div className="nema-and-number">
                      <div className="pb-4 w-100">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
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
                      data-aos-duration="1500">
                      <div className="pb-4 w-100">
                        <input
                          type="text"
                          className="form-control"
                          name="number"
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
                      data-aos-duration="1500">
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
                      data-aos-duration="1500">
                      <button type="submit" className="btn btn-primary">
                        Send
                      </button>
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
