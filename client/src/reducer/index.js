const initialState = {
  countries: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_COUNTRIES':
      return {
        countries: action.payload,
      };

    default:
      return state;
  }
}

export default rootReducer;
