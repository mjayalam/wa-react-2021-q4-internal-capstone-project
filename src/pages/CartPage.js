import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '../components/common/Card';
import { FaTrash } from "react-icons/fa";
import StyledFlex from '../components/common/StyledFlex';
import ShoppingCartContext from '../utils/state/ShoppingCartContext';
import ItemCounter from '../components/common/ItemCounter';
import { StyledIconWrapper } from '../components/common/StyledIconWrapper';
const CartPage = () => {
    const { state, dispatch } = useContext(ShoppingCartContext);
    let history = useHistory();
    if(state.items.length === 0) {
        return <StyledFlex alignItems={'center'} justifyContent={'center'}><h1>Cart is empty</h1></StyledFlex>
    }
    const handleOnChange = (e, item) => {
        if(item.data.stock - parseInt(e.target.value) < 0) return;
        dispatch({
            type: "UPDATE_ITEM",
            payload: {
                ...item, 
                count: parseInt(e.target.value),
                remCount: parseInt(e.target.value) - item.count
            },
        })
    }
    return (
        <Card>
            {state.items.map((item, index) =>  (
                <Card key={`${item.data.name}-${index * 10}`}>
                    <StyledFlex direction={'row'} justifyContent={'space-between'} alignItems={'center'} wrap={'wrap'}>
                        <p style={{width: '200px'}}>Product name: {item.data.name}</p>
                        <img alt={item.data.name} src={item.data.mainimage.url} width={'120px'} height={'120px'} />
                        <p>Unit Price: ${item.data.price}</p>
                        <ItemCounter
                            value={item.count}
                            disabled={item.count > item.data.stock}
                            onChange={(e) => handleOnChange(e,item)}
                            showButton={false}
                        />
                        <StyledIconWrapper onClick={() => dispatch({
                            type: "REMOVE_ITEM",
                            payload: item,
                        })}>
                            <FaTrash />
                        </StyledIconWrapper>
                        <p>Subtotal: ${item.data.price * item.count}</p>

                    </StyledFlex>
                </Card>
            ))}
            <StyledFlex justifyContent={'space-between'}>
                <button onClick={() => history.push('/checkout')}> Go to checkout page</button>
                <p>Total cost: ${state.totalCost}</p>
            </StyledFlex>
        </Card>
    );
}

export default CartPage;
