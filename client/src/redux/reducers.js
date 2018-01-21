import { combineReducers } from 'redux';
import itemsReducer from './modules/items';
import usersReducer from './modules/profile';

export default combineReducers({
	items: itemsReducer, // all items, as used on the homepage
	userItems: usersReducer, // items owned by a specific user, as used on the profile page
});