import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";

export function getSearchSanPhamRequest() {
    return (dispatch) => {
      return callApi("sanpham?tenSanPham_like=", "GET", null).then((res) => {
        if (res) {
          dispatch(getSearchSanPham(res.data));
        }
      });
    };
  }
  
  
  
  export const getSearchSanPham = (data) => {
    return {
      type: Types.SEARCH_SANPHAM,
      data,
    };
  };