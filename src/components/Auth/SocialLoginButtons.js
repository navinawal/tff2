"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { Separator } from "@radix-ui/react-separator";
import { FaFacebook } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export default function SocialLoginButtons() {
	function socialLogin(provider) {
		signIn(provider, {
			callbackUrl: DEFAULT_LOGIN_REDIRECT,
		});
	}
	return (
		<>
			<div className="flex h-5 items-center space-x-4 text-sm">
				<Button className="w-full" variant="outline" onClick={() => socialLogin("google")}>
					<FcGoogle className="mr-2 h-4 w-4" /> Log In with Google
				</Button>
				<Separator orientation="vertical" />
				<Button className="w-full" variant="outline" onClick={() => socialLogin("github")}>
					<FaFacebook className="mr-2 h-4 w-4" /> Log In with Facebook
				</Button>
			</div>
		</>
	);
}
