import * as Types from "../../constants/ActionType";
var initialState = [];

var findIndex = (data, id) => {
  var result = -1;
  data.forEach((data, index) => {
    if (data.id === id) {
      result = index;
    }
  });
  return result;
};

const list = (state = initialState, action) => {
  var index = -1;
  var { id, value, data } = action;
  switch (action.type) {
    case Types.FETCH_THONGBAO:
      return [...data];
    case Types.DELETE_THONGBAO:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    default:
      return [...state];
  }
};

export default list;
