import AuthContainer from "@/components/Auth/AuthContainer";
import LoginForm from "@/components/Forms/LoginForm";

export const metadata = {
	title: "TeamForFilm | Login",
	description: "Generated by create next app",
};

export default function Login() {
	return (
		<>
			<AuthContainer>
				<LoginForm />
			</AuthContainer>
		</>
	);
}
