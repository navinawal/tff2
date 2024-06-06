import Link from "next/link";
import styles from "@/components/Auth/AuthButtons/styles.module.css";

export default function AuthButtons() {
	return (
		<div className="relative inline-flex items-center gap-2">
			<Link href="/login" className={styles.button}>
				<span data-text="Login">Login</span>
			</Link>
			<Link href="/register" className={[styles.button, styles.buttonWhite].join(" ")}>
				<span data-text="Register">Register</span>
			</Link>
		</div>
	);
}
