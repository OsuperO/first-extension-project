/*
 * @Author: = yangjj
 * @Date: 2024-03-15 17:02:16
 * @LastEditors: = dengyy
 * @LastEditTime: 2024-08-13 16:33:59
 * @FilePath: \jyzx-sidePanel-crx\src\api\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*global chrome*/

import baidu_api_url from './baiduApi';


// 补贴页面的监听请求url
export const page_api_url = [
    ...baidu_api_url,
];


// 获取url的pattern
function getPatternUrl(url) {
    let url_list = [];
    for (var item of url) {
        url_list.push(item.pattern);
    }
    return url_list;
}

export const pattern_url_list = getPatternUrl(page_api_url);
