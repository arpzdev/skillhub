// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import businessProfilesReducer from './businessProfilesSlice';

const store = configureStore({
  reducer: {
    businessProfiles: businessProfilesReducer,
  },
});

export default store;
