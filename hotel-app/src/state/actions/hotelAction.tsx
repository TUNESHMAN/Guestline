import axios from "axios";
import * as hotelTypes from "../types/Hotels";

export const getHotels = () => (dispatch: any) => {
  dispatch({ type: hotelTypes.GET_HOTEL_START });
  axios
    .get("https://obmng.dbm.guestline.net/api/hotels?collection-id=OBMNG")
    .then((response) => {
      dispatch({ type: hotelTypes.GET_HOTEL, payload: response.data });
    })
    .catch((error) => {
      dispatch({
        type: hotelTypes.GET_HOTEL_FAIL,
        payload: error.response,
      });
    });
};

export const setHotelDetails = (payload: Object) => {
  return {
    type: hotelTypes.SET_HOTEL_DETAILS,
    payload,
  };
};

export const getRooms = (id: string) => (dispatch: any) => {
  dispatch({ type: hotelTypes.GET_HOTEL_ROOMS_START });
  axios
    .get(`https://obmng.dbm.guestline.net/api/roomRates/OBMNG/${id} `)
    .then((response) => {
      console.log(response.data, "HOTEL DETAILS");
      dispatch({ type: hotelTypes.GET_HOTEL_ROOMS, payload: response.data });
    })
    .catch((error) => {
      dispatch({
        type: hotelTypes.GET_HOTEL_ROOMS_FAIL,
        payload: error.response,
      });
    });
};
