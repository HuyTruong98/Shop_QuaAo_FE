import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";

export function getAllSizeRequest() {
  return (dispatch) => {
    return callApi("size", "GET", null).then((res) => {
      if (res) {
        dispatch(getAllSize(res.data));
      }
    });
  };
}

export const getAllSize = (data) => {
  return {
    type: Types.FETCH_SIZE,
    data,
  };
};