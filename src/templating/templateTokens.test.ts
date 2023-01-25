import { createToken, tokenAffix } from "./templateTokens";

describe("Creating a token", () => {
  it("should add the affix, both leading and trailing", () => {
    const token = createToken("MY_VAR");
    expect(token).toBe(`${tokenAffix}MY_VAR${tokenAffix}`);
  });

  it("should trim leading and trailing spaces from variable name", () => {
    const token = createToken("      MY_VAR   ");
    expect(token).toBe(`${tokenAffix}MY_VAR${tokenAffix}`);
  });
});
