import { expect } from 'chai';
import camelizeState from '../camelizeState';

const createFakeStore = () => {};

const dispatchWithStoreOf = (storeData, action) => {
  let dispatched = null;
  const dispatch = camelizeState(createFakeStore(storeData))(
    actionAttempt => dispatched = actionAttempt
  );
  dispatch(action);
  return dispatched;
};

describe('CamelizeState Middleware', function camelizeSateMiddleware() {
  it('should camelize keys', () => {
    expect(
      dispatchWithStoreOf({}, { type: 'TEST', payload: { 'test_data': 1 } })
    ).to.deep.equal({ type: 'TEST', payload: { testData: 1 } });
  });
});
