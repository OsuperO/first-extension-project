import React from 'react';
import ReactDOM from 'react-dom/client';
import SidePanel from './components/sidepanel';
import "./index.css"
import { debounce } from "lodash";
import { Provider } from "react-redux";
import store from "@/store"

const root = ReactDOM.createRoot(document.getElementById('root'));

const NativeResizeObserver = window.ResizeObserver;

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
    </ Provider>
);

