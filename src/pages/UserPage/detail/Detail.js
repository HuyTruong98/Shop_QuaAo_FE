import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thongBao } from "../../../constants/message/thongBao";
import * as Message from "../../../constants/Message";
import * as NoiDung from "../../../constants/noiDungThongBao";
import * as actGetProductItem from "../../../actions/quanlyKho_quan_ao/actQuanlyQuanAo";
import * as actGetAllSize from "../../../actions/quanly_size/actQuanLySize";
import * as actGetAllComment from "../../../actions/commentUser/actComment";
import * as actAddToCart from "../../../actions/giohang_cart/cartGioHang";
import { renderTien } from "../../../notification/renderConvert";
import { Input, Button, Tabs, Image, Form, Select } from 'antd';
import SanPhamTuongTu from "./SanPhamTuongTu";
import SanPhamDaXem from "./SanPhamDaXem";
import Footer from "../footer/Footer";
import CommentHere from "../Comment/CommentHere";
import * as act from "./../../../actions/quanlytaikhoan/actQuanLyTaiKhoan";
import InnerImageZoom from 'react-inner-image-zoom';

function Detail({ match, history }) {
  const { Option } = Select;
  const { TabPane } = Tabs;
  const { id } = match.params;
  const [count, setCount] = useState(1);
  const itemDetail = useSelector((state) => state.quanlyKhoAoQuan.item);
  const listSize = useSelector((state) => state.quanlySize.list);
  const dispatch = useDispatch();
  const [selectImg, setSelectImg] = useState();

  function renderSizeTheoSanPham(value) {
    return (
      value &&
      value.map((item, index) => {
        if (item.soluong > 0) {
          const size = listSize.find(
            (itemSize, indexSize) => itemSize.id === item.sizeId
          );
          return size ? (
            <Option key={index} value={item.sizeId}>
              {size.size}
            </Option>
          ) : (
            <Option key={index}>
              unisex
            </Option>
          );
        } else {
          const size = listSize.find(
            (itemSize, indexSize) => itemSize.id === item.sizeId
          );
          return size ? (
            <Option key={index} value={item.sizeId} disabled>
              {size.size}
            </Option>
          ) : (
            "No Size"
          );
        }
      })
    );
  }

  const [form] = Form.useForm();


  function addToCart(values) {
    values = {
      ...values,
      id: itemDetail.id,
      img: itemDetail.img,
      tenSanPham: itemDetail.tenSanPham,
      maSanPham: itemDetail.maSanPham,
      price: itemDetail.price,
      priceSale: itemDetail.priceSale,
      soluong: count
    }
    thongBao(Message.THONG_BAO, NoiDung.THEM_VAO_GIO_HANG_THANH_CONG);
    dispatch(actAddToCart.actCreateGioHang(values))
  }


  const renderAnhTo = (value) => {
    if (selectImg !== null && selectImg !== undefined) {
      //khi l??c ni n?? c?? gi?? tr??? r???i th?? n?? s??? v?? ????y..
      // component s??? load l???i khi state thay ????

      // ??i???u ki???n ch??? ni n???u th???ng ni c?? m???i ch???y v?? ????y
      return (
        <InnerImageZoom src={selectImg} zoomSrc={selectImg} width="90%" height="620px" />
      )
    }
    else {
      //ko c?? th?? chay v?? ????y,
      // ban ?????u th???ng selectImg ni n?? undefinen

      return (

        value && Array.isArray(value) && value.length > 0 && value.map((item, index) => (
          index === 0 &&
          <InnerImageZoom src={item} zoomSrc={item} width="90%" height="70%" />
        ))
      )
    }
  }



  const renderAnhNho = (value) => {
    return (
      value && Array.isArray(value) && value.length > 0 && value.map((item, index) => (
        <img
          style={{ border: "1px solid #ffac4b", marginRight: '10px', cursor: 'pointer' }}
          src={item}
          width="80px" height="80px"
          onClick={() => { setSelectImg(item) }} // khi a onClick th?? l??c ni n?? m???i set v??, th?? th???ng selectImg ni m???i c?? gi?? tr???
        />
      )))
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
    dispatch(actGetProductItem.actGetKhoRequest(id));
    dispatch(actGetAllSize.getAllSizeRequest());
  }, []);
  return (
    <>

      <div className="breadcrumb_background">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 a-left">
              <p> Trang ch??? &ensp;  <i class="fa fa-chevron-right" aria-hidden="true"></i> &ensp;  <span>{itemDetail.tenSanPham}</span></p>
            </div>
          </div>
        </div>
      </div>
      <div className="breadcrumb-product-detail">
        <Form
          layout="horizontal"
          form={form}
          name="basic"
          onFinish={(values) => addToCart(values)}
          initialValues={{ remember: true }}
        >
          <div className="container">
            <div className="row">
              <div style={{ textAlign: 'center' }} className="product-detail-left product-images col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-7 col-xl-7-fix">
                {renderAnhTo(itemDetail && itemDetail.img)}<br /> <br />
                {renderAnhNho(itemDetail && itemDetail.img)}
              </div>
              <div className="col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-5 col-xl-5-fix details-pro">


                <h1 className="title-product">{itemDetail.tenSanPham}</h1>
                <div className="price-box">
                  {itemDetail.priceSale > 0 ?
                    <>
                      <strong>{renderTien(itemDetail.priceSale)}</strong>  &emsp; <strike>{renderTien(itemDetail.price)} <div className="phantramgiam-detail">-{Math.ceil(100 - ((itemDetail.priceSale) / (itemDetail.price) * 100))}%</div></strike>
                    </>
                    :
                    <strong>{renderTien(itemDetail.price)}</strong>
                  }
                </div>
                <div className="first-status">
                  <p>Th????ng hi???u : &nbsp; <strong>YG SHOP</strong></p>
                </div>
                <div className="second-status">
                  <p>M?? s???n ph???m : &nbsp;<strong>{itemDetail.maSanPham}</strong> </p>
                </div>

                {/* <span>Kich th?????c :</span> */}
                <Form.Item
                  label="K??ch th?????c"
                  name="sizeId"
                  rules={[{ required: true, message: "Vui l??ng ch???n size!" }]}
                >
                  <Select
                    style={{ width: '170px' }}
                    placeholder="Vui l??ng ch???n size"
                  >
                    {renderSizeTheoSanPham(itemDetail.size)}
                  </Select>
                </Form.Item>


                <Form.Item
                  label="M??u s???c"
                  name="mauSac"
                  rules={[{ required: true, message: "Vui l??ng ch???n m??u s???c!" }]}
                >
                  <Select
                    style={{ width: '170px' }}
                    placeholder="Vui l??ng ch???n m??u s???c"
                  >
                    <Option value={itemDetail.mauSac}>
                      {itemDetail.mauSac}
                    </Option>
                  </Select>
                </Form.Item>

                <div className="quanlySize">
                  <div className="soluong">
                    S??? l?????ng :
                    <div className="tanggiam">
                      {
                        count < 2 ?
                          <Button disabled style={{ marginRight: '20px' }} onClick={() => setCount(count - 1)}>
                            <i class="fa fa-minus" aria-hidden="true"></i>
                          </Button>
                          :
                          <Button style={{ marginRight: '20px' }} onClick={() => setCount(count - 1)}>
                            <i class="fa fa-minus" aria-hidden="true"></i>
                          </Button>
                      }
                      <p style={{ marginTop: '3px', marginRight: '20px' }}>{count}</p>
                      <Button onClick={() => setCount(count + 1)}>
                        <i class="fa fa-plus" aria-hidden="true"></i>
                      </Button>
                    </div>
                  </div>
                  <div className="themvaogiohang">
                    <Button
                      htmlType="submit"
                      style={{ backgroundColor: '#ffac4b', marginTop: '20px', height: '60px', border: 'none' }}
                    >
                      <i style={{ fontSize: '30px' }} class="fa fa-shopping-cart" aria-hidden="true"></i>&emsp; <strong>Th??m v??o gi??? h??ng</strong>
                    </Button>
                  </div>
                  <div className="phone-contact-1">
                    <div className="phone-contact-title">
                      <p>G???I ????? MUA H??NG NHANH H??N</p>
                    </div>
                    <div className="phone-contact-number">
                      <div className="phone-icon"><i style={{ fontSize: '20px' }} class="fa fa-volume-control-phone" aria-hidden="true"></i></div>
                      <div className="number-phone-contact"><strong>1800 1234</strong></div> &emsp;
                      <p>Mi???n ph??</p>
                    </div>
                  </div>
                  <div className="giaohangsieutoc">
                    <img src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/now1.png" /> <b> GIAO SI??U T???C 2H <br />
                      <font style={{ color: 'green', fontSize: '18px', paddingTop: '10px' }}> Giao nhanh 2H trong n???i th??nh:</font>  <br />
                      <font style={{ color: 'orange', paddingTop: '10px' }}> TP.HCM, H?? N???I, ???? N???NG </font>
                    </b>
                  </div>
                  <div className="giaohangtietkiem">
                    <img src="https://bizweb.dktcdn.net/100/331/067/themes/823156/assets/fast1.png" /> <b> GIAO TI???T KI???M <br />
                      <font style={{ color: 'green', fontSize: '18px', paddingTop: '10px' }}> Giao nhanh ti???t ki???m</font>  <br />
                      <font style={{ color: 'orange', paddingTop: '10px', fontSize: '16px' }}> Th???i gian giao h??ng t??? 2-3 ng??y </font>
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>

        <div className="product-info-item">
          <div className="container">
            <Tabs defaultActiveKey="1" centered>
              <TabPane tab="Th??ng tin s???n ph???m" key="1">
                <div className="thongtinimage">
                  {
                    Array.isArray(itemDetail && itemDetail.img) && itemDetail.img.length > 0 &&
                    itemDetail.img.map((item, index) => {
                      if (item) {
                        return (
                          <Image src={item} key={index} width="100%" />
                        )
                      }
                    })
                  }
                </div>
              </TabPane>
              <TabPane tab="B???n size" key="2">
                <div className="thongtinSize">
                  <img src="//bizweb.dktcdn.net/100/331/067/files/bang-size-yg-shop.png?v=1614019987979" width="100%" />
                </div>
              </TabPane>
              <TabPane tab="????nh gi?? s???n ph???m" key="3">
                <div className="thongtinSize">
                  <CommentHere itemDetail={itemDetail} />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="sanphamtuongtu">
          <SanPhamTuongTu itemDetail={itemDetail} match={match} />
        </div>
        <div className="sanphamdaxem">
          <SanPhamDaXem />
        </div>
        <div className="footer-giohang">
          <Footer />
        </div>
      </div>

    </>
  )
}

export default Detail;
