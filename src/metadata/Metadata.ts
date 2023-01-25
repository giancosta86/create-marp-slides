import { Author } from "./Author";
import { Slides } from "./Slides";

export type Metadata = Readonly<{
  author: Author;
  slides: Slides;
  nodeVersion: string;
}>;
