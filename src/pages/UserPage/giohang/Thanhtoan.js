import React, { useEffect } from 'react';
import { Form, Input, Button, Card, Row, Col, Badge, Select, Radio } from "antd";
import { renderTien } from "../../../notification/renderConvert";
import { RenderInput, RenderInputSelect } from "../../../common/renderForm/inputForm";
import { BrowserRouter as Redirect, Link, NavLink, useHistory } from "react-router-dom";
import { thongBao } from "../../../constants/message/thongBao";
import * as Message from "../../../constants/Message";
import * as NoiDung from "../../../constants/noiDungThongBao";
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from 'react-redux';
import * as actGetAllSize from "../../../actions/quanly_size/actQuanLySize";
import * as actGetCityAll from "../../../actions/thanhpho/actGetThanhpho";
import * as actGetDistrictAll from "../../../actions/thanhpho/actGetQuan";
import * as actAddOders from "../../../actions/giohang_cart/cartGioHang";
import * as actAddOrdersMessage from "../../../actions/messageOrder.js/actMessageOrder";
import Footer from "../footer/Footer";
import moment from 'moment'

function Thanhtoan({ match }) {
  const [form] = useForm();
  const history = useHistory();
  const { Option } = Select;
  const { TextArea } = Input;
  const dispatch = useDispatch();
  const listGioHang = useSelector(state => state.giohang_in_cart.list);
  const listSize = useSelector(state => state.quanlySize.list);
  const listCity = useSelector(state => state.thanhpho.thanhpho)
  const listDistrict = useSelector(state => state.thanhpho.quan);
  const account_current = useSelector(state => state.quanlylogin.account_current);
  console.log(account_current);
  const dateFormat = moment().format('DD-MM-YYYY HH:mm:ss');


  function renderSize(sizeId) {
    const size = listSize.find(item => item.id === sizeId);
    return size ? size.size : 'unisex'
  }

  function renderDistrict(listCity, itemCity) {
    return listDistrict.filter((item) => item.parentcode === itemCity).length > 0 ?
      listDistrict.filter((item) => item.parentcode === itemCity).map((itemDistrict) => {
        if (itemDistrict) {
          return (
            <Option value={itemDistrict.name}>{itemDistrict.name}</Option>
          )
        }
      })

      : ""
  }

  function showSubToTal(listGioHang) {
    let total = 0;
    if (listGioHang.length > 0) {
      for (var i = 0; i < listGioHang.length; i++) {
        total += (listGioHang[i].priceSale ? listGioHang[i].priceSale : listGioHang[i].price) * listGioHang[i].soluong
      }
    }
    return renderTien(total);
  }

  let totalAll = 0;
  function renderTongTatCaTien(listGioHang) {
    let total = 0;
    if (listGioHang.length > 0) {
      for (var i = 0; i < listGioHang.length; i++) {
        total = (total + (listGioHang[i].priceSale ? listGioHang[i].priceSale : listGioHang[i].price) * listGioHang[i].soluong)
        totalAll = total + 39000;
      }
    }
    return renderTien(totalAll);
  }

  const onFinish = (value) => {
    value = {
      ...value,
      totalAll: totalAll,
      listGioHang: listGioHang,
      user_current: account_current.id,
      dateFormat: dateFormat
    }
    if (value) {
      thongBao(Message.CHUC_MUNG, NoiDung.DAT_HANG_THANH_CONG);
      dispatch(actAddOders.actOrderGioHangRequest(value));
      dispatch(actAddOders.resetCart([]));
      dispatch(actAddOrdersMessage.actMessageOrderGioHangRequest(value));
      history.push('/Thanh-toan-thanh-cong');
    }
  }




  const onFinishFailed = () => {
  };

  useEffect(() => {
    form.resetFields();
  }, [form, dispatch])

  useEffect(() => {
    dispatch(actGetAllSize.getAllSizeRequest());
    dispatch(actGetCityAll.getAllThanhPhoRequest());
    dispatch(actGetDistrictAll.getAllQuanRequest());
  }, [])

  return (
    <>
      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p> Trang chủ &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Thanh toán</span></p>
            </div>
          </div>
        </div>
      </div>
      <Form
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="breadcrumb-product-detail-1 ">
          <Card style={{ width: "60%", paddingTop: '40px' }}
            cover={
              <div className="logo-thanhtoan">
                <img alt="example" src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/checkout_logo.png" width="40%" height="150px" />
              </div>
            }
            actions={[
              <div style={{ textAlign: 'right', marginRight: '40px' }}>
                <div>
                  <p style={{ color: '#1990c6' }}>Cảm ơn vì đã chọn chúng tôi !</p>
                </div>
                © 2021 Young Green by YG SHOP
              </div>
            ]}
          >
            <Row gutter={24}>
              <Col span={7}></Col>
              <Col span={8}>
                <div className="title-info-order">
                  <strong >Thông tin mua hàng</strong>
                </div>
                <RenderInput
                  style={{ height: '50px', borderRadius: '5px', width: '328px' }}
                  label="Nhập Email (tuỳ chọn)"
                  name="email"
                  validate={true}
                  showLabel={true}
                />
                <RenderInput
                  style={{ height: '50px', borderRadius: '5px', width: '328px', marginRight: '30px' }}
                  label="Họ và Tên"
                  name="fullName"
                  validate={true}
                  showLabel={true}
                />
                <RenderInput
                  style={{ height: '50px', borderRadius: '5px', width: '328px', marginRight: '30px' }}
                  label="Số điện thoại"
                  name="phoneNumber"
                  validate={true}
                  showLabel={true}
                />
                <RenderInput
                  style={{ height: '50px', borderRadius: '5px', width: '328px', marginRight: '30px' }}
                  label="Địa chỉ"
                  name="address"
                  validate={true}
                  showLabel={true}
                />
                Tỉnh thành: <br />
                <br />
                <Form.Item
                  name="city"
                  rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành!' }]}
                >
                  <Select placeholder="Tỉnh thành" style={{ width: '328px' }}
                  >
                    {
                      listCity.map((item, index) => {
                        return (
                          <Option key={index} value={item.name}>{item.name}</Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>

                Quận huyện: <br /> <br />
                <Form.Item
                  name="district"
                  rules={[{ required: true, message: 'Vui lòng chọn quận huyện!' }]}
                >
                  <Select placeholder="Quận huyện" style={{ width: '328px' }}>
                    {/* {
                      listCity.map((item, index) => {
                        { renderDistrict(listCity,item.code) }
                      })
                    } */}
                    {
                      listDistrict.map((item, index) => {
                        return (
                          <Option key={index} value={item.name}>{item.name}</Option>
                        )
                      })
                    }
                  </Select>
                </Form.Item>


                <Form.Item
                  name="noteCustomer"
                >
                  <TextArea placeholder="Ghi chú (tuỳ chọn)" rows={3} style={{ width: '328px', marginTop: '40px', marginBottom: '20px' }} />
                </Form.Item>

              </Col>
              <Col span={1}></Col>
              <Col span={8}>
                <div className="title-method-express">
                  <strong >Vận chuyển</strong>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  Phương thức vận chuyển:
                </div>
                <Form.Item
                  name="transMethod"
                  rules={[{ required: true, message: 'Vui lòng chọn phương thức vận chuyển!' }]}
                >
                  <Select placeholder="Phương thức vận chuyển:" style={{ width: '328px', marginBottom: '30px' }}
                  >
                    <Option value="Đường bộ">Đường bộ</Option>
                  </Select>
                </Form.Item>

                <div className="title-method-tratien">
                  <div className="title-method-tratien-2">
                    <strong>Thanh toán</strong>
                  </div>
                  <div className="title-method-tratien-3">
                    <Form.Item
                      name="methodPay"
                      rules={[{ required: true, message: 'Vui lòng chọn phương thức vận chuyển!' }]}
                    >
                      <Radio.Group>
                        <div className="chon-1">
                          <Radio value="𝚃𝚑𝚊𝚗𝚑 𝚝𝚘𝚊́𝚗 𝚔𝚑𝚒 𝚜𝚑𝚒𝚙 (𝙲𝙾𝙳)">
                            𝚃𝚑𝚊𝚗𝚑 𝚝𝚘𝚊́𝚗 𝚔𝚑𝚒 𝚜𝚑𝚒𝚙 (𝙲𝙾𝙳)<i style={{ paddingLeft: '60px', fontSize: '17px', color: '#1990c6' }} class="fa fa-money" aria-hidden="true"></i>
                          </Radio>
                        </div>

                        <div className="chon-1">
                          <Radio value="𝚃𝚑𝚊𝚗𝚑 𝚝𝚘𝚊́𝚗 𝚚𝚞𝚊 𝚟𝚒́ đ𝚒𝚎̣̂𝚗 𝚝𝚞̛̉ 𝙼𝚘𝙼𝚘">
                            𝚃𝚑𝚊𝚗𝚑 𝚝𝚘𝚊́𝚗 𝚚𝚞𝚊 𝚟𝚒́ đ𝚒𝚎̣̂𝚗 𝚝𝚞̛̉ 𝙼𝚘𝙼𝚘<i style={{ paddingLeft: '20px', fontSize: '17px', color: '#1990c6' }} class="fa fa-paypal" aria-hidden="true"></i>
                          </Radio>
                        </div>

                        <div className="chon-1">
                          <Radio value="𝙲𝚑𝚞𝚢𝚎̂̉𝚗 𝚔𝚑𝚘𝚊̉𝚗 𝚗𝚐𝚊̂𝚗 𝚑𝚊̀𝚗𝚐">
                            𝙲𝚑𝚞𝚢𝚎̂̉𝚗 𝚔𝚑𝚘𝚊̉𝚗 𝚗𝚐𝚊̂𝚗 𝚑𝚊̀𝚗𝚐<i style={{ paddingLeft: '70px', fontSize: '17px', color: '#1990c6' }} class="fa fa-cc-visa" aria-hidden="true"></i>
                          </Radio>
                        </div>
                      </Radio.Group>
                    </Form.Item>
                  </div>

                </div>
              </Col>
            </Row>
          </Card>

          <Card style={{ width: "40%", background: '#fafafa', paddingTop: '40px', paddingLeft: '30px' }} bordered={false}>
            <div className="title-oder">
              <strong>Đơn hàng của bạn:</strong>
            </div>
            {
              listGioHang.map((item, index) => {
                return (
                  <div className="img-oder">
                    <div className="img-product-order">
                      {
                        Array.isArray(item && item.img) && item.img.length > -1 && item.img.map((itemImg, indexImg) => {
                          if (indexImg === 0) {
                            return (
                              <img src={itemImg} width="100%" height="100%" />
                            )
                          }
                        })
                      }

                      <Badge count={item.soluong} style={{ marginBottom: '55px' }}>
                      </Badge>
                    </div>
                    <div className="tensanpham-size">
                      <a >{item.tenSanPham}</a>
                      <p>{renderSize(item.sizeId)}</p>
                    </div>
                    <div className="money-thanhtoan">
                      <p style={{ fontSize: '17px' }}>{renderTien(item.priceSale ? item.priceSale : item.price)}</p>
                    </div>
                  </div>
                )
              })
            }
            <div className="codegiamgia">
              <RenderInput
                style={{ height: '50px', borderRadius: '5px', width: '328px', marginRight: '30px' }}
                label="Nhập mã giảm giá.."
                validate={true}
                showLabel={false}
              />
              <Button style={{ backgroundColor: '#ffac4b', height: '50px', border: 'none', borderRadius: "5px" }}>Áp Dụng</Button>
            </div>
            <div className="subtotalmoney">
              <div className="sotientamtinh">
                <p>Tạm tính</p>
                <p>
                  {showSubToTal(listGioHang)}
                </p>
              </div>
              <div className="phivanchuyen">
                <p>Phí vận chuyển</p>
                <p>{renderTien(39000)}</p>
              </div>
              <div className="totalmoney">
                <p>Tổng cộng:</p>
                <p style={{ color: '#2a9dcc' }}>{renderTongTatCaTien(listGioHang)}</p>
              </div>
            </div>

            <div className="dathangvenha">
              <Button
                htmlType="submit"
                style={{ backgroundColor: '#ffac4b', height: '50px', border: 'none', marginTop: '5px', borderRadius: "5px" }}
              >
                Đặt hàng
              </Button>
            </div>
          </Card>
        </div>
        <div className="footer-giohang">
          <Footer />
        </div>
      </Form>
    </>
  );
}

export default Thanhtoan;