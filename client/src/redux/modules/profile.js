// Actions

const GET_USERS_LOADING = 'GET_USERS_LOADING';
const GET_USERS = 'GET_USERS';
const GET_USERS_ERROR = 'GET_USERS_ERROR';

// Action creators

const getUsersLoading = () => ({ type: GET_USERS_LOADING });
const getUsers = (items) => ({ type: GET_USERS, payload: items });
const getUsersError = (error) => ({ type: GET_USERS_ERROR, payload: error });

// Async action creator

const USERS_URL = "http://localhost:4000/users";

export const fetchItemsAndUser = userid => dispatch => {
	dispatch(getUsersLoading());

	return Promise.all(
		[`http://localhost:4000/items/?itemowner=${userid}`, USERS_URL]
			.map(url => fetch(url)
				.then(response => response.json())))
		.then(response => {
			const [usersList] = response;

			const allItemsFromUser = usersList;

			// TODO: map/filter to pass out just the one user we need

			dispatch(getUsers(allItemsFromUser));

		}).catch(error => dispatch(getUsersError(error.message)));

};

// Reducer

export default (state = {
	isLoading: false,
	error: ''

}, action) => {

	switch (action.type) {

		case GET_USERS_LOADING: {
			return { ...state, isLoading: true, error: '' };
		}

		case GET_USERS: {
			return { ...state, isLoading: false, userItems: action.payload, error: '' } // creates state.users.userItems
		}

		case GET_USERS_ERROR: {
			return { ...state, isLoading: false, error: action.payload }
		}

		default:
			return state;
	}
};
