import { getCurrentUser } from "@/app/actions/userAuth";
import AuthContainer from "@/components/Auth/AuthContainer";
import ChooseRoleForm from "@/components/Forms/ChooseRole";
import { redirect } from "next/navigation";

export const metadata = {
	title: "TeamForFilm | Choose Role",
	description: "",
};

export default async function ChooseRole() {
	const user = await getCurrentUser();

	if (!user) redirect("/login");

	const { uid } = user;

	return (
		<AuthContainer heading="Choose a role" subHeading="Please select a role" footerHeading="Back to Home?" footerLinkText="Home" footerLink="/">
			<ChooseRoleForm uid={uid} />
		</AuthContainer>
	);
}
