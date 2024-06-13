"use client";
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PaginationControls({ page, pageSize, totalItems, setPage, setPageSize }) {
	const totalPages = Math.ceil(totalItems / pageSize);

	return (
		<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
			<div className="flex justify-start items-center gap-5 w-full">
				<p className="text-sm font-medium">Rows per page</p>
				<Select value={`${pageSize}`} onValueChange={(value) => setPageSize(Number(value))}>
					<SelectTrigger className="h-8 w-[70px]">
						<SelectValue placeholder={pageSize} />
					</SelectTrigger>
					<SelectContent side="top">
						{[10, 20, 30, 40, 50].map((size) => (
							<SelectItem key={size} value={`${size}`}>
								{size}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex justify-end items-center w-full gap-5">
				<div className="flex items-center justify-center text-sm font-medium">
					Page {page + 1} of {totalPages}
				</div>
				<div className="flex items-center space-x-2">
					<Button variant="outline" className="h-8 w-8 p-0" onClick={() => setPage(0)} disabled={page === 0}>
						<DoubleArrowLeftIcon className="h-4 w-4" />
					</Button>
					<Button variant="outline" className="h-8 w-8 p-0" onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
						<ChevronLeftIcon className="h-4 w-4" />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
						disabled={page === totalPages - 1}
					>
						<ChevronRightIcon className="h-4 w-4" />
					</Button>
					<Button variant="outline" className="h-8 w-8 p-0" onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}>
						<DoubleArrowRightIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}
