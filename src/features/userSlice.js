import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    selectedUser: null,
    userList: [],
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setUserList: (state, action) => {
      state.userList = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
});

export const { setSelectedUser, setUserList, clearSelectedUser } = userSlice.actions;
export default userSlice.reducer;
