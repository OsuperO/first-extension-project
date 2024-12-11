/*global chrome*/

import { subsidyConfig } from '@/common/js/subsidyConfig';

// 通过xpath获取单个元素
export function getElementByXpath(path, obj = null) {
    if (obj) {
        let iframeDoc = obj.contentDocument;
        return iframeDoc.evaluate(path, iframeDoc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue;
    } else {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
            .singleNodeValue;
    }
}
// 通过xpath获取多个元素
export function getElementByMoreXpath(xpath, obj = null) {
    let nodes;
    if (obj) {
        nodes = document.evaluate(xpath, obj, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    } else {
        nodes = document.evaluate(
            xpath,
            document,
            null,
            XPathResult.ORDERED_NODE_ITERATOR_TYPE,
            null
        );
    }
    let arr = [];
    let ele;
    while ((ele = nodes.iterateNext()) != null) {
        arr.push(ele);
    }
    return arr;
}

// 通过xpath定位添加线框
export function addBorderByXpath(xpath, borderObj = {}) {
    let arr = getElementByMoreXpath(xpath);
    if (arr.length === 0) {
        console.log(xpath, '定位失败');
    }
    arr.forEach((item, index) => {
        for (let config in borderObj) {
            item.style[config] = borderObj[config];
        }
    });
}

// 通过xpath定位添加文字
export function addTextByXpath(xpath, comment) {
    let arr = getElementByMoreXpath(xpath);
    if (arr.length === 0) {
        console.log(xpath, '定位失败');
    }
    arr.forEach((item, index) => {
        var p = document.createElement('p');
        p.innerText = comment;
        item.appendChild(p);
    });
}


export const TAB_TYPE = {
    审核: 'sh',
    审核汇总: 'shhz',
    审批: 'sp',
    审批汇总: 'sphz',
    受理: 'sl',
    进度查询: 'jdcx',
    公示: 'gs',
};

// 获取当前iframe
export const getCurIframe = async () => {
    const storage = await chrome.storage.sync.get();
    const pageApi = storage.pageApi;
    const curActiveTab = getElementByXpath('//div[@class="tab-item active"]');
    // 灵活就业补贴请求和页面iframe代号不一致
    let subsidy = ''
    if (pageApi.subsidy === 'lhjybt') {
        subsidy = 'lhjysbbt'
    } else if (pageApi.subsidy === 'ygzzzqysbbt') {
        subsidy = 'ygzjzqysbbt'
    }
     else {
        subsidy = pageApi.subsidy;
    }
    let curIframe = `//iframe[contains(@src,'https://hrss.gdgov.cn:443/subsidize/main/#/jycyzcxbthbzgl/${subsidy}')]`;
    if (curActiveTab) {
        const tabTitle = curActiveTab.title;
        curIframe = `//iframe[contains(@src,'https://hrss.gdgov.cn:443/subsidize/main/#/jycyzcxbthbzgl/${subsidy}/${TAB_TYPE[tabTitle]}')]`;
        let iframeContent = getElementByXpath(curIframe);
        return iframeContent;
    }
};

// 获取表格表头
export const getTableHeader = async headXpath => {
    // let iframeContent = getElementByXpath(pageApi.iframe);
    let iframeContent = await getCurIframe();
    let headContent = getElementByXpath(headXpath, iframeContent);
    let th_list = getElementByMoreXpath('.//th', headContent);
    if (th_list[0].getAttribute('class').includes('ant-table-selection-column')){
        await chrome.storage.sync.set({
            checkable: true
        });
    } else {
        await chrome.storage.sync.set({
            checkable: false
        });
    };

    let head_array = [];
    let merge_col = [];
    for (let th of th_list) {
        let colstart = th.getAttribute('colstart');
        let colend = th.getAttribute('colend');
        if (Number.parseInt(colstart) !== Number.parseInt(colend)) {
            merge_col.push([th.innerText, Number.parseInt(colstart), Number.parseInt(colend)]);
        }
    }
    for (let th of th_list) {
        let colstart = Number.parseInt(th.getAttribute('colstart'));
        let colend = Number.parseInt(th.getAttribute('colend'));
        if (colstart === colend && th.innerText && th.innerText !== '') {
        // if (colstart === colend && th.innerText) {
            let isPush = false;
            for (let merge of merge_col) {
                if (colstart >= merge[1] && colstart <= merge[2]) {
                    head_array.push(`${merge[0]}-${th.innerText}`);
                    isPush = true;
                }
            }
            if (!isPush) {
                head_array.push(th.innerText);
            }
        }
    }
    return head_array;
};

// 获取表格数据
/**
 *
 * @param {Object} pageApi 页面api
 * @param {String} headXpath 表头xpath
 * @param {String} bodyXpath 表格内容xpath
 * @returns
 */
/**
 * [{
 *  个人缴费金额-养老: "1,056.80",
    个人缴费金额-医疗: "453.92",
    个人缴费金额-失业: "0.00",
    个人缴费金额-工伤: "0.00",
    个人缴费金额-生育: "0.00",
    序号: "1",
    月份: "202310",
    补贴金额（元）-养老: "0.00",
    补贴金额（元）-医疗: "0.00",
    补贴金额（元）-合计: "800.00",
    补贴金额（元）-失业: "0.00",
    补贴金额（元）-工伤: "0.00",
    补贴金额（元）-生育: "0.00"
 * 
 * }]
 */
export const getTableData = async (headXpath, bodyXpath) => {
    // let iframeContent = getElementByXpath(pageApi.iframe);
    let iframeContent = await getCurIframe();
    let bodyContent = getElementByXpath(bodyXpath, iframeContent);
    let head_list = await getTableHeader(headXpath);
    let tr_list = getElementByMoreXpath('./tr', bodyContent);

    let checkable = await chrome.storage.sync.get('checkable');

    let data = [];
    for (let tr of tr_list.slice(1, tr_list.length)) {
        let obj = {};
        let tdContent = getElementByMoreXpath('./td', tr);
        if (tdContent.length >= head_list.length) {
            head_list.map((item, index) => {
                const idx = checkable.checkable ? index + 1 : index;
                obj[item] = tdContent[idx].innerText;
            });
            data.push(obj); 
        }
    }
    return data;
};

// 根据对象生成xpath，并返回element
export const getElementByObject = async (data_obj, key_name, headXpath, bodyXpath) => {
    let head_list = await getTableHeader(headXpath);
    let head_index = head_list.indexOf(key_name);
    if (head_index === -1) {
        return null;
    }

    let data_index = Number.parseInt(data_obj['序号']);
    let xpath = `${bodyXpath}/tr[${data_index + 1}]/td[${head_index + 1}]/span`;

    let iframeContent = await getCurIframe();

    return getElementByXpath(xpath, iframeContent);
};

// 获取页面字段数据
// 根据补贴配置获取详情页面对应字段的值
export const getDetailPageData = async pageApi => {
    /**pageData =
     * {
     *  "card_ID":"xxx"
     * }
     */
    // let iframeContent = getElementByXpath(pageApi.iframe);
    let iframeContent = await getCurIframe();
    let obj = {};
    const data_config = subsidyConfig[pageApi.subsidy].data;
    Object.entries(data_config).forEach(([key, value]) => {
        let exists = getElementByXpath(value, iframeContent);
        if (exists) {
            obj[key] = exists.innerText;
        } else {
            obj[key] = '';
        }
    });
    // setPageData(obj);
    return obj;
};
