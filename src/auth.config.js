import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { LoginSchema } from "@/schemas/Schemas";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";

const authConfig = {
	providers: [
		Credentials({
			credentials: {},
			authorize: async (credentials) => {
				const validatedFields = LoginSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await db.user.findUnique({
						where: {
							email,
						},
					});

					console.log(user);

					if (!user || !user.password) return null;

					const passwordMatch = await bcryptjs.compare(password, user.password);

					if (passwordMatch) return user;
				}
				return null;
			},
		}),
		GitHub,
		Google,
		Facebook,
	],
};

export default authConfig;
