import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";


export const getAllGioHang = (data) => {
  return {
    type: Types.FETCH_CART,
    data,
  };
};



export const actDeleteGioHang = (value) => {
  return {
    type: Types.DELETE_CART,
    value,
  };
};



export const actCreateGioHang = (value) => {
  return {
    type: Types.ADD_TO_CART,
    value,
  };
};

export const actUpdateGioHang = (value, soluong) => {
  return {
    type: Types.UPDATE_CART,
    value,
    soluong
  }
}



export const resetCart = (value) => {
  return {
    type: Types.REMOVE_ALL_CART,
    value,
  };
};

// Đưa sản phẩm lên db thuộc oders
export function actOrderGioHangRequest(value) {
  return (dispatch) => {
    return callApi(`oders`, "POST", value).then((res) => {
      if (res) {
        dispatch(actOrderGioHang(res.data));
      }
    });
  };
}

export const actOrderGioHang = (value) => {
  return {
    type: Types.ORDER_CART,
    value,
  };
};


// Render Hoá Đơn

export function actGetOrderRequest() {
  return (dispatch) => {
    return callApi(`oders`, "GET", null).then((res) => {
      if (res) {
        dispatch(actGetOrder(res.data));
      }
    });
  };
}

export const actGetOrder = (data) => {
  return {
    type: Types.FETCH_ORDER,
    data,
  };
};

