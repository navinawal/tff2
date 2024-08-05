import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
			{Array.from({ length: 10 }).map((_, index) => (
				<div className="flex flex-col space-y-3 w-full" key={index}>
					<Skeleton className="h-[400px] md:h-[350px] lg:h-[300px] rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-2/6" />
						<Skeleton className="h-4 w-2/4" />
					</div>
				</div>
			))}
		</div>
	);
}
