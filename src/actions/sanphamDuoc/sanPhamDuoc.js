import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";

export function getAllSanPhamDuocRequest() {
  return (dispatch) => {
    return callApi("sanphamduoc", "GET", null).then((res) => {
      if (res) {
        dispatch(getAllSanPhamDuoc(res.data));
      }
    });
  };
}

export const getAllSanPhamDuoc = (data) => {
  return {
    type: Types.FETCH_SANPHAMDUOC,
    data,
  };
};
