/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/about-us", "/find-job", "/companies", "/companies/[id]", "/team-members", "/team-members/[id]", "/find-job/[id]"];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to their accounts page.
 * @type {string[]}
 */

export const authRoutes = ["/login", "/register", "/forgot-password"];

/**
 * The prefix for Api authentication routes
 * Routes that start with this prefix will be used for authentication for API
 * @type {string}
 */

export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/account/profile";
