"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { FaFacebook } from "react-icons/fa";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

export default function SocialLoginButtons({ onError }) {
	const router = useRouter();
	const { loginWithGoogle, loginWithFacebook } = useAuth();
	const handleGoogleLogin = async () => {
		try {
			const response = await loginWithGoogle();
			// console.log(response);
			router.push("/account/profile");
		} catch (error) {
			onError(error.message);
		}
	};

	const handleFacebookLogin = async () => {
		try {
			const response = await loginWithFacebook();
			// console.log(response);
			router.push("/account/profile");
		} catch (error) {
			onError(error.message);
		}
	};
	return (
		<>
			<div className="flex flex-row justify-center items-center text-sm gap-2">
				<Button className="w-full" variant="outline" onClick={handleGoogleLogin}>
					<FcGoogle className="mr-2 h-4 w-4" />
				</Button>
				<Separator orientation="vertical" />
				<Button className="w-full" variant="outline" onClick={handleFacebookLogin}>
					<FaFacebook className="mr-2 h-4 w-4" />
				</Button>
			</div>
		</>
	);
}
