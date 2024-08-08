import React, { useState } from 'react'
import FloatWindow from './components/FloatWindow'
// import MainModal from './components/mainModal'
import SidePanel from './components/sidepanel'



export default function ContentMain() {
    // 抽屉是否可视
    const [drawerVisible, setDrawerVisible] = useState(false)
    // 悬浮窗是否可视
    const [floatWindowVisible,setFloatWindowVisible] = useState(true)
    // 悬浮窗点击
    const floatWindowOnClick = () => {
        setDrawerVisible(true)

    }   

    // 抽屉关闭
    const drawerClose = () => {
        setDrawerVisible(false)
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
            {  drawerVisible &&  <SidePanel/> }   
            
            {/* <MainDrawer visible={drawerVisible} setVisible={setDrawerVisible} closeDrawer={drawerClose} /> */}

        </div>
    )
}
