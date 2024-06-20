import { getCurrentUser } from "@/app/actions/userAuth";
import { JobPostForm } from "@/components/Forms/Account/JobPostForm";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PlusCircledIcon } from "@radix-ui/react-icons";

export async function JobPostSheet() {
	const user = await getCurrentUser();

	if (!user) return;

	const { uid } = user;

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button size="sm" className="border-dashed">
					<PlusCircledIcon className="mr-2 h-4 w-4" />
					<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add New</span>
				</Button>
			</SheetTrigger>
			<SheetContent className="!max-w-[90%] w-[90%] md:!max-w-[50%]">
				<SheetHeader>
					<SheetTitle>Job Post</SheetTitle>
					<SheetDescription>Post a new job</SheetDescription>
				</SheetHeader>
				<div className="py-6">
					<JobPostForm uid={uid} />
				</div>
			</SheetContent>
		</Sheet>
	);
}
