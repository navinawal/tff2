import AppBanner from "@/components/AppBanner";
import AppMaxWidthContainer from "@/components/ui/max-width-container";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TeamMemberCard from "@/components/Card/TeamMember";
import styles from "./styles.module.css";

export default function TeamMembers() {
	const teamMembers = [
		{
			name: "sarahsatoshi.btc",
			username: "vanillabean",
			description:
				"To begin, prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling...",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/albert-dera-ILip77SbmOE-unsplash-408x570.jpg", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "sarahsatoshi.btc",
			username: "vanillabean",
			description:
				"To begin, prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling...",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/stephanie-nakagawa-ADSKIn0ScDg-unsplash-408x570.jpg", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "user2.btc",
			username: "user 2",
			description:
				"To begin, prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling...",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/alex-perri-At__EKm5PGE-unsplash-408x570.jpg", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "user3.btc",
			username: "User 3",
			description:
				"To begin, prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling. prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling..",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/stephan-louis-L3s5QySz5UM-unsplash-408x570.jpg", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "user4.btc",
			username: "User 4",
			description: "To begin, prepare the aromatics for the chicken. Blanch ",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/shayan-rti-GqzJeuecB2A-unsplash-408x570.jpg", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "user33.btc",
			username: "User 3",
			description:
				"To begin, prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling. prepare the aromatics for the chicken. Blanch the thyme in boiling water and refresh in iced water. Lay out a sheet of cling..",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/stephan-louis-L3s5QySz5UM-unsplash-408x570.jpg", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
		{
			name: "user44s.btc",
			username: "User 4",
			description: "To begin, prepare the aromatics for the chicken. Blanch ",
			coverImage: "/images/resource/about-img-3.jpg", // Replace with actual cover image URL
			profileImage: "https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/shayan-rti-GqzJeuecB2A-unsplash-408x570.jpg", // Replace with actual profile image URL
			stats: {
				stx: "15.3K STX",
				followers: "1,284",
			},
		},
	];
	return (
		<div className="bg-black text-[#ffffffcc]">
			<AppMaxWidthContainer>
				{/* <div className="flex gap-4 py-20">
					<div className="relative w-3/12">
						<form className="grid w-full items-start gap-6">
							<div className="grid gap-6">
								<h2 className="text-3xl font-bold">Settings</h2>
								<div className="grid gap-3">
									<Label htmlFor="temperature">Search by Keywords</Label>
									<Input id="temperature" type="text" placeholder="Job title, keywords, or company" />
								</div>
								<div className="grid gap-3">
									<Label htmlFor="temperature">Locationords</Label>
									<Input id="temperature" type="text" placeholder="City or Post Code" />
								</div>
								<div className="grid gap-3">
									<Label htmlFor="model">Model</Label>
									<Select>
										<SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
											<SelectValue placeholder="Select a model" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="genesis">
												<div className="flex items-start gap-3 text-muted-foreground">
													<div className="grid gap-0.5">
														<p>
															Neural <span className="font-medium text-foreground">Genesis</span>
														</p>
														<p className="text-xs" data-description>
															Our fastest model for general use cases.
														</p>
													</div>
												</div>
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="grid gap-3">
									<Label htmlFor="temperature">Temperature</Label>
									<Input id="temperature" type="number" placeholder="0.4" />
								</div>
							</div>
						</form>
					</div>
					<div className="relative w-9/12">
						<div className="flex items-start gap-4">
							<h2 className="text-3xl font-bold">Team Members</h2>
							<span className="px-2 py-1 border rounded-full">386</span>
							<div className="ml-auto gap-1.5 text-sm">
								<Select>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="Sort by (default)" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="light">Newest</SelectItem>
										<SelectItem value="dark">Oldest</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="mt-4 grid grid-cols-3 gap-3">
							{teamMembers?.map((teamMember) => (
								<TeamMemberCard key={teamMember.username} teamMember={teamMember} />
							))}
						</div>
					</div>
				</div> */}
				<div className="py-12 md:py-24">
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
						{teamMembers?.map((teamMember) => (
							<div key={teamMember.username}>
								<div className="relative overflow-hidden">
									<img
										decoding="async"
										className="h-auto max-w-full border-none w-full transition-[0.5]"
										src={teamMember.profileImage}
										width="408"
										height="570"
										alt="tyler-nix-6UEyVsw_1lU-unsplash"
										title="tyler-nix-6UEyVsw_1lU-unsplash"
									/>
								</div>
								<h2 className={`py-3 text-xl uppercase font-semibold`}>{teamMember.username}</h2>
							</div>
						))}
					</div>
				</div>
			</AppMaxWidthContainer>
		</div>
	);
}
