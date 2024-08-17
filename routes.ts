/**
 * An array of routes that are public and do not require authentication.
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/about"
]

/**
 * An array of routes that are using for the authentication.
 * These routes will redirect logged users to settings page.
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
]

/**
 * The prefix of api routes authentication.
 * Routes that start with this prefix are used for API authentication purposes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth"

/**
 * The default login redirect path.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/chat"

/**
 * An array of protected routes of the application.
 * @type {string[]}
 */
export const protectedRoutes = [
    "/chat",
]
