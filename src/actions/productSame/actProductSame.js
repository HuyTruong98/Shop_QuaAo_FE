import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";

export const getAllGioHang = (data) => {
  return {
    type: Types.FETCH_PRODUCT_SAME,
    data,
  };
};

export const actCreateGioHang = (value) => {
  return {
    type: Types.ADD_TO_PRODUCT_SAME,
    value,
  };
};