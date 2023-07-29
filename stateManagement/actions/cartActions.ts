// types.ts

// Item type
export interface Item {
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    discountedPrice: number;
    discount: number;
    // Add any other properties of the item here
}
  
  // CartItem type (includes the Item and quantity)
export interface CartItem extends Item {
    quantity: number;
}
  
  // State type
export interface CartState {
    items: CartItem[];
}
  // Action types
export const SET_CART_ITEMS = 'SET_CART_ITEMS';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const REDUCE_ITEM_QUANTITY = 'REDUCE_ITEM_QUANTITY'; 
export const CLEAR_CART='CLEAR_CART';
 
 // Action interfaces
  interface SetCartItemsAction {
    type: typeof SET_CART_ITEMS;
    payload: CartItem[];
  }
  
  interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: CartItem;
  }
  
  interface RemoveFromCartAction {
    type: typeof REMOVE_FROM_CART;
    payload: string; // itemId
  }
  
  interface ReduceItemQuantityAction {
    type: typeof REDUCE_ITEM_QUANTITY;
    payload: string;
  }

  interface ClearCartAction{
    type: typeof CLEAR_CART;
  }
  
  export type CartActionTypes =
    | SetCartItemsAction
    | AddToCartAction
    | RemoveFromCartAction
    | ReduceItemQuantityAction
    | ClearCartAction;