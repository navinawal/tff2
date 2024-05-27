import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

const authConfig = {
	providers: [
		Credentials({
			credentials: {},
			authorize: async function (credentials, request) {
				console.log(credentials);
				const user = { id: "1", name: "J Smith", email: "jsmith@example.com" };
				if (user) {
					return user;
				} else {
					return null;
				}
			},
		}),
		GitHub,
		Google,
		Facebook,
	],
};

export default authConfig;
