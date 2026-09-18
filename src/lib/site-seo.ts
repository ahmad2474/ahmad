export const SITE_URL = "https://ahmad-umber.vercel.app";
export const SITE_HOST = new URL(SITE_URL).hostname;

/** Fail closed for local, preview and custom review environments. */
export function isIndexableDeployment(environment = process.env.VERCEL_ENV) {
  return environment === "production";
}


/** Public identity facts also represented in the visible portfolio. */
export const PROFILE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profile`,
  url: `${SITE_URL}/`,
  name: "Ahmad Hassan | Agentic AI Developer in Lahore",
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_URL}/#ahmad`,
    name: "Ahmad Hassan",
    url: `${SITE_URL}/`,
    jobTitle: ["Agentic AI Developer", "DevOps Engineer"],
    description: "Agentic AI Developer and DevOps Engineer based in Lahore, Pakistan, building AI agents, RAG pipelines and cloud infrastructure.",
    homeLocation: { "@type": "Place", name: "Lahore, Pakistan" },
    knowsAbout: ["Agentic AI", "Retrieval-augmented generation", "AWS", "DevOps", "Terraform"],
    sameAs: ["https://github.com/ahmad2474", "https://linkedin.com/in/ahmadhassan102"],
  },
} as const;
