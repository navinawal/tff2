"use client";

import { CiBookmark } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { formatDate } from "@/lib/formatDate";
import { addBookmarkToArray, getBookmarkedJobPosts, removeBookmarkFromArray } from "@/app/actions/team_members";
import { getCurrentUser } from "@/app/actions/userAuth";
import { useState, useEffect } from "react";
import { FiLoader } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function JobCard({ job }) {
	const pathname = usePathname();
	const [user, setUser] = useState(null);
	const [savedJobs, setSavedJobs] = useState([]);
	const [loading, setLoading] = useState(false);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const companyId = job.companyId;

	// Fetch saved jobs and determine if this job is bookmarked
	useEffect(() => {
		async function fetchSavedJobs() {
			const user = await getCurrentUser();
			if (!user || !user.profile) {
				setLoading(false);
				return;
			}

			const { uid, profile } = user;

			if (profile.role !== "TeamMember") {
				setLoading(false);
				return;
			}

			if (user) {
				setUser(user);
				const { uid } = user;
				const savedJobs = await getBookmarkedJobPosts(uid);
				setSavedJobs(savedJobs);
				setIsBookmarked(savedJobs.some((savedJob) => savedJob.id === job.id));
			}
		}
		fetchSavedJobs();
	}, [job.id]);

	const handleSavedJobs = async () => {
		setLoading(true);
		const user = await getCurrentUser();

		if (!user || !user.profile) {
			setLoading(false);
			return;
		}

		const { uid, profile } = user;

		if (profile.role !== "TeamMember") {
			setLoading(false);
			return;
		}

		if (isBookmarked) {
			// Remove bookmark
			await removeBookmarkFromArray(uid, companyId, job.id);
			setSavedJobs(savedJobs.filter((savedJob) => savedJob.id !== job.id));
			setIsBookmarked(false);
		} else {
			// Add bookmark
			await addBookmarkToArray(uid, companyId, job.id);
			setSavedJobs([...savedJobs, { id: job.id }]); // Update state with new bookmark
			setIsBookmarked(true);
		}

		setLoading(false);
	};

	return (
		<div className="flex flex-col rounded-xl bg-muted p-2 max-h-96">
			<div className="flex flex-col gap-2 bg-black px-3 py-4 rounded">
				<div className="flex justify-between items-center">
					<Button
						variant="outline"
						size="icon"
						className={`rounded-full ${isBookmarked ? "bg-accent text-white" : ""}`}
						onClick={handleSavedJobs}
						disabled={loading}
					>
						{loading ? <FiLoader className="h-4 w-4 animate-spin" /> : <CiBookmark className="h-4 w-4" />}
					</Button>
				</div>
				<div className="flex flex-row gap-4 mt-4">
					<div className="text-xs font-medium">{job?.companyName}</div>
					{/* <div className="text-xs">{formatDate(job.createdAt)}</div> */}
				</div>
				<div className="text-2xl font-medium">{job?.projectTitle}</div>
				<div className="text-xs font-medium">{job?.projectGenre}</div>
				<div className="text-sm line-clamp-3">{job?.projectDetails}</div>
			</div>
			<div className="flex flex-row justify-between items-center p-2">
				<div className="flex flex-col justify-between">
					<div className="text-lg font-semibold">{job?.auditionDate}</div>
					<div className="text-sm">{job?.auditionTime}</div>
				</div>
				<div className="flex justify-between gap-2">
					<Button asChild className="bg-black text-white">
						<Link href={`/find-job/${job.id}?companyId=${companyId}`}>Details</Link>
					</Button>
					{pathname === "/account/profile/company-job-posts" && (
						<Button asChild className="bg-black text-white">
							<Link href={`/account/profile/company-job-posts/${job.id}`}>Edit</Link>
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
