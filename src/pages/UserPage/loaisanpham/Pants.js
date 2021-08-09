import React, { useEffect, useState } from "react";
import { Result, Button, Card, Image, Modal, Row } from 'antd';
import { BrowserRouter as Redirect, Link, NavLink, useHistory } from "react-router-dom";
import ModalSanPham from "../modalSanPham/ModalSanPham";
import Footer from "../footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import * as actKhoQuanAo from "../../../actions/quanlyKho_quan_ao/actQuanlyQuanAo";
import SlickImage from "../Trangchu/SlickImage";
import { renderTien } from "../../../notification/renderConvert";
import SanPhamDaXem from "../detail/SanPhamDaXem";
import _ from 'lodash';

function Pants({ match }) {
  const listKhoQuanAo = useSelector(state => state.quanlyKhoAoQuan.list);
  const listPants = listKhoQuanAo.filter(item => item.loaisanphamId === 2);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [lengthRender, setLengthRender] = useState(8)
  const [renderProduct, setRenderProduct] = useState();
  const dispatch = useDispatch();

  const showModal = (id) => {
    dispatch(actKhoQuanAo.actGetKhoRequest(id));
    setIsModalVisible(true);
  };

  function handleShowMore() {
    setLengthRender(lengthRender + 4);
  }

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

  function renderTatCaPants(listPants) {
    if (renderProduct !== null && renderProduct !== undefined) {
      return (
        renderProduct.map((item, index) => {
          if (index < lengthRender) {
            return (
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
                                {
                                  item.priceSale ?
                                    <div className="phantramgiam">-{Math.ceil(100 - ((item.priceSale) / (item.price) * 100))}%</div>
                                    : ""
                                }
                                <img src={itemImg} width="100%" height="100%" />
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
                        {
                          item.priceSale ?
                            <>
                              <strong style={{ fontSize: '16px' }}>{renderTien(item.priceSale)}</strong> &emsp;
                              <strike>{renderTien(item.price)}</strike>
                            </>
                            :
                            <strong style={{ fontSize: '16px' }}>{renderTien(item.price)}</strong>
                        }
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
            )
          }
        })
      )
    } else {
      return (
        listPants.map((item, index) => {
          if (index < lengthRender) {
            return (
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
                                {
                                  item.priceSale ?
                                    <div className="phantramgiam">-{Math.ceil(100 - ((item.priceSale) / (item.price) * 100))}%</div>
                                    : ""
                                }
                                <img src={itemImg} width="100%" height="100%" />
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
                        {
                          item.priceSale ?
                            <>
                              <strong style={{ fontSize: '16px' }}>{renderTien(item.priceSale)}</strong> &emsp;
                              <strike>{renderTien(item.price)}</strike>
                            </>
                            :
                            <strong style={{ fontSize: '16px' }}>{renderTien(item.price)}</strong>
                        }
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
            )
          }
        })
      )
    }
  }

  let listSanPhamTshirtTangDan = _.orderBy(listPants, ['price'], ['asc']);
  let listSanPhamTshirtGiamDan = _.orderBy(listPants, ['price'], ['desc']);
  let listSanPhamTshirtMoiNhat = listPants.filter(item => item.sanphamduocId === 6);
  let listSanPhamTshirtCuNhat = listPants.filter(item => item.sanphamduocId === 5);

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
              <p> Trang chủ &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>PANTS</span></p>
            </div>
            <div className="main_container collection col-md-12 col-lg-12">
              <SlickImage />
              <div className="tatcasanpham-title">
                <strong>PANTS</strong>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 d-none d-md-block sortby">
                <aside className="aside-items base-sort-product">
                  <div className="aside-title">
                    <img src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/i-sort.png?1625781892113" alt="Young Green - YG Shop" />
                    Sắp xếp theo:
                  </div>
                  <div className="aside-content filter-group">
                    <a onClick={() => { setRenderProduct(listSanPhamTshirtMoiNhat) }}>Mới nhất</a>
                    <a onClick={() => { setRenderProduct(listSanPhamTshirtCuNhat) }}>Cũ nhất</a>
                    <a onClick={() => { setRenderProduct(listSanPhamTshirtTangDan) }}>Giá tăng dần</a>
                    <a onClick={() => { setRenderProduct(listSanPhamTshirtGiamDan) }}>Giá giảm dần</a>
                  </div>
                </aside>
              </div>
              <div className="col-12 col-sm-12 col-md-12 col-lg-12 sortby1">
                <div className="boloc-all">
                  <img src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/i-filter.png?1625781892113" alt="Young Green - YG Shop" />  &ensp;
                  <strong>Bộ lọc</strong>
                </div>
              </div>
              <div className="row renderProductAll">
                {renderTatCaPants(listPants)}
              </div>
              <Row justify="center">
                {lengthRender !== listPants.length && listPants.length > 0 ?
                  <Button
                    style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none', marginBottom: '30px' }}
                    onClick={() => handleShowMore()}>
                    <strong>Xem thêm</strong>
                  </Button>
                  :
                  <> </>
                }
              </Row>
            </div>
          </div>
        </div>
        <div className="sanphamdaxem">
          <SanPhamDaXem />
        </div>
        <div className="footer-giohang">
          <Footer />
        </div>
      </div>
      <div >
      </div>
    </>
  );
}

export default Pants;
