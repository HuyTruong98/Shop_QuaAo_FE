import { combineReducers } from "redux";
import quanlytaikhoan from "./quanlytaikhoan";
import quanlylogin from "./quanlylogin";
import quanlythongbao from "./quanlythongbao";
import quanly_cmnd from "./quanly_cmnd";
import quanlyKhoAoQuan from "./quanlykhoAoQuan";
import quanlySize from "./quanly_size";
import loaiSanPham from "./quanly_loaiSanPham";
import sanPhamDuoc from "./quanly_sanphamDuoc";
import giohang_in_cart from "./giohang_in_cart";
import commentUser from "./commentUser";
import thanhpho from "./thanhpho";
import orderProduct from "./oderProduct";
import quanlyHoaDon from "./quanlyhoadon";

const appReducers = combineReducers({
  quanlytaikhoan,
  quanlylogin,
  quanlythongbao,
  quanly_cmnd,
  quanlyKhoAoQuan,
  quanlySize,
  loaiSanPham,
  sanPhamDuoc,
  giohang_in_cart,
  commentUser,
  thanhpho,
  orderProduct,
  quanlyHoaDon,
});

export default appReducers;
