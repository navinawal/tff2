"use client";

import FacetedDropdownFilter from "@/components/ui/faceted-dropdown-filter";
import { PaginationControls } from "@/components/Data/PaginationControls";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useFilter } from "@/hooks/useFilter";
import { usePaginatedData } from "@/hooks/usePaginatedData";
import { SortingDropdownMenu } from "./shorting-menu";
import CompanyCard from "@/components/Card/Company";

export default function CompaniesDataGrid() {
	const { selectedFilters, updateFilter, searchQuery, updateSearchQuery, sortField, sortDirection } = useFilter();
	const { data, loading, error, page, pageSize, totalItems, setPage, setPageSize } = usePaginatedData(
		"https://dummyjson.com/users",
		selectedFilters,
		searchQuery,
		sortField,
		sortDirection
	);

	const filmDepartmentOptions = [
		{ value: "Actor", label: "Actor" },
		{ value: "Acting coach", label: "Acting coach" },
		{ value: "Action/Stunt Coordinator", label: "Action/Stunt Coordinator" },
		{ value: "Casting Director", label: "Casting Director" },
	];

	const ageCategoryOptions = [
		{ value: "Mid-60s (65-69)", label: "Mid-60s (65-69)" },
		{ value: "Mid-50s (50-54)", label: "Mid-50s (50-54)" },
		{ value: "Late 50s (55-59)", label: "Late 50s (55-59)" },
		{ value: "Early 60s (60-64)", label: "Early 60s (60-64)" },
	];

	const languageOptions = [
		{ value: "Hindi", label: "Hindi" },
		{ value: "Nepali", label: "Nepali" },
		{ value: "English", label: "English" },
		{ value: "Achhami", label: "Achhami" },
	];

	const locationOptions = [
		{ value: "Achham", label: "Achham" },
		{ value: "Kathmandu", label: "Kathmandu" },
		{ value: "Arghakhanchi", label: "Arghakhanchi" },
		{ value: "Baglung", label: "Baglung" },
	];

	const isObjectEmpty = (obj) => Object.keys(obj).length === 0;

	// if (loading) return <p>Loading...</p>;
	// if (error) return <p>Error: {error}</p>;
	return (
		<div className="space-y-10">
			<div className="flex items-start md:items-center flex-wrap justify-between">
				<div className="flex flex-col md:flex-row flex-1 items-start md:items-center gap-4">
					<Input
						type="text"
						placeholder="Search company..."
						className="h-8 w-[150px] lg:w-[250px] p-2 border rounded"
						value={searchQuery}
						onChange={(e) => updateSearchQuery(e.target.value)}
					/>

					<FacetedDropdownFilter
						title="Film Department"
						options={filmDepartmentOptions}
						filterKey="FilmDepartment"
						selectedValues={selectedFilters.status || []}
						onFilterChange={updateFilter}
					/>

					<FacetedDropdownFilter
						title="Age Category"
						options={ageCategoryOptions}
						filterKey="AgeCategory"
						selectedValues={selectedFilters.role || []}
						onFilterChange={updateFilter}
					/>

					<FacetedDropdownFilter
						title="Language"
						options={languageOptions}
						filterKey="Language"
						selectedValues={selectedFilters.role || []}
						onFilterChange={updateFilter}
					/>

					<FacetedDropdownFilter
						title="Location"
						options={locationOptions}
						filterKey="Location"
						selectedValues={selectedFilters.role || []}
						onFilterChange={updateFilter}
					/>

					{!isObjectEmpty(selectedFilters) && (
						<Button variant="ghost" className="h-8 px-2 lg:px-3" onClick={() => clearAllFilters()}>
							Reset
							<Cross2Icon className="ml-2 h-4 w-4" />
						</Button>
					)}
				</div>
				<div>
					<SortingDropdownMenu />
				</div>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{data?.map((company) => (
					<CompanyCard key={company.id} company={company}></CompanyCard>
				))}
			</div>
			<PaginationControls page={page} pageSize={pageSize} totalItems={totalItems} setPage={setPage} setPageSize={setPageSize} />
		</div>
	);
}
