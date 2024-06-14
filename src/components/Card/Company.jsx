import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CompanyCard({ company }) {
	const companies = [
		{
			name: "Stripe",
			username: "Open Jobs – 5",
			description:
				"To begin, prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling...",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "/images/resource/company-5.png", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "Dropbox",
			username: "Open Jobs – 12",
			description:
				"To begin, prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling...",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "/images/resource/company-5.png", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "Figma",
			username: "Open Jobs – 2",
			description:
				"To begin, prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling...",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "/images/resource/company-5.png", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "Udemy",
			username: "Open Jobs – 29",
			description:
				"To begin, prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling. prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling..",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "/images/resource/company-5.png", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "Figma",
			username: "Open Jobs – 22",
			description: "To begin, prepare the aromatics for the chicken. Blanch ",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "/images/resource/company-5.png", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
	];
	return (
		<div className="md:max-w-sm bg-muted rounded-xl overflow-hidden shadow-sm p-2">
			<div className="flex flex-row justify-start items-start gap-3 p-3">
				<Image
					src={company?.profileImage ? company?.profileImage : "/images/resource/company-5.png"}
					alt="Profile"
					height="100"
					width="100"
					className="w-24 h-24 rounded-full border-4 border-white"
				></Image>

				<div className="flex flex-col justify-between items-start">
					<div className="font-bold text-xl">{company.firstName}</div>
					<div className="text-gray-500">@{company.username}</div>
					<div>
						<Button asChild variant="link" className="m-0 p-0 h-0">
							<Link href="/companies/1">View Profile</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
