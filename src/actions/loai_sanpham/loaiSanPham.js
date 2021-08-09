import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";



export function getAllLoaiSanPhamRequest() {
  return (dispatch) => {
    return callApi("loaisanpham", "GET", null).then((res) => {
      if (res) {
        dispatch(getAllLoaiSanPham(res.data));
      }
    });
  };
}

export const getAllLoaiSanPham = (data) => {
  return {
    type: Types.FETCH_LOAISANPHAM,
    data,
  };
};


