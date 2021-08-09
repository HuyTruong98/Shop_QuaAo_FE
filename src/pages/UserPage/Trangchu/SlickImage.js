import React from 'react';
import { BrowserRouter as NavLink, Link } from "react-router-dom";
import Slider from "react-slick";

function SlickImage({ match }) {
  const settings = {
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <Slider {...settings}>
        <div className="slick">
          <div className="caption-title">
              <a style={{ color: 'black' }}>T-SHIRT</a>
          </div>
          <div className="caption-img">
            <img src="https://bizweb.dktcdn.net/thumb/large/100/331/067/collections/4.png" width="100%" />
          </div>
        </div>
        <div className="slick">
          <div className="caption-title">
            <a style={{ color: 'black' }}>HOODIE</a>
          </div>
          <div className="caption-img">
            <img src="//bizweb.dktcdn.net/thumb/large/100/331/067/collections/3.png" width="100%" />
          </div>
        </div>
        <div className="slick">
          <div className="caption-title">
            <a style={{ color: 'black' }}>JACKET</a>
          </div>
          <div className="caption-img">
            <img src="//bizweb.dktcdn.net/thumb/large/100/331/067/collections/5.png" width="100%" />
          </div>
        </div>
        <div className="slick">
          <div className="caption-title">
            <a style={{ color: 'black' }}>PATNS</a>
          </div>
          <div className="caption-img">
            <img src="//bizweb.dktcdn.net/thumb/large/100/331/067/collections/1.png" width="100%" />
          </div>
        </div>
        <div className="slick">
          <div className="caption-title">
            <a style={{ color: 'black' }}>SƠ MI</a>
          </div>
          <div className="caption-img">
            <img src="//bizweb.dktcdn.net/thumb/large/100/331/067/collections/32132.png" width="100%" />
          </div>
        </div>
        <div className="slick">
          <div className="caption-title">
            <a style={{ color: 'black' }}>ACCESSORIES</a>
          </div>
          <div className="caption-img">
            <img src="//bizweb.dktcdn.net/thumb/large/100/331/067/collections/2-40865d8d-17e2-47a7-876b-f50e430b2b70.png" width="100%" />
          </div>
        </div>
      </Slider>
    </>
  );
}

export default SlickImage;