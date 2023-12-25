import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import Delete from '@mui/icons-material/DeleteOutline';

const Cart = () => {
    let data = useCart();
    let dispatch = useDispatchCart();
    if (data.length === 0) {
        return (
            <div>
                <div className='m-5 w-100 text-center text-warning fs-3'>The Cart is Empty!</div>
            </div>
        )
    }

    let totalPrice = data.reduce((total, food) => total + food.price, 0);

    const handleCheckOut = async() => {
       
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:localStorage.getItem("userEmail"),
                orderData:data,
                orderDate:new Date().toDateString(),
                orderPrice:totalPrice
            })
        }
        const response=await fetch("http://localhost:5000/checkout",options);
        const json=await response.json();

        if(json.success) {
            dispatch({ type: "DROP" })
        }
    }
    return (
        <div>
            <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
                <table className='table table-hover '>
                    <thead className=' text-success fs-4'>
                        <tr>
                            <th scope='col' >#</th>
                            <th scope='col' >Name</th>
                            <th scope='col' >Quantity</th>
                            <th scope='col' >Option</th>
                            <th scope='col' >Amount</th>
                            <th scope='col' ></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((food, index) => (
                            <tr key={index}>
                                <th scope='row' >{index + 1}</th>
                                <td  className='text-warning' >{food.name}</td>
                                <td className='text-warning'>{food.qty}</td>
                                <td className='text-warning'>{food.size}</td>
                                <td className='text-warning'>{food.price}</td>
                                <td className='text-warning' ><button type="button" className="btn p-0"><Delete onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div><h1 className='fs-2 text-warning'>Total Price: {totalPrice}/-</h1></div>
                <div>
                    <button className='btn bg-success mt-5' onClick={handleCheckOut}> Check Out </button>
                </div>
            </div>

        </div>
    )
}

export default Cart;