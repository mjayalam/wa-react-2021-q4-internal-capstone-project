import React,{ useState, useEffect } from 'react';
import styled from 'styled-components';


const ImageSlider = styled.img.attrs(props => ({src: props.src}))`
    width: 100%;
		min-height: 500px;
`;
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

 ${ImageSlider} {
	 width: 50%;
 }
`;

const Slider = ({
	onLeftClicked,
	onRightClicked,
	items = [],
}) => {
	const [counter, setCounter] = useState(0);
	return (
		<Wrapper>
			<RightArrow onClick={() => setCounter(((counter - 1) + items.length) % items.length)}/>
			{items.map((item,index) => (
			counter === index && <ImageSlider src={item.data.main_image.url} />
			))}
			<LeftArrow onClick={() => setCounter((counter + 1)% items.length)} />
		</Wrapper>
	)
}

export default Slider;
