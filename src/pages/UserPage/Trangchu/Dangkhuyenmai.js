import React, { useState } from 'react';
import { renderTien } from "../../../notification/renderConvert";
import { Row, Col, Modal, Card, Image, Button } from 'antd';
import { BrowserRouter as NavLink, Link } from "react-router-dom";
import ModalSanPham from "../modalSanPham/ModalSanPham";
import { useDispatch } from 'react-redux';
import * as actProductSame from "../../../actions/productSame/actProductSame";
import * as actEditItem1 from "../../../actions/quanlyKho_quan_ao/actQuanlyQuanAo";

function Dangkhuyenmai({ listDiscount, match }) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const showModal = (id) => {
    dispatch(actEditItem1.actGetKhoRequest(id));
    setIsModalVisible(true);
  };

  const addToCardSame = (item) => {
    let dataSame = JSON.parse(localStorage.getItem('CARD_SAME')) ? JSON.parse(localStorage.getItem('CARD_SAME')) : [];
    let arr = dataSame.find(item2 => item2.tenSanPham === item.tenSanPham && item2.id === item.id);
    if (arr) {
      arr = arr
    } else {
      dataSame.push(item)
      localStorage.setItem('CARD_SAME', JSON.stringify(dataSame));
    }
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function renderDiscount() {
    return listDiscount.map((item, index) => {
      return (
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-6">
            <div className="card-best-seller">
              <Card bordered={false}
                style={{ width: 260, marginRight: '25px', marginBottom: '80px' }}
                cover={
                  Array.isArray(item && item.img) && item.img.length > 0 && item.img.map((itemImg, index) => {
                    if (index === 0) {
                      return (
                        <div className="wrapper-2">
                          <div className="big-image">
                            <div className="phantramgiam">-{Math.ceil(100 - ((item.priceSale) / (item.price) * 100))}%</div>
                            <img src={itemImg} width="100%" />
                            <div class="info-T-shirt-all">
                              <Link
                                path={{
                                  to: `product/${item.id}`,
                                  id: item.id,
                                }}
                              >
                                <button onClick={() => showModal(item.id)}>
                                  <i
                                    style={{ fontSize: "23px" }}
                                    class="fa fa-eye"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </Link>
                              <br />
                              <Link
                                to={{
                                  pathname: `product/${item.id}`,
                                  id: item.id,
                                }}
                              >
                                <button onClick={() => addToCardSame(item)}>
                                  <i
                                    style={{ fontSize: "23px" }}
                                    class="fa fa-cart-plus"
                                    aria-hidden="true"
                                  ></i>
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      )
                    }
                  })
                }
              >
                <div className="card-product-list">
                  <div className="product-info">
                    <Link
                      style={{ color: 'black' }}
                      to={{
                        pathname: `product/${item.id}`,
                      }}
                    >
                      {item.tenSanPham}
                    </Link>
                  </div>
                  <div className="product-price">
                    <strong style={{ fontSize: '16px' }}>{renderTien(item.priceSale)}</strong>&emsp;
                    <strike>{renderTien(item.price)}</strike>
                  </div>
                  <div className="select-img">
                    {
                      Array.isArray(item && item.img) && item.img.length > 0 && item.img.map((itemImg, indexImg) => {
                        if (indexImg < 3) {
                          return (
                            <Image style={{ border: '1px solid #ffac4b', height: '60px' }} src={itemImg} width="50px" />
                          )
                        }
                      })
                    }
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )
    })
  }
  return (
    <>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={900}
      >
        <ModalSanPham match={match} />
      </Modal>
      <div className="row">
        {renderDiscount()}
      </div>
    </>
  );
}

export default Dangkhuyenmai;