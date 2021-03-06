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
    case Types.FETCH_COMMENT_USER:
      var arrayNew = [];
      data.map((item, index) => {
        item = {
          ...item,
          key: item.id,
        };
        arrayNew.push(item);
      });
      state = arrayNew;
      return [...state];
    case Types.ADD_COMMENT_USER:
      state.push(action.value);
      return [...state];
    case Types.DELETE_COMMENT_USER:
      index = findIndex(state, id);
      state.splice(index, 1);
      return [...state];
    default:
      return [...state];
  }
};

export default list;