import React, { useEffect, useState } from "react";
import Navb from "../component/Navbar";
import Cardd from "../component/Card";
import Footer from "../component/Footer";
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from '../component/ExampleCarouselImage';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../component/Carousel.css';  

const Home = () => {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    console.log('Search text received from child:', text);
    setSearchText(text || '');
  };

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    handleScrollToTop();
  }, [searchText]); 

  const loadData = async () => {
    let response = await fetch("http://localhost:3003/api/fooddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log('Food Item:', response[0]);
    console.log('Food Category:', response[1]);
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navb showBar={true} onSearch={handleSearch} />
      
      <div>
        <Carousel>
          <Carousel.Item interval={1000} className="carousel-item-fullscreen">
            <ExampleCarouselImage imgSrc={"https://media.istockphoto.com/photos/paneer-tikka-at-skewers-in-black-bowl-at-dark-slate-background-paneer-picture-id1186759790?k=20&m=1186759790&s=612x612&w=0&h=e9MlX_7cZtq9_-ORGLPNU27VNP6SvDz7s-iwTxrf7wU="} text="First slide" />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={500} className="carousel-item-fullscreen">
            <ExampleCarouselImage imgSrc={"https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVnJTIwZnJpZWQlMjByaWNlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"} />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="carousel-item-fullscreen">
            <ExampleCarouselImage imgSrc={"https://cdn.pixabay.com/photo/2019/11/04/12/16/rice-4601049__340.jpg"} text="Third slide" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="container">
        {foodCat.length !== 0
          ? foodCat.map((data) => (
              <div className="row mb-3" key={data._id}>
                <div className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {foodItem
                  .filter((item) =>
                    item.CategoryName === data.CategoryName &&
                    typeof item.name === 'string' && item.name.toLowerCase().includes(searchText.toLowerCase())
                  )
                  .map((filterItems) => (
                    <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                      <Cardd
                        foodItem = {filterItems}
                        options={filterItems.options[0]}
                      />
                    </div>
                  ))}
              </div>
            ))
          : ""}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
