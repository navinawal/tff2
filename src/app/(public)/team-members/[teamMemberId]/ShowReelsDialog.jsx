"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { useState } from "react";

import { showReelsFormSchema } from "@/schemas/Schemas";
import { addShowReel } from "@/app/actions/teamMemberShowReels";
import { zodResolver } from "@hookform/resolvers/zod";

export function ShowReelsDialog({ teamMemberId }) {
	const [openDialog, setOpenDialog] = useState(false);

	const formHook = useForm({
		resolver: zodResolver(showReelsFormSchema),
		defaultValues: {
			projectTitle: "",
			projectDescription: "",
			projectLink: "",
		},
	});

	if (!teamMemberId) return;

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		try {
			const response = await addShowReel(teamMemberId, formData);

			if (response.success) {
				toast.success(response.message);
				setOpenDialog(false);
			} else {
				console.log(response.message);
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.error("Error uploading files:", error);
			toast.error("Something went wrong");
		}
	}

	return (
		<Dialog open={openDialog} onOpenChange={setOpenDialog}>
			<DialogTrigger asChild>
				<Button variant="outline" size="icon">
					<PlusCircleIcon className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[800px]">
				<DialogHeader>
					<DialogTitle className="text-center">Add Portfolio / Showreel</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				<Form {...formHook}>
					<div className="flex gap-5">
						<div className="flex flex-col mt-4 px-4 h-[400px] max-h-[400px] overflow-y-auto scrollbar"></div>
						<div className="flex flex-1">
							<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
								<FormField
									control={control} // Corrected spelling here
									name="projectTitle"
									render={({ field }) => (
										<>
											<FormItem>
												<FormLabel>Project Title</FormLabel>
												<FormControl>
													<Input type="text" {...field} placeholder="Project Title"></Input>
												</FormControl>
												<FormMessage />
											</FormItem>
										</>
									)}
								/>
								<FormField
									control={control} // Corrected spelling here
									name="projectDescription"
									render={({ field }) => (
										<>
											<FormItem>
												<FormLabel>Project Description</FormLabel>
												<FormControl>
													<Textarea type="text" {...field} placeholder="Project Description"></Textarea>
												</FormControl>
												<FormMessage />
											</FormItem>
										</>
									)}
								/>
								<FormField
									control={control} // Corrected spelling here
									name="projectLink"
									render={({ field }) => (
										<>
											<FormItem>
												<FormLabel>Project Link</FormLabel>
												<FormControl>
													<Input type="text" {...field} placeholder="Project Link"></Input>
												</FormControl>
												<FormMessage />
											</FormItem>
										</>
									)}
								/>
								<Button className="w-full" type="submit" disabled={isSubmitting}>
									{isSubmitting ? "Submitting data ..." : "Submit"}
								</Button>
							</form>
						</div>
					</div>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
