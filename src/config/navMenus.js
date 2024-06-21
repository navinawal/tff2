export const commonNavMenus = [
	{ id: "profile", title: "Profile", url: "/account/profile" },
	{ id: "account", title: "Account Settings", url: "/account/profile/change-password" },
];

export const userNavMenus = {
	TeamMember: [
		{ id: "teamProfile", title: "Team Basic Info", url: "/account/profile/team-profile" },
		{ id: "trainings", title: "Trainings", url: "/account/profile/trainings" },
		{ id: "carrierSummary", title: "Carrier Summary", url: "/account/profile/carrier-summary" },
		{ id: "filmography", title: "Filmography", url: "/account/profile/filmography" },
		{ id: "savedJobs", title: "Saved Jobs", url: "/account/profile/saved-jobs" },
	],
	Company: [
		{ id: "companyDetails", title: "Company Details", url: "/account/profile/company-details" },
		{ id: "companyJobPosts", title: "Job Posts", url: "/account/profile/company-job-posts" },
		{ id: "saveTeamMembers", title: "Saved Team Members", url: "/account/profile/saved-team-members" },
		{ id: "jobRecievedApplications", title: "Recieved Job Applications", url: "/account/profile/recieved-job-applications" },
	],
};
