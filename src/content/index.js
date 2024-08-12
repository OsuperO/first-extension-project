/*
 * @Author: = dengyy
 * @Date: 2024-08-12 10:37:21
 * @LastEditors: = dengyy
 * @LastEditTime: 2024-08-12 11:07:02
 * @FilePath: \first-extension-project\src\content\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import "./content.less"
import ContentMain from './ContentMain';

export default function Content() {

  return (  
      <div className='CRX-content'>
          <ContentMain/>
    </div>
  )
}

// 创建id为CRX-container的div
const app = document.createElement('div')
app.id = "CRX-container"
// 将刚刚创建的div插入body最后
document.body.append(app)
// 将ReactDom插入刚刚创建的div
const crxContainer = ReactDOM.createRoot(document.getElementById('CRX-container'))
crxContainer.render(<Content />)
