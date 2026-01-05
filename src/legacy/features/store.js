import { configureStore } from '@reduxjs/toolkit'
import citiesApi from './citiesApi'
import userApi from './userApi'
import itinerariesApi from './itinerariesApi'
import UserSlice from './UserSlice'
import commentsApi from './commentsApi'

export default configureStore({
    reducer: {
        [citiesApi.reducerPath]: citiesApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [itinerariesApi.reducerPath]: itinerariesApi.reducer,
        [commentsApi.reducerPath]: commentsApi.reducer,
        userr: UserSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(citiesApi.middleware)
            .concat(itinerariesApi.middleware)
            .concat(commentsApi.middleware)
            .concat(userApi.middleware)
})
