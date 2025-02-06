import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ThemeNode,
  GlobalConfig,
  FetchConfigParams,
} from "@/types/common/globalConfigTypes";

// 初始状态
const initialState: GlobalConfig = {
  theme: "system",
  loading: false,
  systemInfo: {
    version: process.env.APP_VERSION || "",
    environment: "development",
  },
  error: null,
  lastUpdated: null,
};

// 异步 Action：获取配置
export const fetchGlobalConfig = createAsyncThunk(
  "",
  async (params: FetchConfigParams, { getState }) => {
    // const { lastUpdated } = (getState() as RootState).globalConfig;

    // 缓存策略：5分钟内不重复请求
    // if (!params.forceRefresh && lastUpdated && Date.now() - lastUpdated < 300_000) {
    //   return null;
    // }

    // return await configService.fetchUserConfig(params.userId);

    return 123;
  }
);

// 创建 Slice
const globalConfigSlice = createSlice({
  name: "globalConfig",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeNode>) => {
      state.theme = action.payload;
    },
    setLoading: (state, action: PayloadAction<Boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<String | null>) => {},
    resetToDefault: (state) => {
      Object.assign(state, {
        ...initialState,
        systemInfo: state.systemInfo, // 保留系统信息
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalConfig.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGlobalConfig.fulfilled, (state, action) => {
        if (action.payload) {
          Object.assign(state, {
            ...action.payload as Partial<GlobalConfig>,
            systemInfo: state.systemInfo, // 保留系统信息
            loading: false,
            lastUpdated: Date.now(),
          });
        }
        state.loading = false;
      })
      .addCase(fetchGlobalConfig.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch config";
      });
  },
});

export const { setTheme, resetToDefault } = globalConfigSlice.actions;
export default globalConfigSlice.reducer;