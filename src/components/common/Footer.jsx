import React from 'react';
import styled from 'styled-components';
import Card from './Card';
const Wrapper = styled.div`
  display: flex;
	justify-content: center;
	align-items: center;
`;
const Footer = () => {
	return (
		<Card>
			<Wrapper>
				<p>Ecommerce created during Wizeline’s Academy React Bootcamp {new Date().getFullYear()}</p>
			</Wrapper>
		</Card>
	
	)
}

export default Footer;
