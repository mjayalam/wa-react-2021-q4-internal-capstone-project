import React, { useState, useEffect } from 'react';
import Flex from './Flex';
import styled from 'styled-components';
const PageNumberWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;
const NumberCircle = styled.div`
	width: 50px;
	text-align: center;
 	&:hover {
		background-color: #B8B8B8;
		border-radius: 50%;
		cursor: pointer;
 }
`;
const PageNumber = ({count}) => {
	return(
		<NumberCircle>
			<p>{count}</p>
		</NumberCircle>
	);
}
const Pagination = (props) => {
	const { count, page, onChange} = props;
	const [pages, setPages] = useState([1,2,3,4,5,6,7,8,9,10]);

	useEffect(() => {
		console.log('pages ', count)
	},[])
	return (
		<Flex direction={"row"} justifyContent={"flex-end"}>
			{pages.map((page,index) =>  (

					<PageNumber key={index} count={index + 1}/>
			))}
		
		</Flex>
	)
}

export default Pagination;
