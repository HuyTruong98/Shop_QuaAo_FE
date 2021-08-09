import React from 'react';
import Footer from './footer/Footer';


function Cuahang(props) {
  return (
    <>
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p> Trang chủ &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Cửa hàng</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-product-detail-1">
        <div className="container">
          <div className="row">
            <div class="col-xs-12 col-sm-12 col-md-12">
              <div className="page-cuahang-title">
                <strong>Dánh sách cừa hàng</strong>
              </div>
              <div className="hochiminh-city">
                <h3>
                  <span>
                    TP. HỒ CHÍ MINH
                  </span>
                </h3>
                <strong>📍 718 Cách Mạng Tháng 8, Phường 5, Tân Bình</strong> <br />
                <strong>📍 95A Nguyễn Trọng Tuyển, Phú Nhuận</strong>
              </div>
              <div className="hochiminh-city">
                <h3>
                  <span>
                    TP. Hà Nội
                  </span>
                </h3>
                <strong>📍 180 Đông Các, Ô Chợ Dừa, Đống Đa</strong>
              </div>
              <div className="hochiminh-city">
                <h3>
                  <span>
                    TP. Đà Nẵng
                  </span>
                </h3>
                <strong>📍 488 Hoàng Diệu, Đà Nẵng</strong>
              </div>
              <div className="hochiminh-city">
                <h3>
                  <span>
                    TP. Lâm Đồng
                  </span>
                </h3>
                <strong>📍 Tạm đóng do dịch</strong>
              </div>
              <div className="hochiminh-city">
                <h3>
                  <span>
                    ☎ Hotline: 1800 9432 - 0707 432 432
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="footer-giohang">
          <Footer />
        </div>
    </>
  );
}

export default Cuahang;