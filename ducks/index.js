import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import {viewingPageReducer} from './viewingPage';
import {landingPageReducer} from './landingPage';

const reducer = combineReducers({viewingPage: viewingPageReducer, landingPage: landingPageReducer});
const initialState = {};
const store = createStore(reducer, initialState, applyMiddleware(thunk));

export {store};
