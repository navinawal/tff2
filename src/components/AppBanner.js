import AppMaxWidthContainer from "@/components/ui/max-width-container";
import { resources } from "@/lib/app.config";
import Image from "next/image";

export default function AppBanner() {
	return (
		<>
			<section className="banner-section -type-13 relative block py-0 px-4 bg-no-repeat bg-center bg-cover bg-image bg-[url(/images/index-13/header/test.png)]">
				<AppMaxWidthContainer>
					<div className="flex flex-wrap">
						<div className="relative flex flex-col max-w-[60%] pt-[260px] pb-[150px] px-0 gap-4">
							<h3 className="text-[35px] text-white">
								There Are 93,178 Postings Here
								<br />
								For you!
							</h3>
							<div className="text-slate-50">Find Jobs, Employment &amp; Career Opportunities</div>
							<div className="flex items-center gap-4 pt-5">
								<span className="text-white">10k+ Candidates</span>
								<Image src={resources.multiPeopleImage} alt="" width="200" height="200"></Image>
							</div>
						</div>
					</div>
				</AppMaxWidthContainer>
			</section>
		</>
	);
}
