import AppMaxWidthContainer from "@/components/ui/max-width-container";
import Image from "next/image";
import styles from "./styles.module.css";

export default function TeamMemberDetails({ params }) {
	console.log(params);
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
						<img src="https://mone.flatheme.net/assets/images/hero-avatar.jpg" width="320" height="320" alt="" className="rounded-full"></img>
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
						<DetailBox containerClass="flex flex-col gap-3" heading="Department" subHeading="Editor, Producer, Actor" />
						<DetailBox containerClass="flex flex-col gap-3" heading="Skills" subHeading="English, Hindi, Maga" />
					</div>
				</div>
			</AppMaxWidthContainer>

			<div className="py-12 md:py-20">
				<AppMaxWidthContainer>
					<div className="flex flex-col gap-y-5 md:gap-x-10">
						<div className="flex flex-col">
							<span className={`${styles.titleHeading}`}>Carrier Summary</span>
							<h1 className={`${styles.heading} text-4xl`}>
								What I <span className={`${styles.textHGradient}`}>Did</span>
							</h1>
						</div>
						<div class="grid grid-cols-3 md:grid-cols-7 place-content-center gap-10">
							<div className="flex flex-col items-center text-center gap-3">
								<h6 className={`${styles.smallHeading}`}>Feature Films</h6>
								<h1 className={`${styles.heading} ${styles.strokeHeading} text-3xl md:text-6xl`}>2</h1>
							</div>
							<div className="flex flex-col items-center text-center gap-3">
								<h6 className={`${styles.smallHeading}`}>Short Films</h6>
								<h1 className={`${styles.heading} ${styles.strokeHeading} text-3xl md:text-6xl`}>3</h1>
							</div>
							<div className="flex flex-col items-center text-center gap-3">
								<h6 className={`${styles.smallHeading}`}>Music Videos</h6>
								<h1 className={`${styles.heading} ${styles.strokeHeading} text-3xl md:text-6xl`}>0</h1>
							</div>
							<div className="flex flex-col items-center text-center gap-3">
								<h6 className={`${styles.smallHeading}`}>Documentaries</h6>
								<h1 className={`${styles.heading} ${styles.strokeHeading} text-3xl md:text-6xl`}>9</h1>
							</div>
							<div className="flex flex-col items-center text-center gap-3">
								<h6 className={`${styles.smallHeading}`}>Tv ADS</h6>
								<h1 className={`${styles.heading} ${styles.strokeHeading} text-3xl md:text-6xl`}>0</h1>
							</div>
							<div className="flex flex-col items-center text-center gap-3">
								<h6 className={`${styles.smallHeading}`}>Theatre Drama</h6>
								<h1 className={`${styles.heading} ${styles.strokeHeading} text-3xl md:text-6xl`}>33</h1>
							</div>
							<div className="flex flex-col items-center text-center gap-3">
								<h6 className={`${styles.smallHeading}`}>TV/Web Series</h6>
								<h1 className={`${styles.heading} ${styles.strokeHeading} text-3xl md:text-6xl`}>432</h1>
							</div>
						</div>
					</div>
				</AppMaxWidthContainer>
			</div>

			<div className="py-12 md:py-14">
				<AppMaxWidthContainer>
					<div className="grid grid-flow-row lg:grid-cols-3 gap-5">
						<div className="flex flex-col">
							<span className={`${styles.titleHeading}`}>Trainings And Affiliations</span>
							<h1 className={`${styles.heading} text-4xl`}>
								My <span className={`${styles.textHGradient}`}>Trainings</span>
							</h1>
						</div>
						<div class="col-span-2 flex flex-col gap-10">
							<div className={`${styles.fancyBorderedBox} grid grid-cols-1 md:grid-cols-2 justify-between gap-5 md:gap-10`}>
								<div className={"flex flex-col gap-2"}>
									<h6 className={`${styles.titleHeading}`}>Type Of Course Taken</h6>
									<div className="text-base leading-tight">Course Taken</div>
								</div>
								<div className={"flex flex-col gap-2"}>
									<h6 className={`${styles.titleHeading}`}>Training Instituition</h6>
									<div className="text-base leading-tight">Instituition</div>
								</div>
								<div className={"flex flex-col gap-2"}>
									<h6 className={`${styles.titleHeading}`}>Mentor (Trainer)</h6>
									<div className="text-base leading-tight">Trainer</div>
								</div>
								<div className={"flex flex-col gap-2"}>
									<h6 className={`${styles.titleHeading}`}>Length Of The Course</h6>
									<div className="text-base leading-tight">12</div>
								</div>
							</div>
							<div className={`${styles.fancyBorderedBox} grid grid-cols-1 md:grid-cols-2 justify-between gap-5 md:gap-10`}>
								<div className={"flex flex-col gap-2"}>
									<h6 className={`${styles.titleHeading}`}>Type Of Course Taken</h6>
									<div className="text-base leading-tight">Course Taken</div>
								</div>
								<div className={"flex flex-col gap-2"}>
									<h6 className={`${styles.titleHeading}`}>Training Instituition</h6>
									<div className="text-base leading-tight">Instituition</div>
								</div>
								<div className={"flex flex-col gap-2"}>
									<h6 className={`${styles.titleHeading}`}>Mentor (Trainer)</h6>
									<div className="text-base leading-tight">Trainer</div>
								</div>
								<div className={"flex flex-col gap-2"}>
									<h6 className={`${styles.titleHeading}`}>Length Of The Course</h6>
									<div className="text-base leading-tight">12</div>
								</div>
							</div>
						</div>
					</div>
				</AppMaxWidthContainer>
			</div>

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
		<div className={containerClass && "flex flex-col gap-3"}>
			<h6 className={`${styles.smallHeading}`}>{heading}</h6>
			<div className="text-base leading-tight">{subHeading}</div>
		</div>
	);
}
