import * as Types from "../../constants/ActionType";
var data = JSON.parse(localStorage.getItem('CARD_SAME'));
var initialState = data ? data : [];

// var findIndex = (data, value) => {
//   var index = -1;
//   if (data.length > 0) {
//     for (var i = 0; i < data.length; i++) {
//       if (data[i].id === value.id) {
//         index = i;
//         break;
//       }
//     }
//   }
//   return index;
// };


const productSame = (state = initialState, action) => {
  var { value, data } = action;
  var index = -1;
  switch (action.type) {
    case Types.FETCH_CART:
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
    case Types.ADD_TO_PRODUCT_SAME:
      // index = findIndex(state, value);
      // if (index !== -1) {
      //   state[index] = state[index]
      // } else {
      // state !== undefined && state !== null &&
      //   state.find(item => item.id === value.id) ? state = state : 
      if (state !== null & state !== undefined) {
        state.push(action.value)
      }
      console.log(state);
      // }
      localStorage.setItem('CARD_SAME', JSON.stringify(state));
      return [...state];
    default:
      return [...state];
  }
}


export default productSame;