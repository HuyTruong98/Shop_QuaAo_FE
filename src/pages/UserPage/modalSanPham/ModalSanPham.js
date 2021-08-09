import React, { useEffect, Component, useState } from "react";
import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { renderTien } from "../../../notification/renderConvert";
import { BrowserRouter as NavLink, Link } from "react-router-dom";

function ModalSanPham({ match }) {
  const itemDetail = useSelector((state) => state.quanlyKhoAoQuan.item);
  const listSize = useSelector((state) => state.quanlySize.list);
  const [selectImg, setSelectImg] = useState();

  const renderTinhTrang = (value) => {
    return (
      value && value.map((item, index) => {
        console.log(item);
        const size = listSize.find(itemSize => itemSize.id === item.sizeId)

        if (item.soluong <= 0) {
          return (
            <p >{size.size} : Hết hang &emsp; </p>
          )
        } else {
          return (
            size ? <p >{size.size} : {item.soluong}</p> : "Unisex"
          )
        }
      })
    )
  }

  const renderAnhTo = (value) => {
    if (selectImg !== null && selectImg !== undefined) {
      //khi lúc ni nó có giá trị rồi thì nó sẽ vô đây..
      // component sẽ load lại khi state thay đô

      // điều kiện chổ ni nếu thằng ni có mới chạy vô đây
      return (
        <img src={selectImg} width="100%" height="80%" />
      )
    }
    else {
      //ko có thì chay vô đây,
      // ban đầu thằng selectImg ni nó undefine
      return (
        value && Array.isArray(value) && value.length > 0 && value.map((item, index) => (
          index === 0 && <img src={item} width="100%" height="80%" />
        )))
    }
  }

  const renderAnhNho = (value) => {
    return (
      value && Array.isArray(value) && value.length > 0 && value.map((item, index) => (
        index < 4 &&
        <img
          style={{ border: "1px solid #ffac4b", marginLeft: '20px' }}
          src={item}
          width="80px" height="80px"
          onClick={() => { setSelectImg(item) }} // khi a onClick thì lúc ni nó mới set vô, thì thằng selectImg ni mới có giá trị
        />
      )))
  }

  return (
    <>
      <div className="row">
        <div className="product-left-column product-images col-xs-12 col-sm-4 col-md-4 col-lg-5 col-xl-6">
          <div className="slick-modal">
            {renderAnhTo(itemDetail && itemDetail.img)} <br /> <br />
            {renderAnhNho(itemDetail && itemDetail.img)}
          </div>
        </div>
        <div className="product-center-column product-info product-item col-xs-12 col-sm-6 col-md-8 col-lg-7 col-xl-6">
          <div className="modal-title">
            <h3>{itemDetail.tenSanPham}</h3>
          </div>
          <div className="modal-money">
            {itemDetail.priceSale > 0 ?
              <>
                <strong>{renderTien(itemDetail.price)}</strong> <strike>{renderTien(itemDetail.priceSale)}</strike>
              </>
              :
              <strong>{renderTien(itemDetail.price)}</strong>
            }
          </div>
          <div className="modal-brand">
            <div className="first-status">
              <p>Thương hiệu : &nbsp; <strong>YG SHOP</strong></p>
            </div>
            <div className="second-status">
              <p>Mã sản phẩm : &nbsp;<strong>{itemDetail.maSanPham}</strong> </p>
            </div>
          </div>
          <div className="kichthuoc">
            <span>Tình trạng Size:</span>
          </div>
          <div className="rendersize">
            {renderTinhTrang(itemDetail && itemDetail.size)}
          </div>
          <div className="chitiet-sanpham">
                <Link
                  to={{
                    pathname: `product/${itemDetail.id}`,
                    id: itemDetail.id,
                  }}
                >
                  <Button style={{ height: '60px', display: 'flex', borderRadius: '10px', backgroundColor: '#ffac4b', border: 'none', marginLeft: '30px' }}>
                    <i style={{ fontSize: '35px', paddingTop: '10px' }} class="fa fa-cart-plus" aria-hidden="true"></i>
                    <strong style={{ fontSize: '23px', paddingTop: '7px' }}>
                      &nbsp; Chi tiết sản phẩm
                    </strong>
                  </Button>
                </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalSanPham;
