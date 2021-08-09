import React, { useEffect, useState } from 'react';
import { Result, Button, Image, Popconfirm } from 'antd';
import { renderTien } from "../../../notification/renderConvert";
import { BrowserRouter as Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { thongBao } from "../../../constants/message/thongBao";
import * as Message from "../../../constants/Message";
import * as NoiDung from "../../../constants/noiDungThongBao";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Footer from "../footer/Footer";
import * as actGetCarts from "../../../actions/giohang_cart/cartGioHang";
import * as actGetAllSize from "../../../actions/quanly_size/actQuanLySize";

function Giohang2(props) {
  const listCarts = useSelector(state => state.giohang_in_cart.list);
  const listSize = useSelector(state => state.quanlySize.list);
  const account_current = useSelector(state => state.quanlylogin.account_current);
  const dispatch = useDispatch();

  function renderSoLuong(item) {
    return (
      <p style={{ marginTop: '3px', marginRight: '20px' }}>{item.soluong}</p>
    )
  }

  function onUpdateQuantity(item, soluong) {
    dispatch(actGetCarts.actUpdateGioHang(item, soluong));
  }

  function showSize(sizeId) {
    const size = listSize.find(item => item.id === sizeId)
    return size ? size.size : "unisex"
  }

  function showSubToTal(price, priceSale, soluong) {
    return renderTien(priceSale ? priceSale * soluong : price * soluong);
  }

  function showToTalAmount(listCarts) {
    let total = 0;
    if (listCarts.length > 0) {
      for (var i = 0; i < listCarts.length; i++) {
        total += (listCarts[i].priceSale ? listCarts[i].priceSale : listCarts[i].price) * listCarts[i].soluong
      }
    }
    return renderTien(total);
  }

  function onDeleteItem(item) {
    thongBao(Message.THONG_BAO, NoiDung.XOA_SAN_PHAM_KHOI_GIO_HANG_THANH_CONG);
    dispatch(actGetCarts.actDeleteGioHang(item))
  }

  function onReport() {
    thongBao(Message.THONG_BAO, NoiDung.MOI_BAN_DANG_NHAP_DE_THANH_TOAN);
  }

  useEffect(() => {
    dispatch(actGetAllSize.getAllSizeRequest());
  }, [])
  return (
    <>
      {
        listCarts.length > 0 ?
          <>
            <div className="breadcrumb_background">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 a-left">
                    <p> Trang chủ &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Giỏ hàng</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div className="breadcrumb-product-detail ">
                  <p style={{ fontSize: '20px', width: '100%', marginBottom: '60px' }}>Giỏ hàng của bạn</p>
                  <div className="col-md-12">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Tên sản phẩm</th>
                          <th>Ảnh sản phẩm</th>
                          <th>Size</th>
                          <th>Đơn giá</th>
                          <th>Số lượng</th>
                          <th>Thành tiền</th>
                          <th>Xóa</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {listCarts.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>
                                <a>
                                  <NavLink
                                    style={{ color: 'black' }}
                                    to={{
                                      pathname: `product/${item.id}`,
                                    }}
                                  >
                                    {item.tenSanPham}
                                  </NavLink>
                                </a>
                                {/* </Link> */}
                              </td>
                              <td>
                                {
                                  Array.isArray(item && item.img) && item.img.length > 0 && item.img.map((itemImg, indexImg) => {
                                    if (indexImg === 0) {
                                      return (
                                        <Image src={itemImg} style={{ width: '100px', height: '90px' }} alt={itemImg} />
                                      )
                                    }
                                  })
                                }
                              </td>
                              <td>{showSize(item.sizeId)}</td>
                              <td>{renderTien(item.priceSale ? item.priceSale : item.price)}</td>
                              <td>
                                <div className="tanggiam1">
                                  {
                                    item.soluong < 2 ?
                                      <Button
                                        disabled
                                        style={{ marginRight: '20px' }}
                                        onClick={() => onUpdateQuantity(item, item.soluong - 1)}
                                      >
                                        <i class="fa fa-minus" aria-hidden="true"></i>
                                      </Button>
                                      :
                                      <Button
                                        style={{ marginRight: '20px' }}
                                        onClick={() => onUpdateQuantity(item, item.soluong - 1)}
                                      >

                                        <i class="fa fa-minus" aria-hidden="true"></i>
                                      </Button>
                                  }
                                  {renderSoLuong(item)}
                                  {/* <p style={{ marginTop: '3px', marginRight: '20px' }}>{item.soluong > 0 ? item.soluong : count}</p> */}
                                  <Button onClick={() => onUpdateQuantity(item, item.soluong + 1)}>
                                    <i class="fa fa-plus" aria-hidden="true"></i>
                                  </Button>
                                </div>
                              </td>
                              <td>{showSubToTal(item.price, item.priceSale, item.soluong)}</td>
                              <td>
                                <Popconfirm
                                  placement="topRight"
                                  title={Message.BAN_CO_MUON_XOA}
                                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                                  onConfirm={() => onDeleteItem(item)}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <a>
                                    <i
                                      className="fa fa-trash-o"
                                      style={{ color: "red", fontSize: "26px" }}
                                    ></i>
                                  </a>
                                </Popconfirm>
                              </td>
                            </tr>
                          )
                        })}
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="totalAmount">
                      Tổng tiền :{showToTalAmount(listCarts)}
                    </div>
                    <div className="tienhanhthanhtoan">
                      <NavLink to="/">
                        <Button
                          style={{ backgroundColor: '#f3f3f3', height: '40px', border: 'none' }}
                        >
                          <strong>Tiếp tục mua sắm</strong>
                        </Button>
                      </NavLink>
                      &emsp;

                      {
                        account_current.checkToken === true && account_current !== null && account_current !== undefined ?

                          <NavLink to="/Thanh-toan">
                            <Button
                              style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
                            >
                              <strong> Tiến hành thanh toán</strong>
                            </Button>
                          </NavLink>
                          :

                          <Button
                            onClick={() => onReport()}
                            style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
                          >
                            <strong> Tiến hành thanh toán</strong>
                          </Button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-giohang" style={{ marginTop: '500px' }}>
              <Footer />
            </div>
          </>
          :
          <>
            <div className="breadcrumb_background">
              <div className="container">
                <div className="row">
                  <div className="col-xs-12 a-left">
                    <p> Trang chủ &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Giỏ hàng</span></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div className="breadcrumb-product-detail ">
                  <p style={{ fontSize: '20px', width: '100%' }}>Giỏ hàng của bạn</p>
                  <Result
                    status="403"
                    title="Giỏ hàng của bạn chưa có gì"
                    extra={
                      <NavLink to="/">
                        <Button style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}>
                          <strong>Quay lại trang chủ</strong>
                        </Button>
                      </NavLink>
                    }
                  />
                </div>
              </div>
            </div>
            <div className="footer-giohang" style={{ marginTop: '300px' }}>
              <Footer />
            </div>
          </>
      }
    </>
  );
}

export default Giohang2;