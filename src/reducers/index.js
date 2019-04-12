import news from './news'
import cart from './cart'
import home from './home'
import {combineReducers} from 'redux'

export default combineReducers({
    news,
    cart,
    home
})