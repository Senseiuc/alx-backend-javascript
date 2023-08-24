const { expect } = require('chai');
const sinon = require('sinon');
const Utils = require('./utils');
const sendPaymentRequestToApi = require('./3-payment');

describe('sendPaymentRequestToApi', () => {
  it('sendPaymentRequestToApi uses d* calculateNumber method of Utils', () => {
    const spyMethod = sinon.spy(Utils);

    sendPaymentRequestToApi(100, 20);
    expect(spyMethod.calculateNumber.calledWith('SUM', 100, 20)).to.be.true;
    expect(spyMethod.calculateNumber.callCount).to.be.equal(1);
    spyMethod.calculateNumber.restore();
  });
});
