/*
 * @Author: = 2906177060@qq.com
 * @Date: 2024-08-12 10:37:21
 * @LastEditors: = 2906177060@qq.com
 * @LastEditTime: 2024-08-16 17:36:43
 * @FilePath: \first-extension-project\src\sidePanel\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import SidePanel from './components/sidepanel';
import "./index.css"
import { debounce } from "lodash";
import { Provider } from 'react-redux';
import store from '../store';

const root = ReactDOM.createRoot(document.getElementById('root'));

const NativeResizeObserver = window.ResizeObserver;

// 用于优化调节窗口大小的回调处理
class DebouncedResizeObserver extends NativeResizeObserver {
    constructor(callback, options) {
        const debouncedCallback = debounce(entries => {
            callback(entries);
        }, 100);

        super(debouncedCallback, options);
    }
}

window.ResizeObserver = DebouncedResizeObserver;
root.render(
    <Provider store={store}>
        <SidePanel />
    </Provider>
); 

