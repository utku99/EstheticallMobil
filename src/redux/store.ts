import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user"
import commonSlice from "./slices/common"
import filterSlice from "./slices/filter"
import hubConnectionSlice from "./slices/hubConnection"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER } from 'redux-persist';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ["user"],
};

const rootReducer = combineReducers({
    user: userSlice,
    common: commonSlice,
    filter: filterSlice,
    hub: hubConnectionSlice
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            // immutableCheck: false
        }),
});

export const persistor = persistStore(store);


