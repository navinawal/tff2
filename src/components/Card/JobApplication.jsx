import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CiBookmark } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/formatDate";

export default function JobApplication({ jobApplication }) {
	return (
		<div className="flex flex-col rounded-xl bg-muted p-2 max-h-96">
			<div className="flex flex-col gap-2 bg-black px-3 py-4 rounded">
				<div className="flex justify-between items-center">
					<div className="rounded-full bg-muted p-2">
						<CiBookmark />
					</div>
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
