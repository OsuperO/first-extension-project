import { createModel } from '@rematch/core';

export const counterModel = createModel() ({
    state: {
      count: 0,
    },
    reducers: {
      // handle state changes with pure functions
      increment: (state , payload) => ({
        ...state,
        count: state.count + payload
      })
    },
    effects: {
      // handle state changes with impure functions.
      // use async/await for async actions
      async incrementAsync(payload, rootState) {
        await new Promise(resolve => setTimeout(resolve, 2000))
        this.increment(payload)
      }
    }
  });