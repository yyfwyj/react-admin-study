为 React 项目添加 TypeScript 类型文件夹是一个非常好的实践，这有助于确保类型安全、提高代码质量并简化维护。下面我将为你提供一个合理的文件夹架构方案，并展示如何编写和组织类型定义。

### 文件夹架构

你可以创建一个名为 `types` 的文件夹来存放所有的 TypeScript 类型定义。根据项目的规模和复杂度，你可能希望进一步细分这个文件夹。以下是一个推荐的结构：

```plaintext
src/
├── types/
│   ├── index.ts                # 汇总导出所有类型
│   ├── common/                 # 存放通用类型
│   │   └── index.ts            # 导出 common 文件夹下的所有类型
│   ├── components/             # 组件相关类型
│   │   └── index.ts            # 导出 components 文件夹下的所有类型
│   ├── api/                    # API 请求相关的类型
│   │   └── index.ts            # 导出 api 文件夹下的所有类型
│   ├── store/                  # Redux 或其他状态管理库相关类型
│   │   └── index.ts            # 导出 store 文件夹下的所有类型
│   ├── pages/                  # 页面级别类型（如果适用）
│   │   └── index.ts            # 导出 pages 文件夹下的所有类型
│   └── utils/                  # 工具函数或实用程序类型的定义
│       └── index.ts            # 导出 utils 文件夹下的所有类型
└── ...
```

这种结构允许你按功能或用途对类型进行分组，使得更容易找到和管理类型定义。每个子文件夹中的 `index.ts` 文件可以用来汇总和重新导出该目录下的所有类型，从而简化导入路径。

### 类型文件编写案例

#### Common Types (`types/common/index.ts`)

这里可以放置一些应用中广泛使用的类型，比如响应数据格式、错误对象等。

```typescript
// types/common/index.ts
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export type Nullable<T> = T | null;
```

#### Component Types (`types/components/index.ts`)

组件相关类型可以放在 `components` 文件夹下，特别是那些用于 prop 类型检查的接口或类型别名。

```typescript
// types/components/index.ts
import { FC } from 'react';

export interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({ label, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}>
    {label}
  </button>
);

// 如果有多个组件类型，可以继续添加...
```

#### API Types (`types/api/index.ts`)

API 相关的类型可以包含请求参数、响应体以及可能的错误信息。

```typescript
// types/api/index.ts
import { ApiResponse } from '../common';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export type LoginResponse = ApiResponse<User>;
```

#### Store Types (`types/store/index.ts`)

对于状态管理库如 Redux，可以在 `store` 文件夹中定义 action、state 和 reducer 的类型。

```typescript
// types/store/index.ts
import { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../api';

export interface AuthState {
  isAuthenticated: boolean;
  user: Nullable<User>;
  loading: boolean;
  error: Nullable<string>;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export type LoginAction = PayloadAction<LoginPayload>;

// 定义其他与 store 相关的类型...
```

#### 汇总导出 (`types/index.ts`)

最后，在 `types` 文件夹根目录下的 `index.ts` 文件中汇总导出所有的类型，以便于在项目其他地方轻松导入。

```typescript
// types/index.ts
export * from './common';
export * from './components';
export * from './api';
export * from './store';
export * from './pages';
export * from './utils';
```

通过这样的结构，你的项目将拥有一个清晰且易于扩展的类型系统，同时保持了良好的模块化设计。记得随着项目的成长不断调整和完善这个结构，以适应新的需求。