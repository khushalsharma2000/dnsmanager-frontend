import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "", // Adjusted from userName
  email: "", // Adjusted from email
  // Add other fields from your user model as needed
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      // Adjust other fields as per your user model
    },
    logoutUser: (state, action) => {
      state.name = "";
      state.email = "";
      // Clear other fields as needed
    },
  },
});

export const { setUserDetails, logoutUser } = userSlice.actions;
export default userSlice.reducer;
