/*
 * @Author: = dengyy
 * @Date: 2024-08-12 10:37:21
 * @LastEditors: = dengyy
 * @LastEditTime: 2024-08-12 17:32:07
 * @FilePath: \first-extension-project\src\content\ContentMain.jsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/* global chrome */
import React, { useState,useEffect } from 'react'
import FloatWindow from './components/FloatWindow'
import MainModal from './components/mainModal'

export default function ContentMain() {
    // 悬浮窗是否可视
    const [floatWindowVisible,setFloatWindowVisible] = useState(true)
    // 悬浮窗点击
    const floatWindowOnClick = async () => {
        const storage = await chrome.storage.sync.get();
        console.log(`storage.isShowSidePanel${storage.isShowSidePanel}`);
        const isShowSidePanel = storage.isShowSidePanel;
        console.log(`开关sidePanel${!isShowSidePanel}`)
        chrome.storage.sync.set({isShowSidePanel: !isShowSidePanel})
        // console.log(`开关sidePanel${drawerVisible}`)
        // 向background发送消息
        chrome.runtime.sendMessage({
            action: 'changeSidePanel',
            data: {isShowSidePanel: !isShowSidePanel},
        })
    }   

    // 关闭悬浮窗
    const closeFloatWindow = () => {
        setFloatWindowVisible(false)
    }

    return (
        <div>
            <FloatWindow
                onClick={floatWindowOnClick} isShow={floatWindowVisible}
                closeOnClick={closeFloatWindow}
            />
            {/* {  drawerVisible &&  <MainModal/> }    */}
            
            {/* <MainDrawer visible={drawerVisible} setVisible={setDrawerVisible} closeDrawer={drawerClose} /> */}

        </div>
    )
}
