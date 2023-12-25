import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
 
  let options=props.options;
  let priceOptions=Object.keys(options);
  let navigate=useNavigate();
  

  const [qty,setQty]=useState(1);
  const [size,setSize]=useState("");
  const priceRef=useRef();

  const changeQty=(event)=>{
       setQty(event.target.value);
  }

  const changeSize=(event)=>{
     setSize(event.target.value);
  }

  useEffect(()=>{
     setSize(priceRef.current.value);
  },[])


  let finalPrice=qty* parseInt(options[size]);

  let data = useCart();
  const dispatch = useDispatchCart();

  const handleAddToCart = async () => {
    if (!localStorage.getItem("authToken")) {
      navigate("/login");
    } else {
      let audio = new Audio("m2.mp3");
      audio.play();
      const itemToUpdate = data.find((item) => item.id === props.id && item.size === size);
      if (itemToUpdate) {
        dispatch({ type: "UPDATE", id: props.id, qty: qty, size: size, price: finalPrice });
      } else {
        dispatch({ type: "ADD", id: props.id, name: props.name, price: finalPrice, qty: qty, size: size, img: props.img });
      }
    }
  };
  
 
  return (
      <div className="card mt-3" style={{ width: "15rem", maxHeight: "360px" }}>
        <img src={props.img} className="card-img-top" alt="it is img" style={{ height: "200px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>

          <div className='container w-100 p-0' style={{ height: "34px" }}>

            <select className=" h-100 w-20 bg-success text-black rounded " style={{ select: "#FF0000" }} onChange={changeQty} >
              {
                Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  )
                })
              }
            </select>

            <select className="ms-2 h-100 w-20  bg-success text-black rounded" style={{ select: "#FF0000" }} onChange={changeSize}  ref={priceRef}>
            {
              priceOptions.map((i)=>{
                return <option key={i} value={i}>{i}</option>
              })
            }

            </select>

            <div className='d-inline w-20 ms-1 h-100 fs-5'>
              ₹{finalPrice}        
            </div>

          </div>
          <hr></hr>
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Add to Cart</button>
        </div>

      </div>
  )
}

export default Card;