/*
 * @Author: Author
 * @since: 2024-10-16 16:40:37
 * @lastTime: 2024-12-11 10:49:50
 * @LastAuthor: LastAuthor
 * @FilePath: \first-extension-project\src\common\utils\common.js
 * @Description: Description
 */
/*global chrome*/

// import Logger from "./Logger"


const TAG = "utils.common"


// 给定一个数组，每个元素是一个对象，根据key和value查找对象
// opacity_match:是否模糊匹配,但只返回第一个元素
export function findObjectByKeyValue(arr_list, key, value,opacity_match=false) {
    if (!arr_list || arr_list.length == 0) {
        return null
    }
    try {
        for (var item of arr_list) {
            if (opacity_match) {
                if (item[key].indexOf(value) != -1 || value.indexOf(item[key]) != -1) {
                    return item
                }
            } else {
                if (item[key] === value) {
                    return item
                }
            }
        }
        return null
    } catch (err) {
        console.error(TAG, err)
        return null
    }

}

// background发送消息给content_scripts
export async function sendContentMessage(todoType, data = {}) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {
            todo: todoType,
            data: data
        })
    })
}

// background发送消息给sidePanel
export async function sendSidePanelMessage(todoType, data = {}) {
    chrome.runtime.sendMessage({
        todo: todoType,
        data: data
    }
);
}
