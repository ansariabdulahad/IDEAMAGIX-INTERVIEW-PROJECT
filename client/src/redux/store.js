import { configureStore } from "@reduxjs/toolkit";
import userSlice from './slices/user-slice';
import getListSlice from './slices/getList-slice';
import consultaionSlice from './slices/consultation-slice';

const store = configureStore({
    reducer: {
        user: userSlice,
        listOfUser: getListSlice,
        consult: consultaionSlice
    }
});

export default store;