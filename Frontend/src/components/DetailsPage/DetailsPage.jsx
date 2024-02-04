import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import exportFromJSON from "export-from-json";
import style from "./DetailsPage.module.css";
import Modal from "./Modal";

const BASE_URL = "https://shop-customer-management.onrender.com/";
const DetailsPage = () => {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState("");

  const navigate = useNavigate();
  const getDetails = async () => {
    // TODO : API Call
    const response = await fetch(`${BASE_URL}api/details/fetchalldetails`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    console.log(json);
    setData(json);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getDetails();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <h1 className="mx-5">Customer Details</h1>
      <div className="container my-3">
        <div className="row">
          {data.map((item) => {
            return (
              <>
                <div className="col-md-12 my-3">
                  <div className={`${style.card} card`}>
                    {/* <img
                      src="./Images/login.svg"
                      className="card-img-top"
                      alt="..."
                    /> */}
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <h5 className="card-title d-inline">
                          Customer_Id:
                          <span className={style.text}>{item.customer_id}</span>
                        </h5>
                        <h5 className="card-title d-inline ms-3">
                          Reference_Id:
                          <span className={style.text}>
                            {item.reference_id}
                          </span>
                        </h5>
                      </div>
                      <h2>Basic Info</h2>
                      <div className="d-flex justify-content-between my-2">
                        <h4 className="card-title">
                          Name:
                          <span className={style.customerDetailInfo}>
                            {item.name}
                          </span>
                        </h4>
                        <h4 className="card-title">
                          Phone Number:
                          <span className={style.customerDetailInfo}>
                            {item.phone_number}
                          </span>
                        </h4>
                      </div>
                      <h2>Product Info</h2>
                      <h5 className="card-title">
                        Item Name:
                        <span className={style.customerDetailInfo}>
                          {item.item_name}
                        </span>
                      </h5>
                      <h5 className="card-title">
                        Item Price: Rs
                        <span className={style.customerDetailInfo}>
                          {item.item_price}
                        </span>
                      </h5>
                      <h5 className="card-title">
                        Down Payment:
                        <span className={style.customerDetailInfo}>
                          {item.down_payment}
                        </span>
                      </h5>
                      <h5 className="card-title">
                        Emi_Amount:
                        <span className={style.customerDetailInfo}>
                          {item.emi_amount}
                        </span>
                      </h5>
                      <p className="card-title">
                        <span className="fw-bold fs-4">Address:</span>
                        <h5 className={style.customerDetailInfo}>
                          {item.address}
                        </h5>
                      </p>
                      <h2>EMI Details</h2>
                      <h4 className="card-title">1st EMI</h4>
                      <div className="d-flex justify-content-between my-2">
                        <h5 className="card-title">
                          Due Date:{" "}
                          <span className={style.customerDetailInfo}>
                            {item.due_1}
                          </span>
                        </h5>
                        <h5 className="card-title">
                          Amount: Rs{" "}
                          <span className={style.customerDetailInfo}>
                            {item.amount_1}
                          </span>
                        </h5>
                        <button
                          type="button"
                          className="btn btn-danger button rounded"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          onClick={() => setAmount(item.amount_1)}
                        >
                          Pending
                        </button>
                      </div>
                      {item.due_2 && (
                        <>
                          <h4 className="card-title">2nd EMI</h4>
                          <div className="d-flex justify-content-between my-2">
                            <h5 className="card-title">
                              Due Date:{" "}
                              <span className={style.customerDetailInfo}>
                                {item.due_2}
                              </span>
                            </h5>
                            <h5 className="card-title">
                              Amount: Rs{" "}
                              <span className={style.customerDetailInfo}>
                                {item.amount_2}
                              </span>
                            </h5>
                            <button
                              type="button"
                              className="btn btn-danger button rounded"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => setAmount(item.amount_2)}
                            >
                              Pending
                            </button>
                          </div>
                        </>
                      )}
                      {item.due_3 && (
                        <>
                          <h4 className="card-title">3rd EMI</h4>
                          <div className="d-flex justify-content-between my-2">
                            <h5 className="card-title">
                              Due Date:{" "}
                              <span className={style.customerDetailInfo}>
                                {item.due_3}
                              </span>
                            </h5>
                            <h5 className="card-title">
                              Amount: Rs{" "}
                              <span className={style.customerDetailInfo}>
                                {item.amount_3}
                              </span>
                            </h5>
                            <button
                              type="button"
                              className="btn btn-danger button rounded"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => setAmount(item.amount_3)}
                            >
                              Pending
                            </button>
                          </div>
                        </>
                      )}
                      {item.due_4 && (
                        <>
                          <h4 className="card-title">4th EMI</h4>
                          <div className="d-flex justify-content-between my-2">
                            <h5 className="card-title">
                              Due Date:{" "}
                              <span className={style.customerDetailInfo}>
                                {item.due_4}
                              </span>
                            </h5>
                            <h5 className="card-title">
                              Amount: Rs{" "}
                              <span className={style.customerDetailInfo}>
                                {item.amount_4}
                              </span>
                            </h5>
                            <button
                              type="button"
                              className="btn btn-danger button rounded"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => setAmount(item.amount_4)}
                            >
                              Pending
                            </button>
                          </div>
                        </>
                      )}
                      {item.due_5 && (
                        <>
                          <h4 className="card-title">5th EMI</h4>
                          <div className="d-flex justify-content-between my-2">
                            <h5 className="card-title">
                              Due Date:{" "}
                              <span className={style.customerDetailInfo}>
                                {item.due_5}
                              </span>
                            </h5>
                            <h5 className="card-title">
                              Amount: Rs{" "}
                              <span className={style.customerDetailInfo}>
                                {item.amount_5}
                              </span>
                            </h5>
                            <button
                              type="button"
                              className="btn btn-danger button rounded"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              onClick={() => setAmount(item.amount_5)}
                            >
                              Pending
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className={`${style.line} list-group-item`}>
                        <h5 className="card-title">
                          Associate_Name: {item.associate_1}
                        </h5>
                        <h5 className="card-title">
                          Phone Number: {item.phone_number_1}
                        </h5>
                        <p className="card-title">
                          <span className="fw-bold fs-4">Address:</span>
                          <h6>{item.address_1}</h6>
                        </p>
                      </li>
                      {item.associate_2 && (
                        <li className={`${style.line} list-group-item`}>
                          <h5 className="card-title">
                            Associate_Name: {item.associate_2}
                          </h5>
                          <h5 className="card-title">
                            Phone Number: {item.phone_number_2}
                          </h5>
                          <p className="card-title">
                            <span className="fw-bold fs-4">Address:</span>
                            <h6>{item.address_2}</h6>
                          </p>
                        </li>
                      )}
                      {item.associate_3 && (
                        <li className={`${style.line} list-group-item`}>
                          <h5 className="card-title">
                            Associate_Name: {item.associate_3}
                          </h5>
                          <h5 className="card-title">
                            Phone Number: {item.phone_number_3}
                          </h5>
                          <p className="card-title">
                            <span className="fw-bold fs-4">Address:</span>
                            <h6>{item.address_3}</h6>
                          </p>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <Modal amount={amount} />
    </>
  );
};

export default DetailsPage;
