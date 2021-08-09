import React, { useState } from 'react';
import { renderTien } from "../../../notification/renderConvert";
import { Row, Col, Modal, Card, Image, Button } from 'antd';
import ModalSanPham from "../modalSanPham/ModalSanPham";
import { BrowserRouter as Link, NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as actProductSame from "../../../actions/productSame/actProductSame";
import * as actEditItem1 from "../../../actions/quanlyKho_quan_ao/actQuanlyQuanAo";

function BestSeller({ newBestSeller, match }) {
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

  function renderBestSeller() {
    return newBestSeller.map((item, index) => {
      return (
        <div className="row">
          <div className="col-xl-3 col-lg-3 col-lg-6 col-lg-12">
            <div className="card-best-seller">
              <Card bordered={false}
                style={{ width: 260, marginRight: '25px', marginBottom: '80px' }}
                cover={
                  Array.isArray(item && item.img) && item.img.length > 0 && item.img.map((itemImg, index) => {
                    if (index === 0) {
                      return (
                        <div className="wrapper-2">
                          <div className="big-image">
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
                              <NavLink
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
                              </NavLink>
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
                    <a>
                      <NavLink
                        style={{ color: 'black' }}
                        to={{
                          pathname: `product/${item.id}`,
                        }}
                      >{item.tenSanPham}
                      </NavLink>
                    </a>
                  </div>
                  <div className="product-price">
                    <strong style={{ fontSize: '16px' }}>{renderTien(item.price)}</strong>
                  </div>
                  <div className="select-img">
                    {
                      Array.isArray(item && item.img) && item.img.length > 0 && item.img.map((itemImg, indexImg) => {
                        if (indexImg < 3) {
                          return (
                            <Image style={{ border: '1px solid #ffac4b', height: '50px', marginRight: '5px' }} src={itemImg} width="50px" />
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
        {renderBestSeller()}
      </div>
    </>
  );
}

export default BestSeller;