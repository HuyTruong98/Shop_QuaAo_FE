import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Redirect, Link, NavLink, useHistory } from "react-router-dom";
import * as actQuanLyHoaDon from "../../actions/messageOrder.js/actMessageOrder";
import * as actGetAllSize from "../../actions/quanly_size/actQuanLySize";
import * as actGetKhoQuanAo from "../../actions/quanlyKho_quan_ao/actQuanlyQuanAo";
import { renderTien } from "../../notification/renderConvert"
import { Result, Row, Col, Card, Badge, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';

function PageQuanLyHoaDon({ match }) {
  const dispatch = useDispatch();
  const listHoaDon = useSelector(state => state.quanlyHoaDon.list);
  const listSize = useSelector(state => state.quanlySize.list);
  const listKhoQuanAo = useSelector(state => state.quanlyKhoAoQuan.list);

  useEffect(() => {
    dispatch(actQuanLyHoaDon.actGetMessageOrderRequest());
    dispatch(actGetAllSize.getAllSizeRequest());
  }, [])

  function renderSize(sizeId) {
    const size = listSize.find(item => item.id === sizeId);
    return size ? size.size : 'No size'
  }

  function confrimOrder(productHoaDon) {
    console.log(productHoaDon);
    let soluong = 0;
    const sanPhamDuocMua = listKhoQuanAo.find((item) => item.tenSanPham === productHoaDon.tenSanPham)
    if (sanPhamDuocMua) {
      {
        Array.isArray(sanPhamDuocMua.size) && sanPhamDuocMua.size.length > 0 &&
          sanPhamDuocMua.size.map((item2) => {
            console.log(item2)
            if (item2.sizeId === productHoaDon.sizeId) {
              return soluong = item2.soluong - productHoaDon.soluong
            }
          })
      }
    }
    console.log(soluong);
    // dispatch(actQuanLyHoaDon.actGetKhoRequest(productHoaDon.id));
    // dispatch(actGetKhoQuanAo.actGetKhoRequest(productHoaDon.id));
  }


  function showSubToTal(price, priceSale, soluong) {
    return renderTien(priceSale ? priceSale * soluong : price * soluong);
  }

  return (
    <>
      {
        listHoaDon.length > 0 ? (
          Array.isArray(listHoaDon) && listHoaDon.length > 0 &&
          listHoaDon.map((item, index) => {
            return (
              <div className="container" style={{ marginBottom: '100px' }}>
                <div className="row">
                  <div className="col-md-8 col-md-offset-2">
                    <div className="row main-section">
                      <div className="col-md-12 col-sm-12 hoaDon-header">
                        <div className="row">
                          <div className="col-md-6 col-sm-6 col-xs-6">
                            <h1> <img src="https://thumb.danhsachcuahang.com/image/2019/10/cua-hang-yg-shop-thumb-348.jpg" width="70px" /></h1>
                          </div>
                          <div className="col-md-6 col-sm-6 col-xs-6 text-right">
                            <p>Hoá đơn</p>
                            <span>{item.dateFormat}</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12 hoaDon-content">
                        <div className="row">
                          <div className="col-md-6 col-sm-6 col-xs-6">
                            <p>From.</p>
                            <p>YG SHOP</p>
                            <p>488 Hoàng Diệu</p>
                            <p>Thành phố Đà Nẵng</p>
                          </div>
                          <div className="col-md-6 col-sm-6 col-xs-6 text-right">
                            <p>To.</p>
                            <p>{item.fullName}</p>
                            <p>{item.email}</p>
                            <p>{item.phoneNumber}</p>
                            <p>{item.address}</p>
                            <p>{item.city}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-12 col-sm-12 text-right">
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Tên sản phẩm</th>
                              <th>Size</th>
                              <th>Số lượng</th>
                              <th>Đơn giá</th>
                              <th>Thành tiền</th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              Array.isArray(item.listGioHang) && item.listGioHang.length > 0 && item.listGioHang.map((itemListGiohang, indexListGiohang) => {
                                if (itemListGiohang) {
                                  return (
                                    <tr key={indexListGiohang}>
                                      <td>
                                        {itemListGiohang.tenSanPham}
                                      </td>
                                      <td>{renderSize(itemListGiohang.sizeId)}</td>
                                      <td>{itemListGiohang.soluong}</td>
                                      <td>{renderTien(itemListGiohang.priceSale ? itemListGiohang.priceSale : itemListGiohang.price)}</td>
                                      <td>{showSubToTal(itemListGiohang.price, itemListGiohang.priceSale, itemListGiohang.soluong)}</td>
                                    </tr>
                                  )
                                }
                              })
                            }

                            <tr>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>Phí vận chuyển</td>
                              <td>{renderTien(39000)}</td>
                            </tr>

                            <tr>
                              <td></td>
                              <td colspan="3" style={{ textAlign: 'right' }}>Tổng tiền :</td>
                              <td>{renderTien(item.totalAll)}</td>
                            </tr>
                          </tbody>
                        </table>
                        <Button
                          style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
                        // onClick={confrimOrder(itemListGiohang)}
                        >
                          <strong>
                            Xác nhận đơn hàng
                          </strong>
                        </Button>
                        {/* {
                          Array.isArray(item.listGioHang) && item.listGioHang.length > 0 && item.listGioHang.map((itemListGiohang) => {
                            if (itemListGiohang) {
                              return (
                                <Button
                                  style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
                                  onClick={confrimOrder(itemListGiohang)}
                                >
                                  <strong>
                                    Xác nhận đơn hàng
                                  </strong>
                                </Button>
                              )
                            }
                          })
                        } */}

                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )
          : (
            <Result
              icon={<SmileOutlined />}
              title="Bạn chưa có đơn đặt!"
            />
          )
      }
    </>
  );
}

export default PageQuanLyHoaDon;
