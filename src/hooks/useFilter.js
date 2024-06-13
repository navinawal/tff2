"use client";
import { useState } from "react";

export function useFilter() {
	const [selectedFilters, setSelectedFilters] = useState({});
	const [searchQuery, setSearchQuery] = useState("");
	const [sortField, setSortField] = useState("");
	const [sortDirection, setSortDirection] = useState("asc");

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

	return {
		selectedFilters,
		updateFilter,
		searchQuery,
		updateSearchQuery,
		sortField,
		sortDirection,
		updateSorting,
	};
}
