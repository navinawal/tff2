import AppMaxWidthContainer from "@/components/ui/max-width-container";
import Image from "next/image";
import styles from "./styles.module.css";
import { CarrierSummaryChart } from "@/components/Account/TeamMember/CarrierSummaryChart";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { notFound } from "next/navigation";
import { getTeamMemberDetails } from "@/app/actions/teamMembers";
import { getTeamMemberTrainings } from "@/app/actions/teamMemberTrainings";
import { Badge } from "@/components/ui/badge";

export default async function TeamMemberDetails({ params }) {
	const { teamMemberId } = params;
	const teamMember = await getTeamMemberDetails(teamMemberId);
	const trainings = await getTeamMemberTrainings(teamMemberId);

	if (teamMember.error) return notFound();

	return (
		<div className="bg-black text-[#ffffffcc]">
			<div className="py-12 md:py-20">
				<AppMaxWidthContainer>
					<div className="flex justify-start items-center">
						<h1 className={`${styles.strokeHeading} text-5xl md:text-8xl text-white font-bold`}>
							{teamMember.firstName} {teamMember.lastName}
						</h1>
					</div>
				</AppMaxWidthContainer>
			</div>

			<AppMaxWidthContainer>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-10">
					<div className="flex flex-col justify-start items-start gap-4">
						<Image
							src={teamMember.profileImage || "/profile_pictures/placeholder.jpg"}
							width="250"
							height="600"
							alt="Profile Picture"
							className="rounded-sm"
						></Image>
					</div>
					<div className="flex flex-col col-span-2 justify-center items-start gap-6">
						<DetailBox containerClass="flex flex-col gap-3" heading="About Me" subHeading={teamMember.about} />
						<div className="flex flex-wrap justify-between md:justify-start w-full gap-6">
							<DetailBox containerClass="flex flex-col gap-3" heading="Age" subHeading={teamMember.ageGroup} />
							<DetailBox containerClass="flex flex-col gap-3" heading="Height" subHeading={teamMember.height} />
							<DetailBox containerClass="flex flex-col gap-3" heading="Ethnicity" subHeading={teamMember.ethnicity} />
							<DetailBox containerClass="flex flex-col gap-3" heading="Nationality" subHeading={teamMember.nationality} />
							<DetailBox containerClass="flex flex-col gap-3" heading="Location" subHeading={teamMember.location} />
						</div>
						<div className="grid grid-cols-3 justify-between content-start w-full gap-6">
							<DetailBox containerClass="flex flex-col gap-3" heading="Department" subHeading="Editor, Producer, Actor" />
						</div>
						<Accordion type="single" collapsible className="w-full">
							<AccordionItem value="item-1">
								<AccordionTrigger>
									<h6 className={`${styles.smallHeading}`}>Carrier Summary</h6>
								</AccordionTrigger>
								<AccordionContent>
									<CarrierSummaryChart />
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-2">
								<AccordionTrigger>
									<h6 className={`${styles.smallHeading}`}>Trainings</h6>
								</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col gap-6 pl-5">
										{!trainings ? (
											trainings?.map((training) => (
												<div className="flex flex-col" key={training.id}>
													<div className="text-sm">Course : {training.courseTaken}</div>
													<div className="text-sm">Length : {training.courseLength}</div>
													<div className="text-sm">Mentor : {training.mentor}</div>
													<div className="text-sm">Instituition : {training.instituition}</div>
												</div>
											))
										) : (
											<>No record</>
										)}
									</div>
								</AccordionContent>
							</AccordionItem>
							<AccordionItem value="item-3">
								<AccordionTrigger>
									<h6 className={`${styles.smallHeading}`}>Skills</h6>
								</AccordionTrigger>
								<AccordionContent>
									<div className="flex flex-col gap-2 pl-5">
										<h6 className={`text-sm`}>Language Skills</h6>
										<div className="flex flex-wrap gap-2">
											{teamMember.languageSkills?.map((languageSkill) => (
												<Badge key={languageSkill} variant="secondary" className="capitalize">
													{languageSkill}
												</Badge>
											))}
										</div>
										<h6 className={`test-sm`}>Additional Skills</h6>
										<div className="flex flex-wrap gap-2">
											{teamMember.additionalSkills?.map((additionalSkill) => (
												<Badge key={additionalSkill} variant="secondary" className="capitalize">
													{additionalSkill}
												</Badge>
											))}
										</div>
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</div>
				</div>
			</AppMaxWidthContainer>

			<div className="px-8 py-32">
				<AppMaxWidthContainer>
					<div className="flex flex-col gap-y-5 md:gap-x-10">
						<div className="flex flex-col">
							<span className={`${styles.titleHeading}`}>Vocal/Music</span>
							<h1 className={`${styles.heading} text-4xl`}>
								My <span className={`${styles.textHGradient}`}>AUDIOREELS</span>
							</h1>
						</div>
						<div className={`${styles.fancyBorderedBox} grid grid-cols-1 md:grid-cols-2 justify-between gap-5 md:gap-10`}>
							<div className={"flex flex-col gap-2"}>
								<div className={"flex flex-col gap-2"}>No data</div>
							</div>
						</div>
					</div>
				</AppMaxWidthContainer>
			</div>

			<div className="px-8 py-32">
				<AppMaxWidthContainer>
					<div className="flex flex-col gap-y-5 md:gap-x-10">
						<div className="flex flex-col">
							<span className={`${styles.titleHeading}`}>GALLERY</span>
							<h1 className={`${styles.heading} text-4xl`}>
								My <span className={`${styles.textHGradient}`}>GALLERY</span>
							</h1>
						</div>
						<div className={`${styles.fancyBorderedBox} grid grid-cols-1 md:grid-cols-2 justify-between gap-5 md:gap-10`}>
							<div className={"flex flex-col gap-2"}>
								<div className={"flex flex-col gap-2"}>No data</div>
							</div>
						</div>
					</div>
				</AppMaxWidthContainer>
			</div>

			<div className="px-8 py-32">
				<AppMaxWidthContainer>
					<div className="flex flex-col gap-y-5 md:gap-x-10">
						<div className="flex flex-col">
							<span className={`${styles.titleHeading}`}>SHOWREELS</span>
							<h1 className={`${styles.heading} text-4xl`}>
								My <span className={`${styles.textHGradient}`}>SHOWREELS</span>
							</h1>
						</div>
						<div className={`${styles.fancyBorderedBox} grid grid-cols-1 md:grid-cols-2 justify-between gap-5 md:gap-10`}>
							<div className={"flex flex-col gap-2"}>No data</div>
						</div>
					</div>
				</AppMaxWidthContainer>
			</div>

			<div className="px-8 py-32">
				<AppMaxWidthContainer>
					<div className="flex flex-col gap-y-5 md:gap-x-10">
						<div className="flex flex-col">
							<span className={`${styles.titleHeading}`}>REVIEWS</span>
							<h1 className={`${styles.heading} text-4xl`}>
								My <span className={`${styles.textHGradient}`}>REVIEWS</span>
							</h1>
						</div>
						<div className={`${styles.fancyBorderedBox} grid grid-cols-1 md:grid-cols-2 justify-between gap-5 md:gap-10`}>
							<div className={"flex flex-col gap-2"}>
								<div className={"flex flex-col gap-2"}>No data</div>
							</div>
						</div>
					</div>
				</AppMaxWidthContainer>
			</div>
		</div>
	);
}

function DetailBox({ containerClass, heading, subHeading }) {
	return (
		<div className={containerClass && "flex flex-col gap-1"}>
			<h6 className={`${styles.smallHeading} text-white`}>{heading}</h6>
			<div className="text-base leading-tight text-muted-foreground font-normal">{subHeading}</div>
		</div>
	);
}
