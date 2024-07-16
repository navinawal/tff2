import { getCurrentUser } from "@/app/actions/userAuth";

export default async function Layout({ children, audio_reels, gallery, show_reels, reviews }) {
	const user = await getCurrentUser();
	return (
		<div className="bg-black text-[#ffffffcc]">
			{children}
			{audio_reels}
			{gallery}
			{show_reels}
			{reviews}
		</div>
	);
}
