/*
 * @Author: = dengyy
 * @Date: 2024-08-12 10:37:21
 * @LastEditors: = dengyy
 * @LastEditTime: 2024-08-12 17:45:10
 * @FilePath: \first-extension-project\src\background\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* global chrome */

// 默认关闭侧边栏
chrome.storage.sync.set({isShowSidePanel: false})

// 接收content发来的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.action) {
        case "changeSidePanel":
            if (request.data.isShowSidePanel) {
                console.log("打开侧边栏");
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    var tabId = tabs[0].id;
                    chrome.sidePanel.open({ tabId: tabId });
                    });
            } else {
                console.log("关闭侧边栏");
                // chrome.sidePanel没有直接关闭的API
            }
            break;
        default:
            break;
    }
});


