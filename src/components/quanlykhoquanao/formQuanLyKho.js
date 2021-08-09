import React from 'react';
import { Form, InputNumber, Button, Space, message } from "antd";
import { RenderInput, RenderInputSelect } from "../../common/renderForm/inputForm";
import { optionSanPhamDuoc, optionLoaiSanPham, optionSize } from "../../common/data_options_select/optionSelect"

import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function FormQuanLyKho({ onSave, form }) {


  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 4 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 20 },
    },
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="basic"
        onFinish={onSave}
        initialValues={{ remember: true }}
      >
        <RenderInput label="id" name="id" hidden={true} showLabel={true} />
        <RenderInput
          label="Tên sản phẩm"
          name="tenSanPham"
          validate={true}
          showLabel={true}
          rules
        />
        <RenderInput
          label="Mã sản phẩm"
          name="maSanPham"
          validate={true}
          showLabel={true}
        />
        <RenderInput
          label="Màu sắc"
          name="mauSac"
          validate={true}
          showLabel={true}
        />
        <RenderInputSelect
          label="Sản phẩm "
          name="sanphamduocId"
          showLabel={true}
          options={optionSanPhamDuoc}
        />
        <RenderInputSelect
          label="Loại sản phẩm "
          name="loaisanphamId"
          showLabel={true}
          options={optionLoaiSanPham}
        />

        <Form.List name="size">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                  <RenderInputSelect
                    label="Size"
                    showLabel={true}
                    options={optionSize}
                    name={[name, 'sizeId']}
                    fieldKey={[fieldKey, 'sizeId']}
                  />
                  <RenderInput
                    label="Số lượng tồn"
                    validate={true}
                    showLabel={true}
                    name={[name, 'soluong']}
                    fieldKey={[fieldKey, 'soluong']}
                  />
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Thêm Size
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item
          label="Giá"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
        >
          <InputNumber
            style={{ width: "660px" }}
            formatter={(value) =>
              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>

        <Form.Item
          label="Giá / sale"
          name="priceSale"
          rules={[{ required: true, message: "Vui lòng nhập số tiền!" }]}
        >
          <InputNumber
            style={{ width: "660px" }}
            formatter={(value) =>
              ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          />
        </Form.Item>
      </Form>
    </>
  );
}

export default FormQuanLyKho;