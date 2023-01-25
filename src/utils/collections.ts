import { Collection, List } from "immutable";

export function unzip<TLeft, TRight>(
  source: Collection.Indexed<[TLeft, TRight]>
): [List<TLeft>, List<TRight>] {
  return source.reduce(
    ([cumulatedLeft, cumulatedRight], [currentLeft, currentRight]) => [
      cumulatedLeft.push(currentLeft),
      cumulatedRight.push(currentRight)
    ],
    [List<TLeft>(), List<TRight>()]
  );
}
