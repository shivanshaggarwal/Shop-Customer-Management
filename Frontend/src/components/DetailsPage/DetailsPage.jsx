import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import exportFromJSON from "export-from-json";
import style from "./DetailsPage.module.css";
import Modal from "./Modal";

const BASE_URL = "https://shop-customer-management.onrender.com/" 
// const BASE_URL = "http://localhost:5000/"
const DetailsPage = () => {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState("");
  const [isActive_1, setIsActive_1] = useState(false);
  const [isActive_2, setIsActive_2] = useState(false);
  const [isActive_3, setIsActive_3] = useState(false);
  const [isActive_4, setIsActive_4] = useState(false);
  const [isActive_5, setIsActive_5] = useState(false);
  const [amountLeft, setAmountLeft] = useState(null);
  const [emiAmount, setEmiAmount] = useState(null);
  const [amountRecieved, setAmountRecieved] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();
  const getDetails = async () => {
    // TODO : API Call
    // const response = await fetch(`${BASE_URL}api/details/fetchalldetails`, {
      const response = await fetch(`${BASE_URL}api/details/getDetailsById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    setData([json?.detail]);
    setAmountLeft(json.detail.emi_amount);
    setAmountRecieved(json.detail.down_payment);
  };

  const handleSubmit = async (e) => {
      // if (localStorage.getItem('token')) {
        const emi_amount = amountLeft - emiAmount;
        const down_payment = amountRecieved + emiAmount;
          e.preventDefault();
          const response = await fetch(`${BASE_URL}api/details/addstatus/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ isActive_1, isActive_2, isActive_3, isActive_4, isActive_5, emi_amount, down_payment })
          });
          const json = await response.json();
          window.location.reload();
  }


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
            // {console.log(data,"dfrmkel")}
            return (
              <>
                <div className="col-md-12 my-3">
                  <div className="row my-3">
                    <div class="col-md-4">
                      <div
                        className={`${style.total_payment} p-2 d-flex justify-content-center align-items-center flex-column`}
                      >
                        <h3>Total Payments</h3>
                        <h5>{item.item_price}</h5>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div
                        className={`${style.total_recieve} p-2 d-flex justify-content-center align-items-center flex-column`}
                      >
                        <h3>Total Received</h3>
                        <h5>{item.down_payment}</h5>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div
                        className={`${style.total_pending} p-2 d-flex justify-content-center align-items-center flex-column`}
                      >
                        <h3>Total Pending</h3>
                        <h5>{item.emi_amount}</h5>
                      </div>
                    </div>
                  </div>
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
                          Due Date:
                          <span className={style.customerDetailInfo}>
                            {item.due_1}
                          </span>
                        </h5>
                        <h5 className="card-title">
                          Amount: Rs
                          <span className={style.customerDetailInfo}>
                            {item.amount_1}
                          </span>
                        </h5>
                        <button
                          type="button"
                          className={`btn btn-${
                            item.isActive_1 ? "success" : "danger"
                          } button rounded`}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                          disabled={item.isActive_1}
                          onClick={() => {setAmount(item.amount_1); setIsActive_1(true); setEmiAmount(item.amount_1)}}
                        >
                          {item.isActive_1 ? "Done" : "Pending"}
                        </button>
                      </div>
                      {item.due_2 && (
                        <>
                          <h4 className="card-title">2nd EMI</h4>
                          <div className="d-flex justify-content-between my-2">
                            <h5 className="card-title">
                              Due Date:
                              <span className={style.customerDetailInfo}>
                                {item.due_2}
                              </span>
                            </h5>
                            <h5 className="card-title">
                              Amount: Rs
                              <span className={style.customerDetailInfo}>
                                {item.amount_2}
                              </span>
                            </h5>
                            <button
                              type="button"
                              className={`btn btn-${
                                item.isActive_2 ? "success" : "danger"
                              } button rounded`}
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              disabled={item.isActive_2}
                              onClick={() => {setAmount(item.amount_2); setIsActive_2(true);setEmiAmount(item.amount_2)}}
                            >
                              {item.isActive_2 ? "Done" : "Pending"}
                            </button>
                          </div>
                        </>
                      )}
                      {item.due_3 && (
                        <>
                          <h4 className="card-title">3rd EMI</h4>
                          <div className="d-flex justify-content-between my-2">
                            <h5 className="card-title">
                              Due Date:
                              <span className={style.customerDetailInfo}>
                                {item.due_3}
                              </span>
                            </h5>
                            <h5 className="card-title">
                              Amount: Rs
                              <span className={style.customerDetailInfo}>
                                {item.amount_3}
                              </span>
                            </h5>
                            <button
                              type="button"
                              className={`btn btn-${
                                item.isActive_3 ? "success" : "danger"
                              } button rounded`}
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              disabled={item.isActive_1}
                              onClick={() => {setAmount(item.amount_3);setIsActive_3(true);setEmiAmount(item.amount_3)}}
                            >
                              {item.isActive_3 ? "Done" : "Pending"}
                            </button>
                          </div>
                        </>
                      )}
                      {item.due_4 && (
                        <>
                          <h4 className="card-title">4th EMI</h4>
                          <div className="d-flex justify-content-between my-2">
                            <h5 className="card-title">
                              Due Date:
                              <span className={style.customerDetailInfo}>
                                {item.due_4}
                              </span>
                            </h5>
                            <h5 className="card-title">
                              Amount: Rs
                              <span className={style.customerDetailInfo}>
                                {item.amount_4}
                              </span>
                            </h5>
                            <button
                              type="button"
                              className={`btn btn-${
                                item.isActive_4 ? "success" : "danger"
                              } button rounded`}
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              disabled={item.isActive_1}
                              onClick={() => {setAmount(item.amount_4);setIsActive_4(true);setEmiAmount(item.amount_4)}}
                            >
                              {item.isActive_4 ? "Done" : "Pending"}
                            </button>
                          </div>
                        </>
                      )}
                      {item.due_5 && (
                        <>
                          <h4 className="card-title">5th EMI</h4>
                          <div className="d-flex justify-content-between my-2">
                            <h5 className="card-title">
                              Due Date:
                              <span className={style.customerDetailInfo}>
                                {item.due_5}
                              </span>
                            </h5>
                            <h5 className="card-title">
                              Amount: Rs
                              <span className={style.customerDetailInfo}>
                                {item.amount_5}
                              </span>
                            </h5>
                            <button
                              type="button"
                              className={`btn btn-${
                                item.isActive_5 ? "success" : "danger"
                              } button rounded`}
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              disabled={item.isActive_1}
                              onClick={() => {setAmount(item.amount_5);setIsActive_5(true);setEmiAmount(item.amount_5)}}
                            >
                              {item.isActive_5 ? "Done" : "Pending"}
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
      <Modal amount={amount} onBtSubmit={handleSubmit} />
    </>
  );
};

export default DetailsPage;
