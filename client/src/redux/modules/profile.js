// Actions

const GET_USERS_LOADING = 'GET_USERS_LOADING';
const GET_USERS = 'GET_USERS';
const GET_USERS_ERROR = 'GET_USERS_ERROR';

// Action creators

const getUsersLoading = () => ({ type: GET_USERS_LOADING });
const getUsers = (items) => ({ type: GET_USERS, payload: items });
const getUsersError = (error) => ({ type: GET_USERS_ERROR, payload: error });

// Async action creator

const ITEMS_URL = "http://localhost:4000/items/?itemowner=${userid}";
const USERS_URL = "http://localhost:4000/users";

export const fetchItemsAndUser = userid => dispatch => {
	dispatch(getUsersLoading());

	return Promise.all(
		[`http://localhost:4000/items/?itemowner=${userid}`, USERS_URL]
			.map(url => fetch(url)
				.then(response => response.json())))
		.then(response => {
			const [itemsList, usersList] = response;

			// console.log(itemsList);
			console.log(usersList[0]);

			const itemsWithOwners = usersList[0];
			// map/filter


			dispatch(getUsers(itemsWithOwners));

		}).catch(error => dispatch(getUsersError(error.message)));

};

// Reducer

export default (state = {
	isLoading: false,
	itemsData: [],
	// usersData: [],
	error: ''
	// tags: [
	// 	'Electronics',
	// 	'Houshold Users',
	// 	'Musical Instruments',
	// 	'Physical Media',
	// 	'Recreational Equipment',
	// 	'Sporting Goods',
	// 	'Tools',
	// ],

}, action) => {

	switch (action.type) {

		case GET_USERS_LOADING: {
			return { ...state, isLoading: true, error: '' };
		}

		case GET_USERS: {
			return { ...state, isLoading: false, itemsData: action.payload, error: '' }
		}

		case GET_USERS_ERROR: {
			return { ...state, isLoading: false, error: action.payload }
		}

		default:
			return state;
	}
};
