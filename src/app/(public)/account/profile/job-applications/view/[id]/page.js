import { getJobApplication } from "@/app/actions/jobApplications";
import { getCurrentUser } from "@/app/actions/userAuth";
import { Separator } from "@/components/ui/separator";
import VideoPlayer from "./videoPlayer";
import { Button } from "@/components/ui/button";
import { Bookmark, Download } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { addTeamMemberToShortList } from "@/app/actions/companies";
import { toast } from "sonner";
import TeamMemberShortListButton from "./TeamMemberShortListButton";

export default async function ViewJobApplication({ params }) {
	const { id: jobApplicationId } = params;
	const user = await getCurrentUser();

	if (!user) return;

	const { uid, profile } = user;

	// if (profile.role !== "TeamMember") return notFound();

	const jobApplicationData = await getJobApplication(jobApplicationId);

	return (
		<>
			<div className="space-y-6">
				<div>
					<h3 className="text-lg font-medium">Job Application</h3>
					<p className="text-sm text-muted-foreground">Please fill your details.</p>
				</div>
				<Separator />
				<div className="flex gap-5 items-center">
					<h1 className="text-5xl font-bold">
						{jobApplicationData?.teamMemberDetails?.firstName} {jobApplicationData?.teamMemberDetails?.lastName}
					</h1>
					{profile && profile.role === "Company" && (
						<TeamMemberShortListButton companyId={jobApplicationData?.companyId} teamMemberId={jobApplicationData?.teamMemberId} />
					)}
				</div>
				<div className="flex flex-col gap-5">
					<div className="flex gap-2 justify-between items-center">
						<div className="text-lg">Contact No.</div>
						<div className="text-sm">{jobApplicationData.phoneNumber}</div>
					</div>
					<div className="flex gap-2 justify-between">
						<div className="text-lg">Applying As</div>
						<div className="text-sm">{jobApplicationData.projectType}</div>
					</div>
					<div className="flex gap-2 justify-between">
						<div className="text-lg">Email</div>
						<div className="text-sm">{jobApplicationData.email}</div>
					</div>
					<div className="flex gap-2 justify-between">
						<div className="text-lg">Cover Letter</div>
						<div className="text-sm">{jobApplicationData.coverLetter}</div>
					</div>
					<div className="flex gap-2 justify-between">
						<div className="text-lg">Expected Salary</div>
						<div className="text-sm">{jobApplicationData.expectedSalary}</div>
					</div>
					<div className="flex gap-2 justify-between">
						<div className="text-lg">Resume</div>
						<div className="text-sm">
							<Button asChild>
								<a href={jobApplicationData.resume} alt="alt text" target="_blank" rel="noopener noreferrer">
									<Download className="mr-2 h-4 w-4" />
									View Resume
								</a>
							</Button>
						</div>
					</div>
					<div className="flex flex-col gap-2 justify-between">
						<div className="text-xl">Audition Reel</div>
						<div className="video-player-container" style={{ maxWidth: "100%", aspectRatio: "16/9" }}>
							<VideoPlayer video={jobApplicationData.auditionReel} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
