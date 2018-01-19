import { combineReducers } from 'redux';
import itemsReducer from './modules/items';
import usersReducer from './modules/profile';

export default combineReducers({
	items: itemsReducer,
	users: usersReducer,
});