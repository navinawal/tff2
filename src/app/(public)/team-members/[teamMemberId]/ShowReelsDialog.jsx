"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";

import { showReelsFormSchema } from "@/schemas/Schemas";
import { addShowReel } from "@/app/actions/teamMemberShowReels";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import Image from "next/image";

export function ShowReelsDialog({ teamMemberId }) {
	const [openDialog, setOpenDialog] = useState(false);

	const formHook = useForm({
		resolver: zodResolver(showReelsFormSchema),
		defaultValues: {
			projectTitle: "",
			projectDescription: "",
			projectLink: "",
			showReelTimeStamps: [{ title: "", timestamp: "" }],
		},
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	const {
		fields: showReelTimeStamps,
		append: appendShowReelTimeStamps,
		remove: removeShowReelTimeStamps,
	} = useFieldArray({
		control,
		name: "showReelTimeStamps",
	});

	if (!teamMemberId) return;

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
				<ScrollArea className="h-[450px] p-5">
					<DialogHeader>
						<DialogTitle className="text-center">Add Portfolio / Showreel</DialogTitle>
						<DialogDescription></DialogDescription>
					</DialogHeader>
					<Form {...formHook}>
						<div className="flex gap-5">
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
									<div className="text-base text-muted-foreground">
										Create Clickable chapters in the video to navigate users only to the specific scenes you appear in. (optional)
									</div>
									<div className="text-xs text-muted-foreground">
										Please utilize the Timestamp Feature below to let viewers instantly skip to the scenes you appear in the video.
										<HoverCard>
											<HoverCardTrigger className="ml-2 text-base font-bold cursor-pointer">see screenshot</HoverCardTrigger>
											<HoverCardContent className="p-0 w-[400px]">
												<Image
													src="/images/resource/timeStampScreenshot.webp"
													className="w-full h-full"
													width="100"
													height="100"
													alt="timestamp-screenshot"
												></Image>
											</HoverCardContent>
										</HoverCard>
									</div>
									{showReelTimeStamps?.map((field, index) => (
										<div className="space-y-4 border p-5 rounded-md" key={field.id}>
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<FormField
													control={control}
													name={`showReelTimeStamps.${index}.title`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Title</FormLabel>
															<FormControl>
																<Input type="text" placeholder="Title" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
												<FormField
													control={control}
													name={`showReelTimeStamps.${index}.timestamp`}
													render={({ field }) => (
														<FormItem>
															<FormLabel>Timestamp</FormLabel>
															<FormControl>
																<Input type="number" min="0" placeholder="Timestamp" {...field} />
															</FormControl>
															<FormMessage />
														</FormItem>
													)}
												/>
											</div>
											<Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => removeShowReelTimeStamps(index)}>
												<Trash2 className="h-4 w-4" />
											</Button>
										</div>
									))}
									<Button
										type="button"
										variant="outline"
										size="sm"
										className="mt-2"
										onClick={() => appendShowReelTimeStamps({ title: "", timestamp: "" })}
									>
										<PlusCircledIcon className="mr-2 h-4 w-4" />
										Add New
									</Button>
									<Separator />
									<Button className="w-full" type="submit" disabled={isSubmitting}>
										{isSubmitting ? "Submitting data ..." : "Submit"}
									</Button>
								</form>
							</div>
						</div>
					</Form>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
}
