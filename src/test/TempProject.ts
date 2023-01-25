import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { v4 as uuid4 } from "uuid";
import rimraf from "rimraf";
import { List } from "immutable";
import { Project } from "../project";

export const expectedProject = new Project(join(__dirname, "expectedProject"));

export class TempProject extends Project {
  constructor() {
    super(join(tmpdir(), uuid4()));
  }

  deltree(): Promise<void> {
    return rimraf(this.rootDirectoryPath);
  }

  writeTextFile(relativeFilePath: string, content: string): Promise<void> {
    const fullPath = this.getFullPath(relativeFilePath);

    return writeFile(fullPath, content, { encoding: "utf8" });
  }

  async checkTextFiles(relativeFilePaths: List<string>): Promise<void> {
    for (const relativeFilePath of relativeFilePaths) {
      const expectedTextContent = await expectedProject.readTextFile(
        relativeFilePath
      );

      const actualTextContent = await this.readTextFile(relativeFilePath);

      expect(actualTextContent).toEqual(expectedTextContent);
    }
  }
}
