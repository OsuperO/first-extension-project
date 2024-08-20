/*
 * @Author: = 2906177060@qq.com
 * @Date: 2024-08-15 15:41:48
 * @LastEditors: = 2906177060@qq.com
 * @LastEditTime: 2024-08-15 16:01:37
 * @FilePath: \first-extension-project\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { init } from '@rematch/core'
import * as models from './models'

const store = init({
  models,
})

export default store