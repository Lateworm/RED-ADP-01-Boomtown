// Action types

const GET_ITEMS_LOADING = "GET_ITEMS_LOADING"; // TODO: figure out what this does
const GET_ITEMS = "GET_ITEMS";
const GET_USERS = "GET_USERS";
const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";

// Action creators

const getItemsLoading = () => ({ type: GET_ITEMS_LOADING });
const getItems = items => ({ type: GET_ITEMS, payload: items });
const getUsers = users => ({ type: GET_USERS, payload: users });
const getItemsError = error => ({ type: GET_ITEMS_ERROR, payload: error });

// Async action creator

const ITEMS_URL = "http://localhost:4000/items";
const USERS_URL = "http://localhost:4000/users"; // TODO: deprecate when possible

export const fetchItemsAndUser = userid => dispatch => {
	// TODO: learn how this syntax works, and thus what this line does
	dispatch(getItemsLoading()); // dispatch a Redux action of type GET_ITEMS_LOADING... see reducers at bottom of file

	return Promise.all(
		[`${ITEMS_URL}/?itemowner=${userid}`, USERS_URL] // query to retreive only items from the current user
			.map(url => fetch(url).then(response => response.json()))
	)
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

			const allInfoAboutUser = usersList.find(user => user.id === userid);

			console.log(allItemsFromUser);
			dispatch(getItems(allItemsFromUser)); // send the list of items shared by this user to the store
			dispatch(getUsers(allInfoAboutUser));

			// TODO: map/filter to pass out just the one user we need
		})
		.catch(error => dispatch(getItemsError(error.message)));
};

// Reducer

export default (
	state = {
		isLoading: false,
		userInfo: [],
		userItems: [],
		error: ""
	},
	action
) => {
	switch (action.type) {
	case GET_ITEMS_LOADING: {
		return { ...state, isLoading: true, error: "" };
	}

	case GET_ITEMS: {
		return {
			...state,
			isLoading: false,
			error: "",
			userItems: action.payload
		}; // place data into state.userItems.userItems TODO: make the path less stupid
	}

	case GET_USERS: {
		return {
			...state,
			isLoading: false,
			error: "",
			userInfo: action.payload
		}; // place data into state.userItems.userInfo TODO: make the path less stupid
	}

	case GET_ITEMS_ERROR: {
		return { ...state, isLoading: false, error: action.payload };
	}

	default:
		return state;
	}
};
