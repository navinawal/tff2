"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { JobPostFormSchema } from "@/schemas/Schemas";
import { Textarea } from "@/components/ui/textarea";
import { projectGenre } from "@/config/companyData";
import { saveJobPost } from "@/app/actions/jobPosts";

export function JobPostForm({ uid, onSuccess }) {
	const { toast } = useToast();

	const formHook = useForm({
		resolver: zodResolver(JobPostFormSchema),
		defaultValues: {
			projectTitle: "",
			projectDetails: "",
			projectGenre: "",
			companyName: "",
			auditionLocation: "",
			auditionDate: "",
			auditionTime: "",
			contactPerson: "",
			contactNumber: "",
			projectPoster: "",
			projectDocuments: "",
			applicationDeadline: "",
		},
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		const response = await saveJobPost(uid, formData);
		if (!response.error) {
			toast({
				title: "Success !",
				description: "Job saved successfully",
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
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="projectTitle"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project Title</FormLabel>
								<FormControl>
									<Input placeholder="Project Title" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="projectGenre"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project Genre</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Please Choose Project Genre" />
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
				</div>
				<FormField
					control={control}
					name="projectDetails"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project Details</FormLabel>
							<FormControl>
								<Textarea placeholder="Project Details" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="companyName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Company Name</FormLabel>
								<FormControl>
									<Input placeholder="Company Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="auditionLocation"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Audition Location</FormLabel>
								<FormControl>
									<Input placeholder="Audition Location" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="auditionDate"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Audition Date</FormLabel>
								<FormControl>
									<Input type="date" placeholder="Audition Date" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="auditionTime"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Audition Time</FormLabel>
								<FormControl>
									<Input type="time" placeholder="Audition Time" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="contactPerson"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Contact Person</FormLabel>
								<FormControl>
									<Input placeholder="Contact Person" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="contactNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Contact Date</FormLabel>
								<FormControl>
									<Input type="date" placeholder="Contact Date" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				{/* to do files */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="applicationDeadline"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Application Deadline</FormLabel>
								<FormControl>
									<Input type="date" placeholder="Application Deadline" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" size="sm">
					{isSubmitting ? "Saving..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
}
