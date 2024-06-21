import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function SkeletonCard({ count = 1, className }) {
	return (
		<>
			{Array.from({ length: count }).map((_, index) => (
				<div className={cn("flex flex-col space-y-3 w-full", className)} key={index}>
					<Skeleton className="h-[125px] rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4" />
						<Skeleton className="h-4" />
					</div>
				</div>
			))}
		</>
	);
}
