import React from 'react';
import { Rate, Form, Button, Input, DatePicker, Checkbox } from 'antd';
import moment from "moment";
import { useDispatch, useSelector } from 'react-redux';
import { thongBao } from "../../../constants/message/thongBao";
import * as Message from "../../../constants/Message";
import * as NoiDung from "../../../constants/noiDungThongBao";
import * as actAddComment from "../../../actions/commentUser/actComment";

const { TextArea } = Input;
function FormComment({ form, onDanhGia }) {
  const dataAccount = useSelector(state => state.quanlylogin.account_current);
  const dispatch = useDispatch();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 2 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };



  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  function onReport() {
    thongBao(Message.THONG_BAO, NoiDung.MOI_BAN_DANG_NHAP_DE_COMMENT);
  }

  return (
    <>
      <Form
        {...formItemLayout}
        form={form}
        name="basic"
        onFinish={onDanhGia}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="comment"
          rules={[{ required: true, message: "Vui lòng nhập phản hồi!" }]}

        >
          <TextArea placeholder="Phản hồi tại đây..." rows={3} />

        </Form.Item>
        <Form.Item
          name="rate"
          rules={[{ required: true, message: "Vui lòng chọn sao!" }]}
        >
          <Rate allowHalf />
        </Form.Item>
        {dataAccount.checkToken === true ?
          <>
            <Button
              htmlType="submit"
              style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
            >
              <strong>Đánh giá</strong>
            </Button>
          </>
          :
          <Button
            style={{ backgroundColor: '#ffac4b', height: '40px', border: 'none' }}
            onClick={() => onReport()}>
            <strong>Đánh giá</strong>
          </Button>
        }
      </Form>
    </>



  );
}

export default FormComment;