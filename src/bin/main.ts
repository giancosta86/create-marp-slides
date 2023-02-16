#!/usr/bin/env node

import { argv, cwd } from "node:process";
import { join } from "node:path";
import { opendir } from "node:fs/promises";
import { List } from "immutable";
import inquirer from "inquirer";
import { Archetype } from "@giancosta86/platonic";
import { Metadata } from "../metadata";
import { createMetadataQuestions } from "./questions";

async function main(args: List<string>): Promise<void> {
  const projectDirectory = await getProjectPath(args);

  console.info("Project directory →", projectDirectory);

  const metadataQuestions = createMetadataQuestions();

  const metadata: Metadata = (await inquirer.prompt(
    metadataQuestions
  )) as Metadata;

  const archetypeDirectory = join(__dirname, "..", "archetype");

  const archetype = new Archetype({ sourceDirectory: archetypeDirectory });

  return archetype.reify({
    targetDirectory: projectDirectory,
    metadata
  });
}

async function getProjectPath(args: List<string>): Promise<string> {
  const projectPath = args.get(0) ?? cwd();

  try {
    await opendir(projectPath);
  } catch {
    return projectPath;
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

  return projectPath;
}

main(List(argv).skip(2))
  .then(() => {
    console.info("Project generated successfully");
  })
  .catch(err => {
    console.error(err);
  });
