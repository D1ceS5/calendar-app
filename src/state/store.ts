import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit'
import eventListReducer from './reducers/eventReducer'

export const store = configureStore({
    reducer: combineReducers({
        eventList: eventListReducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch