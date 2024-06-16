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
	role: z.enum(["TeamMember", "Company"]),
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
	dob: z.date({
		required_error: "A date of birth is required.",
	}),
	bio: z.string().max(200).min(4),
	gender: z.enum(["male", "female"]),
});
