"use client";
import { formatDate } from "@/lib/formatDate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { deleteJobApplication } from "@/app/actions/jobApplications";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function JobApplication({ jobApplication, user }) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	async function handleDeleteApplication(jobApplicationId) {
		setLoading(true);
		const response = await deleteJobApplication(jobApplicationId);
		if (response.success) {
			toast.success(response.message);
			router.refresh();
		} else {
			console.log(response.message);
			toast.error("something went wrong");
		}
		setLoading(false);
	}

	return (
		<div className="flex flex-col rounded-xl bg-muted p-2 max-h-96">
			<div className="flex flex-col gap-2 bg-black px-3 py-4 rounded">
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
			<div className="flex justify-between gap-2">
				{/* {user && user?.profile?.role === "TeamMember" && (
					<Button asChild>
						<Link href={`/account/profile/job-applications/edit/${jobApplication.id}`}>Edit</Link>
					</Button>
				)} */}
				{user && user?.profile?.role && (
					<Button asChild>
						<Link href={`/account/profile/job-applications/view/${jobApplication.id}`}>View</Link>
					</Button>
				)}
				{user && user?.profile?.role && (
					<Button onClick={() => handleDeleteApplication(jobApplication.id)} disabled={loading}>
						{loading ? "Deleting..." : "Delete"}
					</Button>
				)}
			</div>
		</div>
	);
}
