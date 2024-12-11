/*
 * @Author: Superman
 * @since: 2024-09-20 15:05:09
 * @lastTime: 2024-09-23 16:15:02
 * @LastAuthor: LastAuthor
 * @FilePath: \jyzx-sidePanel-crx\src\common\utils\getCookies.js
 * @Description: 获取标签页的cookie
 */

export default function getCookies(system) {
    const websideDataObj = {}
    if (system === 'medical') {
        websideDataObj.cookies = document.cookie;
        websideDataObj.hsaPortalVcdll = localStorage.getItem('hsa-portal-vcdll');
        websideDataObj.hsaPortal = localStorage.getItem('hsa-portal');
    } else if (system === 'provincial') {
        websideDataObj.cookies = document.cookie;
    } else {
        return null
    }
    console.log(websideDataObj);
    return websideDataObj;
}