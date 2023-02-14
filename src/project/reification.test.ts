import { List } from "immutable";
import { Metadata } from "../metadata";
import { TempProject } from "../test";

const testMetadata: Metadata = {
  author: {
    name: "Yogi the Bear",
    email: "yogi@yellowstone.park",
    website: "https://yellowstone.park/yogi"
  },

  slides: {
    title: "Example Project",
    subtitle: "Some subtitle",
    description: "Any description",
    website: "https://project_website",
    repository: "yellowstone/yogi",
    copyrightYears: "2023"
  },

  nodeVersion: "19.3.0"
};

const alternativeMetadata: Metadata = {
  ...testMetadata,
  author: { ...testMetadata.author, name: "Bubu" },
  slides: { ...testMetadata.slides, copyrightYears: "2022-2023" }
};

describe("Archetype reification", () => {
  describe("when the project root directory is new", () => {
    let tempProject: TempProject;

    beforeAll(() => {
      tempProject = new TempProject();
      return tempProject.reify(testMetadata);
    });

    afterAll(() => {
      return tempProject.deltree();
    });

    it("should prepare the VS Code settings file", () =>
      tempProject.checkTextFiles(List([".vscode/settings.json"])));

    it("should prepare the .gitignore file", () =>
      tempProject.checkTextFiles(List([".gitignore"])));

    it("should prepare the .nvmrc file", () =>
      tempProject.checkTextFiles(List([".nvmrc"])));

    it("should prepare the Prettier ignore file", () =>
      tempProject.checkTextFiles(List([".prettierignore"])));

    it("should prepare the Prettier settings file", () =>
      tempProject.checkTextFiles(List([".prettierrc"])));

    it("should prepare the Marp configuration files", () =>
      tempProject.checkTextFiles(List(["marp.pdf.json", "marp.html.json"])));

    it("should prepare the LICENSE file", () =>
      tempProject.checkTextFiles(List(["LICENSE"])));

    it("should prepare the package.json descriptor", () =>
      tempProject.checkTextFiles(List(["package.json"])));

    it("should prepare the README file", () =>
      tempProject.checkTextFiles(List(["README.md"])));

    it("should prepare the Markdown source file", () =>
      tempProject.checkTextFiles(List(["src/slides.md"])));

    it("should prepare the Sass stylesheets", () =>
      tempProject.checkTextFiles(
        List([
          "src/styles/_utils.scss",
          "src/styles/colors.scss",
          "src/styles/elements.scss",
          "src/styles/sections.scss",
          "src/styles/theme.scss"
        ])
      ));
  });

  describe("when the project root directory already exists", () => {
    it("should overwrite files having the same name", async () => {
      const tempProject = new TempProject();
      await tempProject.reify(testMetadata);

      try {
        await tempProject.reify(alternativeMetadata);

        const licenseText = await tempProject.readTextFile("LICENSE");
        expect(licenseText).toInclude(
          `Copyright (c) ${alternativeMetadata.slides.copyrightYears} ${alternativeMetadata.author.name}`
        );
      } finally {
        await tempProject.deltree();
      }
    });

    it("should not delete other files", async () => {
      const tempProject = new TempProject();
      await tempProject.reify(testMetadata);

      const additionalFileRelativePath = "dodus.txt";
      const expectedAdditionalFileContent = "This is a test";

      await tempProject.writeTextFile(
        additionalFileRelativePath,
        expectedAdditionalFileContent
      );

      try {
        await tempProject.reify(alternativeMetadata);

        const actualAdditionalFileContent = await tempProject.readTextFile(
          additionalFileRelativePath
        );

        expect(actualAdditionalFileContent).toBe(expectedAdditionalFileContent);
      } finally {
        await tempProject.deltree();
      }
    });
  });
});
