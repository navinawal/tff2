import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcryptjs from "bcryptjs";
import { registrationSchema } from "@/schemas/Schemas";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function POST(request) {
	try {
		const fields = await request.json();
		const parsedResult = registrationSchema.safeParse(fields);

		if (!parsedResult.success) {
			return NextResponse.json({ error: "Invalid fields", details: parsedResult.error.formErrors.fieldErrors }, { status: 400 });
		}

		const { name, email, password } = parsedResult.data;
		const user = await createUserWithEmailAndPassword(auth, email, password);
		if (user) {
			return NextResponse.json({ message: "Registration successfull", data: user }, { status: 200 });
		} else {
			return NextResponse.json({ error: "An error occurred while registration" }, { status: 500 });
		}
	} catch (error) {
		return NextResponse.json({ error: "An error occurred while registration", details: error }, { status: 500 });
	}
}
