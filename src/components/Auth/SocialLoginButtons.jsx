"use client";

import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { FaFacebook } from "react-icons/fa";

export default function SocialLoginButtons({ onSocialLogin }) {
	return (
		<>
			<div className="flex flex-row justify-center items-center text-sm gap-2">
				<Button className="w-full h-10" variant="outline" onClick={() => onSocialLogin("google")}>
					<FcGoogle className="mr-2 h-4 w-4" />
				</Button>
				<Separator orientation="vertical" />
				<Button className="w-full h-10" variant="outline" onClick={() => onSocialLogin("facebook")}>
					<FaFacebook className="mr-2 h-4 w-4" />
				</Button>
			</div>
		</>
	);
}
