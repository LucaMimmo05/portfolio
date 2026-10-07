import { translations, type Lang } from "@/lib/translations";
import { absoluteUrl, localePath, site, siteUrl } from "@/lib/site";
import type { Project } from "@/data/projects";

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;

export function homeJsonLd(lang: Lang) {
  const t = translations[lang];
  const url = absoluteUrl(localePath(lang));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        givenName: "Luca",
        familyName: "Mimmo",
        url: siteUrl,
        email: `mailto:${site.email}`,
        jobTitle: t.seo.jobTitle,
        description: t.seo.description,
        nationality: { "@type": "Country", name: "Italy" },
        address: { "@type": "PostalAddress", addressCountry: "IT" },
        worksFor: { "@type": "Organization", name: "Newmann", url: "https://newmann.ai" },
        // Only finished programmes count as alumniOf; ongoing ones are not alumni yet
        alumniOf: t.experience.edu
          .filter((e) => !/present/i.test(e.period))
          .map((e) => ({ "@type": "EducationalOrganization", name: e.school })),
        knowsAbout: [
          "Web development", "React", "Next.js", "TypeScript", "JavaScript", "Angular", "Vue",
          "Java", "Spring Boot", "Quarkus", "Node.js", "PostgreSQL", "MongoDB", "Redis",
          "REST APIs", "OAuth2", "JWT", "Tailwind CSS",
        ],
        knowsLanguage: ["it", "en"],
        sameAs: [site.github, site.linkedin],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: site.name,
        description: t.seo.description,
        inLanguage: ["en", "it"],
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}#profile`,
        url,
        name: t.seo.title,
        inLanguage: lang,
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
    ],
  };
}

export function projectJsonLd(lang: Lang, project: Project, description: string) {
  const t = translations[lang];
  const url = absoluteUrl(localePath(lang, `/work/${project.slug}`));
  const repo = project.links?.find((l) => l.href.includes("github.com"));
  const live = project.links?.find((l) => !l.href.includes("github.com"));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        "@id": `${url}#project`,
        name: project.title,
        description,
        url,
        inLanguage: lang,
        dateCreated: project.year,
        keywords: project.tags.join(", "),
        programmingLanguage: project.tags,
        author: { "@id": personId, "@type": "Person", name: site.name, url: siteUrl },
        ...(repo && { codeRepository: repo.href }),
        ...(live && { sameAs: live.href }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.seo.home, item: absoluteUrl(localePath(lang)) },
          { "@type": "ListItem", position: 2, name: t.work.label, item: `${absoluteUrl(localePath(lang))}#work` },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}
