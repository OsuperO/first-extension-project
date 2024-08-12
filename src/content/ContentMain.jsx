import React, { useState } from 'react'
import FloatWindow from './components/FloatWindow'
import MainModal from './components/mainModal'



export default function ContentMain() {
    // 抽屉是否可视
    const [drawerVisible, setDrawerVisible] = useState(false)
    // 悬浮窗是否可视
    const [floatWindowVisible,setFloatWindowVisible] = useState(true)
    // 悬浮窗点击
    const floatWindowOnClick = () => {
        setDrawerVisible(true)
        // chrome.sidePanel.open();

    }   

    // 抽屉关闭
    const drawerClose = () => {
        setDrawerVisible(false)
        // chrome.sidePanel.close();
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
