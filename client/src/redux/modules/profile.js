// Actions

const GET_ITEMS_LOADING = 'GET_ITEMS_LOADING';
const GET_ITEMS = 'GET_ITEMS';
const GET_ITEMS_ERROR = 'GET_ITEMS_ERROR';

// Action creators

const getItemsLoading = () => ({ type: GET_ITEMS_LOADING });
const getItems = (items) => ({ type: GET_ITEMS, payload: items });
const getItemsError = (error) => ({ type: GET_ITEMS_ERROR, payload: error });

// Async action creator

const ITEMS_URL = "http://localhost:4000/items";
const USERS_URL = "http://localhost:4000/users";

export const fetchItemsAndUser = userid => dispatch => {
	dispatch(getItemsLoading());

	return Promise.all(
		[`${ITEMS_URL}/?itemowner=${userid}`, USERS_URL] // query to retreive only items from the current user
			.map(url => fetch(url)
				.then(response => response.json())))
		.then(response => {
			const [itemsList, usersList] = response;

			const allItemsFromUser = itemsList.map(item => {
				// replace the itemowner hash with useful info about the owner
				item.itemowner = usersList.find(user => user.id === item.itemowner);
				if (item.borrower) {
					// replace the borrower hash with useful info about the borrower
					item.borrower = usersList.find(user => user.id === item.borrower);
				}
				return item;
			});



			// TODO: map/filter to pass out just the one user we need

			dispatch(getItems(allItemsFromUser));

		}).catch(error => dispatch(getItemsError(error.message)));

};

// Reducer

export default (state = {
	isLoading: false,
	userItems: [],
	error: ''

}, action) => {

	switch (action.type) {

		case GET_ITEMS_LOADING: {
			return { ...state, isLoading: true, error: '' };
		}

		case GET_ITEMS: {
			return { ...state, isLoading: false, userItems: action.payload, error: '' } // creates state.users.userItems
		}

		case GET_ITEMS_ERROR: {
			return { ...state, isLoading: false, error: action.payload }
		}

		default:
			return state;
	}
};
