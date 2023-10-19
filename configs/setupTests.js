import Adapter from '@cfaester/enzyme-adapter-react-18';
import Enzyme from 'enzyme';
import jestFetchMock from 'jest-fetch-mock';

globalThis.crypto = require('crypto').webcrypto;

Enzyme.configure({ adapter: new Adapter() });

// Reference: https://qiita.com/akameco/items/0edfdae02507204b24c8
const noop = () => undefined;
Reflect.defineProperty(window, 'scrollTo', { value: noop, writable: true });

jestFetchMock.enableMocks();
