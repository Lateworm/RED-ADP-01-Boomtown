// Actions

const GET_ITEMS_LOADING = "GET_ITEMS_LOADING";
const GET_ITEMS = "GET_ITEMS";
const GET_ITEMS_ERROR = "GET_ITEMS_ERROR";

// Action creators

const getItemsLoading = () => ({ type: GET_ITEMS_LOADING });
const getItems = items => ({ type: GET_ITEMS, payload: items });
const getItemsError = error => ({ type: GET_ITEMS_ERROR, payload: error });

// Async action creator

const ITEMS_URL = "http://localhost:4000/items";
const USERS_URL = "http://localhost:4000/users"; // TODO: deprecate when possible

export const fetchItemsAndUser = () => dispatch => {
  dispatch(getItemsLoading()); // dispatch a Redux action of type GET_ITEMS_LOADING

  return Promise.all(
    [ITEMS_URL, USERS_URL].map(url =>
      fetch(url).then(response => response.json())
    )
  )
    .then(response => {
      const [itemsList, usersList] = response;

      const itemsWithOwners = itemsList.map(item => {
        // replace the itemowner hash with useful info about the owner
        item.itemowner = usersList.find(user => user.id === item.itemowner);
        if (item.borrower) {
          // replace the borrower hash with useful info about the borrower
          item.borrower = usersList.find(user => user.id === item.borrower);
        }
        return item;
      });

      dispatch(getItems(itemsWithOwners));
    })
    .catch(error => dispatch(getItemsError(error.message)));
};

// Reducer

export default (
  state = {
    isLoading: false,
    itemsData: [],
    // usersData: [],
    error: "",
    tags: [
      "Electronics", // 1
      "Houshold Items", // 2
      "Musical Instruments", // 3
      "Physical Media", // 4
      "Recreational Equipment", // 5
      "Sporting Goods", // 6
      "Tools" // 7
    ] // TODO: pull this data from Postgres and remove it from here.
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
        itemsData: action.payload,
        error: ""
      };
    }

    case GET_ITEMS_ERROR: {
      return { ...state, isLoading: false, error: action.payload };
    }

    default:
      return state;
  }
};
