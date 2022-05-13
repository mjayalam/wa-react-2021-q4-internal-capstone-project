import React,{ useState } from 'react';
import { devices } from '../../utils/devices';
import ImageContainer from './Image';
import styled from 'styled-components';

const Arrow = styled.i`
	border: solid black;
	border-width: 0 3px 3px 0;
	display: inline-block;
	padding: 3px;
	cursor: pointer;
`;

const LeftArrow = styled(Arrow)`
	transform: rotate(-45deg);
	-webkit-transform: rotate(-45deg);
`;

const RightArrow = styled(Arrow)`
	transform: rotate(135deg);
	-webkit-transform: rotate(135deg);
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 360px;

 	${ImageContainer} {
		 @media ${devices.mobileS} {
			width: 100%;
		 }
		 @media ${devices.table} {
			width: 90%;
		 }
		 @media ${devices.laptop} {
			width: 60%;
		 }
		 @media ${devices.laptopL} {
			width: 60%;
		 }
		 @media ${devices.desktop} {
			width: 50%;
		 }
 	}
`;

const Slider = ({images, isLoading}) => {
	const [counter, setCounter] = useState(0);

	if(isLoading) {
		return (
		<Wrapper>
			<p>Loading...</p>
		</Wrapper>
		)
	}
	if(images.results && images.results.length === 0) {
		return <p>Empty list</p>
	}
	return (
		<Wrapper>
			<RightArrow onClick={() => setCounter(((counter - 1) + images.results.length) % images.results.length)}/>
			{images.results && images.results.map((item,index) => (
			counter === index && <ImageContainer key={index} maxWidth={'700px'} src={item.data.main_image.url} />
			))}
			<LeftArrow onClick={() => setCounter((counter + 1)% images.results.length)} />
		</Wrapper>
	)
}

export default Slider;
