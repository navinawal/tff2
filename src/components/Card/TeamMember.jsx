import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import styles from "@/components/Card/styles.module.css";
import { Badge } from "../ui/badge";
import { socialLinks } from "@/config/site";

export default function TeamMemberCard({ teamMember }) {
	return (
		<>
			<Link key={teamMember.name} href={`/team-members/${teamMember.uid}`}>
				<div className={`${styles.userWrapper} relative overflow-hidden rounded-md`}>
					<Image
						decoding="async"
						className="aspect-[3/4] h-fit w-full object-cover transition-all hover:scale-105"
						src={teamMember.profileImage || "/profile_pictures/team_member_profile_placeholder.png"}
						width="300"
						height="400"
						alt="tyler-nix-6UEyVsw_1lU-unsplash"
					/>
					<div className={`${styles.userDetails} flex flex-col gap-2`}>
						<div className="text-[28px] font-bold">
							{teamMember.firstName} {teamMember.lastName}
						</div>
						<div className="flex flex-wrap gap-2 text-[14px] italic py-1 line-clamp-1">
							{teamMember.filmDepartments?.map((filmDepartment) => (
								<Badge key={filmDepartment} variant="secondary" className={`capitalize`}>
									{filmDepartment}
								</Badge>
							))}
						</div>
						<p className="text-sm text-muted-foreground line-clamp-2 lg:line-clamp-2 mt-5">{teamMember.about}</p>

						<div className="flex flex-col justify-end flex-1 mt-2">
							<Button size="sm" variant="outline" className="h-8 gap-1 w-full ">
								<span className="whitespace-nowrap">View Profile</span>
							</Button>
						</div>
					</div>
				</div>
				<div className="space-y-1 py-3 text-sm capitalize">
					<h3 className="font-medium leading-none">
						{teamMember.firstName} {teamMember.lastName}
					</h3>
					<p className="text-xs text-muted-foreground line-clamp-1">{teamMember.about}</p>
				</div>
			</Link>
		</>
	);
}
