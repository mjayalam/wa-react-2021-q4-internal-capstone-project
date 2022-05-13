import styled  from 'styled-components';
import { devices } from '../../utils/devices';

const StyledGrid = styled.div`
	display: grid;
	grid-template-rows: auto;
	@media ${devices.mobileS} {
		grid-template-columns: 100%;
	}
	@media ${devices.tablet} {
		grid-template-columns: 50% 50%;
	}
	@media ${devices.laptop} {
		grid-template-columns: 25% 25% 25% 25%;
	}

`;

export default StyledGrid;
