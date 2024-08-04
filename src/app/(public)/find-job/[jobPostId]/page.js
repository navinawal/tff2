import { getCurrentUser } from "@/app/actions/userAuth";
import { Button } from "@/components/ui/button";
import AppMaxWidthContainer from "@/components/ui/max-width-container";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getJobPost } from "@/app/actions/jobPosts";
import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { Download } from "lucide-react";

export default async function FindJob({ params, searchParams }) {
	const user = await getCurrentUser();
	const { uid, profile } = user;
	const { companyId } = searchParams;
	const { jobPostId } = params;

	const job = await getJobPost(companyId, jobPostId);

	if (job.error) return notFound();

	return (
		<div className="bg-black text-[#ffffffcc] py-12 md:py-24">
			<AppMaxWidthContainer>
				{/* <div className="flex flex-col space-y-10">
					<div className="flex gap-10">
						<div className="overflow-hidden rounded-md max-w-[400px]">
							<Image src={job.projectPoster} alt={job.projectTitle} className="aspect-[3/4] h-fit w-full object-cover" width={300} height={400} />
						</div>
						<div className="flex flex-col gap-5">
							<div className="flex justify-start items-center">
								<Image
									src={job.companyDetails.profileImage}
									alt={job.projectTitle}
									className="aspect-auto h-fit w-fit object-cover"
									width={100}
									height={100}
								/>
							</div>
							<Separator className="my-5" />
							<div className="flex flex-col gap-2">
								<h3 className="text-2xl font-bold tracking-tight">{job.projectTitle}</h3>
								<h2 className="text-xl font-bold tracking-tight">{job.companyName}</h2>
								<div className="flex justify-between">
									<div className="text-base font-semibold">Title</div>
									<div className="text-base font-normal">{job.projectTitle}</div>
								</div>
								<div className="flex justify-between">
									<div className="text-base font-semibold">Genre</div>
									<div className="text-base font-normal">{job.projectType}</div>
								</div>
								<div className="flex justify-between">
									<div className="text-base font-semibold">Job Type</div>
									<div className="text-base font-normal">{job.jobType}</div>
								</div>
								<div className="flex justify-between">
									<div className="text-base font-semibold">Duration</div>
									<div className="text-base font-normal">{job.projectDuration}</div>
								</div>
								{job?.auditionLocation && (
									<div className="flex justify-between">
										<div className="text-base font-semibold">Audition Location</div>
										<div className="text-base font-normal">{job.auditionLocation}</div>
									</div>
								)}
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
							</div>
						</div>
					</div>
					<h1 className="text-5xl m-0 p-0 !leading-3">Overview</h1>
					<Separator className="m-0 p-0" />
					<div className="m-0 p-0">{job.projectDetails}</div>
				</div> */}
				<div className="py-12 md:py-24 flex-col space-y-10 md:flex">
					<div className="flex flex-col lg:flex-row gap-10">
						<div className="flex flex-col flex-1 gap-10">
							<div className="overflow-hidden rounded-md max-w-[400px]">
								<Image src={job.projectPoster} alt={job.projectTitle} className="aspect-[3/4] h-fit w-full object-cover" width={300} height={400} />
							</div>
							<div className="flex flex-col md:flex-row gap-5">
								<div className="flex justify-start items-center">
									<Image
										src={job.companyDetails.profileImage}
										alt={job.projectTitle}
										className="aspect-auto h-fit w-fit object-cover"
										width={100}
										height={100}
									/>
								</div>
								<div className="flex flex-col gap-1">
									<h3 className="text-2xl font-bold tracking-tight">{job.companyName}</h3>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<h3 className="text-2xl font-bold tracking-tight">{job.projectTitle}</h3>
								<div>{job.projectDetails}</div>
							</div>

							{job.jobType === "Casting Call" && (
								<div className="flex flex-col gap-2">
									<h3 className="text-2xl font-bold tracking-tight">Actor Requirements</h3>
									<Separator className="my-4" />
									{job.actorRequirements?.map((actorRequirement, index) => {
										return (
											<div key={index}>
												<div className="flex flex-col gap-2">
													<div className="flex flex-row items-center gap-2">
														<div className="text-base font-semibold capitalize">Gender</div>
														<div className="text-sm font-light">{actorRequirement.gender}</div>
													</div>
													<div className="flex flex-row items-center gap-2">
														<div className="text-base font-semibold capitalize">character Name</div>
														<div className="text-sm font-light">{actorRequirement.characterName}</div>
													</div>
													<div className="flex flex-row items-center gap-2">
														<div className="text-base font-semibold capitalize">Required Numbers</div>
														<div className="text-sm font-light">{actorRequirement.requiredNumbers}</div>
													</div>
													<div className="flex flex-row items-center gap-2">
														<div className="text-base font-semibold capitalize">Eligibility</div>
														<div className="text-sm font-light">{actorRequirement.eligibility}</div>
													</div>
													<div className="flex flex-row items-center gap-2">
														<div className="text-base font-semibold capitalize">Age</div>
														<div className="text-sm font-light">{actorRequirement.age}</div>
													</div>
													<div className="flex flex-row items-center gap-2">
														<div className="text-base font-semibold capitalize">Salary Range</div>
														<div className="text-sm font-light">{actorRequirement.salaryRange}</div>
													</div>
												</div>
												<Separator className="my-5" />
											</div>
										);
									})}
								</div>
							)}

							{job.jobType === "Call for TeamMembers" && (
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
										</div>
									))}
									<Separator />
								</div>
							)}
						</div>

						<Card className="md:w-[400px]">
							<CardHeader>
								<CardTitle>Project Overview</CardTitle>
								<CardDescription>More Details about Project</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col gap-2">
								<div className="flex justify-between">
									<div className="text-base font-semibold">Title</div>
									<div className="text-base font-normal">{job.projectTitle}</div>
								</div>
								<div className="flex justify-between">
									<div className="text-base font-semibold">Genre</div>
									<div className="text-base font-normal">{job.projectType}</div>
								</div>
								<div className="flex justify-between">
									<div className="text-base font-semibold">Job Type</div>
									<div className="text-base font-normal">{job.jobType}</div>
								</div>
								<div className="flex justify-between">
									<div className="text-base font-semibold">Duration</div>
									<div className="text-base font-normal">{job.projectDuration}</div>
								</div>
								{job?.auditionLocation && (
									<div className="flex justify-between">
										<div className="text-base font-semibold">Audition Location</div>
										<div className="text-base font-normal">{job.auditionLocation}</div>
									</div>
								)}
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
							</CardContent>
							<CardFooter className="flex flex-col gap-2 mt-5">
								<Button asChild>
									<Link
										className="w-full rounded-none"
										href={`/account/profile/apply-for-job?companyId=${companyId}&jobPostId=${jobPostId}&jobType=${job.jobType}`}
									>
										Apply Now
									</Link>
								</Button>
								{user && user.profile && (
									<Button asChild className="w-full rounded-none bg-background text-foreground hover:bg-foreground hover:text-background">
										<a href={job.projectDocument} alt="alt text" target="_blank" rel="noopener noreferrer">
											<Download className="mr-2 h-4 w-4" />
											Download Script/Snippet
										</a>
									</Button>
								)}
							</CardFooter>
						</Card>
					</div>
				</div>
			</AppMaxWidthContainer>
		</div>
	);
}
