import AppMaxWidthContainer from "@/components/ui/max-width-container";
import Image from "next/image";
import Link from "next/link";
import { basicInfo, socialLinks, publicLinks, downloadLinks } from "@/lib/app.config";
import { IoMail } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { IoHome } from "react-icons/io5";

export default function AppFooter() {
	const currentYear = new Date().getFullYear();
	return (
		<footer className="bg-[#181a1c]">
			<div
				className="py-24"
				style={{
					borderBottom: "1px solid #464646",
				}}
			>
				<AppMaxWidthContainer>
					<div className="flex flex-wrap justify-between gap-10">
						<div className="flex flex-col px-3 max-w-xs">
							<Link href="/" className="w-100 mb-6">
								<Image className="inline-block h-auto max-w-52" alt="image" src="/logo_white.png" width="200" height="200"></Image>
							</Link>
							<div className="mb-6 text-base text-[#b2b2b2]">
								Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantiu doloremque laudantium
							</div>
							<div className="flex gap-2">
								{socialLinks?.map((socialLink) => (
									<Link
										key={socialLink.name}
										href={socialLink.href}
										target="_blank"
										rel="noopener norefer"
										className="flex justify-center items-center h-9 w-9 leading-9 bg-white text-center rounded-full text-[#777]"
									>
										{socialLink.icon}
									</Link>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-5 px-3">
							<h4 className="text-2xl font-bold text-white">Useful Link</h4>
							<div className="flex flex-col gap-2">
								{publicLinks?.map((publicLink) => (
									<Link key={publicLink.id} href={publicLink.href} target="_blank" rel="noopener norefer" className="text-base text-[#b2b2b2]">
										{publicLink.name}
									</Link>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-5 px-3">
							<h4 className="text-2xl font-bold text-white">Download</h4>
							<div className="flex flex-col gap-2">
								{downloadLinks?.map((downloadLink) => (
									<Link key={downloadLink.id} href={downloadLink.href} target="_blank" rel="noopener norefer" className="text-base text-[#b2b2b2]">
										<div className="flex items-center gap-2">
											{downloadLink.icon}
											{downloadLink.name}
										</div>
									</Link>
								))}
							</div>
						</div>

						<div className="flex flex-col gap-5 px-3">
							<h4 className="text-2xl font-bold text-white">Contact</h4>
							<div className="flex flex-col gap-2">
								<Link href={basicInfo.phoneNumber} target="_blank" rel="noopener norefer" className="text-base text-[#b2b2b2]">
									<div className="flex items-center gap-2">
										<FaPhoneAlt />
										{basicInfo.phoneNumber}
									</div>
								</Link>
								<Link href={basicInfo.contactEmail} target="_blank" rel="noopener norefer" className="text-base text-[#b2b2b2]">
									<div className="flex items-center gap-2">
										<IoMail />
										{basicInfo.contactEmail}
									</div>
								</Link>
								<div className="text-base text-[#b2b2b2]">
									<div className="flex items-center gap-2">
										<IoHome />
										{basicInfo.address}
									</div>
								</div>
							</div>
						</div>
					</div>
				</AppMaxWidthContainer>
			</div>
			<div className="w-full flex justify-between items-center py-5">
				<div className="w-full flex justify-center text-base text-[#b2b2b2]">
					&copy; {currentYear} <strong className="ml-1">{basicInfo.siteName}</strong>. All rights reserved.
				</div>
			</div>
		</footer>
	);
}
