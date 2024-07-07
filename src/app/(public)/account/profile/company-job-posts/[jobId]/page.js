import { getJobPost } from "@/app/actions/jobPosts";
import { getCurrentUser } from "@/app/actions/userAuth";
import { JobPostForm } from "@/components/Forms/Account/JobPostForm";
import { notFound } from "next/navigation";

export default async function PostNewJob({ params }) {
	const user = await getCurrentUser();
	const { jobId } = params;

	if (!user) return notFound();

	const { uid, profile } = user;

	if (profile.role !== "Company") return notFound();

	const jobPost = await getJobPost(uid, jobId);

	return <JobPostForm companyId={uid} jobId={jobId} defaultValues={jobPost} />;
}
