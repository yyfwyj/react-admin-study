export type ThemeNode = "light" | "dark" | "system";
export type SystemInfo = {
    version: string;
    environment: 'development' | 'production';
}
// export type LayoutType = "side" | "top" | "mix" | "system";
/**
 * 全局配置 Config 类型
 */
export interface GlobalConfig {
    theme: ThemeNode;
    loading: Boolean;
    systemInfo: SystemInfo;
    error: String | null;
    lastUpdated: Number | null;
}

// 初始化请求参数类型
export interface FetchConfigParams {
    userId: String;
    forceRefresh: Boolean;
}
