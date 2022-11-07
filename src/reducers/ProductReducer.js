import { LOAD_NEW_PRODUCTS, LOAD_ONE_PRODUCT, LOAD_PRODUCTS, LOAD_PRODUCT_FRUIT, LOAD_PRODUCT_SEAFOOD } from "./Type";

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    case LOAD_NEW_PRODUCTS:
      return {
        ...state,
        newProducts: action.payload,
        isLoading: false,
      };

    case LOAD_ONE_PRODUCT:
      return {
        ...state,
        product: action.payload,
        isLoading: false,
      };

    case LOAD_PRODUCT_FRUIT:
      return {
        ...state,
        productFruits: action.payload,
        isLoading: false,
      };

    case LOAD_PRODUCT_SEAFOOD:
      return {
        ...state,
        productSeaFoods: action.payload,
        isLoading: false,
      };

    // case ADD_TO_CART:
    //   const updateCart = [...payload.products];
    //   const updateCartIndex = updateCart.findIndex(
    //     (item) => item.id === payload.productId
    //   );
    //   if (updateCartIndex < 1) {
    //     updateCart.push({ ...payload.products, quanlity: 1 });
    //   } else {
    //     const updateItem = {
    //       ...updateCart[updateCartIndex],
    //     };
    //     updateItem.quanlity++;
    //     updateCart[updateCartIndex] = updateItem;
    //   }

    default:
      return state;
  }
};
