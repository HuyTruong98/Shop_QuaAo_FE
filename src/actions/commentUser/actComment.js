import * as Types from "../../constants/ActionType";
import callApi from "../../utils/apiCaller";
import { message } from "antd";
import * as Message from "../../constants/Message";

export function getAllCommentRequest() {
  return (dispatch) => {
    return callApi("comment", "GET", null).then((res) => {
      if (res) {
        dispatch(getAllComment(res.data));
      }
    });
  };
}

export const getAllComment = (data) => {
  return {
    type: Types.FETCH_COMMENT_USER,
    data,
  };
};

export function actDeleteCommentRequest(id) {
  return (dispatch) => {
    return callApi(`comment/${id}`, "DELETE", null).then((res) => {
      if (res) {
        message.error(Message.XOA_THANH_CONG);
        dispatch(actDeleteComment(id));
      }
    });
  };
}

export const actDeleteComment = (id) => {
  return {
    type: Types.DELETE_COMMENT_USER,
    id,
  };
};

export function actAddCommentRequest(value) {
  return (dispatch) => {
    return callApi(`comment`, "POST", value).then((res) => {
      if (res) {
        message.success(Message.THEM_THANH_CONG);
        dispatch(actAddComment(res.data));
      }
    });
  };
}

export const actAddComment = (value) => {
  return {
    type: Types.ADD_COMMENT_USER,
    value,
  };
};
