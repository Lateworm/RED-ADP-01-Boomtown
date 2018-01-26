// Action types

const GET_FILTERS = "GET_FILTERS";

// Action creators

const getFilters = filters => ({ type: GET_FILTERS, payload: filters }); // export??

// Reducer

export default (
  state = {
    filter: []
  },
  action
) => {
  switch (action.type) {
    case GET_FILTERS: {
      return { ...state, filter: action.payload };
    }

    default:
      return state;
  }
};
