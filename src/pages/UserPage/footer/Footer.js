import React from 'react';

function Footer(props) {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="footer_all">
            <div className="col-xs-12 col-md-4 col-lg-4 footer-click footer_1">
              <div className="col-lg-4 title">
                <h4>THÔNG TIN</h4>
                <ul className="list_menu">
                  <li className="li_menu">Trang chủ</li>
                  <li className="li_menu">Danh sách cửa hàng</li>
                  <li className="li_menu"><span><img src="https://bizweb.dktcdn.net/100/331/067/themes/823380/assets/shopee1.png" />&nbsp;Shoppe HCM</span></li>
                  <li className="li_menu"><span><img src="https://bizweb.dktcdn.net/100/331/067/themes/823380/assets/shopee1.png" />&nbsp;Shoppe Đà Nẵng</span></li>
                </ul>
                &nbsp;
                <img src="https://bizweb.dktcdn.net/100/331/067/themes/811197/assets/bct.png" width="35%" style={{marginLeft: '230px'}} />
              </div>
            </div>
            <div className="col-xs-12 col-md-4 col-lg-4 footer-click footer_2">
              <div className="logo-footer">
                <img src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/logofoot.png" width="100%" />
              </div>
              <div className="sum_footer">
                Young Green là thương hiệu thuộc YG SHOP. Hình ảnh được thiết kế và phát triển bởi YG Studio
              </div>
              <div className="social-footer">
                <div className="social">
                  <a><i style={{ color: 'black', fontSize: '16px' }} class="fa fa-facebook" aria-hidden="true"></i></a>
                  <a><i style={{ color: 'black', fontSize: '16px' }} class="fa fa-twitter" aria-hidden="true"></i></a>
                  <a><i style={{ color: 'black', fontSize: '16px' }} class="fa fa-youtube-play" aria-hidden="true"></i></a>
                  <a><i style={{ color: 'black', fontSize: '16px' }} class="fa fa-instagram" aria-hidden="true"></i></a>
                </div>
              </div>
              <div className="fb-page fb_iframe_widget">
                <span style={{ verticalAlign: 'bottom', width: '370px', height: '130px' }}>
                  <iframe name="f14c60995702cec" width="380px"
                    height="1000px" data-testid="fb:page Facebook Social Plugin"
                    title="fb:page Facebook Social Plugin" frameborder="0"
                    allowtransparency="true" allowfullscreen="true" scrolling="no" allow="encrypted-media"
                    src="https://www.facebook.com/v11.0/plugins/page.php?app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df2d8371d6b4bbd4%26domain%3Dygshop.vn%26origin%3Dhttps%253A%252F%252Fygshop.vn%252Ff35244e5d306718%26relation%3Dparent.parent&amp;container_width=370&amp;hide_cover=false&amp;href=https%3A%2F%2Fwww.facebook.com%2Fygshopvn&amp;locale=vi_VN&amp;sdk=joey&amp;show_facepile=false&amp;width=380"
                    style={{ border: 'none', visibility: 'visible', width: '100%', height: '130px' }}
                    class="">

                  </iframe>
                </span>
              </div>
            </div>
            <div className="col-xs-12 col-md-4 col-lg-4 footer-click footer_3">
              <div className="col-lg-4 chinhsach">
                <h4>CHÍNH SÁCH</h4>
                <ul className="list_menu">
                  <li className="li_menu">Chính sách đổi hàng</li>
                  <li className="li_menu">Chính sách bảo hành</li>
                  <li className="li_menu">Chính sách hội viên</li>
                  <li className="li_menu">Chính sách giao nhận</li>
                  <li className="li_menu">Hướng dẫn mua hàng</li>
                  <li className="li_menu">Hướng dẫn thanh toán</li>
                  <li className="li_menu">Chính sách bảo mật</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-footer-bottom copyright">
        <div className="col-lg-12 col-md-12 col-xs-12 fot_copyright">
          <span className="mobile">
            © 2021 YG SHOP
            <span class="dash"> | </span>
            <span class="opacity1">Thiết kế bởi</span>&ensp;
            <a rel="nofollow" title="YoungGreen" target="_blank">YG Studio</a>
          </span>
        </div>
      </div>
    </>
  );
}

export default Footer;