import { FILTER_CATEGORY_PRODUCT, LOAD_CATEGORIES, LOAD_CATEGORY } from "./Type";

export const CategoryReducer = (state, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case LOAD_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
      case FILTER_CATEGORY_PRODUCT:
        return {
          ...state,
          productFilter: action.payload,
        }
    default:
      return state;
  }
};
