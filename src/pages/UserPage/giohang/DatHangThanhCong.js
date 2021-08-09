import React, { useEffect } from "react";
import { Result, Button } from 'antd';
import { BrowserRouter as Redirect, Link, NavLink, useHistory } from "react-router-dom";
import Footer from "../footer/Footer";
import { useDispatch } from "react-redux";
import * as actGetHoaDOn from "../../../actions/giohang_cart/cartGioHang";

function DatHangThanhCong() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetHoaDOn.actGetOrderRequest());
  },[])

  return (
    <>
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p> Trang chủ &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Thanh toán thành công</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-product-detail-1" style={{ justifyContent: 'center' }}>
        <Result
          status="success"
          title="Đơn hàng đã được khởi tạo thành công!"
          subTitle="Cảm ơn bạn đã mua sắm tại YG SHOP. Nhân viên chúng tôi sẽ điện thoại xác nhận đơn hàng trong thời gian sớm nhất."
          extra={[
            <Button
              style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
            >
              <Link to="/Thong-tin-ca-nhan">
                <strong> Xem đơn hàng </strong>
              </Link>
            </Button>,
            <Button
              style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
            >
              <Link to="/">
                <strong>   Tiếp tục mua sắm</strong>
              </Link>
            </Button>
          ]}
        />
      </div>
      <div className="footer-giohang">
        <Footer />
      </div>
    </>
  );
}

export default DatHangThanhCong;
