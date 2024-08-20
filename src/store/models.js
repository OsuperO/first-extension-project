/*
 * @Author: = 2906177060@qq.com
 * @Date: 2024-08-16 10:36:42
 * @LastEditors: = 2906177060@qq.com
 * @LastEditTime: 2024-08-16 10:36:56
 * @FilePath: \first-extension-project\src\store\models.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const count = {
    state: 0, // initial state
    reducers: {
      // handle state changes with pure functions
      increment(state, payload) {
        return state + payload
      }
    },
    effects: {
      // handle state changes with impure functions.
      // use async/await for async actions
      async incrementAsync(payload, rootState) {
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.increment(payload)
      }
    }
  }