"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ChooseRoleSchema } from "@/schemas/Schemas";
import { Label } from "@/components/ui/label";
import { FcFilm, FcManager } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { saveRole } from "@/app/actions/users_profile";
import { toast } from "sonner";
import { FiLoader, FiSend } from "react-icons/fi";
import { useState } from "react";

export default function ChooseRoleForm({ uid }) {
	const [redirecting, setRedirecting] = useState(false); // State to track redirecting status
	const router = useRouter();
	const formHook = useForm({
		resolver: zodResolver(ChooseRoleSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		try {
			const response = await saveRole(uid, formData);
			if (response.success === true) {
				setRedirecting(true);
				router.push("/account/profile");
			} else {
				console.log(response.message);
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.log(error.message);
			toast.error("Something went wrong");
		}
	}

	return (
		<>
			<Form {...formHook}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={control}
						name="role"
						render={({ field }) => (
							<FormItem className="space-y-3">
								<FormLabel>Your Role</FormLabel>
								<FormControl>
									<RadioGroup className="grid grid-cols-2 gap-4" onValueChange={field.onChange} defaultValue={field.value}>
										<div>
											<RadioGroupItem value="TeamMember" id="TeamMember" className="peer sr-only" />
											<Label
												htmlFor="TeamMember"
												className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
											>
												<FcManager className="mb-3 h-6 w-6" />
												Team Member
											</Label>
										</div>
										<div>
											<RadioGroupItem value="Company" id="Company" className="peer sr-only" />
											<Label
												htmlFor="Company"
												className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
											>
												<FcFilm className="mb-3 h-6 w-6" />
												Company
											</Label>
										</div>
									</RadioGroup>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						className="w-full h-10 relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white transition duration-300 ease-out bg-blue-600 rounded-lg shadow-xl group hover:bg-gradient-to-br from-blue-500 to-purple-600"
						type="submit"
						disabled={isSubmitting || redirecting}
					>
						{redirecting ? (
							<div className="flex items-center">
								<FiSend className="animate-bounce mr-2" />
								Redirecting...
							</div>
						) : isSubmitting ? (
							<>
								<FiLoader className="mr-2 h-4 w-4 animate-spin" />
								Saving ...
							</>
						) : (
							"Save"
						)}
					</Button>
				</form>
			</Form>
		</>
	);
}
