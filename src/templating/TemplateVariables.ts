import { Map, Seq } from "immutable";
import { createToken, tokenAffix } from "./templateTokens";

export class TemplateVariables {
  constructor(private readonly namesToValues: Map<string, string> = Map()) {}

  with(name: string, value: string): TemplateVariables {
    if (name.includes(tokenAffix)) {
      throw new Error(
        `A variable name cannot contain the '${tokenAffix}' affix`
      );
    }

    return new TemplateVariables(this.namesToValues.set(name.trim(), value));
  }

  getTokensWithValues(): Seq.Indexed<[string, string]> {
    return this.namesToValues.entrySeq().map(([variableName, value]) => {
      const token = createToken(variableName);
      return [token, value];
    });
  }
}
