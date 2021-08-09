import React from "react";
import { BrowserRouter as Redirect, Link, NavLink, useHistory } from "react-router-dom";
import Footer from "./footer/Footer";

function GioiThieu() {

  return (
    <>
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p> Trang chủ &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Giới thiệu</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-product-detail-1">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
              <div className="page-gioithieu-title">
                <strong>Giới Thiệu</strong>
              </div>
              <div className="content-page-gioithieu">
                <h3 >
                  <span>
                    YG Shop - Ấn tượng với phong cách thời trang streetwear
                  </span>
                </h3>
                <img src="https://kenh14cdn.com/thumb_w/800/pr/2021/1614676628010-0-0-598-957-crop-1614676632489-63750301649062.jpg" />
                <h4>
                  <span>
                    Phong cách thời trang streetwear hay còn gọi là phong cách đường phố là một trong những xu hướng cực kỳ phổ biến và thịnh hành trên toàn cầu.
                  </span>
                </h4>
                <p>
                  Đây là một trong những phong cách có nhiều sự ảnh hưởng đặc biệt là giới trẻ. Với các gam màu tiêu biểu xám, trắng và đen kèm theo thiết kế có phần bụi bặm đã giúp cho phong cách này có chỗ đứng nhất định trong làng thời trang cũng như có sức ảnh hưởng nhất định với việc ra đời của các thương hiệu thời trang nổi tiếng, và YG Shop là một trong những thương hiệu đó.
                </p>
                <img src="https://channel.mediacdn.vn/2021/3/2/photo-1-1614676236847485990229.jpg" width="100%" />
                <p>
                  Được thành lập và chính thức đi vào hoạt động từ năm 2014, với các sản phẩm hướng tới các khách hàng trẻ có độ tuổi từ 14-30, có phong cách năng động, cá tính. Thương hiệu này không chỉ phát triển các sản phẩm quần áo mà còn
                  <em loopnumber="406126956" match="chú">&nbsp;chú&nbsp;</em>trọng vào nhiều phụ kiện đi kèm như quần áo, backpack, nón…
                </p>
                <img src="https://channel.mediacdn.vn/2021/3/2/photo-1-16146762452871831379480.jpg" width="100%" />
                <p>
                  Các thiết kế tại YG Shop đều có tính ứng dụng cao, dễ dàng mix&match nhưng không vì thế mà trở nên nhạt nhòa, luôn có những chi tiết artwork đầy chất "nghệ" để bạn trông thật nổi bật, cá tính ở bất cứ nơi đâu. Và đây cũng là cách để làm nên dấu ấn mang tính đặc trưng của YG Shop trên thị trường.
                </p>
                <img src="https://channel.mediacdn.vn/2021/3/2/photo-3-16146762453011807255106.jpg" width="100%" />
                <p>
                  Bên cạnh chất lượng sản phẩm, dịch vụ cũng là một trong những yếu tố quan trọng mà YG Shop đặt lên hàng đầu, đội ngũ luôn lắng nghe khách hàng và cố gắng cải thiện mình qua từng ngày, vì hơn ai hết YG Shop hiểu rõ chính tình cảm, sự tin tưởng của các bạn là động lực để YG Shop phát triển và có chỗ đứng vững chắc như ngày hôm nay.
                </p>
                <p>
                  Trong tương lai, giữ vững kim chỉ nam từ những ngày đầu thành lập, YG Shop sẽ luôn thay đổi mình để phù hợp với thị trường streetwear và cho ra lò những sản phẩm chất lượng cao cùng những thiết kế "đặc trưng" với giá cả hợp lý để tất cả các bạn trẻ Việt tự tin diện hàng ngày.
                </p>
              </div>
              <div className="thongtin-hethong-cuahang">
                <p><strong>Hệ thống cửa hàng:</strong></p>
                <p>718 CMT8, Phường 5, Tân Bình</p>
                <p>95A Nguyễn Trọng Tuyển, Phú Nhuận</p>
                <p>180 Đông Các, Đống Đa, Hà Nội</p>
                <p>488 Hoàng Diệu, Đà Nẵng</p>
                <p>83M Nguyễn Văn Trỗi, Đà Lạt</p>
              </div>
              <div className="hotline-gioithieu">
                <p><strong>Hotline: 1800 9432 - 0707 432 432</strong></p>
                <p>Website: https://ygshop.vn</p>
                <p>Facebook: http://facebook.com/ygshopvn</p>
                <p>Instgram: http://instagram.com/ygshop.vn</p>
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

export default GioiThieu;
