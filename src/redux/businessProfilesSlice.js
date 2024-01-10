// src/redux/businessProfilesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const businessProfilesSlice = createSlice({
  name: 'businessProfiles',
  initialState: [],
  reducers: {
    addBusinessProfile: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { addBusinessProfile } = businessProfilesSlice.actions;
export default businessProfilesSlice.reducer;
