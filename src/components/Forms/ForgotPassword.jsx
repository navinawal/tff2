"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ForgotPasswordSchema } from "@/schemas/Schemas";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordForm() {
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState(false);
	const { forgotPassword } = useAuth();
	const ForgotPasswordForm = useForm({
		resolver: zodResolver(ForgotPasswordSchema),
		defaultValues: {
			email: "",
		},
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = ForgotPasswordForm;

	async function onSubmit(formData) {
		const validatedFields = ForgotPasswordSchema.safeParse(formData);

		if (!validatedFields.success) {
			return { error: "invalid fields" };
		}

		const { email } = validatedFields.data;

		try {
			const response = await forgotPassword(email);
			console.log(response);
			setSuccessMessage(true);
		} catch (error) {
			setErrorMessage("Error: " + error.message);
		}
	}

	return (
		<>
			{successMessage ? (
				<div className="success-box">
					<h4 className="text-lg mb-2 font-medium text-black">Email Sent!</h4>
					<div>A Reset Password email has been sent to you. Please check your email to reset the Password.</div>
					<Link href="/login" className="text-[#2f2cd8]">
						Go to Login
					</Link>
				</div>
			) : (
				<Form {...ForgotPasswordForm}>
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
						<Button className="w-full bg-[#2f2cd8]" type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Submitting..." : "Submit"}
						</Button>
					</form>
				</Form>
			)}
			{errorMessage && (
				<div className="pt-5">
					<Alert variant="destructive">
						<AlertDescription className="text-center">{errorMessage}</AlertDescription>
					</Alert>
				</div>
			)}
		</>
	);
}
