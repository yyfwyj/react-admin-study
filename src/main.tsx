// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'
// import './output.css'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { StrictMode } from 'react';
import './index.css';
import App from './App.tsx';
import './output.css';
import store from '@/store/index.ts'; // 确保路径指向你的store文件

const container = document.getElementById('root');
const root = createRoot(container!); // 创建根节点

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);