"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ForgotPasswordSchema } from "@/schemas/Schemas";

export default function ForgotPasswordForm() {
	const ForgotPasswordForm = useForm({
		resolver: zodResolver(ForgotPasswordSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = ForgotPasswordForm;

	async function onSubmit(values) {
		await new Promise((resolve) => {
			setTimeout(() => {
				resolve();
			}, 2000);
		});
		console.log(values);
	}

	return (
		<>
			<h4 className="text-lg mb-2 font-medium text-black">Forgot Password</h4>
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
			<p className="mt-3 mb-0">
				Back to Log In?<Link href="/login">Log In</Link>
			</p>
		</>
	);
}
