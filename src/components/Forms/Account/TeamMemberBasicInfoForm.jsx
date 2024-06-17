"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { format } from "date-fns";

import { zodResolver } from "@hookform/resolvers/zod";
import { profileFormSchema } from "@/schemas/Schemas";
import { saveUserProfile } from "@/app/actions/userProfile";
import { useToast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { z } from "zod";
import { FormMultiSelectField } from "@/components/ui/multi-select-field";
import { Separator } from "@/components/ui/separator";

export function TeamMemberBasicInfoForm({ uid, defaultValues }) {
	const { toast } = useToast();
	const FormSchema = z.object({
		filmDepartments: z.array(z.string()).refine((value) => value.some((item) => item), {
			message: "You have to select at least one item.",
		}),
	});

	const formHook = useForm({
		resolver: zodResolver(FormSchema),
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

	const filmDepartments = [
		{ value: "actor", text: "Actor" },
		{ value: "Acting coach", text: "Acting coach" },
		{ value: "action-stunt-coordinator", text: "Action/Stunt Coordinator" },
		{ value: "animal-trainer-handler", text: "Animal Trainer/Handler" },
		{ value: "assistant-director", text: "Assistant Director" },
		{ value: "art-director", text: "Art Director" },
		{ value: "boom-operator-sound-recordist", text: "Boom Operator/Sound Recordist" },
		{ value: "casting-director", text: "Casting Director" },
		{ value: "catering-craft-service", text: "Catering/Craft Service" },
		{ value: "cinematographer-director-of-photography-dp", text: "Cinematographer/Director of Photography (DP)" },
		{ value: "colorist", text: "Colorist" },
		{ value: "costume-designer-wardrobe", text: "Costume Designer/Wardrobe" },
		{ value: "dialogue-editor", text: "Dialogue Editor" },
		{ value: "digital-effects-artist", text: "Digital Effects Artist" },
		{ value: "director", text: "Director" },
		{ value: "distribution-coordinator", text: "Distribution Coordinator" },
		{ value: "drone-operator-pilot", text: "Drone Operator/Pilot" },
		{ value: "editor", text: "Editor" },
		{ value: "film-critic", text: "Film Critic" },
		{ value: "film-journalist", text: "Film Journalist" },
		{ value: "foley-artist-sound-effects-editor", text: "Foley Artist/Sound Effects Editor" },
		{ value: "lightman-gaffer-grip", text: "Lightman/Gaffer/Grip" },
		{ value: "location-manager-scout", text: "Location Manager/Scout" },
		{ value: "location-sound-mixer", text: "Location Sound Mixer" },
		{ value: "makeup-artist-hair-stylist", text: "Makeup Artist/Hair Stylist" },
		{ value: "marketing-publicity-coordinator", text: "Marketing/Publicity Coordinator" },
		{ value: "music-producer-composer", text: "Music Producer/Composer" },
		{ value: "post-production-supervisor", text: "Post-production Supervisor" },
		{ value: "producer", text: "Producer" },
		{ value: "production-designer", text: "Production Designer" },
		{ value: "production-manager-line-producer", text: "Production Manager/Line Producer" },
		{ value: "prosthetic-makeup-artist", text: "Prosthetic Makeup Artist" },
		{ value: "screenwriter", text: "Screenwriter" },
		{ value: "script-supervisor-continuity-supervisor", text: "Script Supervisor/Continuity Supervisor" },
		{ value: "set-decorator", text: "Set Decorator" },
		{ value: "sound-designer-mixer", text: "Sound Designer/Mixer" },
		{ value: "special-effects-sfx-supervisor", text: "Special Effects (SFX) Supervisor" },
		{ value: "storyboard-artist", text: "Storyboard Artist" },
		{ value: "title-designer", text: "Title Designer" },
		{ value: "visual-effects-vfx-artist", text: "Visual Effects (VFX) Artist" },
		{ value: "vfx-supervisor", text: "Visual Effects (VFX) Supervisor" },
		{ value: "voice-over-artist", text: "Voice-Over Artist" },
		{ value: "Actor health trainer", text: "Actor health trainer" },
	];

	const ageGroups = [
		{ label: "Mid-60s", range: "65-69" },
		{ label: "Early 60s", range: "60-64" },
		{ label: "Late 50s", range: "55-59" },
		{ label: "Mid-50s", range: "50-54" },
		{ label: "Early 50s", range: "45-49" },
		{ label: "Mid-40s", range: "40-44" },
		{ label: "Mid-30s", range: "35-39" },
		{ label: "Early 30s", range: "30-34" },
		{ label: "Mid-20s", range: "25-29" },
		{ label: "Early 20s", range: "20-24" },
		{ label: "Teenager", range: "16-19" },
		{ label: "Pre-Teen", range: "13-15" },
		{ label: "Child", range: "5-12" },
		{ label: "Infant", range: "0-4" },
	];

	return (
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="filmDepartments"
						render={() => (
							<FormItem>
								<div className="mb-4">
									<FormLabel className="text-base">Film Departments</FormLabel>
								</div>
								{filmDepartments.map((item) => (
									<FormField
										key={item.id}
										control={control}
										name="items"
										render={({ field }) => {
											return (
												<FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
													<FormControl>
														<Checkbox
															checked={field.value?.includes(item.id)}
															// onCheckedChange={(checked) => {
															// 	return checked
															// 		? field.onChange([...field.value, item.id])
															// 		: field.onChange(field.value?.filter((value) => value !== item.id));
															// }}
														/>
													</FormControl>
													<FormLabel className="text-sm font-normal">{item.text}</FormLabel>
												</FormItem>
											);
										}}
									/>
								))}
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="ageCategory"
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
										{ageGroups.map((item) => (
											<SelectItem key={item.range} value={item.range}>
												{item.label}
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
						name="ageCategory"
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
										{ageGroups.map((item) => (
											<SelectItem key={item.range} value={item.range}>
												{item.label}
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
						name="ageCategory"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Your Current Location</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Please Choose your Nationality" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{ageGroups.map((item) => (
											<SelectItem key={item.range} value={item.range}>
												{item.label}
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
						name="ageCategory"
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
										{ageGroups.map((item) => (
											<SelectItem key={item.range} value={item.range}>
												{item.label}
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
						name="skills"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Skills</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Please Choose your Nationality" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{ageGroups.map((item) => (
											<SelectItem key={item.range} value={item.range}>
												{item.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<h3 className="text-lg font-medium">Carrier Summary</h3>
				<Separator />
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={control}
						name="featureFilms"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of Feature Films</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Number of Feature Films" {...field} min="0" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="shortFilms"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of Short Films</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Number of Feature Films" {...field} min="0" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={control}
						name="musicVideos"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of Music Videos</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Number of Feature Films" {...field} min="0" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="documentaries"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of Documentaries</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Number of Documentaries" {...field} min="0" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={control}
						name="commercials"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of Tv Commercials/Ads</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Number of Feature Films" {...field} min="0" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="theatreDrama"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of Theatre Drama</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Number of Theatre Drama" {...field} min="0" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={control}
						name="webSeries"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of TV/Web-Series</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Number of TV/Web-Series" {...field} min="0" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" size="sm">
					{isSubmitting ? "Updating profile..." : "Update profile"}
				</Button>
			</form>
		</Form>
	);
}
