import { Context, createWrapper, MakeStore } from "next-redux-wrapper";
import { createStore, Store } from "redux";
import { rootReducer, RootState } from "./reducers";


const makeStore = (context: Context) => createStore(rootReducer);

export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});

