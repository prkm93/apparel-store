import { productActionTypes, filterTypes } from "../utils/constant";

const { FETCH_CATEGORIES, FETCH_PRODUCTS, IS_LOADING, GET_PRODUCT_DETAILS } =
  productActionTypes;
const {
  SEARCH_PRODUCT,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  SORT,
  FILTER_BY_RATING,
  CLEAR_FILTER,
} = filterTypes;

export const initialProductState = {
  productList: [],
  categoryList: [],
  productDetail: {},
  isLoadingItems: false,
  searchProduct: "",
  priceRangeInput: 0,
  categoryInput: [],
  ratingInput: "",
  sortByPrice: "",
};

export const productReducer = (state = initialProductState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        productList: payload,
      };
    case FETCH_CATEGORIES:
      return {
        ...state,
        categoryList: payload,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoadingItems: payload,
      };
    case GET_PRODUCT_DETAILS:
      return {
        ...state,
        productDetail: payload,
      };
    case SEARCH_PRODUCT:
      return {
        ...state,
        searchProduct: payload,
      };
    case FILTER_BY_PRICE:
      return {
        ...state,
        priceRangeInput: payload,
      };
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        categoryInput: state.categoryInput.includes(payload.toLowerCase())
          ? state.categoryInput.filter(
              (item) => item.toLowerCase() !== payload.toLowerCase()
            )
          : [...state.categoryInput, payload.toLowerCase()],
      };
    case FILTER_BY_RATING:
      return {
        ...state,
        ratingInput: payload,
      };
    case SORT:
      return {
        ...state,
        sortByPrice: payload,
      };
    case CLEAR_FILTER:
      return {
        ...state,
        productList: payload.productList,
        categoryList: payload.categoryList,
        searchProduct: "",
        priceRangeInput: 0,
        categoryInput: [],
        ratingInput: "",
        sortByPrice: "",
      };
    default:
      return state;
  }
};
