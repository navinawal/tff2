"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeamMemberFilmographyFormSchema } from "@/schemas/Schemas";
import { addFilmography, editFilmography, getTeamMemberFilmography } from "@/app/actions/teamFilmography";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { projectGenre } from "@/config/companyData";
import { toast } from "sonner";
import { useEffect } from "react";
import { FiLoader } from "react-icons/fi";

export function TeamMemberFilmographyForm({ teamMemberId, filmographyId, onSuccess }) {
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
		reset,
		formState: { isSubmitting },
	} = formHook;

	useEffect(() => {
		async function fetchFilmography() {
			if (filmographyId) {
				const response = await getTeamMemberFilmography(teamMemberId, filmographyId);
				if (response) {
					reset(response); // Assuming response matches the form structure
				}
			} else {
				reset({
					projectName: "",
					projectType: "",
					role: "",
					productionYear: "",
					projectLink: "",
				});
			}
		}
		fetchFilmography();
	}, [filmographyId, teamMemberId, reset]);

	async function onSubmit(formData) {
		let response;
		if (filmographyId) {
			response = await editFilmography(teamMemberId, filmographyId, formData);
		} else {
			response = await addFilmography(teamMemberId, formData);
		}
		if (response.success) {
			toast.success(response.message);
			onSuccess();
		} else {
			console.log(response.message);
			toast.error("something went wrong");
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
								<Select onValueChange={field.onChange} value={field.value}>
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
					{isSubmitting ? (
						<>
							<FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" />
							Saving...
						</>
					) : filmographyId ? (
						"Update"
					) : (
						"Add New"
					)}
				</Button>
			</form>
		</Form>
	);
}
