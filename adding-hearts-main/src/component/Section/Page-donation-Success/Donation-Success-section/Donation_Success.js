import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";

export default function Donation_Success({ initialValues }) {
  return (
    initialValues &&
    initialValues.map((data, index) => {
      return (
        <section className="wc-donation-success" key={index}>
          <div className="container p-0">
            <div className="row">
              <div className="col-12 p-0">
                <div className="inner-success">
                  <h2>{data.main_title}</h2>
                  <h3 className="title">{data.title}</h3>
                  <p>{data.label}</p>
                  <h3 className="title">{data.detail_title}</h3>
                  <div className="details-table">
                    <table>
                      <tbody>
                        {data.donation_details &&
                          data.donation_details.map(
                            (donation_details_data, index) => {
                              return (
                                <tr key={index}>
                                  <td>{donation_details_data.label}</td>
                                  <td>{donation_details_data.value}</td>
                                </tr>
                              );
                            }
                          )}
                      </tbody>
                    </table>
                  </div>

                  <div className="payment-table">
                    <h3>{data.payment_title}</h3>
                    <div className="payment-table-success">
                      <table>
                        <thead>
                          <tr>
                            {data.payment_label &&
                              data.payment_label.map(
                                (payment_label_data, index) => {
                                  return (
                                    <th key={index}>{payment_label_data}</th>
                                  );
                                }
                              )}
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            {data.payment_value &&
                              data.payment_value.map(
                                (payment_value_data, index) => {
                                  return (
                                    <td key={index}>{payment_value_data}</td>
                                  );
                                }
                              )}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    })
  );
}
