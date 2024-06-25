import { getCurrentUser } from "@/app/actions/userAuth";
import { Button } from "@/components/ui/button";
import AppMaxWidthContainer from "@/components/ui/max-width-container";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaVk, FaFacebook } from "react-icons/fa";
import { getJobPost } from "@/app/actions/jobPosts";
import { Separator } from "@/components/ui/separator";

export default async function FindJob({ params, searchParams }) {
	const { companyId } = searchParams;
	const { jobPostId } = params;

	const job = await getJobPost(companyId, jobPostId);

	return (
		<div className="bg-black text-[#ffffffcc]">
			<AppMaxWidthContainer>
				<div className="py-12 md:py-24 h-full flex-1 flex-col space-y-10 md:flex">
					<div className="w-full grid grid-rows-2 lg:grid-cols-3 gap-10">
						<div className="col-span-2 flex flex-col gap-10">
							<div className="flex flex-row gap-5">
								<div className="flex justify-start items-center">
									<img src="https://jobslab-reactjs.netlify.app/assets/img/job/meta.png" alt="" width="100" height="100" />
								</div>
								<div className="flex flex-col gap-1">
									<h3 className="text-2xl font-bold tracking-tight">{job.projectTitle}</h3>
									<h2 className="text-xl font-bold tracking-tight">{job.companyName}</h2>
									<div className="flex flex-row">
										<div className="gooogel">Googele</div>
										<div className="gooogel">Facebook</div>
										<div className="gooogel">Twitter</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<h3 className="text-2xl font-bold tracking-tight">{job.projectTitle}</h3>
								<div>{job.projectDetails}</div>
							</div>
							<div className="flex flex-col gap-2">
								<h3 className="text-2xl font-bold tracking-tight">Actor Requirements</h3>
								<Separator />
								{job.actorRequirements?.map((actorRequirement, index) => (
									<div className="flex flex-col gap-2" key={index}>
										{Object.entries(actorRequirement)
											.sort((a, b) => b - a)
											.map(([key, value]) => (
												<div className="flex flex-row items-center gap-2" key={key}>
													<div className="text-base font-semibold capitalize">{key}</div>
													<div className="text-sm font-light">{value}</div>
												</div>
											))}
										<Separator />
									</div>
								))}
							</div>
							<div className="flex flex-col gap-2">
								<h3 className="text-2xl font-bold tracking-tight">Team Requirements</h3>
								<Separator />
								{job.teamMemberRequirements?.map((teamMemberRequirement, index) => (
									<div className="flex flex-col gap-2" key={index}>
										{Object.entries(teamMemberRequirement)
											.sort((a, b) => b - a)
											.map(([key, value]) => (
												<div className="flex flex-row items-center gap-2" key={key}>
													<div className="text-base font-semibold capitalize">{key}</div>
													<div className="text-sm font-light">{value}</div>
												</div>
											))}
										<Separator />
									</div>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-2 bg-muted rounded-md p-6">
							<h3 className="text-2xl font-bold tracking-tight">Project Overview</h3>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Title</div>
								<div className="text-base font-normal">{job.projectTitle}</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Genre</div>
								<div className="text-base font-normal">{job.projectGenre}</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Duration</div>
								<div className="text-base font-normal">{job.projectDuration}</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Audition Location</div>
								<div className="text-base font-normal">{job.auditionLocation}</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Audition Date</div>
								<div className="text-base font-normal">{job.auditionDate}</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Audition Time</div>
								<div className="text-base font-normal">{job.auditionTime}</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Contact Person</div>
								<div className="text-base font-normal">{job.contactPerson}</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Contact Number</div>
								<div className="text-base font-normal">{job.contactNumber}</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Application DeadLine</div>
								<div className="text-base font-normal">{job.applicationDeadline}</div>
							</div>
							<div className="flex flex-col gap-2 mt-5">
								<Button asChild>
									<Link className="w-full rounded-none" href={`/account/profile/apply-for-job?companyId=${companyId}&jobPostId=${jobPostId}`}>
										Apply Now
									</Link>
								</Button>
								<Button className="w-full rounded-none bg-background text-foreground hover:bg-foreground hover:text-background">Add Bookmark</Button>
							</div>
						</div>
					</div>
				</div>
			</AppMaxWidthContainer>
		</div>
	);
}
