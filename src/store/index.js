import {init} from '@rematch/core'
// import * as models from './models'
import { models } from './models'

const store = init({ models })

export default store