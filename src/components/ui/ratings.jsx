"use client";
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

export function Ratings() {
	const [rating, setRating] = useState(0);

	// Catch Rating value
	const handleRating = (rate) => {
		setRating(rate);

		// other logic
	};

	return (
		<div className="flex flex-row">
			<Rating onClick={handleRating} size="20" className="flex" />
		</div>
	);
}
