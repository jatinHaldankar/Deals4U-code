import React, { useState, useEffect } from 'react';
import Header from '../components/Header';


const Orders=()=> {
    const [orders, setOrders] = useState([]);

    const load = async () => {
        const options1 = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem("userEmail")
            })
        }
        let response = await fetch("http://localhost:5000/orderData", options1);
        let ordersArray = await response.json();
        setOrders(ordersArray);
    }

    useEffect(() => {
        load();
    }, []);

    return (
        <div>
            <Header />
            <div className="container mt-2">
           
                {
                    orders.length===0 ?<p className='mt-5 fs-3 text-warning text-center'>first order comming soon!!</p>:
                    orders.map((order, index) => {
                        return <div className="row" key={index}>
                            {   
                                order.map((item, itemIndex) => {
                                    return item.orderDate ?
                                        <div key={itemIndex} className="mt-2 d-flex align-items-center">
                                            <div className="mx-3">
                                                <h4 className="text-success">Order Date:</h4>
                                                <h4 className="text-success">Order Price:</h4>
                                            </div>
                                            <div>
                                                <h4 className="text-warning">{item.orderDate}</h4>
                                                <h4 className="text-warning">₹{item.orderPrice}/-</h4>
                                            </div>
                                            <hr />
                                        </div>
                                        :
                                        <div key={itemIndex} className="col-12 col-md-6 col-lg-3">
                                            <div className="card mt-3" style={{ width: "15rem", maxHeight: "360px" }}>
                                                <img src={item.img} className="card-img-top" alt="..." style={{ height: "200px", objectFit: "fill" }} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className="container w-100 p-0" style={{ height: "34px" }}>
                                                        <span className="m-1">{item.qty}</span>
                                                        <span className="m-1">{item.size}</span>
                                                        <div className="d-inline ms-2 h-100 w-20 fs-5">
                                                            ₹{item.price}/-
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                })
                            }
                           
                            <hr className='mt-3' id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                        </div>
                        
                    })
                }
            </div>
        </div>
    );
}

export default Orders;
