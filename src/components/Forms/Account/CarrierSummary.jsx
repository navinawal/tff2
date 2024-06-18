"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { carrierSummarySchema } from "@/schemas/Schemas";
import { saveTeamMemberDetails } from "@/app/actions/teamMembers";

export function CarrierSummaryForm({ uid, defaultValues }) {
	const formHook = useForm({
		resolver: zodResolver(carrierSummarySchema),
		defaultValues: defaultValues,
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(data) {
		try {
			const response = await saveTeamMemberDetails(uid, data);
			console.log(response);
		} catch (error) {
			console.error("Error submitting form:", error);
		}
	}

	return (
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={control}
						name="featureFilms"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Number of Feature Films</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Number of Feature Films" {...field} min="0" step="1" />
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
									<Input type="number" placeholder="Number of Short Films" {...field} min="0" step="1" />
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
									<Input type="number" placeholder="Number of Music Videos" {...field} min="0" step="1" />
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
									<Input type="number" placeholder="Number of Documentaries" {...field} min="0" step="1" />
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
								<FormLabel>Number of TV Commercials/Ads</FormLabel>
								<FormControl>
									<Input type="number" placeholder="Number of TV Commercials/Ads" {...field} min="0" step="1" />
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
									<Input type="number" placeholder="Number of Theatre Drama" {...field} min="0" step="1" />
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
									<Input type="number" placeholder="Number of TV/Web-Series" {...field} min="0" step="1" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type="submit" size="sm" disabled={isSubmitting}>
					{isSubmitting ? "Saving..." : "Update"}
				</Button>
			</form>
		</Form>
	);
}
