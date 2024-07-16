"use client";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useFieldArray } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ShowReelForm({ formHook, onSubmit, children }) {
	const { handleSubmit, control } = formHook;

	const {
		fields: showReelTimeStamps,
		append: appendShowReelTimeStamps,
		remove: removeShowReelTimeStamps,
	} = useFieldArray({
		control,
		name: "showReelTimeStamps",
	});

	return (
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<ScrollArea className="h-[450px] p-4">
					<div className="space-y-4 p-1">
						<FormField
							control={control}
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
							control={control}
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
							control={control}
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
						<Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => appendShowReelTimeStamps({ title: "", timestamp: "" })}>
							<PlusCircledIcon className="mr-2 h-4 w-4" />
							Add More
						</Button>
						<Separator />
					</div>
				</ScrollArea>
				{children}
			</form>
		</Form>
	);
}
