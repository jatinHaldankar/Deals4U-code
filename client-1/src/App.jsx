
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/Login';
import Orders from './screens/Orders';
import { CartProvider } from './components/ContextReducer';


const App = () => {
  return <CartProvider>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} ></Route>
        <Route exact path="/orders" element={<Orders />}></Route>
        <Route exact path='/signup' element={<Signup />}></Route>
        <Route exact path='/login' element={<Login />}></Route>
      </Routes>

    </Router>
  </CartProvider>

}

export default App;
