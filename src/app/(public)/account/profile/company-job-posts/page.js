import { getCurrentUser } from "@/app/actions/userAuth";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { getCompanyJobPost } from "@/app/actions/jobPosts";
import JobCard from "@/components/Card/Job";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function CompanyJobPosts() {
	const user = await getCurrentUser();

	if (!user) return notFound();

	const { uid, profile } = user;

	if (profile.role !== "Company") return notFound();

	const jobPosts = await getCompanyJobPost(uid);

	return (
		<>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<div>
						<h3 className="text-lg font-medium">Job Posts</h3>
						<p className="text-sm text-muted-foreground">Add Company Job Posts</p>
					</div>
					<Button asChild size="sm">
						<Link href={`/account/profile/company-job-posts/post-new-job`}>Post New Job</Link>
					</Button>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{jobPosts?.map((job) => (
						<JobCard key={job.id} job={job}></JobCard>
					))}
				</div>
				<Separator />
			</div>
		</>
	);
}
