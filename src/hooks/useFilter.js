"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Ensure this path is correct

export function useFilter() {
	const [selectedFilters, setSelectedFilters] = useState({});
	const [searchQuery, setSearchQuery] = useState("");
	const [sortField, setSortField] = useState("");
	const [sortDirection, setSortDirection] = useState("asc");
	const [filteredData, setFilteredData] = useState([]); // New state for storing filtered data

	const router = useRouter();

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
	}, [selectedFilters, searchQuery, sortField, sortDirection, router]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const filters = {};

		for (const [key, value] of params.entries()) {
			if (key === "searchQuery") setSearchQuery(value);
			else if (key === "sortField") setSortField(value);
			else if (key === "sortDirection") setSortDirection(value);
			else filters[key] = value.split(",");
		}

		setSelectedFilters(filters);
	}, []);

	// New: Fetch filtered data from Firestore
	useEffect(() => {
		const fetchFilteredData = async () => {
			let q = query(collection(db, "yourCollection")); // Replace "yourCollection" with your actual collection name

			// Apply search query
			if (searchQuery) {
				q = query(q, where("searchField", "==", searchQuery)); // Replace "searchField" with your actual search field
			}

			// Apply filters
			Object.entries(selectedFilters).forEach(([key, values]) => {
				if (values.length > 0) {
					q = query(q, where(key, "in", values));
				}
			});

			// Apply sorting
			if (sortField) {
				q = query(q, orderBy(sortField, sortDirection));
			}

			const snapshot = await getDocs(q);
			const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			setFilteredData(data);
		};

		fetchFilteredData();
	}, [selectedFilters, searchQuery, sortField, sortDirection]);

	return {
		selectedFilters,
		updateFilter,
		searchQuery,
		updateSearchQuery,
		sortField,
		sortDirection,
		updateSorting,
		clearAllFilters,
		filteredData, // Expose filtered data
	};
}
