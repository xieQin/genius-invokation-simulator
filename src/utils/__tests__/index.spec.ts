import { getRandom } from "..";

describe("utils work well", () => {
  it("getRandom work well", () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const res1 = getRandom(2, data, false);
    const res2 = getRandom(3, data, true);

    expect(res1).toHaveLength(2);
    expect(res2).toHaveLength(3);
  });
});
