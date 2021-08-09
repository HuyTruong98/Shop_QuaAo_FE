import React from 'react';
import { List, Avatar, Comment, Rate, Popconfirm, Tooltip, DatePicker } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as Message from "../../../constants/Message";

function ListComment({ listComment, onDelete }) {
  const account_current = useSelector(state => state.quanlylogin.account_current);

  function confirm(id) {
    onDelete(id)
  }

  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={listComment}
        renderItem={(item, index) => (
          <Comment
            actions={[
              <>

                {account_current?.checkToken && account_current.name === item.dataAccount.name ?
                  <Popconfirm
                    placement="topRight"
                    title={Message.BAN_CO_MUON_XOA_BINH_LUAN}
                    onConfirm={() => confirm(item.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <span >Xóa</span>
                  </Popconfirm>
                  : ""
                }
              </>
            ]}
            author={<p style={{ fontSize: '15px' }}>{item.dataAccount.name}</p>}
            avatar={
              <Avatar
                src={item.dataAccount.img}
              />
            }
            content={
              <>
                <p>{item.comment}</p>
                <Rate disabled value={item.rate} />
              </>
            }

            datetime={
              <span>{item.dateFormat}</span>
            }
          />

        )}
      />
    </>

  );
}

export default ListComment;