import * as Types from "../../constants/ActionType";
var data = JSON.parse(localStorage.getItem('CART'));
var initialState = [];

var findIndex = (data, value) => {
  var index = -1;
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      if (data[i].id === value.id && data[i].sizeId === value.sizeId) {
        index = i;
        break;
      }
    }
  }
  return index;
};

const list = (state = initialState, action) => {
  var { value, data } = action;
  switch (action.type) {
    case Types.FETCH_MESSAGE_ORDER:
      var arrayNew = [];
      data.map((item, index) => {
        item = {
          ...item,
          key: item.id,
        }
        arrayNew.push(item);
      });
      state = arrayNew;
      return [...state];
    case Types.ADD_MESSAGE_ORDER:
      state.push(action.value);
      return [...state];
    default:
      return [...state];
  }
};

export default list;