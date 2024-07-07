"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CompanyProfileFormSchema } from "@/schemas/Schemas";
import { useToast } from "@/components/ui/use-toast";
import { saveCompanyDetails } from "@/app/actions/companies";
import { MultiSelect } from "@/components/ui/multi-select";
import { companyTypes } from "@/config/data";
import { useState } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function CompanyDetailsForm({ uid, defaultValues }) {
	const [preview, setPreview] = useState(defaultValues.profileImage || "/profile_pictures/placeholder.jpg");
	const { toast } = useToast();
	const formHook = useForm({
		resolver: zodResolver(CompanyProfileFormSchema),
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
				const storageRef = ref(storage, `/companies/profile_pictures/${uid}-${formData.profileImage.name}`);
				const snapshot = await uploadBytes(storageRef, formData.profileImage);
				profileImageUrl = await getDownloadURL(snapshot.ref);
			}

			const response = await saveCompanyDetails(uid, {
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col md:flex-row gap-5">
					<div className="flex justify-center">
						<FormField
							control={control}
							name="profileImage"
							render={({ field: { onChange, value, ...rest } }) => (
								<>
									<FormItem>
										<FormLabel>
											<div className="overflow-hidden rounded-full h-[150px] w-[150px]">
												<Image
													src={preview}
													alt="Profile Image"
													height="150"
													width="150"
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
					<div className="flex flex-col flex-1 space-y-8">
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
								name="website"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company Website</FormLabel>
										<FormControl>
											<Input placeholder="example@example.com" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={control}
							name="category"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Category</FormLabel>
									<FormControl>
										<MultiSelect options={companyTypes} value={field.value} onValueChange={field.onChange} placeholder="Select Category" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company Email</FormLabel>
										<FormControl>
											<Input placeholder="Company Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="location"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Company Location</FormLabel>
										<FormControl>
											<Input placeholder="Company Location" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={control}
							name="aboutCompany"
							render={({ field }) => (
								<FormItem>
									<FormLabel>About Company</FormLabel>
									<FormControl>
										<Textarea placeholder="About Company" className="resize-none" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? "Updating profile..." : "Update profile"}
						</Button>
					</div>
				</div>
			</form>
		</Form>
	);
}
