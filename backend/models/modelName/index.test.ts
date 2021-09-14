/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import { expect } from 'chai';
import makeModelName from './index';

describe('modelName Test', () => {
  it('should return ModelName with all properties : ', (done) => {
    const newModelName = {};
    const modelName = makeModelName(newModelName);
    expect(modelName).deep.equal(newModelName);
    done();
  });
});
