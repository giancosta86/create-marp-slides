import { List } from "immutable";
import { unzip } from "./collections";

describe("Unzipping", () => {
  it("should work on an empty collection", () => {
    const [leftItems, rightItems] = unzip(List<[string, number]>());

    expect(leftItems).toBeEmpty();
    expect(rightItems).toBeEmpty();
  });

  it("should actually unzip collections", () => {
    const sourceList = List<[string, number]>([
      ["A", 90],
      ["B", 92],
      ["C", 95],
      ["D", 98]
    ]);

    const [leftItems, rightItems] = unzip(sourceList);

    expect(leftItems.toArray()).toEqual(["A", "B", "C", "D"]);
    expect(rightItems.toArray()).toEqual([90, 92, 95, 98]);
  });
});
