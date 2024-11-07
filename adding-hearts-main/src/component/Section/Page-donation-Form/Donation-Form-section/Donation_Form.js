import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Input,
  Alert,
} from "reactstrap";

export default function Donation_Success({ initialValues }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [paymentId, setpaymentId] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleAmountSelection = (amount) => {
    localStorage.setItem("amount", amount);
    setSelectedAmount(amount);
    // Add any other logic you need when an amount is selected
  };
  const [Success, setSuccess] = useState("");

  const [address_save_errors, setaddress_save_errors] = useState({});

  const save_account_details = (event) => {
    event.preventDefault();
    const formElement = document.querySelector("#account_details_form");
    const formData = new FormData(formElement);

    let donateToName = formData.get("donate-to-name");
    let email = formData.get("email");
    let first_name = formData.get("first-name");
    let last_name = formData.get("last-name");
    let state = formData.get("state");
    let country = formData.get("country");
    let zip_code = formData.get("zip-code");
    let position_of_interest = formData.get("position_of_interest");
    let amount = formData.get("amount");

    formData.append("amount", selectedAmount);

    const error = {};

    if (!donateToName || donateToName.trim() === "") {
      error.donateToName = "Donate to Name is required";
    }

    if (!email || email.trim() === "") {
      error.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error.email = "Invalid email address";
    }

    if (!position_of_interest || position_of_interest.trim() === "") {
      error.position_of_interest = "Position of interest is required";
    }

    if (!selectedAmount || selectedAmount === null) {
      error.amount = "Amount is required";
    } else if (selectedAmount.length < 10) {
      error.amount = "Enter valid number";
    }

    if (!first_name || first_name.trim() === "") {
      error.first_name = "First Name is required";
    }

    if (!last_name || last_name.trim() === "") {
      error.last_name = "Last Name is required";
    }

    if (!state || state.trim() === "" || state === "state") {
      error.state = "State is required";
    }

    if (!country || country.trim() === "" || country === "Country") {
      error.country = "Country is required";
    }

    if (!zip_code || zip_code.trim() === "" || !/^\d{6}$/.test(zip_code)) {
      error.zip_code = "Please enter a 6-digit pin code.";
    }

    if (Object.keys(error).length > 0) {
      setaddress_save_errors(error);
    } else {
      setaddress_save_errors({});

      let data = {
        first_name: first_name,
        last_name: last_name,
        email: email,
        donateToName: donateToName,
        amount: selectedAmount,
        state: state,
        country: country,
        zip_code: zip_code,
        interest_position: position_of_interest,
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
        <section className="wc-donation-form" key={index}>
          <div className="container p-0">
            <div className="row">
              <div className="col-12 p-0">
                <div className="inner-success">
                  <h2>{data.title}</h2>
                  <form
                    id="account_details_form"
                    onSubmit={save_account_details}
                  >
                    <div className="inner-input">
                      <label>Donate to</label>
                      <div className=" mb-4">
                        <input
                          type="text"
                          className="form-control"
                          name="donate-to-name"
                          placeholder="donete to Name"
                        />
                        {address_save_errors.donateToName && (
                          <span className="text-danger">
                            {address_save_errors.donateToName}
                          </span>
                        )}
                      </div>
                    </div>

                    <Dropdown
                      isOpen={dropdownOpen}
                      toggle={toggleDropdown}
                      className="mb-4"
                    >
                      <DropdownToggle caret name="amount">
                        {selectedAmount ? `$ ${selectedAmount}` : "Pick amount"}
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem onClick={() => handleAmountSelection(25)}>
                          $ 25
                        </DropdownItem>
                        <DropdownItem onClick={() => handleAmountSelection(50)}>
                          $ 50
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleAmountSelection(100)}
                        >
                          $ 100
                        </DropdownItem>
                        <DropdownItem
                          onClick={() => handleAmountSelection(1000)}
                        >
                          $ 1000
                        </DropdownItem>
                      </DropdownMenu>
                      {address_save_errors.amount && (
                        <span className="text-danger">
                          {address_save_errors.amount}
                        </span>
                      )}
                    </Dropdown>

                    <div className="donation-Occurence">
                      <h3>Donation Occurence</h3>
                      <div>
                        <label className="radio_btn">
                          <input
                            type="radio"
                            name="position_of_interest"
                            value="donat 1 time"
                          />
                          <span className="list-item-label">
                            One time donation
                          </span>
                        </label>
                        <label className="radio_btn">
                          <input
                            type="radio"
                            name="position_of_interest"
                            value="recurring donation"
                          />
                          <span className="list-item-label">
                            Recurring donation
                          </span>
                        </label>
                      </div>
                      {address_save_errors.position_of_interest && (
                        <span className="text-danger">
                          {address_save_errors.position_of_interest}
                        </span>
                      )}
                    </div>

                    <div className="donation-information">
                      <h3>Donation Information</h3>

                      <div className="mb-4">
                        <input
                          type="text"
                          className="form-control"
                          name="first-name"
                          placeholder="First Name"
                        />
                        {address_save_errors.first_name && (
                          <span className="text-danger">
                            {address_save_errors.first_name}
                          </span>
                        )}
                      </div>

                      <div className="mb-4">
                        <input
                          type="text"
                          className="form-control"
                          name="last-name"
                          placeholder="Last Name"
                        />
                        {address_save_errors.last_name && (
                          <span className="text-danger">
                            {address_save_errors.last_name}
                          </span>
                        )}
                      </div>

                      <div className="mb-4">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          placeholder="Email"
                        />
                        {address_save_errors.email && (
                          <span className="text-danger">
                            {address_save_errors.email}
                          </span>
                        )}
                      </div>

                      <div className="select-box">
                        <div className="select-box">
                          <div className="custom-select">
                            <Input type="select" name="state">
                              <option value="state">State</option>
                              <option value="Maharashtra">Maharashtra</option>
                              <option value="kerla">Kerala</option>
                              <option value="Goa">Goa</option>
                              <option value="Dehli">Delhi</option>
                              <option value="sikkim">Sikkim</option>
                            </Input>
                            {address_save_errors.state && (
                              <span className="text-danger">
                                {address_save_errors.state}
                              </span>
                            )}
                          </div>
                          <div className="custom-select">
                            <Input type="select" name="country">
                              <option value="Country">Country</option>
                              <option value="india">India</option>
                              <option value="America">America</option>
                              <option value="Assam">Canada</option>
                              <option value="Gujarat">Russia</option>
                              <option value="Chhattisgarh">London</option>
                              <option value="Goa">America</option>
                            </Input>
                            {address_save_errors.country && (
                              <span className="text-danger">
                                {address_save_errors.country}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="mb-4">
                          <input
                            type="number"
                            className="form-control"
                            name="zip-code"
                            placeholder="Zip code"
                          />
                          {address_save_errors.zip_code && (
                            <span className="text-danger">
                              {address_save_errors.zip_code}
                            </span>
                          )}
                        </div>
                      </div>

                      {Success && <Alert className="">{Success}</Alert>}

                      <div className="contact-form-button">
                        <Button type="submit" className="btn btn-primary">
                          Donate
                        </Button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
}

// import Head from "next/head";
// import Link from "next/link";
// import React, { useState } from "react";

// export default function Donation_Success({ initialValues }) {
//   return (
//     initialValues &&
//     initialValues.map((data, index) => {
//       return (
//         <section className="wc-donation-form" key={index}>
//           <div className="container p-0">
//             <div className="row">
//               <div className="col-12 p-0">
//                 <div className="inner-success">
//                   <h2>{data.title}</h2>
//                   <div className="inner-input">
//                     <label>Donate to</label>
//                     <input type="text" className="form-control" name="name" />
//                   </div>
//                   <div className="wc-amount">
//                     <p>Pick a donation amount</p>
//                     <Link href="#">
//                       <p>$ 25</p>
//                     </Link>
//                     <Link href="#">
//                       <p>$ 50</p>
//                     </Link>
//                     <Link href="#">
//                       <p>$ 100</p>
//                     </Link>
//                     <Link href="#">
//                       <p>$ 1000</p>
//                     </Link>
//                     <Link href="#">
//                       <p>custom amount</p>
//                     </Link>
//                   </div>
//                   <div className="donation-Occurence">
//                     <h3>Donation Occurence</h3>
//                     <label className="radio_btn">
//                       <input
//                         type="radio"
//                         name="position_of_interest"
//                         value="Radio Field"
//                       />
//                       <span className="list-item-label">One time donation</span>
//                     </label>
//                     <label className="radio_btn">
//                       <input
//                         type="radio"
//                         name="position_of_interest"
//                         value="Radio Field"
//                       />
//                       <span className="list-item-label">
//                         Recurring donation
//                       </span>
//                     </label>
//                   </div>
//                   <div className="donation-information">
//                     <h3>Donation Information</h3>
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="name"
//                       placeholder="Name"
//                     />
//                     <input
//                       type="text"
//                       className="form-control"
//                       name="name"
//                       placeholder="Last Name"
//                     />
//                     <input
//                       type="email"
//                       className="form-control"
//                       name="Your email"
//                       placeholder="Email"
//                     />
//                     <div className="select-box">
//                       <div className="custom-select">
//                         <select>
//                           <option value="state">State</option>
//                           <option value="Maharashtra">Maharashtra</option>
//                           <option value="kerla">kerla</option>
//                           <option value="Goa">Goa</option>
//                           <option value="Dehli">Dehli</option>
//                           <option value="sikkim">sikkim</option>
//                         </select>
//                       </div>
//                       <div className="custom-select">
//                         <select>
//                           <option value="Country">Country</option>
//                           <option value="india">india</option>
//                           <option value="America">America</option>
//                           <option value="Assam">canada</option>
//                           <option value="Gujarat">Rasiya</option>
//                           <option value="Chhattisgarh">landon</option>
//                           <option value="Goa">America</option>
//                         </select>
//                       </div>
//                       <input
//                         type="text"
//                         className="form-control"
//                         name="name"
//                         placeholder="Zip code"
//                       />
//                     </div>
//                     <h3>Payment method</h3>
//                     <div className="custom-select google">
//                       <select>
//                         <option value="Google pay">Google pay</option>
//                         <option value="paytem">paytem</option>
//                         <option value="g-pay">g-pay</option>
//                       </select>
//                     </div>

//                     <div className="contact-form-button">
//                       <Link href="/donation" className="btn btn-primary">
//                         Donate
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       );
//     })
//   );
// }
