import { adminDb } from "@/lib/firebase-admin";
import { NextResponse } from "next/server";

export async function GET(request) {
	const searchParams = request.nextUrl.searchParams;
	try {
		const { page = 0, pageSize = 10, filters = {}, searchQuery = "", sortField = "firstName", sortDirection = "desc" } = searchParams;
		let collectionRef = adminDb.collection("team_members");

		Object.keys(filters).forEach((key) => {
			collectionRef = collectionRef.where(key, "==", filters[key]);
		});

		if (searchQuery) {
			collectionRef = collectionRef.where("searchField", ">=", searchQuery).where("searchField", "<=", searchQuery + "\uf8ff");
		}

		let queryRef = collectionRef.orderBy(sortField, sortDirection).limit(Number(pageSize));

		if (page > 0) {
			const offsetDoc = await collectionRef
				.orderBy(sortField, sortDirection)
				.limit(page * Number(pageSize))
				.get()
				.then((snapshot) => snapshot.docs[snapshot.docs.length - 1]);

			queryRef = queryRef.startAfter(offsetDoc);
		}

		const snapshot = await queryRef.get();

		const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
		return NextResponse.json({ items, totalItems: snapshot.size }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.json({ error: error.message }, { status: 401 });
	}
}
