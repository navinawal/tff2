"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TeamMemberTrainingFormSchema } from "@/schemas/Schemas";
import { addTraining, editTraining } from "@/app/actions/teamMemberTrainings";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi";

export function TeamMemberTrainingForm({ teamMemberId, training }) {
	const router = useRouter();
	const formHook = useForm({
		resolver: zodResolver(TeamMemberTrainingFormSchema),
		defaultValues: training,
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		try {
			let response;
			if (training && training.id) {
				response = await editTraining(teamMemberId, training.id, formData);
			} else {
				response = await addTraining(teamMemberId, formData);
			}

			if (response.success) {
				toast.success(response.message);
			} else {
				console.log(response.message);
				toast.error("something went wrong");
			}
		} catch (error) {
			console.log(response.message);
			toast.error("something went wrong");
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
					{isSubmitting ? (
						<>
							<FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" />
							Saving...
						</>
					) : training ? (
						"Update"
					) : (
						"Add New"
					)}
				</Button>
			</form>
		</Form>
	);
}
