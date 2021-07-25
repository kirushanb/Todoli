export const InitialState = {
  basket: [],
  started: false
};

// export const getBasketTotal = (basket) =>
// basket?.reduce((amount, item)=> item.price + amount, 0);

const Reducer = (state, action) => {
  switch (action.type) {
    
    case "SET_BASKET":
      return {
        ...state,
        basket: action.list,
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_FROM_BASKET":
      let newBasket = [...state.basket];

      const index = state.basket.findIndex(
        (basketItem) => basketItem.title === action.title
      );
      if (index >= 0) {
        newBasket.splice(index, 1);
      }
      return { ...state, basket: newBasket };
    case "EDIT_TODO":
      let exsisting = [...state.basket];
      const filtered = exsisting.filter((n) => n.title !== action.todo.title);
      filtered.push(action.todo);
      return { ...state, basket: filtered };
    case "SET_STARTED":
      return {
        ...state,
        started: action.bool,
      };
    default:
      return state;
  }
};

export default Reducer;
