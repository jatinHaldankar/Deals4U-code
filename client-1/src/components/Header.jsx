import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Modal from "../Modal";
import StyledBadge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

const Header = () => {
  let navigate = useNavigate();
  let data = useCart();


  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  }

  const [cartView, setCartView] = useState(false);
  const loadCart = () => {
    setCartView(true);
  }

  const closeCart = () => {
    setCartView(false);
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand fs-1 fst-italic" to="/">Deals4U</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active fs-4" aria-current="page" to="/">Home</Link>
            </li>
            {localStorage.getItem("authToken") && <li className="nav-item">
              <Link className="nav-link active fs-4" to="/orders">My Orders</Link>
            </li>}
          </ul>

          {
            localStorage.getItem("authToken")
              ?
              <div>
                <div className="btn bg-white text-success mx-2 fs-5 text-success" style={{ height: "45px" }} onClick={loadCart}>Cart
                  <IconButton aria-label="cart">
                    <StyledBadge badgeContent={data.length} color="warning">
                      <ShoppingCartIcon color="success" />
                    </StyledBadge>
                  </IconButton>
                </div>

                {cartView && <Modal onClose={closeCart}>  <Cart ></Cart></Modal>}
                <button onClick={handleLogout} className="btn bg-white text-danger fs-5" >Logout</button>
              </div>
              :
              <div className='d-flex'>
                <Link className="btn bg-white text-success mx-1 fs-5 " to="/login">Login </Link>
                <Link className="btn bg-white text-success mx-1 fs-5 " to="/signup">Signup</Link>
              </div>
          }

        </div>
      </div>
    </nav>
  )
}

export default Header;