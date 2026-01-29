declare module "virtual:cogdocs" {
  export interface CogDocsPage {
    slug: string;
    title: string;
    url: string;
    content: string;
  }
  export const cogdocsPages: CogDocsPage[];
}
