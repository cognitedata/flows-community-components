export interface CogDocsPage {
  slug: string;
  title: string;
  url: string;
  content: string;
}

declare module "virtual:cogdocs" {
  export const cogdocsPages: CogDocsPage[];
  export type { CogDocsPage };
}
