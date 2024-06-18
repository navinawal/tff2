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
import { saveRole } from "@/app/actions/userProfile";
import { useToast } from "@/components/ui/use-toast";

export default function ChooseRoleForm({ uid }) {
	const router = useRouter();
	const { toast } = useToast();
	const formHook = useForm({
		resolver: zodResolver(ChooseRoleSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		const response = await saveRole(uid, formData);
		if (response.success === true) {
			router.push("/account/profile");
			router.refresh();
		} else {
			toast({
				variant: "destructive",
				title: "Error !",
				description: "Something went wrong",
			});
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
					<Button className="w-full" type="submit" disabled={isSubmitting}>
						{isSubmitting ? "Submitting..." : "Submit"}
					</Button>
				</form>
			</Form>
		</>
	);
}
