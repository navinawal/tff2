"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobPostFormSchema } from "@/schemas/Schemas";

import { projectGenre } from "@/config/companyData";
import { addJobPost, editJobPost } from "@/app/actions/jobPosts";

import { ageGroups, filmDepartments, genders } from "@/config/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "sonner";

export function JobPostForm({ companyId, defaultValues = {}, jobId = null }) {
	const router = useRouter();
	const [jobType, setJobType] = useState("");
	const [auditionType, setAuditionType] = useState("");

	useEffect(() => {
		if (defaultValues.jobType) {
			setJobType(defaultValues.jobType);
		}
		if (defaultValues.auditionType) {
			setAuditionType(defaultValues.auditionType);
		}
	}, [defaultValues.jobType, defaultValues.auditionType]);

	const formHook = useForm({
		resolver: zodResolver(JobPostFormSchema),
		defaultValues,
	});

	const {
		handleSubmit,
		control,
		setValue,
		formState: { isSubmitting },
	} = formHook;

	const {
		fields: actorRequirements,
		append: appendActorRequirements,
		remove: removeActorRequirements,
	} = useFieldArray({
		control,
		name: "actorRequirements",
	});

	const {
		fields: teamMemberRequirements,
		append: appendTeamMemberRequirements,
		remove: removeTeamMemberRequirements,
	} = useFieldArray({
		control,
		name: "teamMemberRequirements",
	});

	const handleProfilePosterChange = (event, onChange) => {
		const file = event.target.files[0];
		if (file) {
			// const reader = new FileReader();
			// reader.onloadend = () => {
			// 	setPreview(reader.result);
			// };
			// reader.readAsDataURL(file);
			onChange(file);
		}
	};

	const handleProjectDocumentsChange = (event, onChange) => {
		const file = event.target.files[0];
		if (file) {
			// const reader = new FileReader();
			// reader.onloadend = () => {
			// 	setPreview(reader.result);
			// };
			// reader.readAsDataURL(file);
			onChange(file);
		}
	};

	async function onSubmit(formData) {
		try {
			let projectPosterUrl = formData.projectPoster;
			let projectDocumentUrl = formData.projectDocument;

			if (formData.projectPoster instanceof File) {
				const storage = getStorage();
				const storageRef = ref(storage, `/companies/job_posts/project_posters/${formData.projectPoster.name}`);
				const snapshot = await uploadBytes(storageRef, formData.projectPoster);
				projectPosterUrl = await getDownloadURL(snapshot.ref);
			}

			if (formData.projectDocument instanceof File) {
				const storage = getStorage();
				const storageRef = ref(storage, `/companies/job_posts/projectDocuments/${formData.projectDocument.name}`);
				const snapshot = await uploadBytes(storageRef, formData.projectDocument);
				projectDocumentUrl = await getDownloadURL(snapshot.ref);
			}

			let response;

			if (jobId) {
				response = await editJobPost(companyId, jobId, {
					...formData,
					projectPoster: projectPosterUrl,
					projectDocument: projectDocumentUrl,
				});
			} else {
				response = await addJobPost(companyId, {
					...formData,
					projectPoster: projectPosterUrl,
					projectDocument: projectDocumentUrl,
				});
			}

			if (response.success) {
				toast.success(response.message);
				router.push("/account/profile/company-job-posts");
			} else {
				console.error(response.message);
				toast.error("something went wrong!");
			}
		} catch (error) {
			console.error(error.message);
			toast.error("something went wrong!");
		}
	}

	return (
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
				<FormField
					control={control}
					name="jobType"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>Job Type</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={(value) => {
										setJobType(value);
										field.onChange(value);
									}}
									className="grid grid-cols-2 gap-4"
									defaultValue={field.value}
								>
									<div>
										<RadioGroupItem value="Casting Call" id="CastingCall" className="peer sr-only" />
										<FormLabel
											htmlFor="CastingCall"
											className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
										>
											Casting Call
										</FormLabel>
									</div>
									<div>
										<RadioGroupItem value="Call for TeamMembers" id="CallforTeamMembers" className="peer sr-only" />
										<FormLabel
											htmlFor="CallforTeamMembers"
											className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
										>
											Call for TeamMembers
										</FormLabel>
									</div>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
						name="projectType"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project Type</FormLabel>
								<FormControl>
									<Select onValueChange={field.onChange} defaultValue={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Please Choose Project Type" />
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
				<FormField
					control={control}
					name="auditionType"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>Audition Type</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={(value) => {
										setAuditionType(value);
										field.onChange(value);
										setValue("auditionLocation", "");
									}}
									defaultValue={field.value}
									className="grid grid-cols-2 gap-4"
								>
									<div>
										<RadioGroupItem value="Physical" id="Physical" className="peer sr-only" />
										<FormLabel
											htmlFor="Physical"
											className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
										>
											Physical
										</FormLabel>
									</div>
									<div>
										<RadioGroupItem value="Online" id="Online" className="peer sr-only" />
										<FormLabel
											htmlFor="Online"
											className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
										>
											Online
										</FormLabel>
									</div>
								</RadioGroup>
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
					{auditionType === "Physical" && (
						<FormField
							control={control}
							name="auditionLocation"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Audition/Shoot Location</FormLabel>
									<FormControl>
										<Input placeholder="Audition Location" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					)}
				</div>
				{auditionType === "Physical" && (
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
				)}
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
								<FormLabel>Contact Number</FormLabel>
								<FormControl>
									<Input type="text" placeholder="Contact Number" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="projectPoster"
						render={({ field: { onChange, value, ...rest } }) => (
							<FormItem>
								<FormLabel>Project Poster</FormLabel>
								<FormControl>
									<Input type="file" accept="image/*" onChange={(event) => handleProfilePosterChange(event, onChange)} {...rest} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="projectDocument"
						render={({ field: { onChange, value, ...rest } }) => (
							<FormItem>
								<FormLabel>Upload Document / Script-Snippets</FormLabel>
								<FormControl>
									<Input type="file" accept="application/pdf" onChange={(event) => handleProjectDocumentsChange(event, onChange)} {...rest} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Separator />
				{jobType === "Casting Call" && (
					<>
						{actorRequirements.map((field, index) => (
							<div className="space-y-4 border p-5 rounded-md" key={field.id}>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										control={control}
										name={`actorRequirements.${index}.characterName`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Character Name</FormLabel>
												<FormControl>
													<Input type="text" placeholder="Character Name" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={control}
										name={`actorRequirements.${index}.gender`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Gender</FormLabel>
												<FormControl>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select your gender" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{genders?.map(({ value, label }) => (
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
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										control={control}
										name={`actorRequirements.${index}.age`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Age</FormLabel>
												<FormControl>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select Age Group" />
															</SelectTrigger>
														</FormControl>
														<SelectContent>
															{ageGroups?.map(({ value, label }) => (
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
									<FormField
										control={control}
										name={`actorRequirements.${index}.requiredNumbers`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Required Numbers</FormLabel>
												<FormControl>
													<Input type="number" min="0" placeholder="Required Numbers" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										control={control}
										name={`actorRequirements.${index}.salaryRange`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Salary Range</FormLabel>
												<FormControl>
													<Input type="number" min="0" placeholder="Salary Range" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={control}
										name={`actorRequirements.${index}.eligibility`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Eligibility</FormLabel>
												<FormControl>
													<Input type="text" placeholder="Eligibility" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => removeActorRequirements(index)}>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						))}
						<Button
							type="button"
							variant="outline"
							size="sm"
							className="mt-2"
							onClick={() => appendActorRequirements({ characterName: "", gender: "", requiredNumbers: "", eligibility: "", salaryRange: "" })}
						>
							<PlusCircledIcon className="mr-2 h-4 w-4" />
							Add New
						</Button>
						<Separator />
					</>
				)}
				{jobType === "Call for TeamMembers" && (
					<>
						{teamMemberRequirements.map((field, index) => (
							<div className="space-y-4 border p-5 rounded-md" key={field.id}>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										control={control}
										name={`teamMemberRequirements.${index}.teamMember`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>TeamMember</FormLabel>
												<FormControl>
													<Select onValueChange={field.onChange} defaultValue={field.value}>
														<FormControl>
															<SelectTrigger>
																<SelectValue placeholder="Select TeamMember" />
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
									<FormField
										control={control}
										name={`teamMemberRequirements.${index}.eligibility`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Eligibility</FormLabel>
												<FormControl>
													<Input type="text" placeholder="Eligibility" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<FormField
										control={control}
										name={`teamMemberRequirements.${index}.requiredNumbers`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Required Numbers</FormLabel>
												<FormControl>
													<Input type="number" placeholder="Required Numbers" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={control}
										name={`teamMemberRequirements.${index}.salary`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Salary</FormLabel>
												<FormControl>
													<Input type="Salary" placeholder="Salary" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => removeTeamMemberRequirements(index)}>
									<Trash2 className="h-4 w-4" />
								</Button>
							</div>
						))}
						<Button
							type="button"
							variant="outline"
							size="sm"
							className="mt-2"
							onClick={() => appendTeamMemberRequirements({ teamMember: "", eligibility: "", requiredNumbers: "", salary: "" })}
						>
							<PlusCircledIcon className="mr-2 h-4 w-4" />
							Add New
						</Button>
						<Separator />
					</>
				)}
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
					<FormField
						control={control}
						name="projectDuration"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project Duration In Days</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Project Duration In Days" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
}
