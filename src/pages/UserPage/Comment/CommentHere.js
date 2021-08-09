import React, { useEffect, useState } from 'react';
import FormComment from './FormComment';
import ListComment from './ListComment';
import { useForm } from "antd/lib/form/Form";
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import * as actGetAllComment from "../../../actions/commentUser/actComment";

function CommentHere({ itemDetail }) {
  const listComment = useSelector(state => state.commentUser.list);
  const dataAccount = useSelector(state => state.quanlylogin.account_current);
  const dateFormat = moment().format('DD-MM-YYYY HH:mm:ss');
  const dispatch = useDispatch();
  const [form] = useForm();
  const [checkSubmitForm, setCheckSubmitForm] = useState(false)

  function onDanhGia(value) {
    if(dataAccount && dateFormat) {
      value={
        ...value,
        dataAccount: dataAccount,
        dateFormat: dateFormat
      }
    }
    dispatch(actGetAllComment.actAddCommentRequest(value))
    setCheckSubmitForm(true);
  }

  function onDelete(id) {
    dispatch(actGetAllComment.actDeleteCommentRequest(id))
  }

  useEffect(() => {
    form.resetFields();
  },[form, dispatch, checkSubmitForm])

  useEffect(() => {
    dispatch(actGetAllComment.getAllCommentRequest());
  }, [])

  return (
    <>
      <div className="noicommentcuakhach">
        <div className="title-binhluan">
          <p> <strong>Đánh giá về&emsp;❤️‍🔥{itemDetail.tenSanPham}❤️‍🔥</strong> :</p>
        </div>
        <div className="danhgiakhachhang">
          <FormComment form={form} onDanhGia={onDanhGia}/> <br/>
          <ListComment listComment={listComment} onDelete={onDelete} />
        </div>
      </div>
    </>
  );
}

export default CommentHere;