import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import styles from "@/components/Card/styles.module.css";

const users = [
	"https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/albert-dera-ILip77SbmOE-unsplash-408x570.jpg",
	"https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/stephanie-nakagawa-ADSKIn0ScDg-unsplash-408x570.jpg",
	"https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/alex-perri-At__EKm5PGE-unsplash-408x570.jpg",
	"https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/stephan-louis-L3s5QySz5UM-unsplash-408x570.jpg",
	"https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/shayan-rti-GqzJeuecB2A-unsplash-408x570.jpg",
	"https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/stephan-louis-L3s5QySz5UM-unsplash-408x570.jpg",
	"https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/shayan-rti-GqzJeuecB2A-unsplash-408x570.jpg",
	"https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/albert-dera-ILip77SbmOE-unsplash-408x570.jpg",
	"https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/stephanie-nakagawa-ADSKIn0ScDg-unsplash-408x570.jpg",
	"https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/alex-perri-At__EKm5PGE-unsplash-408x570.jpg",
	"https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/stephan-louis-L3s5QySz5UM-unsplash-408x570.jpg",
	"https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/shayan-rti-GqzJeuecB2A-unsplash-408x570.jpg",
];

export default function TeamMemberCard({ teamMember }) {
	return (
		<>
			<Link key={teamMember.name} href={`/team-members/${teamMember.id}`}>
				<div className={`${styles.userWrapper} relative overflow-hidden rounded-md`}>
					<img
						decoding="async"
						className="h-auto max-w-full border-none w-full transition-all hover:scale-105"
						src={
							users[teamMember.id]
								? users[teamMember.id]
								: "https://zahar.jwsuperthemes.com/model/wp-content/uploads/sites/18/2022/06/shayan-rti-GqzJeuecB2A-unsplash-839x1024.jpg"
						}
						width="408"
						height="570"
						alt="tyler-nix-6UEyVsw_1lU-unsplash"
						title="tyler-nix-6UEyVsw_1lU-unsplash"
					/>
					<div className={`${styles.userDetails} flex flex-col gap-4 uppercase justify-center items-center`}>
						<div className="text-[14px] flex flex-col gap-1">
							<div className="text-white leading-[10px]">Age Category</div>
							<div className="text-muted-foreground">Mid-60s (65-69)</div>
						</div>
						<div className="text-[14px] flex flex-col gap-1">
							<div className="text-white leading-[10px]">Nationality</div>
							<div className="text-muted-foreground">Nepalese</div>
						</div>
						<div className="text-[14px] flex flex-col gap-1">
							<div className="text-white leading-[10px]">Location</div>
							<div className="text-muted-foreground">Arghakhanchi</div>
						</div>
						<Button size="sm" variant="outline" className="h-8 gap-1 w-24">
							<span className="whitespace-nowrap">View Profile</span>
						</Button>
					</div>
				</div>
				<div className="space-y-1 py-3 text-sm capitalize">
					<h3 className="font-medium leading-none">
						{teamMember.firstName} {teamMember.lastName}
					</h3>
					<p className="text-xs text-muted-foreground">{teamMember.username}</p>
				</div>
			</Link>
		</>
	);
}
