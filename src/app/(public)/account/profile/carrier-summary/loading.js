import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
	return (
		<div className="flex flex-col gap-5">
			<div className="flex flex-col gap-2">
				<Skeleton className="h-5 w-2/6" />
				<Skeleton className="h-4 w-2/3" />
			</div>
			<Separator />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{Array.from({ length: 6 }).map((item, index) => (
					<div key={index}>
						<div className="flex flex-col gap-2">
							<Skeleton className="h-2 w-2/6" />
							<Skeleton className="h-8" />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
