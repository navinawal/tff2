"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import CustomSeparator from "@/components/ui/custom-separator";
import { registrationSchema } from "@/schemas/Schemas";
import { Alert, AlertDescription } from "@/components/ui/alert";
import SocialLoginButtons from "@/components/Auth/SocialLoginButtons";
import { useAuth } from "@/hooks/useAuth";

export default function RegistrationForm() {
	const { registerWithEmail } = useAuth();
	const registrationForm = useForm({
		resolver: zodResolver(registrationSchema),
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
		},
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
		reset,
	} = registrationForm;

	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState(false);

	async function onSubmit(formData) {
		const { firstName, lastName, email, password } = formData;

		try {
			const response = await registerWithEmail(firstName, lastName, email, password);
			if (response.user) {
				setSuccessMessage(true);
				setErrorMessage("");
				reset();
			} else {
				setErrorMessage(response.error || "An error occurred while registering.");
				setSuccessMessage(false);
			}
		} catch (error) {
			setErrorMessage("An unexpected error occurred: " + error.message);
			setSuccessMessage(false);
		}
	}

	return (
		<>
			{successMessage ? (
				<div className="success-box">
					<h4 className="text-lg mb-2 font-medium text-black">Registration Successful!</h4>
					<div>A verification email has been sent to you. Please verify your email to log in.</div>
					<Link href="/login" className="text-[#2f2cd8]">
						Go to Login
					</Link>
				</div>
			) : (
				<>
					<Form {...registrationForm}>
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<FormField
									control={control}
									name="firstName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input type="text" placeholder="Your First Name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="lastName"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input type="text" placeholder="Your Last Name" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
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
							<div className="flex items-center space-x-2">
								<Checkbox id="terms" />
								<label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
									I agree to the
									<Link target="_blank" href="/privacy-policy" className="mx-1 underline">
										Privacy Policy
									</Link>
									and
									<Link target="_blank" href="/terms-and-conditions" className="mx-1 underline">
										Terms and Conditions.
									</Link>
								</label>
							</div>
							<Button className="w-full" type="submit" disabled={isSubmitting}>
								{isSubmitting ? "Submitting..." : "Submit"}
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
			)}
		</>
	);
}
