import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Alert } from "reactstrap";

export default function Donation({ initialValues }) {
  const [Amount, setAmount] = useState(0);
  const [Success, setSuccess] = useState("");

  const [address_save_errors, setaddress_save_errors] = useState({});

  const save_account_details = (event) => {
    event.preventDefault();
    const formElement = document.querySelector("#donation_form");
    const formData = new FormData(formElement);

    let first_name = formData.get("first_name");
    let last_name = formData.get("last_name");
    let email = formData.get("email");
    let amount = formData.get("amount");
    let position = formData.get("position");

    const error = {};

    if (!first_name || first_name.trim() === "") {
      error.first_name = "First Name is required";
    }

    if (!last_name || last_name.trim() === "") {
      error.last_name = "Last Name is required";
    }

    if (!position || position.trim() === "") {
      error.position = "Position is required";
    }

    if (!amount || amount.trim() === "") {
      error.amount = "Amount is required";
    }

    if (!email || email.trim() === "") {
      error.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error.email = "Invalid email address";
    }

    if (Object.keys(error).length > 0) {
      setaddress_save_errors(error);
    } else {
      setaddress_save_errors({});

      let data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        amount: amount,
        position: position,
      };
      setSuccess("Your Donate Success");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSuccess("");
    }, 2000);
  }, [Success]);

  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="wc-donation" key={index}>
          <div className="container p-0">
            <div className="row">
              <div className="col-12 p-0">
                <form
                  className="donation-inner-box"
                  onSubmit={save_account_details}
                  id="donation_form"
                >
                  <h2 data-aos="fade-up" data-aos-duration="1500">
                    {data.title}
                  </h2>
                  <div className="donation-inner">
                    <Image
                      src={data.image}
                      alt={data.alt}
                      width={489}
                      height={453}
                      data-aos="flip-up"
                      data-aos-duration="1500"
                    />
                    <div className="donation-st-inner">
                      <p>{data.label}</p>
                      <h3>{data.donation_label}</h3>
                      <div className="pb-4">
                        <div className="button">
                          <span>$</span>
                          <input
                            type="number"
                            className="form-control"
                            name="amount"
                            onChange={(e) => {
                              setAmount(e.target.value);
                            }}
                            placeholder="Amount*"
                          />
                        </div>
                        {address_save_errors.amount && (
                          <span className="text-danger d-block">
                            {address_save_errors.amount}
                          </span>
                        )}
                      </div>
                      <h4>{data.method_label}</h4>
                      <div>
                        <label className="radio_btn">
                          <input
                            type="radio"
                            name="position"
                            value="Test Donation"
                          />
                          <span className="list-item-label">Test Donation</span>
                        </label>
                        <label className="radio_btn">
                          <input
                            type="radio"
                            name="position"
                            value="Offline donation"
                          />
                          <span className="list-item-label">
                            Offline donation
                          </span>
                        </label>
                        <label className="radio_btn">
                          <input
                            type="radio"
                            name="position"
                            value="Credit Card"
                          />
                          <span className="list-item-label">Credit Card</span>
                        </label>
                        {address_save_errors.position && (
                          <span className="text-danger d-block">
                            {address_save_errors.position}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="personal-info">
                    <h4>Personal info</h4>
                    <div className="nema-and-number">
                      <div className="pb-4">
                        <input
                          type="text"
                          className="form-control"
                          name="first_name"
                          placeholder="First name*"
                        />
                        {address_save_errors.first_name && (
                          <span className="text-danger">
                            {address_save_errors.first_name}
                          </span>
                        )}
                      </div>
                      <div className="pb-4">
                        <input
                          type="text"
                          className="form-control"
                          name="last_name"
                          placeholder="Last name*"
                        />
                        {address_save_errors.last_name && (
                          <span className="text-danger">
                            {address_save_errors.last_name}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="pb-4">
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Email Address*"
                      />
                      {address_save_errors.email && (
                        <span className="text-danger">
                          {address_save_errors.email}
                        </span>
                      )}
                    </div>
                    <div className="btn-text">Donation Total : {Amount}</div>
                    <div className="wc-btn">
                      <button className="btn btn-primary" type="submit">
                        Donate
                      </button>
                    </div>
                    {Success && <Alert className="m-3 w-25">{Success}</Alert>}
                  </div>
                </form>
                <div className="main-donation-wrapper">
                  <div className="wc-donation-content">
                    <div className="donation-content-p">
                      {data.detail &&
                        data.detail.map((detail_data, index) => {
                          return (
                            <p
                              data-aos="fade-up"
                              data-aos-duration="1500"
                              key={index}
                            >
                              {detail_data}
                            </p>
                          );
                        })}
                    </div>
                    <div className="donation-child-img">
                      <Image
                        src={data.detail_image}
                        alt={data.alt}
                        data-aos="fade-up"
                        data-aos-duration="3000"
                        width={484}
                        height={446}
                      />
                    </div>
                  </div>
                  <h2 data-aos="fade-up" data-aos-duration="1500">
                    {data.short_title}
                  </h2>
                  {data.short_label &&
                    data.short_label.map((short_label_data, index) => {
                      return (
                        <p
                          data-aos="fade-up"
                          data-aos-duration="1500"
                          key={index}
                        >
                          {short_label_data}
                        </p>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
}
