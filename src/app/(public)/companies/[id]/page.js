import AppMaxWidthContainer from "@/components/ui/max-width-container";
import Image from "next/image";
import styles from "./styles.module.css";

export default function ComplanyDetails({ params }) {
	console.log(params);
	return (
		<div className="flex flex-col gap-24 py-12 md:py-24 bg-black text-[#ffffffcc]">
			<AppMaxWidthContainer>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-10">
					<div className="flex flex-col justify-start gap-4">
						<div className="flex flex-col justify-center items-center py-8">
							<img src="https://mone.flatheme.net/assets/images/hero-avatar.jpg" width="150" height="150" alt="" className="rounded-full"></img>
							<div className="pt-6">
								<h1 className={`${styles.heading} text-2xl`}>
									Software <span className={`${styles.textHGradient}`}>Company</span>
								</h1>
							</div>
						</div>
					</div>
					<div className="flex flex-col col-span-2 justify-start items-start gap-6">
						<h1 className={`${styles.heading} text-2xl`}>
							<span className={`${styles.textHGradient}`}>Company Name</span>
						</h1>
						<DetailBox
							containerClass="flex flex-col gap-3"
							heading="About Company"
							subHeading="Very well thought out and articulate communication. Clear milestones, deadlines and fast work. Patience. Infinite patience. No
								shortcuts. Even if the client is being careless. Some quick example text to build on the card title and bulk the card`s content Moltin
								gives you platform. As a highly skilled and successfull product development and design specialist with more than 4 Years of My
								experience lies in successfully conceptualizing, designing, and modifying consumer products specific to interior design and home
								furnishings.As a highly skilled and successfull product development and design specialist with more than 4 Years of My experience lies in successfully conceptualizing, designing, and modifying consumer products specific to interior design and home furnishings."
						/>
						<DetailBox containerClass="flex flex-col gap-3" heading="Category" subHeading="Editor, Producer, Actor" />
						<div className="flex flex-col justify-start gap-4 w-full">
							<h1 className={`${styles.heading} text-2xl`}>
								Company <span className={`${styles.textHGradient}`}>Overview</span>
							</h1>
							<DetailBox containerClass="flex justify-between" heading="Owner" subHeading="Khorshed Islam" />
							<DetailBox containerClass="flex justify-between" heading="Gender" subHeading="Male" />
							<DetailBox containerClass="flex justify-between" heading="Number of Employees" subHeading="23" />
							<DetailBox containerClass="flex justify-between" heading="Website" subHeading="www.example.com" />
							<DetailBox containerClass="flex justify-between" heading="Email" subHeading="example@example.com" />
							<DetailBox containerClass="flex justify-between" heading="Location" subHeading="USA" />
						</div>
					</div>
				</div>
			</AppMaxWidthContainer>
			<AppMaxWidthContainer>
				<div className="flex flex-col gap-y-5 md:gap-x-10">
					<div className="flex flex-col">
						<span className={`${styles.titleHeading}`}>GALLERY</span>
						<h1 className={`${styles.heading} text-4xl`}>
							Company <span className={`${styles.textHGradient}`}>GALLERY</span>
						</h1>
					</div>
					<div className={`grid grid-cols-1 md:grid-cols-2 justify-between gap-5 md:gap-10`}>
						<div className={"flex flex-col gap-2"}></div>
					</div>
				</div>
			</AppMaxWidthContainer>
			<AppMaxWidthContainer>
				<div className="flex flex-col gap-y-5 md:gap-x-10">
					<div className="flex flex-col">
						<span className={`${styles.titleHeading}`}>Current Offering Positions</span>
						<h1 className={`${styles.heading} text-4xl`}>
							Job <span className={`${styles.textHGradient}`}>Posts</span>
						</h1>
					</div>
					<div className={`grid grid-cols-1 md:grid-cols-2 justify-between gap-5 md:gap-10`}>
						<div className={`${styles.fancyBorderedBox} flex gap-10`}>
							<img
								src="https://mone.flatheme.net/assets/images/hero-avatar.jpg"
								width="100"
								height="100"
								alt=""
								className="w-24 h-24 rounded-full"
							></img>
							<div className="flex flex-col gap-4">
								<h6 className={`${styles.titleHeading}`}>Software Development Company</h6>
								<div className="text-base leading-tight">
									Small or big, your business will love our financial help and business consultations! We are happy when our clients are too…
									Actually, this is quite simple to achieve – because each time we help them in sorting out
								</div>
							</div>
						</div>
						<div className={`${styles.fancyBorderedBox} flex gap-10`}>
							<img
								src="https://mone.flatheme.net/assets/images/hero-avatar.jpg"
								width="100"
								height="100"
								alt=""
								className="w-24 h-24 rounded-full"
							></img>
							<div className="flex flex-col gap-4">
								<h6 className={`${styles.titleHeading}`}>Software Development Company</h6>
								<div className="text-base leading-tight">
									Small or big, your business will love our financial help and business consultations! We are happy when our clients are too…
									Actually, this is quite simple to achieve – because each time we help them in sorting out
								</div>
							</div>
						</div>
					</div>
				</div>
			</AppMaxWidthContainer>
		</div>
	);
}

function DetailBox({ containerClass, heading, subHeading }) {
	return (
		<div className={`${containerClass ? containerClass : "flex flex-col gap-3"}`}>
			<h6 className={`${styles.smallHeading}`}>{heading}</h6>
			<h5 className={`text-base leading-[1.2]`}>{subHeading}</h5>
		</div>
	);
}
