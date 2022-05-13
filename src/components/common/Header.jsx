import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import Card from "../../components/common/Card.js";
import StyledFlex from "./StyledFlex.js";
const HeaderWrapper = styled.div`
	width: 100%;
`;

const SearchWrapper = styled.div`
	display: inline-block;
	padding-top: 10px;
`; 

const CartWrapper = styled.div`
	padding-top: 10px;
`;
const Header = () => {
	const [searchTerm, setSearchTerm] = useState('');
	let history = useHistory();
	const handleClick = () => {
		history.push(`/search?q=${searchTerm}`)
	}
	return (
		<HeaderWrapper>
			<Card>
				<StyledFlex direction={"row"} justifyContent={"space-around"}>
					<img
						src={`${process.env.PUBLIC_URL}/logo-oficial.png`} 
						alt="logo"
						width="100"
						height="100"
						onClick={() => history.push('/wa-react-2021-q4-internal-capstone-project')}
					/>
					<SearchWrapper>
						<input type="text" value={searchTerm}  placeholder='Type here' onChange={e => setSearchTerm(e.target.value)}/>
						<button disabled={searchTerm.length === 0} onClick={handleClick}><FaSearch/></button>
					</SearchWrapper>
					<CartWrapper>
						<FaShoppingCart/>
					</CartWrapper>
				</StyledFlex>
			</Card>
		</HeaderWrapper>
	)
}

export default Header;