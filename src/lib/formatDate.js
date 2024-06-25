export function formatDate(firestoreTimestamp) {
	const { _seconds, _nanoseconds } = firestoreTimestamp;
	const milliseconds = _seconds * 1000 + _nanoseconds / 1000000;
	const date = new Date(milliseconds);

	const formattedDate = new Intl.DateTimeFormat("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(date);

	return formattedDate;
}
