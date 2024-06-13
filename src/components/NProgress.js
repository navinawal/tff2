"use client";

import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import the default styles

NProgress.configure({ showSpinner: true });

const NProgressComponent = () => {
	Router.events.on("routeChangeStart", () => {
		NProgress.start();
	});

	Router.events.on("routeChangeComplete", () => {
		NProgress.done();
	});

	Router.events.on("routeChangeError", () => {
		NProgress.done();
	});

	return null;
};

export default NProgressComponent;
