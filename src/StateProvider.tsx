import React, { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

const reducer = combineReducers({});

const store = createStore(reducer, applyMiddleware(thunk));

interface IProps {
  children: ReactNode;
}

const StateProvider = (props: IProps): ReactElement => (
  <Provider store={store}>{props.children}</Provider>
);

export default StateProvider;
