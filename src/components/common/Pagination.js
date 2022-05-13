import React from 'react';
import StyledFlex from './StyledFlex';

const Pagination = ({disabledPrev, disabledNext, nextRequest, previousRequest}) => {
	return (
		<>
			<StyledFlex direction={"row"} justifyContent={"flex-end"}>
				<button onClick={previousRequest} disabled={disabledPrev}>Previous</button>
				<button onClick={nextRequest} disabled={disabledNext}>Next</button>
			</StyledFlex>
		</>
	)
}

export default Pagination;
