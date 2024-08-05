import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter, FaGooglePlay, FaApple } from "react-icons/fa";

export const basicInfo = {
	name: "TeamForFilm",
	url: "https://ui.shadcn.com",
	description: "This is a description of my website.",
	phoneNumber: "+977 981-7033862",
	domain: "example.com",
	address: (
		<div>
			Toronto,Ontario
			<br />
			Canada
			<br /> Kathmandu, Nepal
		</div>
	),
	title: "Welcome to My Website",
	contactEmail: "Info@teamforfilm.com",
};

export const socialLinks = [
	{ name: "Instagram", href: "https://www.instagram.com/", icon: <FaInstagram /> },
	{ name: "Facebook", href: "https://www.facebook.com/", icon: <FaFacebook /> },
	{ name: "Twitter", href: "https://www.twitter.com/", icon: <FaTwitter /> },
	{ name: "LinkedIn", href: "https://www.linkedin.com/", icon: <FaLinkedinIn /> },
];

export const logo = "http://";

export const resources = {
	multiPeopleImage: "/images/resource/multi-peoples.png",
};

export const headerNavMenus = [
	// { id: "aboutTeamforFilm", name: "About TeamforFilm", href: "/about-us" },
	{ id: "findJob", name: "Find Job", href: "/find-job" },
	{ id: "companies", name: "Companies", href: "/companies" },
	{ id: "teamMeambers", name: "Team Members", href: "/team-members" },
];

export const publicLinks = [
	{ id: "aboutTeamforFilm", name: "About TeamforFilm", href: "/about-us" },
	{ id: "findJob", name: "Find Job", href: "/find-job" },
	{ id: "companies", name: "Companies", href: "/companies" },
	{ id: "teamMeambers", name: "Team Members", href: "/team-members" },
];

export const downloadLinks = [
	{ id: "AppStore", name: "App Store", href: "#", icon: <FaApple /> },
	{ id: "GooglePlay", name: "Google Play", href: "#", icon: <FaGooglePlay /> },
];
