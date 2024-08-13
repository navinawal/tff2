"use client";
import { Chart } from "react-google-charts";
import { useState, useEffect } from "react";

export default function CarrierSummaryChart({ teamMember }) {
  const { shortFilms = 0, featureFilms = 0, webSeries = 0, documentaries = 0, musicVideos = 0, theatreDrama = 0 } = teamMember;

  // Prepare the data array and sort it
  const dataArray = [
    ["Category", "Count"],
    ["Short Films", parseInt(shortFilms) || 0],
    ["Feature Films", parseInt(featureFilms) || 0],
    ["Web Series", parseInt(webSeries) || 0],
    ["Documentaries", parseInt(documentaries) || 0],
    ["Music Videos", parseInt(musicVideos) || 0],
    ["Theatre Drama", parseInt(theatreDrama) || 0],
  ];

  const sortedData = dataArray.slice(1).sort((a, b) => b[1] - a[1]);
  const sortedDataArray = [["Category", "Count"], ...sortedData];

  // Define colors with 70% saturation
  const colorMapping = {
    "Short Films": "#BF4040", // Red
    "Feature Films": "#BF6F00", // Orange
    "Web Series": "#BFBF00", // Yellow
    "Documentaries": "#40BF40", // Green
    "Music Videos": "#4040BF", // Blue
    "Theatre Drama": "#6F00BF", // Violet
  };

  // Chart options
  const options = {
    titleTextStyle: { color: "white", fontSize: 12 },
    pieSliceText: "label", // Shows labels and values on slices
    legend: {
      position: "none", // Hide the default legend
    },
    backgroundColor: {
      fill: "transparent",
    },
    slices: sortedData.reduce((acc, [category], index) => {
      acc[index] = { offset: 0, color: colorMapping[category] || "#ffffff" }; // Apply color
      return acc;
    }, {}),
  };

  // Use state to manage window size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    window.addEventListener('resize', handleResize);
    handleResize(); // Check on mount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 'auto', padding: isMobile ? '5px 0' : '20px 0' }}>
      <div style={{ display: 'flex', width: '100%', height: isMobile ? '300px' : '400px' }}>
        <div style={{ flex: 1 }}>
          <Chart
            chartType="PieChart"
            data={sortedDataArray} // Use sorted data
            options={options}
            width="100%"
            height="100%"
          />
        </div>
        {!isMobile && (
          <div style={{ flex: 1, padding: '10px', color: 'white' }}>
            <div style={{ width: '100%', textAlign: 'left' }}>
              {/* Manually create a legend based on sorted data */}
              {sortedData.map(([category, count], index) => (
                <div key={category} style={{ marginBottom: '8px', color: colorMapping[category] || "#ffffff" }}>
                  <strong>{category}</strong>: {count}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {isMobile && (
        <div style={{ textAlign: 'center', marginTop: '3px', color: 'white' }}>
          {/* Manually create a legend for mobile devices */}
          {sortedData.map(([category, count], index) => (
            <div key={category} style={{ marginBottom: '6px', color: colorMapping[category] || "#ffffff" }}>
              <strong>{category}</strong>: {count}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}