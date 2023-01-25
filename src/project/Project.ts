import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { reifyArchetype } from "./reification";
import { Metadata } from "../metadata";

export class Project {
  constructor(readonly rootDirectoryPath: string) {}

  reify(metadata: Metadata): Promise<void> {
    return reifyArchetype(this.rootDirectoryPath, metadata);
  }

  getFullPath(relativePath: string): string {
    return join(this.rootDirectoryPath, relativePath);
  }

  async readTextFile(relativeFilePath: string): Promise<string> {
    const textFilePath = this.getFullPath(relativeFilePath);

    return readFile(textFilePath, {
      encoding: "utf8"
    });
  }
}
