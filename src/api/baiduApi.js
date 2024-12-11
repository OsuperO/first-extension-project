/*
 * @Author: = dengyy
 * @Date: 2024-03-15 17:02:16
 * @LastEditors: = dengyy
 * @LastEditTime: 2024-06-11 10:42:17
 * @FilePath: \jyzx_crx\src\api\lhjybt_api.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 灵活就业补贴的请求url
const baidu_api_url = [
    // 列表
    {
        key: 'baidu',
        subsidy: 'baidu',
        name: '百度搜索页',
        api: 'https://www.baidu.com/',
        pattern: 'https://www.baidu.com/*',
        // iframe: "//iframe[contains(@src,'https://hrss.gdgov.cn:443/subsidize/main/#/jycyzcxbthbzgl/lhjybt/sl')]",
    }
];

export default baidu_api_url;
