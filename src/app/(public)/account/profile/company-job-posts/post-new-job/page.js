import { getCurrentUser } from "@/app/actions/userAuth";
import { JobPostForm } from "@/components/Forms/Account/JobPostForm";
import { notFound } from "next/navigation";

export default async function PostNewJob() {
	const user = await getCurrentUser();

	if (!user) return notFound();

	const { uid, profile } = user;

	if (profile.role !== "Company") return notFound();

	return <JobPostForm uid={uid} />;
}
