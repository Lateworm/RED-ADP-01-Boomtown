// Actions

const GET_ITEMS_LOADING = 'GET_ITEMS_LOADING';
const GET_ITEMS = 'GET_ITEMS';
const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

// Action creators

const getItemsLoading = () => ({ type: GET_ITEMS_LOADING });
const getItems = (items) => ({ type: GET_ITEMS, payload: items });
const getItemsError = (error) => ({ type: GET_ITEMS_ERROR, payload: error });

// Async action creator

const ITEMS_URL = "http://localhost:4000/items/?itemowner=${userid}";
const USERS_URL = "http://localhost:4000/users";

export const fetchItemsAndUser = userid => dispatch => {
	dispatch(getItemsLoading());

	return Promise.all(
		[`http://localhost:4000/items/?itemowner=${userid}`, USERS_URL]
			.map(url => fetch(url)
				.then(response => response.json())))
		.then(response => {
			const [itemsList, usersList] = response;

			// console.log(itemsList);
			// console.log(usersList);
			console.log('We\'re connected to redux/modules/profile.js');

			const itemsWithOwners = usersList;



			dispatch(getItems(itemsWithOwners));

		}).catch(error => dispatch(getItemsError(error.message)));

};

// Reducer

export default (state = {
	isLoading: false,
	itemsData: [],
	// usersData: [],
	error: ''
	// tags: [
	// 	'Electronics',
	// 	'Houshold Items',
	// 	'Musical Instruments',
	// 	'Physical Media',
	// 	'Recreational Equipment',
	// 	'Sporting Goods',
	// 	'Tools',
	// ],

}, action) => {

	switch (action.type) {

		case GET_ITEMS_LOADING: {
			return { ...state, isLoading: true, error: '' };
		}

		case GET_ITEMS: {
			return { ...state, isLoading: false, itemsData: action.payload, error: '' }
		}

		case GET_ITEMS_ERROR: {
			return { ...state, isLoading: false, error: action.payload }
		}

		default:
			return state;
	}
};
