import React, { useState, useEffect } from 'react'
import styles from './SearchBar';
import exportFromJSON from 'export-from-json';
import { useNavigate } from 'react-router-dom';


const BASE_URL = "https://shop-customer-management.onrender.com/" 
// const BASE_URL = "http://localhost:5000/"
const SearchBar = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const fileName = "download"
    const exportType = "xls"
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
        // console.log(json);
        setFilter(json);
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getDetails();
        }
        else {
            navigate("/login");
        }
    }, [])

    const ExportToExcel = () => {
        exportFromJSON({data, fileName, exportType});
        // console.log(exportFromJSON({data, fileName, exportType}));
        // console.log("Ayush");
    }

    const onChange = (event) => {
        const search = event.target.value;
        const newFilter = filter.filter((value) => {
            return value.due_1.includes(search) || value.due_2.includes(search) || value.due_3.includes(search) || value.due_4.includes(search) || value.due_5.includes(search) || value.name.toLowerCase().includes(search.toLowerCase()) || value.phone_number.toString().includes(search);
        })
        setData(newFilter);
        console.log("Shivansh");
    }

    return (
        <>
            <button className='mx-3' type="button" onClick={ExportToExcel}>Download</button>
            <div className="container">
                <div className="d-grid col-lg-7 mx-auto">
                    <div className={`${styles.card} card`}>
                        <div className="card-body">
                            <div className="row">
                                <button className="col-sm-2 btn btn-warning col-form-label">Search</button>
                                <div className="col-sm-10">
                                    <input onChange={onChange} type="text" className="form-control" id="search" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {data && <div className='container my-3'>
                <div className="row">
                    {data.map((item) => {
                        return (
                            <>
                                <div className="col-md-4 my-3">
                                    <div className={`${styles.card} card`}>
                                        <img src="./Images/login.svg" className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title d-inline">Customer_Id: {item.customer_id}</h5>
                                            <h5 className="card-title d-inline ms-5">Reference_Id: {item.reference_id}</h5>
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
                                            <li className={`${styles.line} list-group-item`}>
                                                <h5 className="card-title">Associate_Name: {item.associate_1}</h5>
                                                <h5 className="card-title">Phone Number: {item.phone_number_1}</h5>
                                                <p className="card-title"><span className='fw-bold fs-4'>Address:</span> <h6>{item.address_1}</h6></p>
                                            </li>
                                            {item.associate_2 && <li className={`${styles.line} list-group-item`}>
                                                <h5 className="card-title">Associate_Name: {item.associate_2}</h5>
                                                <h5 className="card-title">Phone Number: {item.phone_number_2}</h5>
                                                <p className="card-title"><span className='fw-bold fs-4'>Address:</span> <h6>{item.address_2}</h6></p>
                                            </li>}
                                            {item.associate_3 && <li className={`${styles.line} list-group-item`}>
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
            </div>}
            {data && <div className='container'><h1 className='m-auto'>No more matching items</h1></div>}
        </> 
    )
}

export default SearchBar
