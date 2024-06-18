"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveUserProfile } from "@/app/actions/userProfile";
import { useToast } from "@/components/ui/use-toast";
import { ethnicity, nationalities } from "@/config/teamMemberData";
import { TeamMemberBasicInfoFormSchema } from "@/schemas/Schemas";
import { saveTeamMemberDetails } from "@/app/actions/teamMembers";
import { useRouter } from "next/navigation";

export function TeamMemberBasicInfoForm({ uid, defaultValues }) {
	const router = useRouter();
	const { toast } = useToast();

	const formHook = useForm({
		resolver: zodResolver(TeamMemberBasicInfoFormSchema),
		defaultValues,
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		const response = await saveTeamMemberDetails(uid, formData);
		if (!response.error) {
			toast({
				title: "Success !",
				description: "Profile saved successfully",
			});
			router.refresh();
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
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8" autoComplete="off">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="firstName"
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
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last Name</FormLabel>
								<FormControl>
									<Input placeholder="Last Name" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<FormField
						control={control}
						name="height"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Height</FormLabel>
								<FormControl>
									<Input placeholder="Height" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="ethnicity"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Ethnicity</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Please Choose your Ethnicity" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{ethnicity?.map((item) => (
											<SelectItem key={item} value={item}>
												{item}
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
						name="nationality"
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
										{nationalities?.map((item) => (
											<SelectItem key={item} value={item}>
												{item}
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
						name="ageGroup"
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
						name="nationality"
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
										{nationalities?.map((item) => (
											<SelectItem key={item} value={item}>
												{item}
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
						name="filmDepartments"
						render={(field) => (
							<FormItem>
								<FormLabel>Film Departments</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Please Choose your Nationality" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{filmDepartments?.map((item) => (
											<SelectItem key={item.value} value={item.value}>
												{item.text}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				{/* todo skills  */}
				<FormField
					control={control}
					name="about"
					render={({ field }) => (
						<FormItem>
							<FormLabel>About Yourself</FormLabel>
							<FormControl>
								<Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
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
