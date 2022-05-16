import styled from 'styled-components';

const CardWrapper  = styled.div`
  padding: 10px;
  margin-bottom: 5px;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: ${props => props.width};
`;

const Card = ({ onClick, children }) => {
	return (
		<CardWrapper onClick={onClick}>
			{children}
		</CardWrapper>
	)
}

export default Card;
