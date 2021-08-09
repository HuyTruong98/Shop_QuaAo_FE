import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";


export function actGetMessageOrderRequest() {
  return (dispatch) => {
    return callApi(`oders`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetMessageOrder(res.data));
      }
    });
  };
}

export const actGetMessageOrder = (data) => {
  return {
    type: Types.FETCH_MESSAGE_ORDER,
    data,
  };
};

export function actMessageOrderGioHangRequest(value) {
  return (dispatch) => {
    return callApi(`messageOrders`, "POST", value).then((res) => {
      console.log(res);
      if (res) {
        dispatch(actMessageOrder(res.data));
      }
    });
  };
}

export const actMessageOrder = (value) => {
  return {
    type: Types.ADD_MESSAGE_ORDER,
    value,
  };
};


export function actGetKhoRequest(id) {
  return (dispatch) => {
    return callApi(`sanpham/${id}`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetKho(res.data));
      }
    });
  };
}

export const actGetKho = (value) => {
  return {
    type: Types.EDIT_MESSAGE_ORDER,
    value,
  };
};
