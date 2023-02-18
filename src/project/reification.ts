import { promisify } from "node:util";
import { mkdir, writeFile, unlink } from "node:fs/promises";
import { join } from "node:path";
import recursiveCopy from "recursive-copy";
import { glob as _glob } from "glob";
import { renderFile } from "ejs";
import { Metadata } from "../metadata";

const glob = promisify(_glob);

export async function reifyArchetype(
  projectRootPath: string,
  metadata: Metadata
): Promise<void> {
  await createProjectRoot(projectRootPath);

  await copyArchetypeTreeToProject(projectRootPath);

  await injectMetadata(projectRootPath, metadata);
}

async function createProjectRoot(projectRootPath: string): Promise<void> {
  await mkdir(projectRootPath, { recursive: true });
}

async function copyArchetypeTreeToProject(
  projectRootPath: string
): Promise<void> {
  const archetypeTreeRootPath = join(__dirname, "archetype");

  await recursiveCopy(archetypeTreeRootPath, projectRootPath, {
    dot: true,
    overwrite: true
  });
}

async function injectMetadata(
  projectRootPath: string,
  metadata: Metadata
): Promise<void> {
  const templatesGlob = join(projectRootPath, "**", "*.template*");

  const templatePaths = await glob(templatesGlob, {
    dot: true,
    nodir: true
  });

  const parallelPromises = templatePaths.map(async templatePath => {
    const reifiedContent = await renderFile(templatePath, metadata);

    const outputPath = templatePath.replace(".template", "");

    await unlink(templatePath);

    return writeFile(outputPath, reifiedContent, { encoding: "utf8" });
  });

  await Promise.all(parallelPromises);
}
