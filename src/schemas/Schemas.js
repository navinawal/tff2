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
	name: z.string({
		message: "Please provide your Name",
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
