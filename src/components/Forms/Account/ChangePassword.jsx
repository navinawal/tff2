"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const changePasswordSchema = z.object({
	oldPassword: z.string(),
	newPassword: z.string(),
	confirmNewPassword: z.string(),
});

export function ChangePasswordForm() {
	const formHook = useForm({
		resolver: zodResolver(changePasswordSchema),
		mode: "onChange",
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	function onSubmit(data) {
		console.log(data);
	}

	return (
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-8">
				<FormField
					control={control}
					name="oldPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Old Password </FormLabel>
							<FormControl>
								<Input placeholder="Old Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="newPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>New Password</FormLabel>
							<FormControl>
								<Input placeholder="New Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="confirmNewPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm New Password</FormLabel>
							<FormControl>
								<Input placeholder="Confirm New Password" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isSubmitting}>
					Update Password
				</Button>
			</form>
		</Form>
	);
}
