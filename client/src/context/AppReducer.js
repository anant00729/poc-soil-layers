import {
  GET_SOIL_GRID_DATA,
  GET_LOCATION_DATA,
  SHOW_LOADER
} from "./types";

const appReducer = (state, action) => {
  switch (action.type) {
    case GET_SOIL_GRID_DATA:
      return {
        ...state,
        soil_grid_data: action.payload.mainData,
        totalAmount: action.payload.totalAmount,
        loading: false
      };
    case GET_LOCATION_DATA:
      return {
        ...state,
        elevation: action.payload.elevation,
        googleElevation: action.payload.googleElevation,
        location: action.payload.location,
      };  
    case SHOW_LOADER:
      return {
        ...state,
        loading: action.payload
      };    
    default:
      return state;
  }
};

export default appReducer;