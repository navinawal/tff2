"use client";

import { addTeamMemberToShortList } from "@/app/actions/companies";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";
import { toast } from "sonner";

export default function TeamMemberShortListButton({ companyId, teamMemberId }) {
	const [loading, setLoading] = useState(false);

	const handleShortListTeamMember = async (companyId, teamMemberId) => {
		setLoading(true);
		const response = await addTeamMemberToShortList(companyId, teamMemberId);
		if (response.success) {
			toast.success(response.message);
		} else {
			console.log(response.message);
			toast.error("Something went wrong");
		}
		setLoading(false);
	};

	return (
		<Button onClick={() => handleShortListTeamMember(companyId, teamMemberId)}>
			{loading ? <FiLoader className="mr-2 h-4 w-4 animate-spin" /> : <Bookmark className="mr-2 h-4 w-4" />} Shortlist
		</Button>
	);
}
