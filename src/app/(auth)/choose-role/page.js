import AuthContainer from "@/components/Auth/AuthContainer";
import ChooseRoleForm from "@/components/Forms/ChooseRole";

export const metadata = {
	title: "TeamForFilm | Choose Role",
	description: "",
};

export default function ChooseRole() {
	return (
		<AuthContainer heading="Choose a role" subHeading="Please select a role" footerHeading="Back to Home?" footerLinkText="Home" footerLink="/">
			<ChooseRoleForm />
		</AuthContainer>
	);
}
