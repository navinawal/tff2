import AppMaxWidthContainer from "./ui/max-width-container";
import Image from "next/image";
import Link from "next/link";
import { socialLinks } from "@/lib/app.config";

export default function AppFooter() {
	const currentYear = new Date().getTime();
	return (
		<footer className="p-2">
			<div className="relative flex flex-col pt-[200px] main-footer style-six alternate -type-11 bg-background rounded">
				<AppMaxWidthContainer>
					<div className="w-full absolute left-0 top-[-200px]">
						<Image
							className="inline-block h-auto max-w-[376px]"
							alt="image"
							src="/images/index-11/footer/1.png"
							width="100"
							height="100"
							layout="responsive"
							sizes="100vw"
						></Image>
					</div>
					<div className="w-full flex flex-col md:flex-row justify-between items-start gap-4 py-4">
						<Link href="/" className="w-100">
							<Image
								className="inline-block h-auto max-w-[376px]"
								alt="image"
								src="/logo_white.png"
								width="100"
								height="100"
								layout="responsive"
								sizes="100vw"
							></Image>
						</Link>
						<div className="flex flex-col gap-2 w-100">
							<p className="phone-num">
								<span>Call us </span>
								<a href="thebeehost@support.com">123 456 7890</a>
							</p>
							<p className="address">
								329 Queensberry Street, North Melbourne VIC
								<br />
								3051, Australia. <br />
								<a href="mailto:support@superio.com" className="email">
									support@superio.com
								</a>
							</p>
						</div>
						<div className="widget-content w-100">
							<h4 className="widget-title">For Candidates</h4>
							<ul className="list">
								<li>
									<a href="/">Browse Jobs</a>
								</li>
								<li>
									<a href="/">Browse Categories</a>
								</li>
								<li>
									<a href="/">Candidate Dashboard</a>
								</li>
								<li>
									<a href="/">Job Alerts</a>
								</li>
								<li>
									<a href="/">My Bookmarks</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="w-full flex flex-col md:flex-row justify-between items-center pt-3" style={{ borderTop: "1px solid" }}>
						<div className="w-full text-start md:text-center">&copy; {currentYear} TeamForFilm. All rights reserved.</div>
						<div className="w-full flex justify-end gap-4">
							{socialLinks?.map((socialLink) => (
								<Link key={socialLink.name} href={socialLink.href} target="_blank" rel="noopener norefer" className="text-white">
									{socialLink.icon}
								</Link>
							))}
						</div>
					</div>
				</AppMaxWidthContainer>
			</div>
		</footer>
	);
}
