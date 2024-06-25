import { useState, useEffect } from "react";

export function usePaginatedData(apiEndpoint, filters, searchQuery, sortField, sortDirection) {
	const [data, setData] = useState([]);
	const [page, setPage] = useState(0);
	const [pageSize, setPageSize] = useState(10);
	const [totalItems, setTotalItems] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchData = async () => {
		setLoading(true);
		setError(null);
		try {
			const query = new URLSearchParams({
				page,
				pageSize,
				searchQuery,
				sortField,
				sortDirection,
				...filters,
			}).toString();

			const response = await fetch(`${apiEndpoint}?${query}`);
			if (!response.ok) throw new Error("Failed to fetch data");

			const { items, totalItems } = await response.json();
			setData(items);
			setTotalItems(totalItems);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [page, pageSize, filters, searchQuery, sortField, sortDirection]);

	return { data, loading, error, page, pageSize, totalItems, setPage, setPageSize };
}
