"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { ethnicity, nationalities } from "@/config/teamMemberData";
import { TeamMemberBasicInfoFormSchema } from "@/schemas/Schemas";
import { saveTeamMemberDetails } from "@/app/actions/teamMembers";
import { useRouter } from "next/navigation";
import { MultiSelect } from "@/components/ui/multi-select";
import { filmDepartments } from "@/config/companyData";
import { additionalSkills, districts, languageSkills } from "@/config/data";

export function TeamMemberBasicInfoForm({ uid, defaultValues }) {
	const router = useRouter();
	const { toast } = useToast();

	const formHook = useForm({
		resolver: zodResolver(TeamMemberBasicInfoFormSchema),
		defaultValues,
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		const response = await saveTeamMemberDetails(uid, formData);
		if (!response.error) {
			toast({
				title: "Success !",
				description: "Profile saved successfully",
			});
			router.refresh();
		} else {
			toast({
				variant: "destructive",
				title: "Error !",
				description: "Something went wrong",
			});
		}
	}

	const ageGroups = [
		{ label: "Mid-60s", range: "65-69" },
		{ label: "Early 60s", range: "60-64" },
		{ label: "Late 50s", range: "55-59" },
		{ label: "Mid-50s", range: "50-54" },
		{ label: "Early 50s", range: "45-49" },
		{ label: "Mid-40s", range: "40-44" },
		{ label: "Mid-30s", range: "35-39" },
		{ label: "Early 30s", range: "30-34" },
		{ label: "Mid-20s", range: "25-29" },
		{ label: "Early 20s", range: "20-24" },
		{ label: "Teenager", range: "16-19" },
		{ label: "Pre-Teen", range: "13-15" },
		{ label: "Child", range: "5-12" },
		{ label: "Infant", range: "0-4" },
	];

	return (
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First Name</FormLabel>
								<FormControl>
									<Input placeholder="First Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Last Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={control}
					name="filmDepartments"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Film Departments</FormLabel>
							<FormControl>
								<MultiSelect options={filmDepartments} value={field.value} onValueChange={field.onChange} placeholder="Select Film Departments" />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="height"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Height</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Height" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="ethnicity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ethnicity</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Please Choose your Ethnicity" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{ethnicity?.map((item) => (
											<SelectItem key={item} value={item}>
												{item}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="ageGroup"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Age Category</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Please Choose your Age Category" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{ageGroups?.map((item) => (
											<SelectItem key={item.range} value={item.range}>
												{item.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="nationality"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Nationality</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Please Choose your Nationality" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{nationalities?.map((item) => (
											<SelectItem key={item} value={item}>
												{item}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="location"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Location</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Choose your Location" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{districts?.map((item) => (
											<SelectItem key={item.value} value={item.value}>
												{item.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="languageSkills"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Language Skills</FormLabel>
								<FormControl>
									<MultiSelect options={languageSkills} value={field.value} onValueChange={field.onChange} placeholder="Select Language Skills" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="additionalSkills"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Addtional Skills</FormLabel>
								<FormControl>
									<MultiSelect options={additionalSkills} value={field.value} onValueChange={field.onChange} placeholder="Select Addtional Skills" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={control}
					name="about"
					render={({ field }) => (
						<FormItem>
							<FormLabel>About Yourself</FormLabel>
							<FormControl>
								<Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" size="sm">
					{isSubmitting ? "Updating profile..." : "Update profile"}
				</Button>
			</form>
		</Form>
	);
}
