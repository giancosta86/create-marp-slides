import { version as nodeVersion } from "node:process";
import { QuestionCollection } from "inquirer";
import { List } from "immutable";

export function createMetadataQuestions(): QuestionCollection {
  const now = new Date();

  return [
    {
      name: "author.name",
      message: "Author name:"
    },
    {
      name: "author.email",
      message: "Author e-mail:"
    },
    {
      name: "author.website",
      message: "Author website:"
    },

    {
      name: "slides.title",
      message: "Presentation title:"
    },
    {
      name: "slides.subtitle",
      message: "Presentation subtitle:"
    },
    {
      name: "slides.description",
      message: "Presentation description:"
    },
    {
      name: "slides.keywords",
      message: "Comma-separated presentation keywords:",
      filter: (input: string) => List(input.split(/\s*,\s*/))
    },
    {
      name: "slides.website",
      message: "Presentation website:"
    },
    {
      name: "slides.repository",
      message: "Source-code repository (in package.json format):"
    },

    {
      name: "slides.copyrightYears",
      message: "Copyright years:",
      default: now.getFullYear().toString()
    },

    {
      name: "nodeVersion",
      message: "Node.js version:",
      default: nodeVersion.slice(1)
    }
  ];
}
