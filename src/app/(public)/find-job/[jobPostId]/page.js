import { getCurrentUser } from "@/app/actions/userAuth";
import { Button } from "@/components/ui/button";
import AppMaxWidthContainer from "@/components/ui/max-width-container";
import Link from "next/link";

export default async function FindJob({ params, searchParams }) {
	const { companyId } = searchParams;
	const { jobPostId } = params;
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
									<h3 className="text-2xl font-bold tracking-tight">Recruiting Coordinator</h3>
									<h2 className="text-xl font-bold tracking-tight">Company</h2>
									<div className="flex flex-row">
										<div className="gooogel">Googele</div>
										<div className="gooogel">Facebook</div>
										<div className="gooogel">Twitter</div>
									</div>
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<h3 className="text-2xl font-bold tracking-tight">Project Details</h3>
								<div>
									Job Description As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data
									talent. You will help the team design beautiful interfaces that solve business challenges for our clients. We work with a number of
									Tier 1 banks on building web-based applications for AML, KYC and Sanctions List management workflows. This role is ideal if you are
									looking to segue your career into the FinTech or Big Data arenas.
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<h3 className="text-2xl font-bold tracking-tight">Actor Requirements</h3>
							</div>
							<div className="flex flex-col gap-2">
								<h3 className="text-2xl font-bold tracking-tight">Team Requirements</h3>
							</div>
						</div>
						<div className="flex flex-col gap-2 bg-muted rounded-md p-6">
							<h3 className="text-2xl font-bold tracking-tight">Project Overview</h3>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Title</div>
								<div className="text-base font-normal">UI Designer</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Genre</div>
								<div className="text-base font-normal">Short Films</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Audition Location</div>
								<div className="text-base font-normal">Nepal</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Audition Date</div>
								<div className="text-base font-normal">July 06, 2024</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Audition Time</div>
								<div className="text-base font-normal">10:00 AM</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Contact Person</div>
								<div className="text-base font-normal">10:00 AM</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Contact Number</div>
								<div className="text-base font-normal">9988119999</div>
							</div>
							<div className="flex justify-between">
								<div className="text-base font-semibold">Application DeadLine</div>
								<div className="text-base font-normal">July 01, 2024</div>
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
