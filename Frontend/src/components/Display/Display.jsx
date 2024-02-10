import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import exportFromJSON from 'export-from-json';
import style from './Display.module.css';



const BASE_URL = "https://shop-customer-management.onrender.com/" 
// const BASE_URL = "http://localhost:5000/"
const Display = () => {
    const [data, setData] = useState([]);
    const fileName = "download"
    const exportType = "xls"

    const navigate = useNavigate();
    const getDetails = async () => {
        // TODO : API Call
        const response = await fetch(`${BASE_URL}api/details/fetchalldetails`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = await response.json();
        console.log(json);
        setData(json);
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            getDetails();
        }
        else{
            navigate("/login");
        }
    }, [])

    const ExportToExcel = () => {
        exportFromJSON({data, fileName, exportType});
        console.log(exportFromJSON({data, fileName, exportType}));
        console.log("Shivansh");
    }

    const getDetailsPage = (item) => {
        console.log("wkldmf")
        navigate(`/detailsPage/${item._id}`);
      }

    return (
        <>
        <button className='mx-3' type="button" onClick={ExportToExcel}>Download</button>
            <div className='container my-3'>
                <div className="row">
                    {data.map((item) => {
                        return (
                            <>
                                <div className="col-md-4 my-3" onClick={()=>getDetailsPage(item)}>
                                    <div className={`${style.card} card`}>
                                        <img src="./Images/login.svg" className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title d-inline">Customer_Id: {item.customer_id}</h5>
                                            <h5 className="card-title d-inline ms-3">Reference_Id: {item.reference_id}</h5>
                                            <h5 className="card-title">Name: {item.name}</h5>
                                            <h5 className="card-title">Phone Number: {item.phone_number}</h5>
                                            <h5 className="card-title">Item Name: {item.item_name}</h5>
                                            <h5 className="card-title">Item Price: {item.item_price} Rs</h5>
                                            <h5 className="card-title">Down Payment: {item.down_payment}</h5>
                                            <h5 className="card-title">Emi_Amount: {item.emi_amount}</h5>
                                            <p className="card-title"><span className='fw-bold fs-4'>Address:</span> <h5>{item.address}</h5></p>
                                                <h5 className="card-title">1st EMI Due Date: {item.due_1}</h5>
                                                <h5 className="card-title">1st EMI Amount: {item.amount_1} Rs</h5>
                                                {item.due_2 && <h5 className="card-title">2nd EMI Due Date: {item.due_2} </h5>}
                                                {item.amount_2 && <h5 className="card-title">2nd EMI Amount: {item.amount_2} </h5>}
                                                {item.due_3 && <h5 className="card-title">3rd EMI Due Date: {item.due_3}</h5>}
                                                {item.amount_3 && <h5 className="card-title">3rd EMI Amount: {item.amount_3}</h5>}
                                                {item.due_4 && <h5 className="card-title">4th EMI Due Date: {item.due_4}</h5>}
                                                {item.amount_4 && <h5 className="card-title">4th EMI Amount: {item.amount_4}</h5>}
                                                {item.due_5 && <h5 className="card-title">5th EMI Due Date: {item.due_5}</h5>}
                                                {item.amount_5 && <h5 className="card-title">5th EMI Amount: {item.amount_5}</h5>}
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className={`${style.line} list-group-item`}>
                                                <h5 className="card-title">Associate_Name: {item.associate_1}</h5>
                                                <h5 className="card-title">Phone Number: {item.phone_number_1}</h5>
                                                <p className="card-title"><span className='fw-bold fs-4'>Address:</span> <h6>{item.address_1}</h6></p>
                                            </li>
                                            {item.associate_2 && <li className={`${style.line} list-group-item`}>
                                                <h5 className="card-title">Associate_Name: {item.associate_2}</h5>
                                                <h5 className="card-title">Phone Number: {item.phone_number_2}</h5>
                                                <p className="card-title"><span className='fw-bold fs-4'>Address:</span> <h6>{item.address_2}</h6></p>
                                            </li>}
                                            {item.associate_3 && <li className={`${style.line} list-group-item`}>
                                                <h5 className="card-title">Associate_Name: {item.associate_3}</h5>
                                                <h5 className="card-title">Phone Number: {item.phone_number_3}</h5>
                                                <p className="card-title"><span className='fw-bold fs-4'>Address:</span> <h6>{item.address_3}</h6></p>
                                            </li>}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Display
