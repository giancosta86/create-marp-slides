import { join } from "node:path";
import { Archetype } from "@giancosta86/platonic";
import { Metadata } from "../metadata";

export type ReifySlidesSettings = {
  projectDirectory: string;
  metadata: Metadata;
};

export function reifyProject({
  projectDirectory,
  metadata
}: ReifySlidesSettings): Promise<void> {
  const archetypeDirectory = join(__dirname, "..", "archetype");

  const archetype = new Archetype({ sourceDirectory: archetypeDirectory });

  return archetype.reify({
    targetDirectory: projectDirectory,
    metadata
  });
}
