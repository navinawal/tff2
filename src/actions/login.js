"use server";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas/Schemas";
import { AuthError } from "next-auth";

export default async function LoginAction(formData) {
	const validatedFields = LoginSchema.safeParse(formData);

	if (!validatedFields.success) {
		return { error: "invalid fields" };
	}

	const { email, password } = validatedFields.data;

	try {
		await signIn("credentials", {
			email,
			password,
			redirectTo: DEFAULT_LOGIN_REDIRECT,
		});
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case "CredentialsSignin":
					return { error: "Invalid email or password!" }; // Update error message here
				default:
					return { error: "Something went wrong!" };
			}
		}

		throw error;
	}
}
