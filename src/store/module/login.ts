// redux的createSlice可以简化创建模块的过程。它会自动生成action types和actioncreators。
import { createSlice } from "@reduxjs/toolkit";
import { LoginCMDState } from "@/types/store/loginTypes";

const initialState: LoginCMDState = {
  loginCMDArr: [
    {
      initialText: "C:Users/：",
      inputText: "",
      errorText: "",
    },
  ],
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // 如果你需要更新 loginCMDArr，可以在这里添加对应的 actions 和 reducers
    // 例如：
    addCommand: (state, action) => {
      state.loginCMDArr.push(action.payload);
    },

    updateCommand: (state, action) => {
      state.loginCMDArr[state.loginCMDArr.length - 1] = action.payload;
    },

    errorCommand: (state, action) => {
      state.loginCMDArr[state.loginCMDArr.length - 1] = {
        initialText: "C:Users/：",
        inputText: action.payload,
        errorText: `'${action.payload}'不是内部或外部命令，也不是可运行的程序`,
      };
      state.loginCMDArr.push({
        initialText: "C:Users/：",
        inputText: "",
        errorText: "",
      });
    },
  },
});

export default loginSlice;
