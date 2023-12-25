import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';

const Home = () => {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  const changeSearch = (event) => {
    setSearch(event.target.value);
  }

  const load = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }
    let response1 = await fetch("http://localhost:5000/displayItem",options);
    let itemArray = await response1.json();
    setItems(itemArray);

    let response2 = await fetch("http://localhost:5000/displayCategory",options);
    let categoryArray = await response2.json();
    setCategories(categoryArray);
  }

  useEffect(() => {
    load();
  }, [])
  return <div>
    <Header />
    <div id="carouselExampleFade" className="carousel slide carousel-fade carouselImg" data-bs-ride="carousel">

      <div className="carousel-inner " id='carousel'>
        <div className=" carousel-caption  " style={{ zIndex: "9" }}>
          <div className=" d-flex justify-content-center">
            <input className="form-control me-2 w-75" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={changeSearch} />
          </div>
        </div>
        <div className="carousel-item active">
          <img src="images/slider1.jpeg" className="d-block w-100  " style={{ filter: "brightness(35%)" }} alt="..." />
        </div>
        <div className="carousel-item">
          <img src="images/slider2.jpeg" className="d-block w-100 " style={{ filter: "brightness(35%)" }} alt="..." />
        </div>
        <div className="carousel-item">
          <img src="images/slider3.jpeg" className="d-block w-100 " style={{ filter: "brightness(35%)" }} alt="..." />
        </div>
        <div className="carousel-item">
          <img src="images/slider4.jpeg" className="d-block w-100 " style={{ filter: "brightness(35%)" }} alt="..." />
        </div>
        <div className="carousel-item">
          <img src="images/slider5.jpeg" className="d-block w-100 " style={{ filter: "brightness(35%)" }} alt="..." />
        </div>
        <div className="carousel-item">
          <img src="images/slider6.jpeg" className="d-block w-100 " style={{ filter: "brightness(35%)" }} alt="..." />
        </div>

        

      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>



    <div className='container'>
      {
        categories.map((cat, index) => {
          return <div className="row mb-3" key={index}>
            <div className="fs-4 m-3" key={cat._id}>
              {cat.CategoryName}
            </div>
            <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />

            {items.filter((item) => item.CategoryName === cat.CategoryName && item.name.toLowerCase().includes(search.toLowerCase())).map((item, index) => {
              return <div className='col-12 col-md-6 col-lg-3' key={index}>
                <Card
                  key={item._id}
                  name={item.name}
                  img={item.img}
                  options={item.options[0]}

                />
              </div>
            })}
          </div>
        })
      }


    </div>

    <Footer />
  </div>

}

export default Home;