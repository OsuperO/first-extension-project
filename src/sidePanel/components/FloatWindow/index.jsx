/*global chrome*/

import React, { useState } from 'react'
import CommonConstants from '@/common/js/CommonConstants';
import { CloseOutlined } from '@ant-design/icons';
import "./floatWindow.less"

const float_icon_url = chrome.runtime.getURL(CommonConstants.PAGE_ICON_PATH)
const float_icon_hover_url = chrome.runtime.getURL(CommonConstants.PAGE_ICON_HOVER_PATH)
// const float_icon_url = CommonConstants.PAGE_ICON_PATH
// const float_icon_hover_url = CommonConstants.PAGE_ICON_HOVER_PATH
export default function FloatWindow({ onClick, isShow, closeOnClick }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className='CRX-float-window-container-div'
            style={{
                display: isShow ? 'block' : 'none'
            }}
        >
            <CloseOutlined className='CRX-float-window-close' onClick={closeOnClick} />
            <div
                className='CRX-float-window-container'
                onMouseEnter={() => {
                    setIsHovered(true);
                }}
                onMouseLeave={() => {
                    setIsHovered(false)
                }}
                onClick={onClick}
            >

                <img className='CRX-float-window-icon' src={isHovered ? float_icon_hover_url : float_icon_url} alt="" />

            </div>
        </div>
    )
}
