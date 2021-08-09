import React, { useEffect, useState } from 'react';
import ModalSanPham from "../modalSanPham/ModalSanPham";
import { useSelector } from 'react-redux';
import { renderTien } from "../../../notification/renderConvert";
import { Row, Col, Modal, Card, Image, Button } from 'antd';
import { BrowserRouter as Link, NavLink, useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as actGetKho from "../../../actions/quanlyKho_quan_ao/actQuanlyQuanAo";

function SanPhamTuongTu({ itemDetail, match }) {
  console.log(match);
  const dispatch = useDispatch();
  const history = useHistory();
  const listKho = useSelector(state => state.quanlyKhoAoQuan.list);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = (id) => {
    dispatch(actGetKho.actGetKhoRequest(id));
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function goProduct(id) {
    console.log(id);
    history.replace({
      pathname: `/product/${id}`,
    })
  }

  function renderProductSame() {
    return listKho.filter(item => item.sanphamduocId === itemDetail.sanphamduocId && item.loaisanphamId === itemDetail.loaisanphamId && item.tenSanPham !== itemDetail.tenSanPham) ?
      listKho.filter(item => item.sanphamduocId === itemDetail.sanphamduocId && item.loaisanphamId === itemDetail.loaisanphamId && item.tenSanPham !== itemDetail.tenSanPham).map((item, index) => {
        if (index < 4) {
          return (
            <>
              <div className="col-xl-3 col-lg-3 col-6">
                <div className="card-best-seller">
                  <Card bordered={false}
                    style={{ width: 260, marginRight: '25px', marginBottom: '80px' }}
                    cover={
                      Array.isArray(item && item.img) && item.img.length > 0 && item.img.map((itemImg, index) => {
                        if (index === 0) {
                          return (
                            <div className="wrapper-2">
                              <div className="big-image">
                                {
                                  item.priceSale ?
                                    <div className="phantramgiam">-{Math.ceil(100 - ((item.priceSale) / (item.price) * 100))}%</div>
                                    : ""
                                }
                                <img src={itemImg} width="100%" height="100%" />
                                <div class="info-T-shirt-all">

                                  <Link
                                    to={`/product/${match.id}`}
                                  >
                                    <button>
                                      <i
                                        style={{ fontSize: "23px" }}
                                        className="fa fa-cart-plus"
                                        aria-hidden="true"
                                      ></i>
                                    </button>
                                  </Link>


                                </div>
                              </div>
                            </div>
                          )
                        }
                      })
                    }
                  >
                    <div className="card-product-list">
                      <div className="product-info">
                        <a onClick={() => history.push(`product/${item.id}`)}>
                            {item.tenSanPham}
                        </a>
                      </div>
                      <div className="product-price">
                        {
                          item.priceSale ?
                            <>
                              <strong style={{ fontSize: '16px' }}>{renderTien(item.priceSale)}</strong> &emsp;
                              <strike>{renderTien(item.price)}</strike>
                            </>
                            :
                            <strong style={{ fontSize: '16px' }}>{renderTien(item.price)}</strong>
                        }
                      </div>
                      <div className="select-img">
                        {
                          Array.isArray(item && item.img) && item.img.length > 0 && item.img.map((itemImg, indexImg) => {
                            if (indexImg < 3) {
                              return (
                                <Image style={{ border: '1px solid #ffac4b', height: '50px', marginRight: '5px' }} src={itemImg} width="50px" />
                              )
                            }
                          })
                        }
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </>
          )
        }
      })
      : ""
  }

  useEffect(() => {
    dispatch(actGetKho.getAllKhoRequest());
  }, [])
  return (
    <>
      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
        width={900}
      >
        <ModalSanPham match={match} />
      </Modal>
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ marginBottom: '30px' }}>
            <strong>SẢN PHẨM TƯƠNG TỰ</strong>
          </div>
        </div>
        <div className="row">
          {renderProductSame()}
        </div>
      </div>
    </>
  );
}

export default SanPhamTuongTu;