/*
 * @Author: = dengyy
 * @Date: 2024-08-12 10:37:21
 * @LastEditors: = dengyy
 * @LastEditTime: 2024-08-13 10:41:29
 * @FilePath: \first-extension-project\src\background\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* global chrome */
import { page_api_url, pattern_url_list } from '@/api';
import { findObjectByKeyValue,sendContentMessage,sendSidePanelMessage } from '@/common/utils/common';


// 开启sidePanel与backgroud消息通道
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed");
});

// 监听宿主页面的请求
chrome.webRequest.onCompleted.addListener(
    detail => {
        // 获取对应的api对象
        let api_obj = findObjectByKeyValue(page_api_url, 'api', detail.url, true);
        if (api_obj) {
            sendContentMessage("found_target_page", api_obj);           // 通知content
            sendSidePanelMessage("found_target_page", api_obj);         // 通知sidePanel
        } else {
        }
    },
    {
        urls: pattern_url_list,
    }
);

// 默认关闭侧边栏
chrome.storage.sync.set({isShowSidePanel: false})

// 接收content,sidePanel发来的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.todo) {
        case "changeSidePanel":
            console.log("打开侧边栏");
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                var tabId = tabs[0].id;
                chrome.sidePanel.open({ tabId: tabId });
                });
            break;
        case "sidePanelGetData":
            console.log("接收到sidepanel消息", request.data)
            sendResponse("hello sidePanel, I'm background")
            break;
        default:
            break;
    }
});




