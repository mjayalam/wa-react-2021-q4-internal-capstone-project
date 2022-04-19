import styled from 'styled-components';

const Flex = styled.div`
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

export default Flex;
