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
                                            <h5 className="card-title">Customer_Id: {item.customer_id}</h5>
                                            <h5 className="card-title">Reference_Id: {item.reference_id}</h5>
                                            <h5 className="card-title">Name: {item.name}</h5>
                                            <h5 className="card-title">Phone Number: {item.phone_number}</h5>
                                            <h5 className="card-title">Item Name: {item.item_name}</h5>
                                            <h5 className="card-title">Item Price: {item.item_price} Rs</h5>
                                            <h5 className="card-title">Down Payment: {item.down_payment}</h5>
                                            <h5 className="card-title">Emi_Amount: {item.emi_amount}</h5>
                                        </div>
                                        <ul className="list-group list-group-flush">
                                            <li className={`${style.line} list-group-item`}>
                                                <h5 className="card-title">Associate_Name: {item.associate_1}</h5>
                                                <h5 className="card-title">Phone Number: {item.phone_number_1}</h5>
                                                <p className="card-title"><span className='fw-bold fs-4'>Address:</span> <h6>{item.address_1}</h6></p>
                                            </li>
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
