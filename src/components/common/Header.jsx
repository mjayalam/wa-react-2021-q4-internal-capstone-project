import React from "react";
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import Card from "../../components/common/Card.js";
const HeaderWrapper = styled.div`
	width: 100%;
`;
const LogoWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-around;
	padding: 0px;
`;
const CartWrapper = styled.div`
	display: flex;
	flex-direction: end;
	align-items: center;
	justify-content: space-between;
`;
const Header = ({setAtHomePage}) => {
	return (
		<HeaderWrapper>
			<Card>
				<LogoWrapper onClick={() => setAtHomePage(true)}>
					<img
						src={`${process.env.PUBLIC_URL}/logo-oficial.png`} 
						alt="logo"
						width="100"
						height="100"
					/>
					<CartWrapper>
						<input type="text" disabled placeholder='Type here'/>
						<FaShoppingCart/>
					</CartWrapper>
				</LogoWrapper>
			</Card>
		</HeaderWrapper>
	)
}

export default Header;