import { combineReducers } from "redux";
import itemsReducer from "./modules/items";
import usersReducer from "./modules/profile";
import filtersReducer from "./modules/filtermenu";
import authReducer from "./modules/auth";

export default combineReducers({
	items: itemsReducer, // all items, as used on the homepage
	userItems: usersReducer, // items owned by a specific user, as used on the profile page
	filters: filtersReducer, // the currently filters, as selected in the top bar
	auth: authReducer // user authentication status
});
