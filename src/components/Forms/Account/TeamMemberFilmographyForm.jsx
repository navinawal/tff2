"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { TeamMemberFilmographyFormSchema } from "@/schemas/Schemas";
import { saveTeamMemberFilmographies } from "@/app/actions/teamFilmography";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projectGenre } from "@/config/companyData";

export function TeamMemberFilmographyForm({ uid, onSuccess }) {
	const { toast } = useToast();

	const formHook = useForm({
		resolver: zodResolver(TeamMemberFilmographyFormSchema),
		defaultValues: {
			projectName: "",
			projectType: "",
			role: "",
			productionYear: "",
			projectLink: "",
		},
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		const response = await saveTeamMemberFilmographies(uid, formData);
		if (!response.error) {
			toast({
				title: "Success !",
				description: "Profile saved successfully",
			});
			onSuccess();
		} else {
			toast({
				variant: "destructive",
				title: "Error !",
				description: "Something went wrong",
			});
		}
	}

	return (
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
				<FormField
					control={control}
					name="projectName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project Name</FormLabel>
							<FormControl>
								<Input placeholder="Project Name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="projectType"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project Type (Genre)</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Project Type (Genre)" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{projectGenre?.map((item) => (
											<SelectItem key={item} value={item}>
												{item}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="role"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Your Role</FormLabel>
							<FormControl>
								<Input placeholder="Your Role" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="productionYear"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Year Of Production</FormLabel>
							<FormControl>
								<Input placeholder="Year Of Production" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="projectLink"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Link To The Project</FormLabel>
							<FormControl>
								<Input placeholder="Link To The Project" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : "Add New"}
				</Button>
			</form>
		</Form>
	);
}
