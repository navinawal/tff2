"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/Schemas";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import CustomSeparator from "@/components/ui/custom-separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Login from "@/actions/login";

export default function LoginForm() {
	const loginForm = useForm({
		resolver: zodResolver(LoginSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = loginForm;

	function onSubmit(values) {
		Login(values);
	}

	return (
		<>
			<h4 className="text-lg mb-2 font-medium text-black">Log In</h4>
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
					<p className="text-[#2f2cd8] font-medium">
						<Link href="/forgot-password">Forgot Password?</Link>
					</p>
					<Button className="w-full bg-[#2f2cd8]" type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</Form>
			<CustomSeparator text="Or Sign In with" />
			<div className="flex h-5 items-center space-x-4 text-sm">
				<form className="flex-grow text-center">
					<Button className="w-full" variant="outline">
						<FcGoogle className="mr-2 h-4 w-4" /> Log In with Google
					</Button>
				</form>
				<Separator orientation="vertical" />
				<form className="flex-grow text-center">
					<Button className="w-full" variant="outline">
						<FaFacebook className="mr-2 h-4 w-4" /> Log In with Facebook
					</Button>
				</form>
			</div>
			<p className="mt-5 mb-0">
				don`t have an account?&nbsp;
				<Link href="/register" className="text-[#2f2cd8]">
					Register
				</Link>
			</p>
		</>
	);
}
