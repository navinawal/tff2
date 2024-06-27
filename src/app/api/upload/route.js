// app/api/upload/route.js

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const POST = async (req) => {
	try {
		// Create a buffer to hold the uploaded file
		const buffer = await req.arrayBuffer();
		const boundary = req.headers.get("content-type").split("; ")[1].replace("boundary=", "");

		// Parse the file from the buffer
		const data = bufferToParts(buffer, boundary);

		// Handle the file part
		const file = data.find((part) => part.filename);
		if (!file) {
			return NextResponse.json({ message: "File uploaded successfully" }, { status: 200 });
		}

		// Define the upload path
		const uploadDir = path.join(process.cwd(), "public", "uploads");
		const filePath = path.join(uploadDir, file.filename);

		// Ensure the upload directory exists
		await fs.mkdir(uploadDir, { recursive: true });

		// Save the file to the server
		await fs.writeFile(filePath, file.content);

		return NextResponse.json({ message: "File uploaded successfully", filePath }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
};

// Helper function to parse buffer
function bufferToParts(buffer, boundary) {
	const boundaryStr = `--${boundary}`;
	const parts = [];

	const bufferStr = buffer.toString();
	const splitBuffer = bufferStr.split(boundaryStr);

	for (let part of splitBuffer) {
		if (part.includes("Content-Disposition")) {
			const headers = part.split("\r\n\r\n")[0];
			const content = part.split("\r\n\r\n")[1];
			const filename = headers.match(/filename="(.+)"/)[1];
			parts.push({
				filename,
				content: Buffer.from(content.split("\r\n")[0]),
			});
		}
	}

	return parts;
}
