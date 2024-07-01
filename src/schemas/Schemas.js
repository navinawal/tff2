import * as z from "zod";

export const LoginSchema = z.object({
	email: z
		.string({
			message: "Please provide your email",
		})
		.email({
			message: "Please provide a valid email",
		}),
	password: z.string({
		message: "Please provide your password",
	}),
});

export const registrationSchema = z.object({
	firstName: z.string({
		message: "Please provide Last Name",
	}),
	lastName: z.string({
		message: "Please provide your First Name",
	}),
	email: z
		.string({
			message: "Please provide your email",
		})
		.email({
			message: "Please provide a valid email",
		}),
	password: z
		.string({
			message: "Please provide your password",
		})
		.min(6, "Password must be at least 6 characters"),
});

export const ForgotPasswordSchema = z.object({
	email: z
		.string({
			message: "Please enter your email",
		})
		.email({
			message: "Please enter a valid email",
		}),
});

export const ChooseRoleSchema = z.object({
	role: z.enum(["TeamMember", "Company"], {
		required_error: "You need to select your Role",
	}),
});

export const profileFormSchema = z.object({
	profileImage: z.any(),
	firstName: z.string().min(2, {
		message: "firstName must be at least 2 characters.",
	}),
	lastName: z.string().min(2, {
		message: "lastName must be at least 2 characters.",
	}),
	email: z
		.string({
			required_error: "Please enter your email.",
		})
		.email({ message: "Email must be valid" }),
	alternateEmail: z.string().email({ message: "Email must be valid" }).optional(),
	phone: z.string().optional(),
	alternatePhone: z.string().optional(),
	dob: z
		.preprocess(
			(arg) => {
				// Convert input value to a Date object
				if (typeof arg === "string" || arg instanceof Date) {
					return new Date(arg);
				}
			},
			z.date({
				required_error: "A date of birth is required.",
			})
		)
		.optional(),
	bio: z.string().max(200).min(4),
	gender: z.enum(["Male", "Female"], {
		required_error: "You need to select your gender",
	}),
});

export const carrierSummarySchema = z.object({
	featureFilms: z.string(),
	shortFilms: z.string(),
	musicVideos: z.string(),
	documentaries: z.string(),
	commercials: z.string(),
	theatreDrama: z.string(),
	webSeries: z.string(),
});

export const TeamMemberBasicInfoFormSchema = z.object({
	profileImage: z.any(),
	firstName: z.any(),
	lastName: z.any(),
	filmDepartments: z.any(),
	height: z.any(),
	ethnicity: z.any(),
	ageGroup: z.any(),
	nationality: z.any(),
	location: z.any(),
	languageSkills: z.any(),
	additionalSkills: z.any(),
	about: z.any(),
});

export const TeamMemberTrainingFormSchema = z.object({
	courseTaken: z.any(),
	instituition: z.any(),
	mentor: z.any(),
	courseLength: z.any(),
});

export const TeamMemberFilmographyFormSchema = z.object({
	projectName: z.any(),
	projectType: z.any(),
	role: z.any(),
	productionYear: z.any(),
	projectLink: z.any(),
});

export const CompanyProfileFormSchema = z.object({
	profileImage: z.any(),
	companyName: z.any(),
	category: z.any(),
	noOfEmployees: z.any(),
	website: z.any(),
	email: z.any(),
	location: z.any(),
	aboutCompany: z.any(),
});

export const JobPostFormSchema = z.object({
	projectTitle: z.any(),
	projectType: z.any(),
	projectDetails: z.any(),
	companyName: z.any(),
	auditionLocation: z.any(),
	auditionDate: z.any(),
	auditionTime: z.any(),
	contactPerson: z.any(),
	contactNumber: z.any(),
	projectPoster: z.any(),
	projectDocuments: z.any(),
	jobType: z.any(),
	actorRequirements: z.array(
		z.object({
			characterName: z.any(),
			gender: z.any(),
			age: z.any(),
			requiredNumbers: z.any(),
			eligibility: z.any(),
			salaryRange: z.any(),
		})
	),
	teamMemberRequirements: z.array(
		z.object({
			teamMember: z.any(),
			eligibility: z.any(),
			requiredNumbers: z.any(),
			salary: z.any(),
		})
	),
	applicationDeadline: z.any(),
	projectDuration: z.any(),
});

export const JobApplicationFromSchema = z.object({
	phoneNumber: z.any(),
	email: z.any(),
	coverLetter: z.any(),
	projectGenre: z.any(),
	applyingAs: z.any(),
	resume: z.any(),
	audtionReel: z.any(),
});
