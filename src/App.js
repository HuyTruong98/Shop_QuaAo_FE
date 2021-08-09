import "./App.css";
import Page from "./pages/HomePage/Page";
import "antd/dist/antd.css";
import PageLogin from "./pages/HomePage/login/pageLogin";
import { useDispatch, useSelector } from "react-redux";
import UserPage from "./pages/UserPage/routerUserPage/UserPage";
import * as act from "./actions/quanlytaikhoan/actQuanLyTaiKhoan";
import { Redirect } from "react-router-dom";
import * as actTaiKhoan from "./actions/quanlytaikhoan/actQuanLyTaiKhoan";
import { useEffect } from "react";
import * as actGetKhoRequest  from "./actions/quanlyKho_quan_ao/actQuanlyQuanAo";

function App() {
  const account_current = useSelector(
    (state) => state.quanlylogin.account_current
  );

  useEffect(() => {
    if (localStorage.getItem("login")) {
      dispatch(
        act.actGetTaiKhoanByIdInApplicationRequest(
          localStorage.getItem("login")
        )
      );
    }
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actGetKhoRequest.getAllKhoRequest());
    dispatch(actTaiKhoan.actFetchTaiKhoanRequest());
  }, []);
  return (
    <div className="App m-0">
      {account_current.checkToken && account_current?.quyen !== "KhachHang" && account_current !== null ?
        (
          <Page account_current={account_current} />
        ) :
        (
          <UserPage account_current={account_current} />
        )
      }
    </div>
  );
}

export default App;
