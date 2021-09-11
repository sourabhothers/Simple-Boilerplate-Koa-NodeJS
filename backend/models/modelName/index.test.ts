import makeModelName from "./index";
import { expect } from "chai";

describe("modelName Test", () => {
  it("should return ModelName with all properties : ", (done) => {
    const newModelName = {};
    const modelName = makeModelName(newModelName);
    expect(modelName).deep.equal(newModelName);
    done();
  });
});
