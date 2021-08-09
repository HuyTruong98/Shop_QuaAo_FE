import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import { renderTien } from "../../../notification/renderConvert";
import { Row, Col } from 'antd';
import { BrowserRouter as Link, NavLink } from "react-router-dom";
function SanPhamDaXem(props) {

  const listProductSame = JSON.parse(localStorage.getItem('CARD_SAME'))
  
  const settings = {
    cssEase: "linear",
    autoplay: true,
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,

    nextArrow: false,
    prevArrow: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
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
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '30px' }}>
            <strong>SẢN PHẨM ĐÃ XEM</strong>
          </div>
        </div>
      </div>
      <Row>
        <Col span={1}></Col>
        <Col span={22} >
          <div className="slick-product-same">
            <Slider {...settings}>
              {listProductSame !== undefined && listProductSame !== null && listProductSame !== 0 && listProductSame.length > 3 ? listProductSame.map((x, i) => {
                return (
                  <div key={i} className="img-card">
                    {
                      Array.isArray(x && x.img) && x.img.length > 0 && x.img.map((item, index) => {
                        if (index === 0) {
                          return (
                            <img className="img" src={item} width="100%" height="200px" />
                          )
                        }
                      })
                    }
                    <div class="card-body">
                      <div className="product-info">
                        <NavLink
                          style={{ color: 'black' }}
                          to={{
                            pathname: `product/${x.id}`,
                            id: x.id,
                          }}
                        >
                          <a>
                            {x.tenSanPham}
                          </a>
                        </NavLink>
                      </div>
                      <div className="product-price">
                        {
                          x.priceSale ?
                            <>
                              <strong style={{ fontSize: '16px' }}>{renderTien(x.priceSale)}</strong> &emsp;
                              <strike>{renderTien(x.price)}</strike>
                            </>
                            :
                            <strong style={{ fontSize: '16px' }}>{renderTien(x.price)}</strong>
                        }

                      </div>
                    </div>
                  </div>

                )
              })
                : ""
              }
            </Slider>
          </div>
        </Col>
        <Col span={1}></Col>
      </Row>
    </>
  );
}

export default SanPhamDaXem;