import { expect } from "chai";
import { validatorSchemaType } from "../../types";
import buildValidator from "./";

describe("models/validator test", () => {
  // Interface
  interface ITestData {
    prop1: string;
    prop2: number;
  }

  const testSchema: validatorSchemaType<ITestData> = {
    type: "object",
    properties: {
      prop1: { type: "string" },
      prop2: { type: "number" },
    },
    required: ["prop1", "prop2"],
    additionalProperties: false,
  };

  // 1st
  it("Should not return any error", (done) => {
    const testValidator = buildValidator<ITestData>(testSchema);
    const testData = {
      prop1: "value1",
      prop2: 20,
    };

    const { error, validator } = testValidator(testData);

    expect(validator.schema).deep.equal(testSchema);
    expect(error).deep.equal(null);
    done();
  });

  // 2nd
  it("Should return error", (done) => {
    const testValidator = buildValidator<ITestData>(testSchema);
    const testData: ITestData = {
      prop1: 100,
      prop2: "200",
    } as unknown as ITestData;

    const { error, validator } = testValidator(testData);

    expect(validator.schema).deep.equal(testSchema);
    expect(error).equal("must be string\nmust be number");
    done();
  });
});
