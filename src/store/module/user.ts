import { createSlice } from "@reduxjs/toolkit";
import { UserState } from "@/types/store/userTypes";

const initialState: UserState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export default userSlice;
