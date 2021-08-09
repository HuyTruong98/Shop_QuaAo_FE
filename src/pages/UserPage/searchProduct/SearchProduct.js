import React, { useEffect, useState } from "react";
import { Row, Col, Modal, Card, Image, Button } from 'antd';
import { BrowserRouter as Redirect, Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as actGetProductItem from "../../../actions/quanlyKho_quan_ao/actQuanlyQuanAo";
import { renderTien } from "../../../notification/renderConvert";
import ModalSanPham from "../modalSanPham/ModalSanPham";
import Footer from "../footer/Footer";

function SearchProduct({ match }) {
  const { id } = match.params;
  const history = useHistory();
  const dispatch = useDispatch();
  const itemProduct = useSelector(state => state.quanlyKhoAoQuan.item);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id) => {
    dispatch(actGetProductItem.actGetKhoRequest(id));
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function goProduct(id) {
    history.push({
      pathname: `/product/${id}`,
    })
  }

  function renderSearchProduct() {
    return (
      <div className="row">
        <div className="col-xl-3 col-lg-3 col-6">
          <div className="card-best-seller">
            <Card bordered={false}
              style={{ width: 260, marginRight: '25px', marginBottom: '80px' }}
              cover={
                Array.isArray(itemProduct && itemProduct.img) && itemProduct.img.length > 0 && itemProduct.img.map((itemImg, index) => {
                  if (index === 0) {
                    return (
                      <div className="wrapper-2">
                        <div className="big-image">
                          {
                            itemProduct.priceSale ?
                              <div className="phantramgiam">-{Math.ceil(100 - ((itemProduct.priceSale) / (itemProduct.price) * 100))}%</div>
                              : ""
                          }
                          <img src={itemImg} width="100%" height="100%" />
                          <div class="info-T-shirt-all">

                            <button onClick={() => showModal(itemProduct.id)}>
                              <i
                                style={{ fontSize: "23px" }}
                                class="fa fa-eye"
                                aria-hidden="true"
                              ></i>
                            </button>
                            <br />
                            <Link
                              path={[
                                `product/${itemProduct.id}`
                              ]}
                            >
                              <button onClick={() => goProduct(itemProduct.id)}>
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
                  <a onClick={() => goProduct(itemProduct.id)}>
                    {itemProduct.tenSanPham}
                  </a>
                </div>
                <div className="product-price">
                  {
                    itemProduct.priceSale ?
                      <>
                        <strong style={{ fontSize: '16px' }}>{renderTien(itemProduct.priceSale)}</strong> &emsp;
                        <strike>{renderTien(itemProduct.price)}</strike>
                      </>
                      :
                      <strong style={{ fontSize: '16px' }}>{renderTien(itemProduct.price)}</strong>
                  }
                </div>
                <div className="select-img">
                  {
                    Array.isArray(itemProduct && itemProduct.img) && itemProduct.img.length > 0 && itemProduct.img.map((itemImg, indexImg) => {
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
  }

  useEffect(() => {
    dispatch(actGetProductItem.actGetKhoRequest(id));
  }, [])
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
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p> Trang chủ &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Tìm kiếm</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-product-detail-1">
        <div className="container">
          <div className="row search-box">
            <div className="page-gioithieu-title" style={{ marginBottom: '30px' }}>
              <strong>Kết quả tìm kiếm:</strong>
            </div>
            {renderSearchProduct()}
          </div>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}

export default SearchProduct;
