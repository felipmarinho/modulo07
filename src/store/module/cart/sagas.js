import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSuccess, updateAmount } from './actions';

function* addToCart({ id }) {
	const productExists = yield select(state =>
		state.cart.find(p => p.id === id)
	);

	const stock = yield call(api.get, `/stock/${id}`);
	const stockAmount = stock.data.amount;
	const currentAmount = productExists ? productExists.amount : 0;

	const amount = currentAmount + 1;

	if (amount > stockAmount) {
		toast.error('Quantidade solicitada fora de estoque.');
		return;
	}

	if (productExists) {
		yield put(updateAmount(id, amount));
	} else {
		const response = yield call(api.get, `/products/${id}`);

		const data = {
			...response.data,
			amount: 1,
			priceFormatted: formatPrice(response.data.price),
		};

		// put() Chama uma action
		yield put(addToCartSuccess(data));
	}
}
// all() são listenner das actions chamadas
// takeLatest() controla a quantidade de requisições feitas ao clicar em algo,
// nesse caso só vai levar em consideração a última vez.
export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
