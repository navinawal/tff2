"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeamMemberTrainingFormSchema } from "@/schemas/Schemas";
import { saveTeamMemberTrainings } from "@/app/actions/teamMemberTrainings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function TeamMemberTrainingForm({ uid, defaultValues }) {
	const router = useRouter();
	const formHook = useForm({
		resolver: zodResolver(TeamMemberTrainingFormSchema),
		defaultValues: {
			courseTaken: "",
			instituition: "",
			mentor: "",
			courseLength: "",
		},
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		const response = await saveTeamMemberTrainings(uid, formData);
		if (response.success === true) {
			toast.success(response.message);
			router.refresh();
		} else {
			console.log(error.message);
			toast.error("Something went wrong");
		}
	}

	return (
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4" autoComplete="off">
				<FormField
					control={control}
					name="courseTaken"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Type Of Course Taken</FormLabel>
							<FormControl>
								<Input placeholder="Type Of Course Taken" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="instituition"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Training Instituition</FormLabel>
							<FormControl>
								<Input placeholder="Training Instituition" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="mentor"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Mentor (Trainer)</FormLabel>
							<FormControl>
								<Input placeholder="Mentor (Trainer)" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="courseLength"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Length Of The Course</FormLabel>
							<FormControl>
								<Input placeholder="Length Of The Course" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : "Add New"}
				</Button>
			</form>
		</Form>
	);
}
