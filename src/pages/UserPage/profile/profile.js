import React, { useEffect } from 'react';
import { Result, Row, Col, Card, Badge, Steps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { renderTien } from '../../../notification/renderConvert';
import * as actGetHoaDon from "../../../actions/giohang_cart/cartGioHang";
import * as act from "./../../../actions/quanlytaikhoan/actQuanLyTaiKhoan";
import * as actGetAllSize from "../../../actions/quanly_size/actQuanLySize";
import Footer from "../footer/Footer";
import { UserOutlined, SolutionOutlined, LoadingOutlined, SmileOutlined } from '@ant-design/icons';
const { Step } = Steps;


function Profile(props) {
  const listSize = useSelector(state => state.quanlySize.list);
  const dataAccount = useSelector(state => state.quanlylogin.account_current);
  const dispatch = useDispatch();
  const listHoaDon_current = useSelector((state) => state.orderProduct.list);

  let dataListBooking = []
  if(listHoaDon_current.filter((item) => item.user_current === dataAccount.id).length > 0) {
    listHoaDon_current.filter((item) => item.user_current === dataAccount.id).map((itemHoaDon) => 
      dataListBooking.push(itemHoaDon)
    )
  }
  console.log(dataListBooking)

    function renderSize(sizeId) {
      const size = listSize.find(item => item.id === sizeId);
      return size ? size.size : 'Unisex'
    }

  function showSubToTal(price, priceSale, soluong) {
    return renderTien(priceSale ? priceSale * soluong : price * soluong);
  }

  useEffect(() => {
    if (localStorage.getItem("login")) {
      dispatch(
        act.actGetTaiKhoanByIdInApplicationRequest(
          localStorage.getItem("login")
        )
      );
    }
  }, []);

  useEffect(() => {
    dispatch(actGetHoaDon.actGetOrderRequest());
    dispatch(actGetAllSize.getAllSizeRequest());
  }, [])

  return (
    <>
      <div className="breadcrumb_background" >
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p> Trang chủ &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Thông tin người dùng</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-product-detail">

        <div >
          <div className="container main-secction">
            <div className="row user-left-part">
              <div className="col-md-3 col-sm-3 col-xs-12 user-profil-part pull-left">
                <div className="row ">
                  <div className="col-md-12 col-md-12-sm-12 col-xs-12 user-image text-center">
                    {dataAccount.img ? (
                      <img src={dataAccount.img} className="rounded-circle" />
                    ) : (
                      <i
                        style={{ fontSize: "30px" }}
                        class="fa fa-user-circle-o"
                        aria-hidden="true"
                      ></i>
                    )}
                  </div>
                  <div className="col-md-12 col-sm-12 col-xs-12 user-detail-section1 text-center">
                  </div>
                </div>
              </div>
              <div className="col-md-9 col-sm-9 col-xs-12 pull-right profile-right-section">
                <div className="row profile-right-section-row">
                  <div className="col-md-12 profile-header">
                    <div className="row">
                      <div className="col-md-8 col-sm-6 col-xs-6 profile-header-section1 pull-left">
                        <h1> <img src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/logo_contact.png" /></h1>
                        {/* <h5>{dataAccount.role}</h5> */}

                      </div>
                      <div className="col-md-4 col-sm-6 col-xs-6 profile-header-section1 text-right pull-rigth"></div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-10">
                        <ul className="nav nav-tabs" role="tablist">
                          <li className="nav-item">
                            <a style={{ color: '#ffac4b' }}
                              className="nav-link active"
                              href="#profile"
                              role="tab"
                              data-toggle="tab"
                            >
                              <i class="fa fa-user" aria-hidden="true">
                              </i> &ensp;
                              <strong>Thông tin người dùng</strong>
                            </a>
                          </li>
                        </ul>
                        {/* Tab panes */}
                        <div className="tab-content">
                          <div
                            role="tabpanel"
                            className="tab-pane fade show active"
                            id="profile"
                            style={{ marginTop: '20px' }}
                          >
                            <div className="row">
                              <div className="col-md-3">
                                <label>Họ và tên:</label>
                              </div>
                              <div className="col-md-6">
                                <p>{dataAccount.tenNguoiDung}</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">
                                <label>Email</label>
                              </div>
                              <div className="col-md-6">
                                <p>{dataAccount.user}</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">
                                <label>Giới tính</label>
                              </div>
                              <div className="col-md-6">
                                <p>{dataAccount.gioiTinh}</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">
                                <label>Phone</label>
                              </div>
                              <div className="col-md-6">
                                <p>0{dataAccount.soDienThoai}</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-3">
                                <label>Ngày đăng ký</label>
                              </div>
                              <div className="col-md-6">
                                <p>{dataAccount.ngayTaoBanGhi}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {
        dataListBooking.length > 0 ? (
          Array.isArray(dataListBooking) && dataListBooking.length > 0 &&
          dataListBooking.map((item, index) => {
            return (
              <div className="container" style={{ marginBottom: '100px' }}>
                <div className="row">
                  <div className="col-md-12 step-hoa-don">
                    <Steps current={1}>
                      <Step title="Đặt hàng" description="Thành công" />
                      <Step title="Xác nhận đơn" description="Đang chờ" icon={<SolutionOutlined />} />
                      <Step title="Giao hàng" description="Đang giao hàng" icon={<i class="fa fa-truck" aria-hidden="true"></i>} />
                      <Step title="Nhận hàng" description="Hoàn thành" icon={<SmileOutlined />} />
                    </Steps>
                  </div>
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
                                    <>
                                      <tr key={indexListGiohang}>
                                        <td>
                                          {itemListGiohang.tenSanPham}
                                        </td>
                                        <td>{renderSize(itemListGiohang.sizeId)}</td>
                                        <td>{itemListGiohang.soluong}</td>
                                        <td>{renderTien(itemListGiohang.priceSale ? itemListGiohang.priceSale : itemListGiohang.price)}</td>
                                        <td>{showSubToTal(itemListGiohang.price, itemListGiohang.priceSale, itemListGiohang.soluong)}</td>
                                      </tr>
                                    </>
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

      <div className="footer-giohang">
        <Footer />
      </div>
    </>
  );
}

export default Profile;