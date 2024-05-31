import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TeamMemberCard({ teamMember }) {
	return (
		<div className="max-w-sm bg-white rounded-xl overflow-hidden shadow-sm p-2">
			<div className="relative">
				<Image src={teamMember.coverImage} alt="Cover" className="w-full rounded-xl h-40 object-cover" height="100" width="100"></Image>
				<Image
					src={teamMember.profileImage}
					alt="Profile"
					height="100"
					width="100"
					className="absolute left-4 transform top-24 w-24 h-24 rounded-full border-4 border-white"
				></Image>
			</div>
			<div className="flex flex-col justify-between gap-1 mt-4 p-3">
				<div className="font-bold text-xl">{teamMember.name}</div>
				<div className="text-gray-500">@{teamMember.username}</div>
				<p className="text-gray-700 text-sm line-clamp-2">{teamMember.description}</p>
				<div className="flex justify-between items-center mt-2">
					<div>
						<div className="text-lg font-bold">{teamMember.stats.stx}</div>
						<div className="text-gray-500 text-sm">Collected</div>
					</div>
					<div>
						<div className="text-lg font-bold">{teamMember.stats.followers}</div>
						<div className="text-gray-500 text-sm">Followers</div>
					</div>
					<Button asChild style={{ backgroundColor: "black", color: "white" }}>
						<Link href="/team-members/1">Details</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
