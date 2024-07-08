"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { JobApplicationFromSchema } from "@/schemas/Schemas";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { filmDepartments } from "@/config/data";
import { useRouter } from "next/navigation";
import { savJobApplication } from "@/app/actions/jobApplications";
import { toast } from "sonner";

export function JobApplicationFrom({ teamMemberId, companyId, jobPostId }) {
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

	const handleResumeChange = (event, onChange) => {
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

	const handleReelChange = (event, onChange) => {
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
			let resumeUrl = formData.resume;
			let audtionReelUrl = formData.audtionReel;

			if (formData.resume instanceof File) {
				const storage = getStorage();
				const storageRef = ref(storage, `/job_applications/resume/${formData.resume.name}`);
				const snapshot = await uploadBytes(storageRef, formData.resume);
				resumeUrl = await getDownloadURL(snapshot.ref);
			}

			if (formData.audtionReel instanceof File) {
				const storage = getStorage();
				const storageRef = ref(storage, `/job_applications/audtionReel/${formData.audtionReel.name}`);
				const snapshot = await uploadBytes(storageRef, formData.audtionReel);
				audtionReelUrl = await getDownloadURL(snapshot.ref);
			}

			const response = await savJobApplication(teamMemberId, companyId, jobPostId, {
				...formData,
				resume: resumeUrl,
				audtionReel: audtionReelUrl,
			});

			if (response.success) {
				toast.success(response.message);
				router.push("/account/profile/my-applications");
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
						render={({ field: { onChange, value, ...rest } }) => (
							<FormItem>
								<FormLabel>Resume</FormLabel>
								<FormControl>
									<Input type="file" accept="application/pdf" onChange={(event) => handleResumeChange(event, onChange)} {...rest} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="audtionReel"
						render={({ field: { onChange, value, ...rest } }) => (
							<FormItem>
								<FormLabel>Upload Your Audition Reel</FormLabel>
								<FormControl>
									<Input type="file" accept="video/mp4,video/x-m4v,video/*" onChange={(event) => handleReelChange(event, onChange)} {...rest} />
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
