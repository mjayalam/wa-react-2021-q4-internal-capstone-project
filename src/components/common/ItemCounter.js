import StyledFlex from "./StyledFlex";


const ItemCounter  = ({value, add, disabled, onChange, showButton = true}) => {
    return (
        <StyledFlex direction={"row"} style={{height: "30px"}}>
            {showButton && <button disabled={disabled} onClick={add}>Add to cart</button>}
            <input type="number" value={value} min="0" onChange={onChange} style={{padding: "5px", textAlign: "center"}} />
        </StyledFlex>
    );
}

export default ItemCounter;
