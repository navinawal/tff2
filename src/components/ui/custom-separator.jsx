import React from "react";

const CustomSeparator = ({ text }) => {
	return (
		<div className="relative flex items-center justify-center my-5">
			<div className="absolute inset-0 flex items-center">
				<div className="w-full border-t border-gray-300" />
			</div>
			<span className="relative px-3 text-gray-500 bg-white">{text}</span>
		</div>
	);
};

export default CustomSeparator;
