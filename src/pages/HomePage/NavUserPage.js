import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, NavLink } from "react-router-dom";
import { SearchOutlined, ShoppingCartOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { Input, Menu, Dropdown, Badge, Form } from "antd";
import { useDispatch, useSelector } from 'react-redux';
import * as actUser from "./../../actions/quanlytaikhoan/actQuanLyTaiKhoan";
import axios from 'axios';

function NavUserPage(props) {
  const dataAccount = useSelector(state => state.quanlylogin.account_current);
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const listCart = useSelector(state => state.giohang_in_cart.list);
  const listKhoQuanAo = useSelector(state => state.quanlyKhoAoQuan.list);
  const [itemProduct, setItemProducts] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const response = await axios.get('http://localhost:3000/sanpham?tenSanPham_like=');
      setItemProducts(response.data);
    }
    loadProducts()
  }, [])

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = itemProduct.filter(product => {
        const regex = new RegExp(`${text}`, "gi");
        return product.tenSanPham.match(regex)
      })
    }
    console.log('matches', matches);
    setSuggestions(matches);
    setText(text);
  }

  function renderThongBaoGioHang(listCart) {
    let total = 0;
    if (listCart.length > 0) {
      for (var i = 0; i < listCart.length; i++) {
        total += listCart[i].soluong ? listCart[i].soluong : 0;
      }
    }
    return total ? total : 0;
  }

  function logOut() {
    dispatch(actUser.actLogOut({ checkToken: false }));
    localStorage.removeItem("login");
  };

  function onChangeToggle(value) {
    setToggle(!value);
  }

  const MenuLink = ({ label, to, activeOnlyWhenExact, onClick }) => {
    return (
      <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => {
          var active = match ? "active all" : "";
          return (
            <li
              className={active}
              style={{ paddingRight: "15px", marginLeft: "20px" }}
            >
              <Link onClick={onClick} className="collapse-item" to={to}>
                {label}
              </Link>
            </li>
          );
        }}
      />
    );
  };


  const menuProductsSearch = (
    <Menu>
      {
        suggestions && suggestions.map((itemSearch, indexSearch) => {
          return (
            <>
              <Menu.Item key={indexSearch} style={{ marginBottom: '30px' }}>
                <Link
                  to={{
                    pathname: `/Tim-kiem/${itemSearch.id}`,
                    id: itemSearch.id,
                  }}
                >
                  {
                    Array.isArray(itemSearch && itemSearch.img) && itemSearch.img.length > 0 && itemSearch.img.map((itemImg, indexImg) => {
                      if (indexImg === 0) {
                        return (
                          <img src={itemImg} width="55px" height="55px" />
                        )
                      }
                    })
                  }
                  <a>{itemSearch.tenSanPham}</a>
                </Link>
              </Menu.Item>

            </>
          )
        })
      }
    </Menu>
  )

  const menu = (
    <Menu>
      {dataAccount.checkToken ?
        (
          <>
            <Menu.Item>
              <NavLink to="/Thong-tin-ca-nhan">
                <a>
                  <i
                    className="fa fa-user-o mr-2 text-gray-400"
                    aria-hidden="true"
                  ></i> {dataAccount.tenNguoiDung}
                </a>
              </NavLink>
            </Menu.Item>
            <Menu.Item  >
              <a
                href="#"
                data-toggle="modal"
                data-target="#logoutModal"
                onClick={() => logOut()}
              >
                <i
                  className="fa fa-sign-out  mr-2 text-gray-400"
                  aria-hidden="true"
                ></i>
                Đăng xuất
              </a>
            </Menu.Item>
          </>
        ) : (
          <>
            <Menu.Item >
              <MenuLink label="Đăng nhập" to="/Dang-nhap" activeOnlyWhenExact={false} />
            </Menu.Item>
          </>
        )
      }
    </Menu>
  )


  return (
    <>
      <div className="background-header"></div>
      <div className="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light navbar-header">
          <div className="col-xl-2 col-lg-2 col-md-6 col-6">
            <Link style={{ color: 'white' }} to="/" activeOnlyWhenExact={false} >
              <a class="navbar-brand" >
                <img src="//bizweb.dktcdn.net/100/331/067/themes/823156/assets/logo.png?1623467495633" width="100%" height="120px" />
              </a>
            </Link>
          </div>
          <button class="navbar-toggler" type="button"
            data-toggle="collapse" data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active1">
                <MenuLink class="nav-link" label="TRANG CHỦ" to="/" activeOnlyWhenExact={true} />
              </li>
              <li class="nav-item active1">
                <MenuLink class="nav-link" label="GIỚI THIỆU" to="/Gioi-thieu" activeOnlyWhenExact={false} />
              </li>
              <li class="nav-item active1">
                <MenuLink class="nav-link" label="LIÊN HỆ" to="/lien-he" activeOnlyWhenExact={false} />
              </li>
              <li class="nav-item active1">
                <MenuLink class="nav-link" label="CỬA HÀNG" to="/Cua-hang" activeOnlyWhenExact={false} />
              </li>
              <li class="dropdown1 dropdown-5">
                <Link style={{ color: 'white' }} to="/San-pham-all" activeOnlyWhenExact={false} >SẢN PHẨM</Link>  &nbsp;  <DownOutlined style={{ fontSize: '14px' }} />
                <ul class="dropdown_menu dropdown_menu-5">
                  <Link style={{ color: 'black' }} to="/T-shirt" activeOnlyWhenExact={false} >
                    <li class="dropdown_item-1">T-SHIRT</li>
                  </Link>
                  <Link style={{ color: 'black' }} to="/Pants" activeOnlyWhenExact={false} >
                    <li class="dropdown_item-2">Pants</li>
                  </Link>
                  <Link style={{ color: 'black' }} to="/Hoodie" activeOnlyWhenExact={false} >
                    <li class="dropdown_item-3">Hoodie</li>
                  </Link>
                  <Link style={{ color: 'black' }} to="/Jacket" activeOnlyWhenExact={false} >
                    <li class="dropdown_item-4">Jacket</li>
                  </Link>
                  <Link style={{ color: 'black' }} to="/So-mi" activeOnlyWhenExact={false} >
                    <li class="dropdown_item-5">Sơ Mi</li>
                  </Link>
                  <Link style={{ color: 'black' }} to="/Phu-kien" activeOnlyWhenExact={false} >
                    <li class="dropdown_item-6">Phụ Kiện</li>
                  </Link>
                  <Link style={{ color: 'black' }} to="/Cap-hat" activeOnlyWhenExact={false} >
                    <li class="dropdown_item-7">CapHat</li>
                  </Link>
                  <Link style={{ color: 'black' }} to="/San-pham-khuyen-mai" activeOnlyWhenExact={false} >
                    <li class="dropdown_item-8">Sản phẩm khuyến mãi</li>
                  </Link>
                </ul>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0 gio-hang">
              <div className="input-search">
                <Dropdown overlay={menuProductsSearch}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <Input
                      value={text}
                      name="search"
                      size="large"
                      placeholder="Tìm kiếm..."
                      bordered
                      suffix={<SearchOutlined />}
                      onChange={(e) => onChangeHandler(e.target.value)}
                      style={{ width: 300, marginTop: '12px' }}
                    />

                  </a>
                </Dropdown>
              </div>
              <Link to="/Gio-hang" activeOnlyWhenExact={false} >
                <a class=" my-2 my-sm-0 ml-4" type="submit">
                  <Badge size="small" count={renderThongBaoGioHang(listCart)} showZero>
                    <ShoppingCartOutlined style={{ color: 'white', fontSize: '25px' }} />
                  </Badge>
                  {/* <ShoppingCartOutlined style={{ color: 'white' }} /> */}
                </a>
              </Link>
              <a class=" my-2 my-sm-0 ml-4" type="submit"></a>
              <Dropdown overlay={menu} placement="bottomCenter" arrow>
                <a
                  className="ant-dropdown-link"
                  onClick={() => {
                    onChangeToggle(true);
                  }}
                >
                  <span >
                    {dataAccount.checkToken ? dataAccount.name : <UserOutlined style={{ color: 'white' }} />}
                  </span>
                  {dataAccount.checkToken ? (
                    <img
                      className="img-profile rounded-circle"
                      src={`${dataAccount.img}`}
                      style={{ width: "60px", marginTop: '15px' }}
                    />
                  ) : (
                    ""
                  )}
                </a>
              </Dropdown>
            </form>
          </div>
        </nav>
      </div>
    </>
  );
}

export default NavUserPage;