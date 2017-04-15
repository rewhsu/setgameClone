import { combineReducers } from 'redux'
import { stage } from './stage'

const setApp = combineReducers({
  stage,
})

export default setApp