import {
    ADD_TO_CART,
    CLEAR_CART,
    CartActionTypes,
    CartState,
    REDUCE_ITEM_QUANTITY,
    REMOVE_FROM_CART,
    SET_CART_ITEMS,
  } from '../actions/cartActions';
  
  const initialState: CartState = {
    items: [],
  };
  
  const cartReducer = (state = initialState, action: CartActionTypes): CartState => {
    switch (action.type) {
      case SET_CART_ITEMS:
        return {
          ...state,
          items: action.payload,
        };
      case ADD_TO_CART:
        const newItem = action.payload;
        const  existingItemIndex = state.items.findIndex(item => item.id === newItem.id);
        console.log('New item is: ',newItem)
        console.log('Existing item index is: ',existingItemIndex)
        if (existingItemIndex !== -1) {
          // Item already exists in the cart, increase its quantity by 1
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + 1,
          };
  
          return {
            ...state,
            items: updatedItems,
          };
        } else {
          // Item doesn't exist in the cart, add it with quantity 1
          return {
            ...state,
            items: [...state.items, { ...newItem }],
          };
        }
      case REMOVE_FROM_CART:
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload),
      };
      case REDUCE_ITEM_QUANTITY:
        return {
          ...state,
          items: state.items.map(item => {
            if (item.id === action.payload) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            }
            return item;
          }),
        };
        case CLEAR_CART: 
        return{
          ...state,
          items: []
      }
      default:
        return state;
    }
  };
  
  export default cartReducer;
  