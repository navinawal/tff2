import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcryptjs from "bcryptjs";
import { registrationSchema } from "@/schemas/Schemas";

export async function POST(request) {
	try {
		const fields = await request.json();
		const parsedResult = registrationSchema.safeParse(fields);

		if (!parsedResult.success) {
			return NextResponse.json({ error: "Invalid fields", details: parsedResult.error.formErrors.fieldErrors }, { status: 400 });
		}

		const { name, email, password } = parsedResult.data;
		const hashedPassword = await bcryptjs.hash(password, 10);

		const existingUser = await db.user.findUnique({
			where: {
				email,
			},
		});

		if (existingUser) {
			return NextResponse.json({ error: "Email is already in use." }, { status: 401 });
		}

		const user = await db.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
		if (user) {
			return NextResponse.json({ message: "Registration successfull", data: user }, { status: 200 });
		} else {
			return NextResponse.json({ error: "An error occurred while registration" }, { status: 500 });
		}
	} catch (error) {
		return NextResponse.json({ error: "An error occurred while registration", details: error }, { status: 500 });
	}
}
