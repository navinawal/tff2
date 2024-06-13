"use client";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useFilter } from "@/hooks/useFilter";

export function SortingDropdownMenu() {
	const { sortField, sortDirection, updateSorting } = useFilter();

	const handleSort = (field, direction) => {
		updateSorting(field, direction);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="ml-auto hidden h-8 lg:flex">
					<MixerHorizontalIcon className="mr-2 h-4 w-4" />
					Sort
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-[150px]">
				<DropdownMenuItem
					onSelect={() => handleSort("name", "asc")}
					className={`capitalize ${sortField === "name" && sortDirection === "asc" ? "font-bold" : ""}`}
				>
					Name Asc
				</DropdownMenuItem>
				<DropdownMenuItem
					onSelect={() => handleSort("name", "desc")}
					className={`capitalize ${sortField === "name" && sortDirection === "desc" ? "font-bold" : ""}`}
				>
					Name Desc
				</DropdownMenuItem>
				<DropdownMenuItem
					onSelect={() => handleSort("role", "asc")}
					className={`capitalize ${sortField === "role" && sortDirection === "asc" ? "font-bold" : ""}`}
				>
					Role Asc
				</DropdownMenuItem>
				<DropdownMenuItem
					onSelect={() => handleSort("role", "desc")}
					className={`capitalize ${sortField === "role" && sortDirection === "desc" ? "font-bold" : ""}`}
				>
					Role Desc
				</DropdownMenuItem>
				{/* Add more sorting options as needed */}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
