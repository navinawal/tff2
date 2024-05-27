import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaFacebook, FaLinkedinIn, FaPinterestP } from "react-icons/fa";

export default function AuthContainer({ children }) {
	const socialLinks = [
		{
			name: "facebook",
			url: "#",
			icon: <FaFacebook />,
		},
		{
			name: "twitter",
			url: "#",
			icon: <FaTwitter />,
		},
		{ name: "linkedin", url: "#", icon: <FaLinkedinIn /> },
		{ name: "pinterest", url: "#", icon: <FaPinterestP /> },
	];
	return (
		<div className="flex flex-row justify-center items-center h-screen">
			<div className="flex flex-col md:flex-row w-9/12">
				<div className="w-full">
					<div
						className="relative rounded-l-md bg-cover bg-center h-full min-h-[160px] mb-[100px] z-10 after:absolute after:inset-0 after:bg-[#2f2cd8] after:opacity-75 after:z-[-1] after:rounded-l-md"
						style={{ backgroundImage: "url('https://ekash-next.vercel.app/images/1.jpg')" }}
					>
						<div className="p-8">
							<div className="p-0 m-0">
								<Link href="/">
									{/* <Image alt="TeamforFilm" src="https://ekash-next.vercel.app/images/logo-white.png" width={100} height={100}></Image> */}
									<img src="https://ekash-next.vercel.app/images/logo-white.png" alt="" width="30" />
								</Link>
								<h3 className="text-white text-lg my-5">Welcome to Ekash</h3>
							</div>
						</div>
						<div className="absolute flex flex-col left-8 bottom-8">
							<div className="mb-5 p-0">
								<ul className="flex gap-5 text-white">
									{socialLinks.map((socialLink) => (
										<li key={socialLink.name}>
											<Link href={socialLink.url} target="_blank">
												{socialLink.icon}
											</Link>
										</li>
									))}
								</ul>
							</div>
							<div className="m-0 p-0">
								<Link className="text-white" href="#">
									Privacy Policy
								</Link>
							</div>
						</div>
					</div>
				</div>
				<div className="w-full bg-white rounded-r-md">
					<div className="p-10">{children}</div>
				</div>
			</div>
		</div>
	);
}
