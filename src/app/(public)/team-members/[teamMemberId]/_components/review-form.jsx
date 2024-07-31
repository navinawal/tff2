"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rating } from "@smastrom/react-rating";
import { useForm } from "react-hook-form";
import { FiLoader } from "react-icons/fi";
import "@smastrom/react-rating/style.css";
import { reviewFormSchema } from "@/schemas/Schemas";
import { addTeamMemberReview } from "@/app/actions/review";
import { toast } from "sonner";

export default function ReviewForm({ uid, teamMemberId }) {
	const formHook = useForm({
		resolver: zodResolver(reviewFormSchema),
		defaultValues: {
			rating: 0,
			comments: "",
		},
	});

	const {
		handleSubmit,
		control,
		formState: { isSubmitting },
	} = formHook;

	async function onSubmit(formData) {
		formData.reviewedBy = uid;
		try {
			const response = await addTeamMemberReview(teamMemberId, formData);
			if (response.success) {
				toast.success(response.message);
				formHook.reset();
			} else {
				console.error(response.message);
				toast.error("something went wrong");
			}
		} catch (error) {
			console.error(error.message);
			toast.error("something went wrong");
		}
	}

	return (
		<Form {...formHook}>
			<form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
				<FormField
					control={control}
					name="rating"
					render={({ field: { onChange, onBlur, value } }) => (
						<>
							<FormItem>
								<FormLabel>Rating</FormLabel>
								<FormControl>
									<Rating style={{ maxWidth: 180 }} value={value} onChange={onChange} visibleLabelId="rating_label" onBlur={onBlur} />
								</FormControl>
								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				<FormField
					control={control}
					name="comments"
					render={({ field }) => (
						<>
							<FormItem>
								<FormLabel>Comments</FormLabel>
								<FormControl>
									<Textarea type="text" {...field} rows={10} placeholder="Comments"></Textarea>
								</FormControl>
								<FormMessage />
							</FormItem>
						</>
					)}
				/>
				<Button disabled={isSubmitting}>
					{isSubmitting && <FiLoader className="mr-2 size-4 animate-spin" aria-hidden="true" />}
					{isSubmitting ? "Submitting data ..." : "Submit"}
				</Button>
			</form>
		</Form>
	);
}
