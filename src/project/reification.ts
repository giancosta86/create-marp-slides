import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { replaceInFile, ReplaceInFileConfig } from "replace-in-file";
import recursiveCopy from "recursive-copy";
import { TemplateVariables } from "../templating";
import { Metadata } from "../metadata";
import { unzip } from "../utils";

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
  const projectFilesGlob = join(projectRootPath, "**", "*");

  const templateVariables = new TemplateVariables()
    .with("AUTHOR_NAME", metadata.author.name)
    .with("AUTHOR_EMAIL", metadata.author.email)
    .with("AUTHOR_WEBSITE", metadata.author.website)
    .with("SLIDES_TITLE", metadata.slides.title)
    .with("SLIDES_SUBTITLE", metadata.slides.subtitle)
    .with("SLIDES_DESCRIPTION", metadata.slides.description)
    .with("SLIDES_WEBSITE", metadata.slides.website)
    .with("SLIDES_REPOSITORY", metadata.slides.repository)
    .with("COPYRIGHT_YEARS", metadata.slides.copyrightYears)
    .with("NODE_VERSION", metadata.nodeVersion);

  const [tokens, values] = unzip(templateVariables.getTokensWithValues());

  const injectionConfig: ReplaceInFileConfig = {
    files: projectFilesGlob,
    from: tokens.map(token => new RegExp(token, "g")).toArray(),
    to: values.toArray(),
    glob: {
      dot: true
    }
  };

  await replaceInFile(injectionConfig);
}
