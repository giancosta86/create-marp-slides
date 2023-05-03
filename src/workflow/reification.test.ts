import { join } from "node:path";
import { List } from "immutable";
import { useVolatileTempDirectory } from "@giancosta86/more-jest-io";
import { Metadata } from "../metadata";
import { reifyProject } from "./reification";

const testMetadata: Metadata = {
  author: {
    name: "AuthorName",
    email: "AuthorEmail",
    website: "AuthorWebsite"
  },

  slides: {
    title: "SlidesTitle",
    subtitle: "SlidesSubtitle",
    description: "SlidesDescription",
    keywords: List(["alpha", "beta", "gamma"]),
    copyrightYears: "SlidesCopyrightYears",
    repository: "SlidesRepo",
    website: "SlidesWebsite"
  },

  nodeVersion: "12.7.5"
};

describe("Project reification", () => {
  const tempTargetDirectory = useVolatileTempDirectory({ shared: true });

  beforeAll(async () => {
    await reifyProject({
      projectDirectory: tempTargetDirectory,
      metadata: testMetadata
    });
  });

  it("should include Marp's configurations files", async () => {
    await expect(join(tempTargetDirectory, "marp.html.json")).toExist();
    await expect(join(tempTargetDirectory, "marp.pdf.json")).toExist();
  });

  it("should include Prettier configuration files", async () => {
    await expect(join(tempTargetDirectory, ".prettierignore")).toExist();
    await expect(join(tempTargetDirectory, ".prettierrc")).toExist();
  });

  it("should include .gitignore", () =>
    expect(join(tempTargetDirectory, ".gitignore")).toExist());

  it("should include VS Code settings", () =>
    expect(join(tempTargetDirectory, ".vscode", "settings.json")).toExist());

  it("should include Sass styles", async () => {
    const stylesDirectory = join(tempTargetDirectory, "src", "styles");

    for (const basename of [
      "_utils",
      "colors",
      "elements",
      "sections",
      "theme"
    ]) {
      await expect(join(stylesDirectory, `${basename}.scss`)).toExist();
    }
  });

  it("should include the markdown source file", () =>
    expect(join(tempTargetDirectory, "src", "slides.md")).toExist());

  it("should include the LICENSE file", () =>
    expect(join(tempTargetDirectory, "LICENSE")).toExist());

  it("should include the README file", () =>
    expect(join(tempTargetDirectory, "README.md")).toExist());

  it("should include the package descriptor", () =>
    expect(join(tempTargetDirectory, "package.json")).toExist());

  it("should include the .nvmrc with the injected version", () =>
    expect(join(tempTargetDirectory, ".nvmrc")).toBeTextFile(
      `v${testMetadata.nodeVersion}\n`
    ));
});
