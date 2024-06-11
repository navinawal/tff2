"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ChooseRoleSchema } from "@/schemas/Schemas";

export default function ChooseRoleForm() {
	const formHook = useForm({
		resolver: zodResolver(ChooseRoleSchema),
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

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
			<Form {...formHook}>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<FormField
						control={control}
						name="type"
						render={({ field }) => (
							<FormItem className="space-y-3">
								<FormLabel>Please choose a Role</FormLabel>
								<FormControl>
									<RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-1">
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="TeamMember" />
											</FormControl>
											<FormLabel className="font-normal">Team Member</FormLabel>
										</FormItem>
										<FormItem className="flex items-center space-x-3 space-y-0">
											<FormControl>
												<RadioGroupItem value="Company" />
											</FormControl>
											<FormLabel className="font-normal">Company</FormLabel>
										</FormItem>
									</RadioGroup>
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
		</>
	);
}
