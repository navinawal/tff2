import { SkeletonCard } from "@/components/Skeletons/SkeletonCard";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Skeleton className="h-10" />
				<Skeleton className="h-10" />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Skeleton className="h-10" />
				<Skeleton className="h-10" />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Skeleton className="h-10" />
				<Skeleton className="h-10" />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<Skeleton className="h-10" />
				<Skeleton className="h-10" />
			</div>
		</div>
	);
}
