import { SkeletonCard } from "@/components/Skeletons/SkeletonCard";

export default function Loading() {
	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-5">
			<SkeletonCard count={10} className="grid" />
		</div>
	);
}
