import { call, put, all, takeLatest } from 'redux-saga/effects';

import api from '../../../services/api';

import { addToCartSuccess } from './actions';

function* addToCart({ id }) {
	const response = yield call(api.get, `/products/${id}`);

	// put() Chama uma action
	yield put(addToCartSuccess(response.data));
}
// all() são listenner das actions chamadas
// takeLatest() controla a quantidade de requisições feitas ao clicar em algo,
// nesse caso só vai levar em consideração a última vez.
export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
