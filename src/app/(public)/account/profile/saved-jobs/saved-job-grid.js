"use client";

import { getBookmarkedJobPosts, removeBookmarkFromArray } from "@/app/actions/team_members";
import JobCard from "@/components/Card/Job";
import { useEffect, useState } from "react";

export default function SaveJobGrid({ uid }) {
	const [savedJobs, setSavedJobs] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchData() {
			const jobs = await getBookmarkedJobPosts(uid);
			setSavedJobs(jobs);
			setLoading(false);
		}
		fetchData();
	}, [uid]);

	const handleRemove = async (companyId, jobPostId) => {
		setSavedJobs(savedJobs.filter((job) => job.id !== jobPostId));

		await removeBookmarkFromArray(uid, companyId, jobPostId);
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{savedJobs?.length > 0 ? savedJobs.map((job) => <JobCard key={job.id} job={job}></JobCard>) : <p>No saved jobs yet</p>}
		</div>
	);
}
