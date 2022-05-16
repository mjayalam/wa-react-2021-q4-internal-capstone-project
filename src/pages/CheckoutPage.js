import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Card from '../components/common/Card';
import StyledFlex from '../components/common/StyledFlex';
import ShoppingCartContext from '../utils/state/ShoppingCartContext';


const CheckoutPage = () => {
	let history = useHistory();
	const { state } = useContext(ShoppingCartContext);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [zipCode, setZipCode] = useState('');
	const [orderNotes, setOrderNotes] = useState('');
	if(state.items.length === 0) {
			return <StyledFlex alignItems={'center'} justifyContent={'center'}><h1>No products for buying</h1></StyledFlex>
	}
	return (
		<Card>
			<form>
				<StyledFlex direction={'row'} justifyContent={"space-between"}>
					<input type="text" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)}/>
					<input type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} />
					<input type="text" value={zipCode} placeholder="ZIP code" onChange={(e) => setZipCode(e.target.value)} />
					<textarea value={orderNotes} placeholder="Order notes" onChange={(e) => setOrderNotes(e.target.value)} />
				</StyledFlex>
			</form>
			{state.items.map((item, index) =>  (
				<Card key={`${item.data.name}-${index * 10}`}>
					<StyledFlex direction={'row'} justifyContent={'space-between'} alignItems={'center'} wrap={'wrap'}>
						<p style={{width: '200px'}}>Product name: {item.data.name}</p>
						<p>Items: {item.count}</p>
						<p>Subtotal: ${item.data.price * item.count}</p>
					</StyledFlex>
				</Card>
			))}
			<StyledFlex justifyContent={'flex-end'}>
				<button onClick={() => history.push('/cart')}>Go back to cart</button>
				<button>Place order</button>
				<p>Total cost: ${state.totalCost}</p>
			</StyledFlex>
		</Card>
	);
}

export default CheckoutPage;
