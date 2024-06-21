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
			const response = await fetch(
				`${apiEndpoint}?search?q=${encodeURIComponent(searchQuery)}&skip=${page}&limit=${pageSize}&filters=${JSON.stringify(
					filters
				)}&sortField=${sortField}&sortDirection=${sortDirection}`
			);
			if (!response.ok) throw new Error("Failed to fetch data");
			const items = await response.json();
			const total = items.total;
			setData(items.users);
			setTotalItems(total);
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
