import React, {useEffect} from 'react';
import styled from 'styled-components';
import {results as productCategories} from '../../utils/product-categories.json';
const Wrapper = styled.div`
	max-width: 500px;
`;

const ListWrapper = styled.ul`
	margin: 0px;
	padding: 0px;
	list-style-type: none;
	width: 90%;
`;
const ListItem = styled.li`
	list-style-type: none;
	margin: 0px;
	padding: 10px;
	width: 90%;
	cursor: pointer;
	&:hover {
		background-color: #B8B8B8;
	}
	${props => props.active && 'background-color: #1111;'}
`;

const Sidebar = (props) => {
	const { filters, setFilters } = props;
	useEffect(() => {
		console.log('sidebar filters', filters);
	},[filters]);
	const handleFilter = (category) => {
		console.log('handleFilter', category)
		if(!filters.has(category.id)) {
			setFilters(prev => new Set([...prev, category.id]))
		} else {
			setFilters((prev => new Set([...prev].filter(x => x !== category.id))))
		}
	}
	return (
		<Wrapper>
			<h1>Categories</h1>
			<ListWrapper>
				{productCategories.map((category) => 
				<ListItem  active={filters.has(category.id)} onClick={() => handleFilter(category)} key={category.id}>{category.data.name}</ListItem> )}
			</ListWrapper>
		</Wrapper>
	)
};

export default Sidebar;
