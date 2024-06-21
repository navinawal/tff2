import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CiBookmark } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function JobCard({ job }) {
	return (
		<div className="flex flex-col rounded-xl bg-muted p-2 gap-4 h-96 max-h-96">
			<div className="flex flex-col gap-2 bg-black px-3 py-4 rounded">
				<div className="flex gap-4 justify-between items-center">
					<div className="rounded bg-muted py-1 px-3">{job?.auditionDate}</div>
					<div className="rounded-full bg-muted p-2">
						<CiBookmark />
					</div>
				</div>
				<div className="text-sm font-medium">{job?.companyName}</div>
				<div className="flex flex-row">
					<div className="left">
						<h4 className="">{job?.projectDetails}</h4>
					</div>
					<Avatar>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
				</div>
				<div className="flex flex-row gap-2 flex-wrap">
					<Badge className="rounded">Full Time</Badge>
					<Badge className="rounded">Private</Badge>
					<Badge className="rounded">Urgent</Badge>
				</div>
				<div className="flex flex-row text-sm">{job?.projectDetails}</div>
			</div>
			<div className="flex flex-row justify-between">
				<div className="flex flex-col justify-between">
					<div className="text-lg font-semibold">$300/hr</div>
					<div className="text-xs">posted 10 days ago</div>
				</div>
				<Button asChild style={{ backgroundColor: "black", color: "white" }}>
					<Link href="/find-job/1">Details</Link>
				</Button>
			</div>
		</div>
	);
}
