import { List } from "immutable";

export type Slides = Readonly<{
  title: string;
  subtitle: string;
  description: string;
  keywords: List<string>;
  website: string;
  repository: string;
  copyrightYears: string;
}>;
