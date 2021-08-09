import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";

export function getAllQuanRequest() {
  return (dispatch) => {
    return callApi("district", "GET", null).then((res) => {
      if (res) {
        dispatch(getAllQuan(res.data));
      }
    });
  };
}

export const getAllQuan = (data) => {
  return {
    type: Types.FETCH_QUAN,
    data,
  };
};
