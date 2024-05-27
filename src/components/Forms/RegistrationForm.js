"use client";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import CustomSeparator from "@/components/ui/custom-separator";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { registrationSchema } from "@/schemas/Schemas";

export default function RegistrationForm() {
	const registrationForm = useForm({
		resolver: zodResolver(registrationSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = registrationForm;

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
			<h4 className="text-lg mb-2 font-medium text-black">Registration</h4>
			<Form {...registrationForm}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Full Name</FormLabel>
								<FormControl>
									<Input type="text" placeholder="Your Full Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
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
						control={registrationForm.control}
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
						<FcGoogle className="mr-2 h-4 w-4" /> Register with Google
					</Button>
				</form>
				<Separator orientation="vertical" />
				<form className="flex-grow text-center">
					<Button className="w-full" variant="outline">
						<FaFacebook className="mr-2 h-4 w-4" /> Register with Facebook
					</Button>
				</form>
			</div>
			<p className="mt-5 mb-0">
				Already have an account?&nbsp;
				<Link href="/login" className="text-[#2f2cd8]">
					Login
				</Link>
			</p>
		</>
	);
}
