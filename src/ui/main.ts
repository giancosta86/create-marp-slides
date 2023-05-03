import { List } from "immutable";
import inquirer from "inquirer";
import { Metadata } from "../metadata";
import { reifyProject } from "../workflow";
import { getProjectPath } from "./project";
import { createMetadataQuestions } from "./questions";

export async function main(args: List<string>): Promise<void> {
  const projectDirectory = await getProjectPath(args);

  console.info("Project directory →", projectDirectory);

  const metadataQuestions = createMetadataQuestions();

  const metadata: Metadata = (await inquirer.prompt(
    metadataQuestions
  )) as Metadata;

  return reifyProject({ projectDirectory, metadata });
}
