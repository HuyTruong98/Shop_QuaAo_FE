import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";

export function getAllThanhPhoRequest() {
  return (dispatch) => {
    return callApi("city", "GET", null).then((res) => {
      if (res) {
        dispatch(getAllThanhPho(res.data));
      }
    });
  };
}

export const getAllThanhPho = (data) => {
  return {
    type: Types.FETCH_THANH_PHO,
    data,
  };
};
