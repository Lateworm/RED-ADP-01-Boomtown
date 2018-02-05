// Action types

const GET_FILTERS = "GET_FILTERS";

// Action creators

export const getFilters = filters => ({ type: GET_FILTERS, payload: filters });

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
