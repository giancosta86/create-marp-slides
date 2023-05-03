import { cwd } from "node:process";
import { stat } from "node:fs/promises";
import { List } from "immutable";
import inquirer from "inquirer";

export async function getProjectPath(args: List<string>): Promise<string> {
  const projectPath = args.get(0) ?? cwd();

  console.info("Project directory →", projectPath);

  //If the directory does not exist, it can certainly be allocated
  try {
    await stat(projectPath);
  } catch {
    return projectPath;
  }

  const { canContinue } = await inquirer.prompt([
    {
      name: "canContinue",
      message:
        "The directory already exists. If you proceed, no file will be deleted - at most, overwritten. Continue?",
      type: "confirm",
      default: false
    }
  ]);

  if (!canContinue) {
    throw new Error("Process interrupted by user");
  }

  return projectPath;
}
