import React, { useState } from "react";
import { Table, Divider, Image, Popconfirm, message, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { BrowserRouter as Router, NavLink } from "react-router-dom";
import * as Message from "../../constants/Message";
import { renderTien } from "../../notification/renderConvert";
import { useSelector } from "react-redux";

function TableQuanLyKhoQuanAo({
  match,
  data,
  onDelete,
  onEdit,
}) {
  const [selectionType, setSelectionType] = useState();
  const sizeList = useSelector(state => state.quanlySize.list);
  const loaiSanPhamList = useSelector(state => state.loaiSanPham.list);
  const listSanPhamDuoc = useSelector(state => state.sanPhamDuoc.list);

  var url = match.url;

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "tenSanPham",
      width: 150,
      fixed: "left",
      render: (data, record) => renderDetail(record),
    },
    {
      title: "Mã sản phẩm",
      dataIndex: "maSanPham",
    },
    {
      title: "Loại sản phẩm",
      width: 130,
      dataIndex: "loaisanphamId",
      render: (data, record) => renderLoaiSanPham(record)
    },
    {
      title: "Màu sắc",
      dataIndex: "mauSac",
    },
    {
      title: "Số lượng tồn",
      dataIndex: "size",
      render: (data, record) => renderSoLuong(record)
    },
    {
      title: "Size",
      dataIndex: "size",
      render: (data, record) => renderSizeId(record)
    },

    {
      title: "Giá",
      dataIndex: "price",
      render: (data, record) => renderMoney(record)
    },
    {
      title: "Hình ảnh",
      dataIndex: "img",
      width: 300,
      render: (data, record) => renderImg(record),
    },
    ,
    {
      title: "Sản phẩm được",
      dataIndex: "sanphamduocId",
      render: (data, record) => renderSanPhamDuoc(record),
    },
    {
      title: "Giá / sale",
      dataIndex: "priceSale",
      render: (data, record) => renderMoney2(record)
    },
    {
      title: "Chức năng",
      dataIndex: "action",
      fixed: "right",
      render: (data, record) => actionRender(record),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
    },
  };

  function renderSizeId(record) {
    return (
      Array.isArray(record && record.size) && record.size.length > 0 && record.size.map(item => {
        return sizeList.filter(item2 => item2.id === item.sizeId)
          ?
          sizeList.filter(item2 => item2.id === item.sizeId).map(item2 => {
            return (
              <p>{item2.size}</p>
            )
          })
          :
          <p>Unisex</p>
      })
    )
  }

  function renderSoLuong(record) {
    return (
      Array.isArray(record && record.size) && record.size.length > 0 && record.size.map(item => {
        return (
          <p>{item.soluong}</p>
        )
      })
    )
  }

  function renderSanPhamDuoc(record) {
    return listSanPhamDuoc.filter((item) => item.id === record.sanphamduocId).length > 0 ?
      listSanPhamDuoc.filter((item) => item.id === record.sanphamduocId).map((item, index) => {
        return (
          <p>{item.kieu}</p>
        )
      }) : "chưa có "
  }

  function renderLoaiSanPham(record) {
    return loaiSanPhamList.filter((item) => item.id === record.loaisanphamId).length > 0 ?
      loaiSanPhamList.filter((item) => item.id === record.loaisanphamId).map((item, index) => {
        return (
          <p>{item.loai}</p>
        )
      }) : "chưa có loại"
  }



  function renderDetail(record) {
    return <NavLink to={`${url}/${record.id}`}>{record.tenSanPham}</NavLink>;
  }

  function renderMoney(record) {
    return <p>{renderTien(record.price)}</p>
  }

  function renderMoney2(record) {
    return <p>{record.priceSale ? renderTien(record.priceSale) : "0 vnđ"}</p>
  }

  function renderImg(record) {
    return (
      Array.isArray(record && record.img) && record.img.length > 0 && record.img.map((item, index) => {
        return (
          <Image src={item} style={{ marginLeft: "10px", width: "60px" }} />
        )
      })
    )


  }

  function onDeleteRequest(id) {
    onDelete(id);
  }

  function actionRender(record) {
    return (
      <>
        <div className="row">
          <div className="col-md-2">
            <a>
              <i
                className="fa fa-pencil-square-o"
                style={{ color: "green", fontSize: "20px" }}
                onClick={() => {
                  onEdit(record.id);
                }}
              ></i>
            </a>
          </div>

          <div className="col-md-2">
            <Popconfirm
              placement="topRight"
              title={Message.BAN_CO_MUON_XOA}
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => onDeleteRequest(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <a>
                <i
                  className="fa fa-trash-o"
                  style={{ color: "red", fontSize: "20px" }}
                ></i>
              </a>
            </Popconfirm>
          </div>
        </div>
      </>
    );
  }


  return (
    <div>
      <Divider />
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        scroll={{ x: 1500, y: 500 }}
      />
    </div>
  );
}

export default TableQuanLyKhoQuanAo;
