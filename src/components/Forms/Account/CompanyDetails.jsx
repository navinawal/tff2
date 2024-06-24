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

export function CompanyDetailsForm({ uid, defaultValues }) {
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
		const response = await saveCompanyDetails(uid, formData);
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
	}

	return (
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-4">
					<FormField
						control={control}
						name="profileImage"
						render={({ field: { onChange, value, ...rest } }) => (
							<>
								<FormItem>
									<FormLabel>
										<div className="overflow-hidden rounded-full h-[150px] w-[150px]">
											{/* <Image src={album.cover} alt={album.name} width={width} height={height} /> */}
											<img
												src="https://jobslab-reactjs.netlify.app/assets/img/job/meta.png"
												alt=""
												height="100"
												width="100"
												className={cn("h-auto w-auto transition-all hover:scale-10")}
											/>
										</div>
									</FormLabel>
									<FormControl>
										<Input
											type="file"
											accept="image/*"
											className="hidden"
											{...rest}
											onChange={(event) => {
												// const { files, displayUrl } = getImageData(event);
												// setPreview(displayUrl);
												// onChange(files);
											}}
										/>
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

				<Button type="submit" size="sm">
					{isSubmitting ? "Updating profile..." : "Update profile"}
				</Button>
			</form>
		</Form>
	);
}
