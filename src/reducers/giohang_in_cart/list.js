import { ListGroup } from "react-bootstrap";
import * as Types from "../../constants/ActionType";
var data = JSON.parse(localStorage.getItem('CART'));
var initialState = data ? data : [];

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


const cart = (state = initialState, action) => {
  var index = -1;
  var { value, soluong } = action;
  switch (action.type) {
    case Types.ADD_TO_CART:
      index = findIndex(state, value);
      if (index !== -1) {
        state[index].soluong = state[index].soluong + value.soluong;
      } else {
        state.push(action.value);
      }
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state];
    case Types.DELETE_CART:
      index = findIndex(state, value);
      if (index !== -1) {
        state.splice(index, 1);
      }
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state];
    case Types.UPDATE_CART:
      index = findIndex(state, value, soluong);
      if (index !== -1) {
        state[index].soluong = soluong;
      }
      localStorage.setItem('CART', JSON.stringify(state));
      return [...state];
    case Types.REMOVE_ALL_CART:
      localStorage.removeItem('CART');
      localStorage.setItem('CART', JSON.stringify(state));
      return [...value];
    default:
      return [...state];
  }
};

export default cart;