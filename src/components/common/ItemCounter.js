import StyledFlex from "./StyledFlex";


const ItemCounter  = ({value, add, onChange}) => {
    return (
        <StyledFlex direction={"row"} style={{height: "30px"}}>
            <button onClick={add}>Add to cart</button>
            <input type="number" value={value} min="0" onChange={onChange} style={{padding: "5px", textAlign: "center"}} />
        </StyledFlex>
    );
}

export default ItemCounter;
