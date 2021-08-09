import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ModalQuanLyTaiKhoan from "../../components/quanlytaikhoan/modalQuanLyTaiKhoan";
import TableQuanLyTaiKhoan from "../../components/quanlytaikhoan/tableQuanLyTaiKhoan";
import { Button, Tooltip } from "antd";
import * as act from "../../actions/quanlytaikhoan/actQuanLyTaiKhoan";
import * as actQuanLyThongBao from "../../actions/quanlythongbao/actQuanLyThongBao";
import * as actQuanLyCMND from "../../actions/quanly_cmnd/actQuanLyCMND";
import moment from "moment";
import { thongBao } from "./../../constants/message/thongBao";

function PageQuanLyTaiKhoan({ match, location }) {
  const [openModal, setOpenModal] = useState(false);
  const [checkCMND, setCheckCMND] = useState();
  const [idXoa, setIdXoa] = useState([]);

  const { dataListUser, dataListMessage, dataListCMND, account_current } =
    useSelector(
      (state) => ({
        dataListUser: state.quanlytaikhoan.list,
        dataListMessage: state.quanlythongbao.list,
        dataListCMND: state.quanly_cmnd.list,
        account_current: state.quanlylogin.account_current,
      }),
      shallowEqual
    );

  const dispatch = useDispatch();

  function cancel() {
    setOpenModal(false);
  }
  var md5 = require("md5");

  function onSave(value) {
    if (checkCMND) {
      thongBao("Thông báo", "Vui lòng kiểm tra lại thông tin");
    } else {
      if (value.id) {
        value = {
          ...value,
          matKhau: md5(`${value.matKhau}`),
          xacNhanMatKhau: md5(`${value.xacNhanMatKhau}`),
          matKhauGoc: value.matKhau,
          ngayChinhSua: moment().format("DD/MM/yyyy HH:mm:ss "),
        };
        dispatch(act.actUpdateTaiKhoanRequest(value));
      } else {
        value = {
          ...value,
          matKhau: md5(`${value.matKhau}`),
          xacNhanMatKhau: md5(`${value.xacNhanMatKhau}`),
          matKhauGoc: value.matKhau,
          ngayTaoBanGhi: moment().format("DD/MM/yyyy HH:mm:ss "),
        };
        dispatch(act.actCreateTaiKhoanRequest(value));
      }
      cancel();
    }
  }
  const handdleXoaNhieu = () => {
    idXoa.map((itemId, indexId) => {
      dataListUser.map((item, index) => {
        if (item.id == itemId) {
          item = {
            ...item,
            ngayXoaBanGhi: moment().format("DD/MM/yyyy HH:mm:ss "),
            flag: false,
          };
          dispatch(act.actUpdateSetFlagRequest(item));
          let idCMND =
            dataListCMND &&
            Array.isArray(dataListCMND) &&
            dataListCMND.filter((itemCMND) => itemCMND.cmnd === item.cmnd)
              .length > 0 &&
            dataListCMND.filter((itemCMND) => itemCMND.cmnd === item.cmnd)[0]
              .id;
          dispatch(actQuanLyCMND.actDelCMNDRequest(idCMND));
        }
      });
      dispatch(act.actDeleteTaiKhoan(itemId));
    });
  };

  function onDelete(id) {
    dataListUser.map((item, index) => {
      if (item.id == id) {
        item = {
          ...item,
          ngayXoaBanGhi: moment().format("DD/MM/yyyy HH:mm:ss "),
          flag: false,
        };
        dispatch(act.actUpdateSetFlagRequest(item));
        let idCMND =
          dataListCMND &&
          Array.isArray(dataListCMND) &&
          dataListCMND.filter((itemCMND) => itemCMND.cmnd === item.cmnd)
            .length > 0 &&
          dataListCMND.filter((itemCMND) => itemCMND.cmnd === item.cmnd)[0].id;
        dispatch(actQuanLyCMND.actDelCMNDRequest(idCMND));
      }
    });
    dispatch(act.actDeleteTaiKhoan(id));
  }

  function onEdit(id) {
    dispatch(act.actGetTaiKhoanByIdRequest(id));
    setOpenModal(true);
  }

  function resetForm() {
    dispatch(act.actGetTaiKhoanById(null));
  }

  function openForm() {
    resetForm();
    setOpenModal(true);
  }

  useEffect(() => {
    dispatch(act.actFetchTaiKhoanRequest());
    dispatch(actQuanLyCMND.actFetchAllCMND());
  }, []);

  const onUnlock = (id) => {
    let idMessage = dataListMessage.filter((item) => item.idUser === id)[0]?.id;
    dispatch(act.actGetTaiKhoanByIdUnLockRequest(id));
    dispatch(actQuanLyThongBao.actDelQuanLyThongBaoRequest(idMessage));
  };
  const onLock = (id) => {
    dispatch(act.actGetTaiKhoanByIdLockRequest(id));
  };

  return (
    <div className="container-fluid">
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h5 className=" mb-0 text-gray-800">Quản lý user</h5>
        <div className="row">
          <Button
            size="small"
            className="m-2"
            onClick={() => {
              openForm();
            }}
            type="dashed"
          >
            <i class="fa fa-plus-square" aria-hidden="true"></i>
          </Button>

          <Tooltip placement="bottom" title="Xoá nhiều" color="red" key="red">
            <Button
              className="m-2 mr-5 "
              size="small"
              onClick={() => {
                handdleXoaNhieu();
              }}
              type="dashed"
              danger={true}
            >
              <i
                class="fa fa-trash-o"
                style={{ color: "red" }}
                aria-hidden="true"
              ></i>
            </Button>
          </Tooltip>
        </div>
      </div>

      <div className="row">
        {/* <!-- Area Chart --> */}
        <div className="col-xl-12 col-lg-12">
          <div className="card shadow mb-4">
            {/* <!-- Card Header - Dropdown --> */}
            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
              <h6 className="m-0 font-weight-bold ">Danh sách user</h6>
            </div>
            <ModalQuanLyTaiKhoan
              isVisible={openModal}
              handleCancel={() => cancel()}
              onSave={onSave}
              checkCMND={setCheckCMND}
            />
            <TableQuanLyTaiKhoan
              data={dataListUser}
              match={match}
              onDelete={onDelete}
              onEdit={onEdit}
              onUnlock={onUnlock}
              onLock={onLock}
              setIdXoa={setIdXoa}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageQuanLyTaiKhoan;
