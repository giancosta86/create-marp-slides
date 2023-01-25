#!/usr/bin/env node

import { argv, cwd } from "node:process";
import { opendir } from "node:fs/promises";
import { List } from "immutable";
import inquirer from "inquirer";
import { createMetadataQuestions } from "./questions";
import { Metadata } from "../metadata";
import { Project } from "../project";

async function main(args: List<string>): Promise<void> {
  const projectRootPath = await getProjectRootPath(args);
  const project = new Project(projectRootPath);

  console.info("Project root directory →", project.rootDirectoryPath);

  const metadataQuestions = createMetadataQuestions();

  const metadata: Metadata = (await inquirer.prompt(
    metadataQuestions
  )) as Metadata;

  return project.reify(metadata);
}

async function getProjectRootPath(args: List<string>): Promise<string> {
  const projectRootPath = args.get(0) ?? cwd();

  try {
    await opendir(projectRootPath);
  } catch {
    return projectRootPath;
  }

  const { canContinue } = await inquirer.prompt([
    {
      name: "canContinue",
      message:
        "The directory already exist. If you proceed, no file will be deleted - at most, overwritten. Continue?",
      type: "confirm",
      default: false
    }
  ]);

  if (!canContinue) {
    throw new Error("Process interrupted by user");
  }

  return projectRootPath;
}

main(List(argv).skip(2))
  .then(() => {
    console.info("Project generated successfully");
  })
  .catch(err => {
    console.error(err);
  });
