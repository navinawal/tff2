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
		defaultValues: {
			email: "",
			password: "",
		},
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
			await loginWithEmail(email, password);
			router.push("/account/profile");
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
					<div className="text-muted-foreground font-medium">
						<Link href="/forgot-password">Forgot Password?</Link>
					</div>
					<Button className="w-full" type="submit" disabled={isSubmitting}>
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
