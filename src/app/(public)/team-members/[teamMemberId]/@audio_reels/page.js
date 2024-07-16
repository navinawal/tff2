import AppMaxWidthContainer from "@/components/ui/max-width-container";
import AudioReelsDialog from "../AudioReelsDialog";

export default async function AudioReels({ params }) {
	const { teamMemberId } = params;
	return (
		<div className="px-8 py-32">
			<AppMaxWidthContainer>
				<div className="flex flex-col gap-y-5 md:gap-x-10">
					<div className="flex justify-between items-center">
						<div className="flex flex-col">
							AUDIOREELS
							{/* <span className={`${styles.titleHeading}`}>Vocal/Music</span>
							<h1 className={`${styles.heading} text-4xl`}>
								My <span className={`${styles.textHGradient}`}>AUDIOREELS</span>
							</h1> */}
						</div>
						{/* {uid && uid === teamMemberId ? <AudioReelsDialog teamMemberId={teamMemberId} /> : null} */}
					</div>
					<div className={`flex justify-between gap-5`}>{/* <AudioReels teamMemberId={teamMemberId} audioReels={audioReels} /> */}</div>
				</div>
			</AppMaxWidthContainer>
		</div>
	);
}
