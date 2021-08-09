import React, { useState } from 'react';
import { renderTien } from "../../../notification/renderConvert";
import { Row, Modal, Space, Card, Image } from 'antd';
import { BrowserRouter as NavLink, Link } from "react-router-dom";
import * as actEditItem from "../../../actions/quanlyKho_quan_ao/actQuanlyQuanAo";
import * as actProductSame from "../../../actions/productSame/actProductSame";
import ModalSanPham from "../modalSanPham/ModalSanPham";
import { useDispatch } from "react-redux";

function PhuKienNewArrival({ newArrival, match }) {
  const newArrivalPhuKien = newArrival.filter((itemPhuKien) => itemPhuKien.loaisanphamId === 6);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const showModal = (id) => {
    dispatch(actEditItem.actGetKhoRequest(id));
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

  function renderPhuKienAll() {
    return newArrivalPhuKien.filter((itemMaSanPham) => itemMaSanPham.maSanPham !== "YGS74-NEWARRIVAL1-PHUKIEN").length > 0
      ? newArrivalPhuKien.filter((itemMaSanPham) => itemMaSanPham.maSanPham !== "YGS74-NEWARRIVAL1-PHUKIEN").map((item, index) => {
        return (
          <>
            <Space >
              <Card bordered={false}
                style={{ width: 260, marginRight: '10px' }}
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
                    <a><Link
                      style={{ color: 'black' }}
                      to={{
                        pathname: `product/${item.id}`,
                      }}
                    >{item.tenSanPham}</Link></a>
                  </div>
                  <div className="product-price">
                    <strong>{renderTien(item.price)}</strong>
                  </div>
                  <div className="select-img">
                    {
                      Array.isArray(item && item.img) && item.img.length > 0 && item.img.map((itemImg, index) => {
                        if (itemImg) {
                          return (
                            <Image style={{ border: '1px solid #ffac4b', height: '60px' }} src={itemImg} width="50px" />
                          )
                        }
                      })
                    }
                  </div>
                </div>
              </Card>
            </Space>
          </>
        )
      })
      : ""
  }

  function renderPhuKienFirst() {
    return newArrivalPhuKien.filter((itemMaSanPham) => itemMaSanPham.maSanPham === "YGS74-NEWARRIVAL1-PHUKIEN").length > 0
      ? newArrivalPhuKien.filter((itemMaSanPham) => itemMaSanPham.maSanPham === "YGS74-NEWARRIVAL1-PHUKIEN").map((item, index) => {
        return (
          <>
            <div className="card-item-1">
              <div class="wrapper-1">
                <div class="card-1">
                  {Array.isArray(item && item.img) && item.img.length > 0 && item.img.map((itemImg, index) => {
                    if (index === 0) {
                      return (
                        <img src={itemImg} width="100%" height="100%" />
                      )
                    }
                  })}
                  <div class="info">
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
                      }}
                    >
                      <button onClick={() => addToCardSame(item)}>
                        <i
                          style={{ fontSize: "28px" }}
                          class="fa fa-cart-plus"
                          aria-hidden="true"
                        ></i>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="card-price-name">
                <a ><Link
                  style={{ color: 'black' }}
                  to={{
                    pathname: `product/${item.id}`,
                  }}
                >{item.tenSanPham}</Link></a>
                <br />
                <strong>{renderTien(item.price)}</strong>
              </div>
            </div>

          </>
        )
      })
      : ""
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
        <div className="col-lg-6 col-12">
          {renderPhuKienFirst()}
        </div>
        <div className="col-lg-6 col-12">
          {renderPhuKienAll()}
        </div>
      </div>
    </>
  );
}

export default PhuKienNewArrival;