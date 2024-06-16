"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Providers = ({ children }) => {
	return (
		<>
			{children}
			<ProgressBar height="2px" color="#ffffff" options={{ showSpinner: true }} shallowRouting />
		</>
	);
};

export default Providers;
