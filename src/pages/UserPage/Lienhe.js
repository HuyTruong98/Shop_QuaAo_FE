import React from 'react';
import Footer from './footer/Footer';

function Lienhe(props) {
  return (
    <>
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p> Trang chủ &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Liên hệ</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-product-detail-1">
        <div className="container">
          <div className="row">
            <div className="col-xl-5 col-lg-5 col-sm-12 col-12">
              <div className="section right-contact">
                <img src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/logo_contact.png" />
                <p>
                  Bạn có thể liên hệ YG SHOP theo thông tin bên dưới <br /> hoặc gửi thông tin ở phần Liên hệ.
                </p>
              </div>
              <div className="time_work">
                <i style={{ fontSize: '20px' }} class="fa fa-map-marker" aria-hidden="true"></i>   &nbsp; Địa chỉ:
              </div>
              <div className="street-lienhe">
                <p>718 Cách Mạng Tháng 8, Tân Bình</p>
                <p>95A Nguyễn Trọng Tuyển, Phú Nhuận</p>
                <p>488 Hoàng Diệu, Đà Nẵng</p>
                <p>180 Đông Các, Hà Nội</p>
                <p>83M Nguyễn Văn Trỗi, Đà Lạt</p>
              </div>
              <div className="hotline-lienhe">
                <i style={{ fontSize: '20px' }} class="fa fa-phone" aria-hidden="true"> &nbsp;<strong style={{ fontSize: '23px' }}>18009432</strong> </i>
              </div>
              <div className="email-lienhe">
                <i style={{ fontSize: '20px' }} class="fa fa-telegram" aria-hidden="true"> &nbsp; <strong>Email: ygshopvn@gmail.com </strong></i>
              </div>
              <div className="thoigianhoat-lienhe">
                <strong>THỜI GIAN HOẠT ĐỘNG: 09:00 AM - 10:00 PM</strong>
              </div>
            </div>
            <div className="col-xl-1 col-lg-1 col-sm-12 col-12"></div>
            <div className="col-xl-6 col-lg-6 col-sm-12 col-12">
              <div className="right-img-lienhe">
                <img src="https://bizweb.dktcdn.net/100/331/067/products/172142125-2006494696172869-7334217497771743872-n.jpg" width="88%" height="70%" />
              </div>
            </div>
          </div>
          <div className="bando-cuahang">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.2410872929345!2d108.21537841536096!3d16.052974444136098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142195f7668a4e7%3A0xab61fb153155caa3!2zWUcgU0hPUCDEkMOgIE7hurVuZw!5e0!3m2!1svi!2s!4v1626971298768!5m2!1svi!2s" style={{ border: 0, }} width="100%" height="450" allowfullscreen="" loading="lazy"></iframe>
          </div>
        </div>
      </div>
      <div className="footer-giohang">
        <Footer />
      </div>

    </>
  );
}

export default Lienhe;