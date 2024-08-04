import AppMaxWidthContainer from "@/components/ui/max-width-container";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import Image from "next/image";
import styles from "./styles.module.css";
import { Button } from "@/components/ui/button";
import { getCompanyProfile } from "@/app/actions/companies";
import { notFound } from "next/navigation";
import JobCard from "@/components/Card/Job";
import { getCompanyJobPost } from "@/app/actions/jobPosts";

export default async function ComplanyDetails({ params }) {
	const { companyId } = params;
	const companyDetails = await getCompanyProfile(companyId);
	const companyJobPosts = await getCompanyJobPost(companyId);

	if (companyDetails.error) return notFound();

	return (
		<div className="bg-black text-[#ffffffcc]">
			<AppMaxWidthContainer>
				<div className="py-12 md:py-24 h-full flex-1 flex-col space-y-10 md:flex">
					<div className="flex flex-col md:flex-row gap-10">
						<div className="flex flex-col flex-1 gap-10">
							<div className="flex flex-row gap-5">
								<div className="flex justify-start items-center">
									<Image src={companyDetails.profileImage} height="100" width="100" alt=""></Image>
								</div>
								<div className="flex flex-col gap-1">
									<h3 className="text-2xl font-bold tracking-tight">{companyDetails.companyName}</h3>
									<h2 className="text-xl font-bold tracking-tight">{companyDetails.category}</h2>
									{/* 									<div className="flex flex-row">
										<div className="gooogel">Googele</div>
										<div className="gooogel">Facebook</div>
										<div className="gooogel">Twitter</div>
									</div> */}
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<h3 className="text-2xl font-bold tracking-tight">Company Details</h3>
								<div>{companyDetails.aboutCompany}</div>
							</div>
							<div className="flex flex-col gap-5">
								<h3 className="text-2xl font-bold tracking-tight">Current Offering Positions</h3>
								{companyJobPosts && companyJobPosts.length > 0 ? (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										{companyJobPosts?.map((job) => (
											<JobCard key={job.id} job={job}></JobCard>
										))}
									</div>
								) : (
									"NO job posts"
								)}
							</div>
						</div>

						<Card className="w-[400px]">
							<CardHeader>
								<CardTitle>Company Overview</CardTitle>
								<CardDescription>More Details about Company</CardDescription>
							</CardHeader>
							<CardContent className="flex flex-col gap-2">
								<div className="flex justify-between">
									<div className="text-base font-semibold">Category</div>
									<div className="text-base font-normal">{companyDetails.category}</div>
								</div>
								<div className="flex justify-between">
									<div className="text-base font-semibold">Genre</div>
									<div className="text-base font-normal">{companyDetails.companyName}</div>
								</div>
								<div className="flex justify-between">
									<div className="text-base font-semibold">Location</div>
									<div className="text-base font-normal">{companyDetails.location}</div>
								</div>
								<div className="flex justify-between">
									<div className="text-base font-semibold">Company Email</div>
									<div className="text-base font-normal">{companyDetails.email}</div>
								</div>
								<div className="flex justify-between">
									<div className="text-base font-semibold">Company Website</div>
									<div className="text-base font-normal">{companyDetails.website}</div>
								</div>
							</CardContent>
							<CardFooter className="flex flex-col gap-2 mt-5">
								{/* <div className="flex flex-col gap-2 mt-5">
								<Button className="w-full rounded-none h-14">Contact Us</Button>
							</div> */}
							</CardFooter>
						</Card>
					</div>
				</div>
			</AppMaxWidthContainer>
		</div>
	);
}
