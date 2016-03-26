import { expect } from 'chai';
import { CALL_API } from 'redux-api-middleware';
import apiMiddlewareHook from '../apiMiddlewareHook';

const createFakeStore = () => {};

const dispatchWithStoreOf = (storeData, action) => {
  let dispatched = null;
  const dispatch = apiMiddlewareHook(createFakeStore(storeData))(
    actionAttempt => dispatched = actionAttempt
  );
  dispatch(action);
  return dispatched;
};

describe('CamelizeState Middleware', function camelizeSateMiddleware() {
  it('should stringify body', function stringifyBody() {
    expect(
      dispatchWithStoreOf({}, {
        [CALL_API]: {
          endpoint: 'http://host',
          body: { key: 'value' },
          method: 'GET',
          headers: {},
          types: ['TEST_REQUEST', 'TEST_SUCCESS', 'TEST_FAILURE']
        }
      })[CALL_API].body
    ).to.equal(JSON.stringify({ key: 'value' }));
  });

  it('should serialize form body', () => {
    expect(
      dispatchWithStoreOf({}, {
        [CALL_API]: {
          endpoint: 'http://host',
          method: 'GET',
          types: ['TEST_REQUEST', 'TEST_SUCCESS', 'TEST_FAILURE'],
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: {
            key1: 'value1',
            key2: 'value2'
          }
        }
      })[CALL_API]
    ).to.deep.equal({
      endpoint: 'http://host',
      method: 'GET',
      types: ['TEST_REQUEST', 'TEST_SUCCESS', 'TEST_FAILURE'],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: 'key1=value1&key2=value2'
    });
  });

  it('should decamelize body', () => {
    expect(
      dispatchWithStoreOf({}, {
        [CALL_API]: {
          endpoint: 'http://host',
          method: 'GET',
          types: ['TEST_REQUEST', 'TEST_SUCCESS', 'TEST_FAILURE'],
          headers: {},
          body: { testData: 'value', }
        }
      })[CALL_API]
    ).to.deep.equal({
      endpoint: 'http://host',
      method: 'GET',
      types: ['TEST_REQUEST', 'TEST_SUCCESS', 'TEST_FAILURE'],
      headers: {},
      body: JSON.stringify({ 'test_data': 'value', })
    });
  });

  it('should not handle invalid RSSA', () => {
    expect(
      dispatchWithStoreOf({}, {
        type: 'TEST', payload: { body: { testData: 'value', } }
      })
    ).to.deep.equal({
      type: 'TEST', payload: { body: { testData: 'value', } }
    });
  });
});
