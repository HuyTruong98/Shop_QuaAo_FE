import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";

export function getAllKhoRequest() {
  return (dispatch) => {
    return callApi("sanpham", "GET", null).then((res) => {
      if (res) {
        dispatch(getAllKho(res.data));
      }
    });
  };
}

export const getAllKho = (data) => {
  return {
    type: Types.FETCH_KHO,
    data,
  };
};



export function actDeleteKhoRequest(id) {
  return (dispatch) => {
    return callApi(`sanpham/${id}`, "DELETE", null).then((res) => {
      if (res) {
        message.error(Message.XOA_THANH_CONG);
        dispatch(actDeleteKho(id));
      }
    });
  };
}

export const actDeleteKho = (id) => {
  return {
    type: Types.DELETE_KHO,
    id,
  };
};

export function actCreateKhoRequest(value) {
  return (dispatch) => {
    return callApi(`sanpham`, "POST", value).then((res) => {
      if (res) {
        message.success(Message.THEM_THANH_CONG);
        dispatch(actCreateKho(res.data));
      }
    });
  };
}

export const actCreateKho = (value) => {
  return {
    type: Types.CREATE_KHO,
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
    type: Types.EDIT_KHO,
    value,
  };
};

export function actUpdateKhoRequest(value) {
  return (dispatch) => {
    return callApi(`sanpham/${value.id}`, "PUT", value).then((res) => {
      if (res) {
        message.success(Message.SUA_THANH_CONG);
        dispatch(actUpdateKho(res.data));
      }
    });
  };
}

export const actUpdateKho = (value) => {
  return {
    type: Types.UPDATE_KHO,
    value,
  };
};
