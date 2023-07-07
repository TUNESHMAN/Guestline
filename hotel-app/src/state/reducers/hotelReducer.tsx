import * as hotelTypes from "../types/Hotels";

const initialState = {
  isFetching: false as boolean,
  error: null as any,
  hotels: [] as [],
  hotelDetails: {} as Object,
  rooms: {} as Object,
};

export default function supportReducer(state = initialState, action: any) {
  switch (action.type) {
    case hotelTypes.GET_HOTEL_START:
      return {
        ...state,
        isFetching: true,
      };
    case hotelTypes.GET_HOTEL:
      return {
        ...state,
        isFetching: true,
        hotels: action.payload,
      };
    case hotelTypes.GET_HOTEL_FAIL:
      return {
        ...state,
        isFetching: false,
      };
    case hotelTypes.SET_HOTEL_DETAILS:
      return {
        ...state,
        hotelDetails: action.payload,
      };
    case hotelTypes.GET_HOTEL_ROOMS_START:
      return {
        ...state,
        isFetching: true,
      };
    case hotelTypes.GET_HOTEL_ROOMS:
      return {
        ...state,
        rooms: action.payload,
      };
    case hotelTypes.GET_HOTEL_ROOMS_FAIL:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
