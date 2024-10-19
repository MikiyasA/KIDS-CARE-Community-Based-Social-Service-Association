import { useFetchData } from "@/component/comman";
import Contact from "@/component/comman/Contact-section/Contact";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

export default function ContactUs({ initialValues }) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const [address_save_errors, setaddress_save_errors] = useState({});

  const save_account_details = (event) => {
    event.preventDefault();
    const formElement = document.querySelector("#account_details_form");
    const formData = new FormData(formElement);

    let name = formData.get("name");
    let email = formData.get("email");
    let password = formData.get("password");
    let number = formData.get("number");

    const error = {};

    if (!name || name.trim() === "") {
      error.name = "Name is required";
    }

    if (!email || email.trim() === "") {
      error.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error.email = "Invalid email address";
    }

    if (!password || password.trim() === "") {
      error.password = "Password is required";
    } else if (password.length < 8) {
      error.password = "Password must be at least 8 characters long";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}/.test(
        password
      )
    ) {
      error.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    if (!number || number.trim() === "") {
      error.number = "Number is required";
    } else if (!/^\d{10}$/.test(number)) {
      error.number = "Enter a valid 10-digit number";
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
      password: password,
    };
    // console.log(data)
  };
  const { data: Contact_Data } = useFetchData("/json/data/contact.json");

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="wc-contact-us" key={index}>
          <div className="container p-0">
            <div className="row">
              <div className="col-12 p-0">
                <div className="wc-contact-wrapper">
                  {/* <div className="wc-contact-form">
                    <h2 data-aos="fade-up" data-aos-duration="1500">
                      {data.title}
                    </h2>
                    <form
                      className="contact-us-form"
                      id="account_details_form"
                      onSubmit={save_account_details}>
                      <div className="pb-4 w-100">
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          placeholder="Name"
                          data-aos="fade-up"
                          data-aos-duration="1500"
                        />
                        {address_save_errors.name && (
                          <span className="text-danger">
                            {address_save_errors.name}
                          </span>
                        )}
                      </div>
                      <div className="pb-4 w-100">
                        <input
                          type="number"
                          className="form-control"
                          name="number"
                          placeholder="Phone"
                          data-aos="fade-up"
                          data-aos-duration="1500"
                        />
                        {address_save_errors.number && (
                          <span className="text-danger">
                            {address_save_errors.number}
                          </span>
                        )}
                      </div>
                      <div className="pb-4 w-100">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Email"
                          data-aos="fade-up"
                          data-aos-duration="1500"
                        />
                        {address_save_errors.email && (
                          <span className="text-danger">
                            {address_save_errors.email}
                          </span>
                        )}
                      </div>
                      <div className="pb-4 w-100">
                        <div
                          className="form-group eye-toggle-wrap position-relative"
                          data-aos="fade-up"
                          data-aos-duration="1500">
                          <input
                            type={passwordVisible ? "text" : "password"}
                            className="form-control"
                            name="password"
                            placeholder="Password"
                          />
                          <span
                            onClick={togglePasswordVisibility}
                            className={`${
                              passwordVisible ? "fa fa-eye" : "fa fa-eye-slash"
                            } Password-toggle`}
                          />
                        </div>
                        {address_save_errors.password && (
                          <span className="text-danger">
                            {address_save_errors.password}
                          </span>
                        )}
                      </div>
                      <div
                        className="contact-form-button"
                        data-aos="fade-up"
                        data-aos-duration="1500">
                        <button type="submit" className="btn btn-primary">
                          Send
                        </button>
                      </div>
                    </form>
                  </div> */}
                  <Contact initialValues={Contact_Data} />
                  <div className="wc-address-form">
                    {data.address &&
                      data.address.map((address_data, index) => {
                        let p = "";
                        if (address_data.slug) {
                          p = (
                            <p>
                              <Link href={address_data.slug}>
                                {address_data.label}
                              </Link>
                            </p>
                          );
                        } else {
                          p = <p>{address_data.label}</p>;
                        }
                        return (
                          <div
                            className="address"
                            data-aos="flip-up"
                            data-aos-duration="1500"
                            key={index}
                          >
                            {p}
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="map-box">
                  <iframe
                    src={data.location_link}
                    style={{ border: "0" }}
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
}
