import { CiBookmark } from "react-icons/ci";
import { formatDate } from "@/lib/formatDate";
import { Button } from "@/components/ui/button";

export default function JobApplication({ jobApplication, onRemove }) {
	return (
		<div className="flex flex-col rounded-xl bg-muted p-2 max-h-96">
			<div className="flex flex-col gap-2 bg-black px-3 py-4 rounded">
				<div className="flex justify-between items-center">
					<Button variant="outline" size="icon" className="rounded-full" onClick={onRemove}>
						<CiBookmark className="h-4 w-4" />
					</Button>
				</div>
				<div className="flex flex-row gap-4 mt-4">
					<div className="text-xs font-medium">{jobApplication?.email}</div>
					<div className="text-xs">{formatDate(jobApplication.createdAt)}</div>
				</div>
				<div className="text-2xl font-medium">{jobApplication?.phoneNumber}</div>
				<div className="flex flex-row text-sm">{jobApplication?.projectGenre}</div>
			</div>
			<div className="flex flex-row justify-between items-center p-2">
				<div className="flex flex-col justify-between">
					<div className="text-lg font-semibold">{jobApplication?.applyingAs}</div>
				</div>
			</div>
		</div>
	);
}
