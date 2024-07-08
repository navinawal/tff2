import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CompanyCard({ company }) {
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
					<div className="font-bold text-xl">{company.companyName}</div>
					<div className="text-gray-500">{company.location}</div>
					<div className="text-gray-500">{company.email}</div>
					<div className="text-gray-500">{company.noOfEmployees}</div>
					<div>
						<Button asChild variant="link" className="m-0 p-0 h-0">
							<Link href={`/companies/${company.id}`}>View Profile</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
