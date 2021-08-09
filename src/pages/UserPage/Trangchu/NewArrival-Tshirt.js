import React, { useState } from "react";
import { renderTien } from "../../../notification/renderConvert";
import { Modal, Drawer, Space, Card, Image, Form } from "antd";
import { BrowserRouter as NavLink, Link } from "react-router-dom";
import ModalSanPham from "../modalSanPham/ModalSanPham";
import * as actEditItem from "../../../actions/quanlyKho_quan_ao/actQuanlyQuanAo";
import * as actProductSame from "../../../actions/productSame/actProductSame";
import { useDispatch } from "react-redux";
import { data } from "jquery";

function NewArrivalTshirt({ newArrival, match }) {
  const newArrivalTshirt = newArrival.filter(
    (itemTshirt) => itemTshirt.loaisanphamId === 1
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  const showModal = (id) => {
    dispatch(actEditItem.actGetKhoRequest(id));
    console.log(id);
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
  function renderTshirtAll() {
    return newArrivalTshirt.filter(
      (itemMaSanPham) => itemMaSanPham.maSanPham !== "NEWARRIVAL1-T-SHIRT-1"
    ).length > 0
      ? newArrivalTshirt
        .filter(
          (itemMaSanPham) =>
            itemMaSanPham.maSanPham !== "NEWARRIVAL1-T-SHIRT-1"
        )
        .map((item, index) => {
          return (
            <>
              <Space>
                <Card
                  bordered={false}
                  style={{ width: 260 }}
                  cover={
                    Array.isArray(item && item.img) &&
                    item.img.length > 0 &&
                    item.img.map((itemImg, index) => {
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
                        );
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
                      {Array.isArray(item && item.img) &&
                        item.img.length > 0 &&
                        item.img.map((itemImg, index) => {
                          if (itemImg) {
                            return (
                              <Image
                                style={{ border: "1px solid #ffac4b" }}
                                src={itemImg}
                                width="50px"
                              />
                            );
                          }
                        })}
                    </div>
                  </div>
                </Card>
              </Space>
            </>
          );
        })
      : "";
  }

  function renderTshirtFirst() {
    return newArrivalTshirt.filter(
      (itemMaSanPham) => itemMaSanPham.maSanPham === "NEWARRIVAL1-T-SHIRT-1"
    ).length > 0
      ? newArrivalTshirt
        .filter(
          (itemMaSanPham) =>
            itemMaSanPham.maSanPham === "NEWARRIVAL1-T-SHIRT-1"
        )
        .map((item, index) => {
          return (
            <div className="card-item-1">
              <div class="wrapper-1">
                <div class="card-1">
                  {Array.isArray(item && item.img) &&
                    item.img.length > 0 &&
                    item.img.map((itemImg, index) => {
                      if (index === 0) {
                        return (
                          <img src={itemImg} width="100%" height="100%" />
                        );
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
          );
        })
      : "";
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
        <div className="col-lg-6 col-12">{renderTshirtFirst()}</div>
        <div className="col-lg-6 col-12">{renderTshirtAll()}</div>
      </div>
    </>
  );
}

export default NewArrivalTshirt;
