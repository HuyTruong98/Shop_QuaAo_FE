import React, { useState } from "react";
import { Form, Divider, Avatar, Input } from "antd";
import { useSelector } from "react-redux";
import { thongBao } from "./../../constants/message/thongBao";
import * as message from "./../../constants/Message";
import * as noiDungThongBao from "./../../constants/noiDungThongBao";
import {
  RenderInput,
  RenderInputDatePicker,
  RenderInputRadio,
  RenderInputSelect,
} from "./../../common/renderForm/inputForm";

import {
  optionPhanQuyenAdmin,
  optionPhanQuyenNoAdmin,
  valueRadioGioiTinh,
} from "./../../common/data_options_select/optionSelect.js";

function FormQuanLyTaiKhoan({ onSave, form, initialValue, checkCMND }) {
  const item = useSelector((state) => state.quanlytaikhoan.item);
  const dataUser = useSelector(state => state.quanlytaikhoan.list);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 50 },
    },
  };
  const onFinishFailed = (errorInfo) => { };
  const listCMND = useSelector((state) => state.quanly_cmnd.list);

  const onChange = (e, value) => {
    let data = dataUser.filter((item) => item.user === e.target.value);
    if (data.length > 0) {
      thongBao(message.THONG_BAO, noiDungThongBao.TRUNG_EMAIL);
    }
  };
  const onChangeAvatar = (e, value) => {
    setUrl(e.target.value);
  };
  const [checkInputImg, setCheckInputImg] = useState(false);
  const [url, setUrl] = useState(false);
  const upload = () => {
    setCheckInputImg(!checkInputImg);
  };
  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        name="basic"
        onFinish={onSave}
        onFinishFailed={onFinishFailed}
        className="test-alight"
      >
        <div className="row m-0 p-0">
          <div className="col-md-2 m-0 p-0">
            <Avatar
              onClick={() => upload()}
              size={64}
              src={url ? url : item?.img}
            />
          </div>
          <div className="col-md-10  m-0 p-0">
            {checkInputImg && (
              <RenderInput name="img" width="100%" onChange={onChangeAvatar} />
            )}
          </div>
        </div>

        <Divider plain>T??i kho???n</Divider>

        <RenderInput label="id" name="id" hidden={true} />

        <RenderInput
          label="T??n ng?????i d??ng"
          showLabel={true}
          name="tenNguoiDung"
          validate={true}
          textValidate="Vui l??ng nh???p"
        />

        <Form.Item
          label="Email"
          name="user"
          validateFirst
          onChange={onChange}
          rules={[
            {
              required: true,
              message: "Vui l??ng nh???p email!"
            },
            {
              type: "email",
              message: "Email kh??ng ????ng ?????nh d???ng!"
            },
          ]}
        >
          <Input size="large" placeholder="@gmail.com" />
        </Form.Item>

        {/* <RenderInputDatePicker
          label="Ng??y sinh"
          name="ngaySinh"
          showLabel={true}
          hasFeedback
          validateStatus="success"
          style={{ width: "100%" }}
        /> */}
        <RenderInputRadio
          label="Gi???i t??nh"
          showLabel={true}
          name="gioiTinh"
          value={valueRadioGioiTinh}
        />


        <RenderInput
          name="soDienThoai"
          label="S??? ??i???n tho???i"
          showLabel={true}
          validate={true}
          addonBefore="+84"
          style={{ width: "100%" }}
        />

        {/* <RenderInput
          label="CMND"
          name="cmnd"
          showLabel={true}
          validate={true}
          onChange={onChange}
        /> */}
        {/* 
        <RenderInput
          showLabel={true}
          label="T??n ????ng nh???p"
          name="tenDangNhap"
          validate={true}
        /> */}

        <RenderInput
          label="M???t kh???u"
          name="matKhau"
          validate={true}
          showLabel={true}
          password={true}
        />

        <RenderInput
          label="X??c nh???n m???t kh???u"
          name="xacNhanMatKhau"
          validate={true}
          showLabel={true}
          password={true}
        />
      </Form>
    </>
  );
}

export default FormQuanLyTaiKhoan;
