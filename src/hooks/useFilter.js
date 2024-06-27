// useFilter.js
"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export function useFilter() {
	const [selectedFilters, setSelectedFilters] = useState({});
	const [searchQuery, setSearchQuery] = useState("");
	const [sortField, setSortField] = useState("");
	const [sortDirection, setSortDirection] = useState("asc");

	const router = useRouter();
	const searchParams = useSearchParams();

	const updateFilter = (filterKey, values) => {
		setSelectedFilters((prev) => ({
			...prev,
			[filterKey]: values,
		}));
	};

	const updateSearchQuery = (query) => {
		setSearchQuery(query);
	};

	const updateSorting = (field, direction) => {
		setSortField(field);
		setSortDirection(direction);
	};

	const clearAllFilters = () => {
		setSelectedFilters({});
		setSearchQuery("");
		setSortField("");
		setSortDirection("asc");
	};

	const isEmpty = (value) => value === "" || (Array.isArray(value) && value.length === 0);

	useEffect(() => {
		const params = new URLSearchParams();

		if (searchQuery) params.set("searchQuery", searchQuery);
		if (sortField) params.set("sortField", sortField);
		if (sortDirection !== "asc") params.set("sortDirection", sortDirection);

		Object.entries(selectedFilters).forEach(([key, value]) => {
			if (!isEmpty(value)) {
				params.set(key, value.join(","));
			}
		});

		router.replace(`?${params.toString()}`, { shallow: true });
	}, [selectedFilters, searchQuery, sortField, sortDirection]);

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		const filters = {};

		for (const [key, value] of params.entries()) {
			if (key === "searchQuery") setSearchQuery(value);
			else if (key === "sortField") setSortField(value);
			else if (key === "sortDirection") setSortDirection(value);
			else filters[key] = value.split(",");
		}

		setSelectedFilters(filters);
	}, []);

	return {
		selectedFilters,
		updateFilter,
		searchQuery,
		updateSearchQuery,
		sortField,
		sortDirection,
		updateSorting,
		clearAllFilters,
	};
}
