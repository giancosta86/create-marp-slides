import { join } from "node:path";
import { expectedProject } from "../test";

describe("Project", () => {
  const slidesRelativeFilePath = join("src", "slides.md");

  it("should return a full path from a relative path", () => {
    const expectedFilePath = join(
      expectedProject.rootDirectoryPath,
      slidesRelativeFilePath
    );

    const actualFilePath = expectedProject.getFullPath(slidesRelativeFilePath);

    expect(actualFilePath).toBe(expectedFilePath);
  });

  it("should read text from a relative path", async () => {
    const textContent = await expectedProject.readTextFile(
      slidesRelativeFilePath
    );

    expect(textContent).toStartWith("---");
  });
});
