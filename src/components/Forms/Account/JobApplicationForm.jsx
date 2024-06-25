"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { JobApplicationFromSchema } from "@/schemas/Schemas";

import { filmDepartments } from "@/config/data";
import { useRouter } from "next/navigation";
import { savJobApplication } from "@/app/actions/jobApplications";

export function JobApplicationFrom({ teamMemberId, companyId, jobPostId }) {
	const { toast } = useToast();
	const router = useRouter();

	const formHook = useForm({
		resolver: zodResolver(JobApplicationFromSchema),
		defaultValues: {
			phoneNumber: "",
			email: "",
			coverLetter: "",
			projectType: "",
			applyingAs: "",
			resume: "",
			audtionReel: "",
		},
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		const response = await savJobApplication(teamMemberId, companyId, jobPostId, formData);
		if (!response.error) {
			toast({
				title: "Success !",
				description: "Job saved successfully",
			});
			router.push("/account/profile/my-applications");
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
						name="phoneNumber"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Phone Number</FormLabel>
								<FormControl>
									<Input type="text" placeholder="Phone Number" {...field} />
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
									<Input type="email" placeholder="Email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={control}
					name="coverLetter"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cover Letter</FormLabel>
							<FormControl>
								<Textarea placeholder="Cover Letter" {...field} />
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
							<FormLabel>Project Type</FormLabel>
							<FormControl>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Please Project Type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{filmDepartments?.map(({ value, label }) => (
											<SelectItem key={value} value={value}>
												{label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="resume"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Resume</FormLabel>
								<FormControl>
									<Input type="file" placeholder="Resume" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="audtionReel"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Upload Your Audition Reel</FormLabel>
								<FormControl>
									<Input type="file" placeholder="Upload Your Audition Reel" {...field} />
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
