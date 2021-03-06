import React, { useEffect } from "react";
import { Modal, Button } from "antd";
import FormQuanLyKho from "./formQuanLyKho";
import { useForm } from "antd/lib/form/Form";
import { useSelector } from "react-redux";
import moment from 'moment'
import * as act from '../../actions/quanlyKho_quan_ao/actQuanlyQuanAo';

function ModalQuanLyKho({ isVisible, handleCancel, onSave }) {
  const [form] = useForm();
  const initialValue = useSelector((state) => state.quanlyKhoAoQuan.item);

  if (initialValue !== null) {
    var dataInitialValue = {}
    if (initialValue.date) {
      dataInitialValue = {
        ...initialValue,
      }
    } else {
      dataInitialValue = initialValue
    }
  }

  useEffect(() => {
    form.resetFields();
    form.setFieldsValue(dataInitialValue);
  }, [isVisible, initialValue, form]);

  return (
    <>
      <Modal
        title="Thêm mới"
        visible={isVisible}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button onClick={handleCancel}>Hủy</Button>,
          <Button onClick={() => form.submit()}>OK</Button>,
        ]}
      >
        <FormQuanLyKho onSave={onSave} form={form} />
      </Modal>
    </>
  );
}

export default ModalQuanLyKho;
