import React, { Component } from 'react';
// vai conectar nosso componente com o estado do redux
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/module/cart/actions';

import { ProductList } from './styles';

class Home extends Component {
	state = {
		products: [],
	};

	async componentDidMount() {
		const response = await api.get('products');

		const data = response.data.map(product => ({
			...product,
			priceFormatted: formatPrice(product.price),
		}));

		this.setState({ products: data });
	}

	handleAddProduct = id => {
		// responsavel por disparar actions para o redux.
		const { addToCartRequest } = this.props;
		addToCartRequest(id);
	};

	render() {
		const { products } = this.state;
		const { amount } = this.props;

		return (
			<ProductList>
				{products.map(product => (
					<li key={product.id}>
						<img src={product.image} alt={product.title} />
						<strong>{product.title}</strong>
						<span>{product.priceFormatted}</span>

						<button
							type="button"
							onClick={() => this.handleAddProduct(product.id)}
						>
							<div>
								<MdAddShoppingCart size={16} color="#FFF" />
								{amount[product.id] || 0}
							</div>

							<span>ADICIONAR AO CARRINHO</span>
						</button>
					</li>
				))}
			</ProductList>
		);
	}
}

const mapStateToProps = state => ({
	amount: state.cart.reduce((amount, product) => {
		amount[product.id] = product.amount;
		return amount;
	}, {}),
});

// converte actions do redux em propriedades do componente.
const mapDispatchToProps = dispatch =>
	bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
