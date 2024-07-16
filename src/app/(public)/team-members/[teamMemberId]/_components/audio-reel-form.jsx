"use client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function AudioReelForm({ formHook, onSubmit, children }) {
	const { handleSubmit, control } = formHook;

	const handleSoundTrackChange = (event, onChange) => {
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

	return (
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
				<FormField
					control={control}
					name="soundTrackTitle"
					render={({ field }) => (
						<>
							<FormItem>
								<FormLabel>Soundtrack Title</FormLabel>
								<FormControl>
									<Input type="text" {...field} placeholder="Soundtrack Title"></Input>
								</FormControl>
								<FormDescription>Upload Your Soundtrack Here.</FormDescription>
								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				<FormField
					control={control}
					name="soundTrack"
					render={({ field: { onChange, value, ...rest } }) => (
						<>
							<FormItem>
								<FormLabel></FormLabel>
								<FormControl>
									<Input type="file" {...rest} onChange={(event) => handleSoundTrackChange(event, onChange)} className="min-h-[100px] w-full" />
								</FormControl>
								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				<FormField
					control={control}
					name="description"
					render={({ field }) => (
						<>
							<FormItem>
								<FormLabel>Description</FormLabel>
								<FormControl>
									<Input type="text" {...field} placeholder="Description"></Input>
								</FormControl>
								<FormDescription>Describe Something about Soundtract.</FormDescription>
								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				{children}
			</form>
		</Form>
	);
}
