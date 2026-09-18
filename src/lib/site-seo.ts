export const SITE_URL = "https://ahmad-umber.vercel.app";
export const SITE_HOST = new URL(SITE_URL).hostname;

/** Fail closed for local, preview and custom review environments. */
export function isIndexableDeployment(environment = process.env.VERCEL_ENV) {
  return environment === "production";
}
