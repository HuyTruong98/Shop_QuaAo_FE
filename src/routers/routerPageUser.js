import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Trangchu from "../pages/UserPage/Trangchu/Trangchu";
import Gioithieu from "../pages/UserPage/Gioithieu";
import Lienhe from "../pages/UserPage/Lienhe";
import Cuahang from "../pages/UserPage/Cuahang";
import NavUserPage from "../pages/HomePage/NavUserPage";
import PageLogin from "../pages/HomePage/login/pageLogin";
import DetailSanPham from "../pages/UserPage/detail/Detail";
import Giohang from "../pages/UserPage/giohang/Giohang";
import Thanhtoan from "../pages/UserPage/giohang/Thanhtoan";
import Tongsanpham from "../pages/UserPage/tongsanpham/Tongsanpham";
import AoTshirt from "../pages/UserPage/loaisanpham/AoTshirt";
import DatHangThanhCong from "../pages/UserPage/giohang/DatHangThanhCong";
import SearchProduct from "../pages/UserPage/searchProduct/SearchProduct";
import Profile from "../pages/UserPage/profile/profile";
import Pants from "../pages/UserPage/loaisanpham/Pants";
import Hoodie from "../pages/UserPage/loaisanpham/Hoodie";
import Jacket from "../pages/UserPage/loaisanpham/Jacket";
import SanPhamDisCount from "../pages/UserPage/loaisanpham/SanPhamDisCount";
import Somi from "../pages/UserPage/loaisanpham/Somi";
import PhukienAll from "../pages/UserPage/loaisanpham/PhukienAll";
import Caphat from "../pages/UserPage/loaisanpham/Caphat";
// đây mới router user a ơi
function RouterPageUser({ account_current }) {
  return (
    <>
      <NavUserPage />
      <Switch>
        <Route path="/" exact component={Trangchu} />
        <Route path="/Gioi-thieu" component={Gioithieu} />
        <Route path="/Lien-he" component={Lienhe} />
        <Route path="/Cua-hang" component={Cuahang} />
        <Route exact path="/product/:id" component={DetailSanPham} />
        <Route path="/San-pham-all" component={Tongsanpham} />
        <Route path="/T-shirt" component={AoTshirt} />
        <Route path="/Pants" component={Pants} />
        <Route path="/Hoodie" component={Hoodie} />
        <Route path="/Jacket" component={Jacket} />
        <Route path="/So-mi" component={Somi} />
        <Route path="/Phu-kien" component={PhukienAll} />
        <Route path="/Cap-hat" component={Caphat} />
        <Route path="/San-pham-khuyen-mai" component={SanPhamDisCount} />
        <Route path="/Gio-hang" component={Giohang} />
        <Route path="/Thanh-toan" component={Thanhtoan} />
        <Route path="/Thanh-toan-thanh-cong" component={DatHangThanhCong} />
        <Route exact path="/Tim-kiem/:id" component={SearchProduct} />
        {
          account_current?.checkToken && account_current !== null && account_current !== undefined ? (
            <Route path="/Thong-tin-ca-nhan" component={Profile} />
          ) : (
            404
          )
        }
        {
          account_current?.checkToken && account_current !== null && account_current !== undefined ? (
            <Redirect to="/" />
          ) : (
            <Route path="/Dang-nhap" component={PageLogin} />
          )
        }

        <Route component={Trangchu} />
      </Switch>
    </>
  );
}

export default RouterPageUser;
