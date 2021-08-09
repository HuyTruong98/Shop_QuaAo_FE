import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Button } from "antd";
import * as act from "../../actions/quanlyKho_quan_ao/actQuanlyQuanAo";
import * as actGetAllSize from "../../actions/quanly_size/actQuanLySize";
import * as actGetAllLoaiSanPham from "../../actions/loai_sanpham/loaiSanPham";
import * as actGetAllSanPhamDuoc from "../../actions/sanphamDuoc/sanPhamDuoc";
import TableQuanLyKhoQuanAo from "../../components/quanlykhoquanao/tableQuanLyKho";
import ModalQuanLyKho from "../../components/quanlykhoquanao/modalQuanLyKho";

function PageQuanLyKho({ match }) {
  const [openModal, setOpenModal] = useState(false);
  const dataListKho = useSelector(state => state.quanlyKhoAoQuan.list);

  const dispatch = useDispatch();

  const onEdit = (id) => {
    dispatch(act.actGetKhoRequest(id));
    setOpenModal(true);
  };

  function onSave(value) {
    console.log(value);
    if (value.id) {
      dispatch(act.actUpdateKhoRequest(value));
    } else {
      dispatch(act.actCreateKhoRequest(value));
    }
    cancel();
  }

  function onDelete(id) {
    dispatch(act.actDeleteKhoRequest(id));
  }

  function cancel() {
    setOpenModal(false);
  }

  function resetForm() {
    dispatch(act.actGetKho(null))
  }

  function openForm() {
    resetForm();
    setOpenModal(true);
  }

  useEffect(() => {
    dispatch(act.getAllKhoRequest())
    dispatch(actGetAllSize.getAllSizeRequest());
    dispatch(actGetAllLoaiSanPham.getAllLoaiSanPhamRequest());
    dispatch(actGetAllSanPhamDuoc.getAllSanPhamDuocRequest());
  }, [])
  return (
    <>
      <div className="container-fluid">
        {/* <!-- Page Heading --> */}
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h5 className=" mb-0 text-gray-800">Quản lý kho</h5>

          <Button
            type="primary"
            onClick={() => {
              openForm();
            }}
          >
            Thêm mới
          </Button>
        </div>

        <div className="row">
          {/* <!-- Area Chart --> */}
          <div className="col-xl-12 col-lg-12">
            <div className="card shadow mb-4">
              {/* <!-- Card Header - Dropdown --> */}
              <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                <h6 className="m-0 font-weight-bold ">Danh sách quần-áo</h6>
              </div>
              <ModalQuanLyKho
                isVisible={openModal}
                handleCancel={() => cancel()}
                onSave={onSave}
              />

              <TableQuanLyKhoQuanAo
                data={dataListKho}
                match={match}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PageQuanLyKho;