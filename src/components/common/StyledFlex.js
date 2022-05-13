import styled from 'styled-components';

const StyledFlex = styled.div`
	display: flex;
	${props => props.direction && ({
		flexDirection: props.direction,
	})}
	${props => props.wrap && ({
		flexWrap: props.wrap,
	})}
	${props => props.justifyContent && ({
		justifyContent: props.justifyContent,
	})}
	${props => props.alignItems && ({
		alignItems: props.alignItems,
	})}
`;

export default StyledFlex;
