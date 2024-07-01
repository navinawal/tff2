"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { ethnicity, nationalities } from "@/config/teamMemberData";
import { TeamMemberBasicInfoFormSchema } from "@/schemas/Schemas";
import { saveTeamMemberDetails } from "@/app/actions/team_members";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { additionalSkills, ageGroups, districts, filmDepartments, languageSkills } from "@/config/data";
import Image from "next/image";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

export function TeamMemberBasicInfoForm({ uid, defaultValues }) {
	const [preview, setPreview] = useState(defaultValues?.profileImage || "/profile_pictures/placeholder.jpg");
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
		try {
			let profileImageUrl = formData.profileImage;

			if (formData.profileImage instanceof File) {
				const storage = getStorage();
				const storageRef = ref(storage, `/team_members/profile_pictures/${uid}-${formData.profileImage.name}`);
				const snapshot = await uploadBytes(storageRef, formData.profileImage);
				profileImageUrl = await getDownloadURL(snapshot.ref);
			}

			const response = await saveTeamMemberDetails(uid, {
				...formData,
				profileImage: profileImageUrl,
			});

			if (response.success === true) {
				toast({
					title: "Success !",
					description: "Profile saved successfully",
				});
			} else {
				toast({
					variant: "destructive",
					title: "Error !",
					description: "Something went wrong",
				});
			}
		} catch (error) {
			toast({
				variant: "destructive",
				title: "Error!",
				description: error.message,
			});
		}
	}

	const handleImageChange = (event, onChange) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			};
			reader.readAsDataURL(file);
			onChange(file);
		}
	};

	return (
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
				<div className="grid grid-cols-4">
					<FormField
						control={control}
						name="profileImage"
						render={({ field: { onChange, value, ...rest } }) => (
							<>
								<FormItem>
									<FormLabel>
										<div className="relative overflow-hidden rounded-md w-[200px] h-[250px] bg-gray-200 flex items-center justify-center">
											<Image
												src={preview}
												alt="Profile Image"
												height="250"
												width="200"
												className="object-cover w-full h-full hover:scale-110 transition-transform duration-300"
											/>
										</div>
									</FormLabel>
									<FormControl>
										<Input type="file" accept="image/*" className="hidden" {...rest} onChange={(event) => handleImageChange(event, onChange)} />
									</FormControl>
									<FormMessage />
								</FormItem>
							</>
						)}
					/>
				</div>
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
										{ageGroups?.map(({ value, label }) => (
											<SelectItem key={value} value={value}>
												{label}
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
										{districts?.map(({ value, label }) => (
											<SelectItem key={value} value={value}>
												{label}
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
