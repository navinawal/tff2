"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/Schemas";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CustomSeparator from "@/components/ui/custom-separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SocialLoginButtons from "@/components/Auth/SocialLoginButtons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
	const { loginWithEmail } = useAuth();
	const router = useRouter();
	const formHook = useForm({
		resolver: zodResolver(LoginSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	const [errorMessage, setErrorMessage] = useState("");

	async function onSubmit(formData) {
		const validatedFields = LoginSchema.safeParse(formData);

		if (!validatedFields.success) {
			return { error: "invalid fields" };
		}

		const { email, password } = validatedFields.data;

		try {
			const response = await loginWithEmail(email, password);
			if (response.token && response.user) {
				if (response.user.role && response.user.role !== "") {
					router.push("/account/profile");
				} else {
					router.push("/choose-role");
				}
			} else {
				setErrorMessage(response?.error || "An error occurred while registering.");
			}
		} catch (error) {
			setErrorMessage("Error: " + error.message);
		}
	}

	return (
		<>
			<Form {...formHook}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="example@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="*******" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="text-[#2f2cd8] font-medium">
						<Link href="/forgot-password">Forgot Password?</Link>
					</div>
					<Button className="w-full bg-[#2f2cd8]" type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Logging in ..." : "Submit"}
					</Button>
				</form>
			</Form>
			{errorMessage && (
				<div className="pt-5">
					<Alert variant="destructive">
						<AlertDescription className="text-center">{errorMessage}</AlertDescription>
					</Alert>
				</div>
			)}
			<CustomSeparator text="Or Sign In with" />
			<SocialLoginButtons onError={(error) => setErrorMessage(error)} />
		</>
	);
}
