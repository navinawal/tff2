"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema } from "@/schemas/Schemas";
import { saveUserProfile } from "@/app/actions/userProfile";
import { useToast } from "@/components/ui/use-toast";

export function CompanyDetailsForm({ uid, defaultValues }) {
	const { toast } = useToast();
	const formHook = useForm({
		resolver: zodResolver(profileFormSchema),
		defaultValues,
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		const response = await saveUserProfile(uid, formData);
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
						name="category"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<FormControl>
									<Input placeholder="Category" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="noOfEmployees"
						render={({ field }) => (
							<FormItem>
								<FormLabel>No of Employess</FormLabel>
								<FormControl>
									<Input placeholder="example@example.com" {...field} />
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
							<FormLabel>About</FormLabel>
							<FormControl>
								<Textarea placeholder="About" className="resize-none" {...field} />
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
