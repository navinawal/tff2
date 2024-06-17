export const commonNavMenus = [
	{ id: "profile", title: "Profile", url: "/account/profile" },
	{ id: "account", title: "Account", url: "/account/profile/change-password" },
];

export const userNavMenus = {
	TeamMember: [
		{ id: "skills", title: "Team Basic Info", url: "/account/profile/skills" },
		{ id: "trainings", title: "Trainings", url: "/account/profile/trainings" },
		//{ id: "carrierSummary", title: "Carrier Summary", url: "/account/profile/carrier-summary" },
		{ id: "filmography", title: "Filmography", url: "/account/profile/filmography" },
	],
	Company: [
		{ id: "companyDetails", title: "Company Details", url: "/account/profile/company-details" },
		{ id: "companyJobPosts", title: "Job Posts", url: "/account/profile/company-job-posts" },
		{ id: "saveTeamMembers", title: "Save Team Members", url: "/account/profile/saved-team-members" },
	],
};
