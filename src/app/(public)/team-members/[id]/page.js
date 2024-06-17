import AppMaxWidthContainer from "@/components/ui/max-width-container";
import Image from "next/image";
import styles from "./styles.module.css";
import { CarrierSummaryChart } from "@/components/Account/TeamMember/CarrierSummaryChart";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function TeamMemberDetails({ params }) {
	const { id } = params;
	return (
		<div className="bg-black text-[#ffffffcc]">
			<div className="py-12 md:py-24">
				<AppMaxWidthContainer>
					<div className="flex justify-center items-center">
						<h1 className={`${styles.strokeHeading} text-5xl md:text-9xl text-white font-bold`}>Arthur Jackson</h1>
					</div>
				</AppMaxWidthContainer>
			</div>

			<AppMaxWidthContainer>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-10">
					<div className="flex flex-col justify-center items-center gap-4">
						<img
							src="https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/stephan-louis-L3s5QySz5UM-unsplash-408x570.jpg"
							width="250"
							height="600"
							alt=""
							className="rounded-sm"
						></img>
					</div>
					<div className="flex flex-col col-span-2 justify-center items-start gap-6">
						<DetailBox
							containerClass="flex flex-col gap-3"
							heading="About Me"
							subHeading="Very well thought out and articulate communication. Clear milestones, deadlines and fast work. Patience. Infinite patience. No
								shortcuts. Even if the client is being careless. Some quick example text to build on the card title and bulk the card`s content Moltin
								gives you platform. As a highly skilled and successfull product development and design specialist with more than 4 Years of My
								experience lies in successfully conceptualizing, designing, and modifying consumer products specific to interior design and home
								furnishings."
						/>
						<div className="grid grid-cols-3 justify-between w-full gap-6">
							<DetailBox containerClass="flex flex-col gap-3" heading="Age" subHeading="35 Years old" />
							<DetailBox containerClass="flex flex-col gap-3" heading="Nationality" subHeading="Nepalese" />
							<DetailBox containerClass="flex flex-col gap-3" heading="Location" subHeading="Kathmandu" />
						</div>
						<div className="grid grid-cols-3 justify-between content-start w-full gap-6">
							<DetailBox containerClass="flex flex-col gap-3" heading="Department" subHeading="Editor, Producer, Actor" />
							<DetailBox containerClass="flex flex-col gap-3" heading="Skills" subHeading="English, Hindi, Maga" />
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
									<div className="grid grid-cols-3 justify-between w-full gap-6">
										<DetailBox containerClass="flex flex-col gap-1" heading="Age" subHeading="35 Years old" />
										<DetailBox containerClass="flex flex-col gap-1" heading="Nationality" subHeading="Nepalese" />
										<DetailBox containerClass="flex flex-col gap-1" heading="Location" subHeading="Kathmandu" />
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
			<h6 className={`${styles.smallHeading}`}>{heading}</h6>
			<div className="text-base leading-tight">{subHeading}</div>
		</div>
	);
}
