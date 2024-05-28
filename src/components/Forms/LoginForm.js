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
import LoginAction from "@/actions/login";

export default function LoginForm() {
	const loginForm = useForm({
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
	} = loginForm;

	function onSubmit(formData) {
		LoginAction(formData);
	}

	return (
		<>
			<Form {...loginForm}>
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
						control={loginForm.control}
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
			<CustomSeparator text="Or Sign In with" />
			<SocialLoginButtons />
		</>
	);
}
