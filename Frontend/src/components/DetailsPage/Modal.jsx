import React from "react";
import style from "./DetailsPage.module.css";

const BASE_URL = "https://shop-customer-management.onrender.com/" 
// const BASE_URL = "http://localhost:5000/"
const Modal = (props) => {
    const {amount, onBtSubmit} = props;

    
  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">Are you sure the of amount Rs <span className={style.amount}>{amount}</span> is done. <span className={style.alert}>It would not be revert again </span> </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="submit" class="btn btn-primary" onClick={onBtSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
