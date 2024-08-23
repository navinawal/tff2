import Link from "next/link";
import "@/components/Auth/AuthButtons/auth-buttons.css";

export default function AuthButtons() {
	return (
		<div className="relative inline-flex items-center gap-2">
			<Link href="/login" className="auth-button">
				<span className="auth-button-span" data-text="Login">Login</span>
			</Link>
			<Link href="/register" className="auth-button auth-button-white">
				<span className="auth-button-span" data-text="Register">Register</span>
			</Link>
		</div>
	);
}