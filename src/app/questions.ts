import { version as nodeVersion } from "node:process";
import { QuestionCollection } from "inquirer";

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
      message: "Project title:"
    },
    {
      name: "slides.subtitle",
      message: "Project subtitle:"
    },
    {
      name: "slides.description",
      message: "Project description:"
    },
    {
      name: "slides.website",
      message: "Project website:"
    },
    {
      name: "slides.repository",
      message: "Project repository (in package.json format):"
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
