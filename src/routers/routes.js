import React from "react";
import Home from "../components/Home";
import NotFound from "../pages/HomePage/404";
import PageQuanLyTaiKhoan from "../pages/quanlytaikhoan/pageQuanLyTaiKhoan";
import PageQuanLyKho from "../pages/quanlykho/pageQuanLyKho";
import PageQuanLyHoaDon from "../pages/pageQuanLyHoaDon/pageQuanLyHoaDon";
const routes = [
  {
    path: "/",
    exact: true,
    main: () => <Home />,
  },
  {
    path: "/quanlytaikhoan",
    exact: true,
    main: ({ match, location }) => (
      <PageQuanLyTaiKhoan location={location} match={match} />
    ),
  },

  {
    path: "/quanlykho",
    exact: true,
    main: ({ match, location }) => (
      <PageQuanLyKho location={location} match={match} />
    ),
  },

  {
    path: "/quanlyhoadon/",
    exact: true,
    main: ({ match, location }) => (
      <PageQuanLyHoaDon location={location} match={match} />
    ),
  },

  {
    path: "",
    exact: true,
    main: () => <NotFound />,
  },
];

export default routes;
