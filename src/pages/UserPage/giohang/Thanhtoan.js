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
              <p> Trang ch??? &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>Thanh to??n</span></p>
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
                  <p style={{ color: '#1990c6' }}>C???m ??n v?? ???? ch???n ch??ng t??i !</p>
                </div>
                ?? 2021 Young Green by YG SHOP
              </div>
            ]}
          >
            <Row gutter={24}>
              <Col span={7}></Col>
              <Col span={8}>
                <div className="title-info-order">
                  <strong >Th??ng tin mua h??ng</strong>
                </div>
                <RenderInput
                  style={{ height: '50px', borderRadius: '5px', width: '328px' }}
                  label="Nh???p Email (tu??? ch???n)"
                  name="email"
                  validate={true}
                  showLabel={true}
                />
                <RenderInput
                  style={{ height: '50px', borderRadius: '5px', width: '328px', marginRight: '30px' }}
                  label="H??? v?? T??n"
                  name="fullName"
                  validate={true}
                  showLabel={true}
                />
                <RenderInput
                  style={{ height: '50px', borderRadius: '5px', width: '328px', marginRight: '30px' }}
                  label="S??? ??i???n tho???i"
                  name="phoneNumber"
                  validate={true}
                  showLabel={true}
                />
                <RenderInput
                  style={{ height: '50px', borderRadius: '5px', width: '328px', marginRight: '30px' }}
                  label="?????a ch???"
                  name="address"
                  validate={true}
                  showLabel={true}
                />
                T???nh th??nh: <br />
                <br />
                <Form.Item
                  name="city"
                  rules={[{ required: true, message: 'Vui l??ng ch???n t???nh th??nh!' }]}
                >
                  <Select placeholder="T???nh th??nh" style={{ width: '328px' }}
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

                Qu???n huy???n: <br /> <br />
                <Form.Item
                  name="district"
                  rules={[{ required: true, message: 'Vui l??ng ch???n qu???n huy???n!' }]}
                >
                  <Select placeholder="Qu???n huy???n" style={{ width: '328px' }}>
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
                  <TextArea placeholder="Ghi ch?? (tu??? ch???n)" rows={3} style={{ width: '328px', marginTop: '40px', marginBottom: '20px' }} />
                </Form.Item>

              </Col>
              <Col span={1}></Col>
              <Col span={8}>
                <div className="title-method-express">
                  <strong >V???n chuy???n</strong>
                </div>
                <div style={{ marginBottom: '12px' }}>
                  Ph????ng th???c v???n chuy???n:
                </div>
                <Form.Item
                  name="transMethod"
                  rules={[{ required: true, message: 'Vui l??ng ch???n ph????ng th???c v???n chuy???n!' }]}
                >
                  <Select placeholder="Ph????ng th???c v???n chuy???n:" style={{ width: '328px', marginBottom: '30px' }}
                  >
                    <Option value="???????ng b???">???????ng b???</Option>
                  </Select>
                </Form.Item>

                <div className="title-method-tratien">
                  <div className="title-method-tratien-2">
                    <strong>Thanh to??n</strong>
                  </div>
                  <div className="title-method-tratien-3">
                    <Form.Item
                      name="methodPay"
                      rules={[{ required: true, message: 'Vui l??ng ch???n ph????ng th???c v???n chuy???n!' }]}
                    >
                      <Radio.Group>
                        <div className="chon-1">
                          <Radio value="???????????????????? ?????????????????? ???????????? ???????????????? (????????????)">
                            ???????????????????? ?????????????????? ???????????? ???????????????? (????????????)<i style={{ paddingLeft: '60px', fontSize: '17px', color: '#1990c6' }} class="fa fa-money" aria-hidden="true"></i>
                          </Radio>
                        </div>

                        <div className="chon-1">
                          <Radio value="???????????????????? ?????????????????? ???????????? ?????????? ?????????????????? ???????????? ????????????????">
                            ???????????????????? ?????????????????? ???????????? ?????????? ?????????????????? ???????????? ????????????????<i style={{ paddingLeft: '20px', fontSize: '17px', color: '#1990c6' }} class="fa fa-paypal" aria-hidden="true"></i>
                          </Radio>
                        </div>

                        <div className="chon-1">
                          <Radio value="???????????????????????????? ?????????????????????? ?????????????????? ??????????????????">
                            ???????????????????????????? ?????????????????????? ?????????????????? ??????????????????<i style={{ paddingLeft: '70px', fontSize: '17px', color: '#1990c6' }} class="fa fa-cc-visa" aria-hidden="true"></i>
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
              <strong>????n h??ng c???a b???n:</strong>
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
                label="Nh???p m?? gi???m gi??.."
                validate={true}
                showLabel={false}
              />
              <Button style={{ backgroundColor: '#ffac4b', height: '50px', border: 'none', borderRadius: "5px" }}>??p D???ng</Button>
            </div>
            <div className="subtotalmoney">
              <div className="sotientamtinh">
                <p>T???m t??nh</p>
                <p>
                  {showSubToTal(listGioHang)}
                </p>
              </div>
              <div className="phivanchuyen">
                <p>Ph?? v???n chuy???n</p>
                <p>{renderTien(39000)}</p>
              </div>
              <div className="totalmoney">
                <p>T???ng c???ng:</p>
                <p style={{ color: '#2a9dcc' }}>{renderTongTatCaTien(listGioHang)}</p>
              </div>
            </div>

            <div className="dathangvenha">
              <Button
                htmlType="submit"
                style={{ backgroundColor: '#ffac4b', height: '50px', border: 'none', marginTop: '5px', borderRadius: "5px" }}
              >
                ?????t h??ng
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