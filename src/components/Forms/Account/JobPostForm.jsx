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
import { useToast } from "@/components/ui/use-toast";
import { JobPostFormSchema } from "@/schemas/Schemas";

import { projectGenre } from "@/config/companyData";
import { saveJobPost } from "@/app/actions/jobPosts";

import { ageGroups, filmDepartments, genders } from "@/config/data";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function JobPostForm({ uid }) {
	const { toast } = useToast();
	const router = useRouter();
	const [jobType, setJobType] = useState("");

	const formHook = useForm({
		resolver: zodResolver(JobPostFormSchema),
		defaultValues: {
			projectTitle: "",
			projectDetails: "",
			projectType: "",
			companyName: "",
			auditionLocation: "",
			auditionDate: "",
			auditionTime: "",
			contactPerson: "",
			contactNumber: "",
			projectPoster: "",
			projectDocuments: "",
			jobType: "",
			actorRequirements: [{ characterName: "", gender: "", requiredNumbers: "", eligibility: "", salaryRange: "" }],
			teamMemberRequirements: [{ teamMember: "", eligibility: "", requiredNumbers: "", salary: "" }],
			applicationDeadline: "",
		},
	});

	const {
		handleSubmit,
		control,
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

	async function onSubmit(formData) {
		const response = await saveJobPost(uid, formData);
		if (!response.error) {
			toast({
				title: "Success !",
				description: "Job saved successfully",
			});
			router.push("/account/profile/company-job-posts");
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
								<FormLabel>Audition/Shoot Location</FormLabel>
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
						render={({ field }) => (
							<FormItem>
								<FormLabel>Project Poster</FormLabel>
								<FormControl>
									<Input type="file" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="projectDocuments"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Upload Document / Script-Snippets</FormLabel>
								<FormControl>
									<Input type="file" {...field} multiple />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={control}
					name="jobType"
					render={({ field }) => (
						<FormItem className="space-y-3">
							<FormLabel>Please Choose A Job Type</FormLabel>
							<FormControl>
								<RadioGroup
									onValueChange={(value) => {
										setJobType(value);
										field.onChange;
									}}
									className="flex flex-col space-y-1"
								>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="Casting Call" />
										</FormControl>
										<FormLabel className="font-normal">Casting Call</FormLabel>
									</FormItem>
									<FormItem className="flex items-center space-x-3 space-y-0">
										<FormControl>
											<RadioGroupItem value="Call for TeamMembers" />
										</FormControl>
										<FormLabel className="font-normal">Call for TeamMembers</FormLabel>
									</FormItem>
								</RadioGroup>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
								</div>
								<FormField
									control={control}
									name={`actorRequirements.${index}.eligibility`}
									render={({ field }) => (
										<FormItem>
											<FormLabel>Eligibility</FormLabel>
											<FormControl>
												<Textarea placeholder="Eligibility" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
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
							Add Casting Call
						</Button>
						<Separator />
					</>
				)}
				{jobType === "Call for TeamMembers" && (
					<>
						{teamMemberRequirements.map((field, index) => (
							<>
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
							</>
						))}
						<Button
							type="button"
							variant="outline"
							size="sm"
							className="mt-2"
							onClick={() => appendTeamMemberRequirements({ teamMember: "", eligibility: "", requiredNumbers: "", salary: "" })}
						>
							<PlusCircledIcon className="mr-2 h-4 w-4" />
							Add Call for Team Members
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
				<Button type="submit" size="sm" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
}
