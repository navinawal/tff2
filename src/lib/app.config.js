import { FaFacebook, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export const basicInfo = {
	siteName: "TeamForFilm",
	description: "This is a description of my website.",
	phoneNumber: "123-456-7890",
	domain: "example.com",
	address: "123 Street, City, Country",
	title: "Welcome to My Website",
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

export const publicLinks = [
	{ id: "aboutTeamforFilm", name: "About TeamforFilm", href: "/about-us" },
	{ id: "findJob", name: "Find Job", href: "/find-job" },
	{ id: "companies", name: "Companies", href: "/companies" },
	{ id: "teamMeambers", name: "Team Members", href: "/team-members" },
];
