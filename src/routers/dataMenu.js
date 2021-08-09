export const menusListQuanTri = [
  {
    name: "Hệ thống",
    type: "Menu",
    children: [
      {
        name: "Quản lý tài khoản",
        children: [
          {
            name: "Tài khoản",
            to: "/quanlytaikhoan",
            exact: true,
          },
        ],
      },
      {
        name: "Quản lý kho",
        children: [
          {
            name: "Quản lý kho",
            to: "/quanlykho",
            exact: true,
          },
        ],
      },
      {
        name: "Quản lý hoá đơn",
        children: [
          {
            name: "Quản lý hoá đơn",
            to: "/quanlyhoadon",
            exact: true,
          },
        ],
      },
    ],
  },

  {
    name: "Báo cáo tổng quát",
    to: "/baocaotongquat",
    exact: true,
  },
  {
    name: "Xem dánh sách",
    to: "/xemdanhsach",
    exact: true,
  },
  {
    name: "Mục lục",
    to: "/mucluc",
    exact: true,
  },
];

export const menusListUser = [
  {
    name: "Hệ thống",
    type: "Menu",
    children: [
      {
        name: "Tài khoản",
        to: "/quanlytaikhoan",
        exact: true,
      },
    ],
  },

  {
    name: "Báo cáo tổng quát",
    to: "/baocaotongquat",
    exact: true,
  },
  {
    name: "Xem dánh sách",
    to: "/xemdanhsach",
    exact: true,
  },
  {
    name: "Mục lục",
    to: "/mucluc",
    exact: true,
  },
];
