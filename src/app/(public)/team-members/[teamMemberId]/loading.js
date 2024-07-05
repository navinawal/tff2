import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="py-12 md:py-20">
			<div className="container">
				<div className="flex flex-col space-y-5">
					<Skeleton className="h-8 w-2/6" />
					<Skeleton className="h-20 w-2/4" />
					<div className="flex gap-5">
						<Skeleton className="h-[400px] w-[300px] rounded-md" />
						<div className="flex flex-1 flex-col justify-between">
							<Skeleton className="h-8 w-2/6" />
							<Skeleton className="h-5 w-2/4" />
							<Skeleton className="h-5 w-2/6" />
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-12 w-full" />
							<Skeleton className="h-12 w-full" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
