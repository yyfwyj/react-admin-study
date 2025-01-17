import { configureStore } from "@reduxjs/toolkit";

import loginSlice from "./module/login";

export default configureStore({
  reducer: {
    login: loginSlice.reducer,
  },
});
