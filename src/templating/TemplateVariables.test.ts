import { List } from "immutable";
import { createToken, tokenAffix } from "./templateTokens";
import { TemplateVariables } from "./TemplateVariables";

function expectTokensWithValues(
  variableNamesAndValues: List<[string, string]>
): void {
  const expectedTokensWithValues = variableNamesAndValues
    .sortBy(([variableName]) => variableName)
    .map(([variableName, value]) => [createToken(variableName), value])
    .toArray();

  const templateVariables = variableNamesAndValues.reduce(
    (cumulatedVariables, [variableName, value]) =>
      cumulatedVariables.with(variableName, value),
    new TemplateVariables()
  );

  const actualTokensWithValues = templateVariables
    .getTokensWithValues()
    .sortBy(([token]) => token)
    .toArray();

  expect(actualTokensWithValues).toEqual(expectedTokensWithValues);
}

describe("Template variables", () => {
  describe("when passing a variable name with leading token affix", () => {
    it("should throw", () => {
      expect(() => {
        new TemplateVariables().with(`${tokenAffix}ALPHA`, "90");
      }).toThrow("A variable name cannot contain");
    });
  });

  describe("when passing a variable name with trailing token affix", () => {
    it("should throw", () => {
      expect(() => {
        new TemplateVariables().with(`ALPHA${tokenAffix}`, "90");
      }).toThrow("A variable name cannot contain");
    });
  });

  describe("when passing a variable name with internal token affix", () => {
    it("should throw", () => {
      expect(() => {
        new TemplateVariables().with(`ALPHA_${tokenAffix}_BETA`, "90");
      }).toThrow("A variable name cannot contain");
    });
  });

  describe("when extracting the tokens with values", () => {
    it("should support one variable", () => {
      expectTokensWithValues(List([["ALPHA", "90"]]));
    });

    it("should trim leading and trailing spaces", () => {
      const variables = new TemplateVariables().with("      ALPHA    ", "90");

      const tokensWithValues = variables.getTokensWithValues().toArray();

      expect(tokensWithValues).toEqual([[createToken("ALPHA"), "90"]]);
    });

    it("should support two variables", () => {
      expectTokensWithValues(
        List([
          ["BETA_ANY", "7"],
          ["ALPHA_SOME", "5"]
        ])
      );
    });

    it("should support three variables", () => {
      expectTokensWithValues(
        List([
          ["BETA_ANY", "7"],
          ["GAMMA_WHATEVER", "9"],
          ["ALPHA_SOME", "5"]
        ])
      );
    });

    describe("when a variable is duplicated", () => {
      it("should store the latest value of the variable", () => {
        const variables = new TemplateVariables()
          .with("ALPHA", "90")
          .with("ALPHA", "92");

        const tokensWithValues = variables.getTokensWithValues().toArray();

        expect(tokensWithValues).toEqual([[createToken("ALPHA"), "92"]]);
      });
    });
  });
});
