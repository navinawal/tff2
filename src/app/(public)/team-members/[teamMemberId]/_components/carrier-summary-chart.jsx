"use client";
import { Chart } from "react-google-charts";

export default function CarrierSummaryChart({ teamMember }) {
	const { shortFilms = 0, featureFilms = 0, webSeries = 0, documentaries = 0, musicVideos = 0, theatreDrama = 0 } = teamMember;

	const data = [
		["Category", "Count"],
		["Short Films", parseInt(shortFilms) || 0],
		["Feature Films", parseInt(featureFilms) || 0],
		["Web Series", parseInt(webSeries) || 0],
		["Documentaries", parseInt(documentaries) || 0],
		["Music Videos", parseInt(musicVideos) || 0],
		["Theatre Drama", parseInt(theatreDrama) || 0],
	];

	const options = {
		title: "Carrier Summary",
		titleTextStyle: { color: "white", fontName: "", fontSize: 24, bold: false, italic: false },
		responsive: true,
		pieSliceText: "value",
		legend: {
			position: "right",
			textStyle: { color: "white", fontSize: 16 },
		},
		color: "white",
		backgroundColor: {
			fill: "transparent",
		},
	};

	return <Chart chartType="PieChart" data={data} options={options} width={"100%"} height={"400px"} />;
}
