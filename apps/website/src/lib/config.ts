/**
 * Application configuration constants for website
 */

/**
 * Web app URL
 * Uses environment variable
 *
 */
export const WEBAPP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL!;

/**
 * Website URL
 * Uses environment variable
 * */
export const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL!;

/**
 * Routes configuration
 */
export const ROUTES = {
  LOGIN: `/login`,
  CONTACT: "/contact",
  HOME: "/",
} as const;

export const ROUTES_WITH_WEBSITE_URL = {
  LOGIN: `${WEBSITE_URL}${ROUTES.LOGIN}`,
  CONTACT: `${WEBSITE_URL}${ROUTES.CONTACT}`,
  HOME: WEBSITE_URL,
} as const;

/**
 * Social media links
 */
export const SOCIAL_LINKS = {
  github: "https://github.com/sveetya/bondery",
  linkedin: "https://www.linkedin.com/company/bondery",
  email: "team@usebondery.com",
} as const;
