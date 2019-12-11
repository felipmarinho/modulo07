// responsável por permitir utilizar mais de um reducer na aplicação.
import { combineReducers } from 'redux';

import cart from './cart/reducer';

export default combineReducers({
	cart,
});
