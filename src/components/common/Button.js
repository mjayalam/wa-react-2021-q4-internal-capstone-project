import React from 'react';


const Button = ({text, onClick, disabled = false}) => {
  return (
		<>
			<button disabled={disabled} onClick={onClick}>{text}</button>
		</>
	);
};

export default Button;