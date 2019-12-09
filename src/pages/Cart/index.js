import React from 'react';
import {
	MdRemoveCircleOutline,
	MdAddCircleOutline,
	MdDelete,
} from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

export default function Cart() {
	return (
		<Container>
			<ProductTable>
				<thead>
					<tr>
						<th />
						<th>PRODUTO</th>
						<th>QTD</th>
						<th>SUBTOTAL</th>
						<th />
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<img
								src="https://http2.mlstatic.com/tnis-nike-free-rn-flyknit-2018-original-D_NQ_NP_609798-MLB30088101460_042019-F.jpg"
								alt="tenis"
							/>
						</td>
						<td>
							<strong>Tênis nike free rn flyknit 2018</strong>
							<span>R$179,00</span>
						</td>
						<td>
							<div>
								<button type="button">
									<MdRemoveCircleOutline size={20} color="#7159c1" />
								</button>
								<input type="number" readOnly value={1} />
								<button type="button">
									<MdAddCircleOutline size={20} color="#7159c1" />
								</button>
							</div>
						</td>
						<td>
							<strong>R$ 258,80</strong>
						</td>
						<td>
							<button type="button">
								<MdDelete size={20} color="#7159c1" />
							</button>
						</td>
					</tr>
				</tbody>
			</ProductTable>

			<footer>
				<button type="button">Finalizar pedido</button>

				<Total>
					<span>TOTAL</span>
					<strong>R$1920,28</strong>
				</Total>
			</footer>
		</Container>
	);
}
