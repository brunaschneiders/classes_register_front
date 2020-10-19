import { createStore, combineReducers } from 'redux';
import { persistStore } from 'redux-persist';
import user from './user/reducer';
import persistedReducer from './persistReducers';

const reducers = combineReducers({
  user,
});

const store = createStore(persistedReducer(reducers));
const persistor = persistStore(store);

export { persistor, store };
