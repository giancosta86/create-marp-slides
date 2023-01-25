export const tokenAffix = "%";

export function createToken(variableName: string): string {
  return `${tokenAffix}${variableName.trim()}${tokenAffix}`;
}
